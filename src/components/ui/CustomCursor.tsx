import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor-text], button, a, [role="button"]') as HTMLElement | null;
      
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(text || null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, isVisible]);

  if (reducedMotion || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        willChange: 'transform',
      }}
    >
      {cursorText ? (
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#D71920] text-white font-mono text-[9px] font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(215,25,32,0.5)] animate-in fade-in zoom-in-75 duration-200">
          {cursorText}
        </div>
      ) : (
        <>
          <div
            className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
              isHovered
                ? 'w-11 h-11 border-[#D71920] bg-[#D71920]/10 shadow-[0_0_20px_rgba(215,25,32,0.35)] scale-110'
                : 'w-7 h-7 border-white/30 bg-transparent'
            }`}
          />
          <div
            className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
              isHovered ? 'w-1.5 h-1.5 bg-[#D71920]' : 'w-1 h-1 bg-white/80'
            }`}
          />
        </>
      )}
    </div>
  );
};
