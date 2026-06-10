'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

type Pt = { x: number; y: number };

/**
 * A decorative "travel map" route that begins at the period of the hero
 * headline (any element marked [data-route-origin]) and winds down the page,
 * drawing itself and advancing a pin as the user scrolls.
 */
export function ScrollRoute({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [origin, setOrigin] = useState<Pt | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Measure container + origin glyph.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const w = el.clientWidth;
      const h = el.scrollHeight;
      const originEl = el.querySelector<HTMLElement>('[data-route-origin]');
      if (originEl) {
        const o = originEl.getBoundingClientRect();
        setOrigin({
          x: o.left - rect.left + o.width / 2,
          y: o.top - rect.top + o.height / 2,
        });
      }
      setDims({ w, h });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    // Re-measure shortly after mount (fonts/layout settle).
    const t = setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, [containerRef]);

  // Build the winding path in pixel space (1:1 with the overlay).
  const d = (() => {
    if (!dims) return '';
    const { w, h } = dims;
    const start = origin ?? { x: w * 0.32, y: 260 };
    const cx = w / 2;
    const amp = Math.min(w * 0.16, 150);
    const top = Math.max(start.y, 120);
    const bottom = h - 160;
    const span = Math.max(bottom - top, 1);
    const waves = 5;
    // Smooth waypoints down the page, alternating left/right of centre.
    const pts: Pt[] = [{ x: start.x, y: top }];
    for (let i = 1; i <= waves; i++) {
      const dir = i % 2 === 1 ? 1 : -1;
      pts.push({ x: cx + amp * dir, y: top + (span * i) / waves });
    }
    // Connect with cubic segments whose control points sit directly above /
    // below each waypoint, so every tangent is vertical — the joins are
    // smooth (C1 continuous) with no sharp corners.
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const dy = (p1.y - p0.y) * 0.5;
      path += ` C ${p0.x} ${p0.y + dy}, ${p1.x} ${p1.y - dy}, ${p1.x} ${p1.y}`;
    }
    return path;
  })();

  // Drive the pin along the path with scroll.
  const positionPin = (progress: number) => {
    const path = pathRef.current;
    const pin = pinRef.current;
    if (!path || !pin) return;
    const len = path.getTotalLength();
    if (!len) return;
    const p = Math.min(Math.max(progress, 0), 1);
    const pt = path.getPointAtLength(p * len);
    pin.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%)`;
  };

  useMotionValueEvent(scrollYProgress, 'change', positionPin);

  useEffect(() => {
    // Position once the path exists / changes.
    positionPin(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d]);

  if (!dims || !d) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0"
      >
        {/* Faint dotted base route */}
        <path
          d={d}
          strokeOpacity="0.25"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ stroke: 'var(--brand)' }}
        />
        {/* Drawn progress route */}
        <motion.path
          ref={pathRef}
          d={d}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress, stroke: 'var(--brand)' }}
        />
      </svg>

      {/* Travelling marker — the period, moving along the route */}
      <div ref={pinRef} className="absolute left-0 top-0 will-change-transform">
        <span className="relative flex size-2.5 sm:size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/30" />
          <span className="relative inline-flex size-full rounded-full bg-brand shadow-sm shadow-brand/40 ring-2 ring-brand/20" />
        </span>
      </div>
    </div>
  );
}
