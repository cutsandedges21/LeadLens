'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FloatingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  blur: number;
  speed: number;
  delay: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle';
}

const shapes: FloatingShape[] = [
  { id: 1, size: 120, x: 10, y: 20, color: 'rgba(255, 107, 107, 0.3)', blur: 20, speed: 0.3, delay: 0, rotation: 0, shape: 'circle' },
  { id: 2, size: 80, x: 80, y: 60, color: 'rgba(78, 205, 196, 0.25)', blur: 50, speed: 0.5, delay: 0.2, rotation: 45, shape: 'circle' },
  { id: 3, size: 150, x: 60, y: 30, color: 'rgba(255, 154, 162, 0.2)', blur: 70, speed: 0.4, delay: 0.4, rotation: 0, shape: 'circle' },
  { id: 4, size: 100, x: 20, y: 10, color: 'rgba(255, 206, 86, 0.25)', blur: 55, speed: 0.35, delay: 0.6, rotation: 30, shape: 'circle' },
  { id: 5, size: 90, x: 70, y: 15, color: 'rgba(108, 92, 231, 0.3)', blur: 25, speed: 0.45, delay: 0.8, rotation: 0, shape: 'circle' },
  { id: 6, size: 60, x: 45, y: 50, color: 'rgba(255, 107, 107, 0.2)', blur: 40, speed: 0.6, delay: 1, rotation: 60, shape: 'square' },
  { id: 7, size: 130, x: 20, y: 80, color: 'rgba(78, 205, 196, 0.2)', blur: 15, speed: 0.25, delay: 1.2, rotation: 0, shape: 'circle' },
  { id: 8, size: 70, x: 85, y: 35, color: 'rgba(255, 154, 162, 0.25)', blur: 45, speed: 0.55, delay: 1.4, rotation: 15, shape: 'circle' },
  { id: 9, size: 720, x: -15, y: 70, color: 'rgba(255, 107, 107, 0.3)', blur: 20, speed: 0.3, delay: 0, rotation: 0, shape: 'circle' },
  { id: 10, size: 380, x: -10, y: -10, color: 'rgba(78, 205, 196, 0.25)', blur: 50, speed: 0.5, delay: 0.2, rotation: 45, shape: 'circle' },
  { id: 11, size: 250, x: 60, y: 30, color: 'rgba(255, 154, 162, 0.2)', blur: 70, speed: 0.4, delay: 0.4, rotation: 0, shape: 'circle' },
  { id: 12, size: 300, x: 10, y: 50, color: 'rgba(255, 206, 86, 0.25)', blur: 55, speed: 0.35, delay: 0.6, rotation: 30, shape: 'circle' },
  { id: 13, size: 190, x: 70, y: 15, color: 'rgba(108, 92, 231, 0.3)', blur: 25, speed: 0.45, delay: 0.8, rotation: 0, shape: 'circle' },
  { id: 14, size: 160, x: 45, y: 50, color: 'rgba(255, 107, 107, 0.2)', blur: 40, speed: 0.6, delay: 1, rotation: 60, shape: 'square' },
  { id: 15, size: 230, x: 20, y: 80, color: 'rgba(78, 205, 196, 0.2)', blur: 15, speed: 0.25, delay: 1.2, rotation: 0, shape: 'circle' },
  { id: 16, size: 170, x: 85, y: 35, color: 'rgba(255, 154, 162, 0.25)', blur: 45, speed: 0.55, delay: 1.4, rotation: 15, shape: 'circle' },
];

export function FloatingShapes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });

    // Update motion values for parallax
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const getShapeStyle = (shape: FloatingShape) => {
    const baseStyle = {
      width: shape.size,
      height: shape.size,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      backgroundColor: shape.color,
      filter: `blur(${shape.blur}px)`,
    };

    switch (shape.shape) {
      case 'square':
        return { ...baseStyle, borderRadius: '20px' };
      case 'triangle':
        return {
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        };
      default:
        return { ...baseStyle, borderRadius: '50%' };
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => {
        const x = useTransform(mouseX, [-1, 1], [-20, 20]);
        const y = useTransform(mouseY, [-1, 1], [-20, 20]);

        const springX = useSpring(x, { stiffness: 100, damping: 30 });
        const springY = useSpring(y, { stiffness: 100, damping: 30 });

        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              ...getShapeStyle(shape),
              x: springX,
              y: springY,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              rotate: shape.rotation > 0 ? [0, shape.rotation, 0] : 0,
            }}
            transition={{
              duration: 8 + shape.speed * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          />
        );
      })}
    </div>
  );
}