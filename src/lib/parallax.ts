import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'vertical' } = options;
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;

      if (direction === 'vertical') {
        const newOffset = (scrollY - elementTop) * speed;
        setOffset(newOffset);
      } else {
        const newOffset = (scrollY - elementTop) * speed;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return { offset, elementRef };
}

export function useScrollTrigger(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, elementRef };
}