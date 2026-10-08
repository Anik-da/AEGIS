import React, { useRef, useState } from 'react';
import { aegisAudio } from '../../utils/audio';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Subdued magnetic force
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    aegisAudio.playClick();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-2 tracking-wider',
    md: 'text-xs px-5 py-2.5 gap-2.5 tracking-[0.16em]',
    lg: 'text-sm px-7 py-3.5 gap-3 tracking-[0.18em]',
  };

  const variantClasses = {
    primary:
      'bg-[#D71920] hover:bg-[#b5141a] text-white font-medium border border-[#D71920]/80 shadow-[0_0_24px_rgba(215,25,32,0.35)] hover:shadow-[0_0_36px_rgba(215,25,32,0.55)]',
    secondary:
      'bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F4F1] border border-white/[0.1] hover:border-white/[0.22] shadow-[0_4px_20px_rgba(0,0,0,0.5)]',
    outline:
      'bg-transparent hover:bg-[#D71920]/10 text-[#F4F4F1] hover:text-white border border-[#D71920]/40 hover:border-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.15)]',
    danger:
      'bg-[#D71920]/20 hover:bg-[#D71920]/40 text-[#ff6b70] border border-[#D71920]/50 hover:border-[#D71920]',
    ghost:
      'bg-transparent hover:bg-white/[0.04] text-[#8D9096] hover:text-[#F4F4F1] border border-transparent',
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.05s ease-out',
      }}
      className={`inline-flex items-center justify-center rounded-lg uppercase font-mono font-medium transition-colors select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
