import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'active' | 'alert' | 'ghost';
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  variant = 'default',
  glow = false,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'active':
        return 'bg-white/[0.05] border-[#D71920]/40 shadow-[0_0_30px_rgba(215,25,32,0.12)]';
      case 'alert':
        return 'bg-[#D71920]/[0.06] border-[#D71920]/60 shadow-[0_0_35px_rgba(215,25,32,0.22)]';
      case 'ghost':
        return 'bg-transparent border-white/[0.05] hover:border-white/[0.12]';
      case 'default':
      default:
        return 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.045]';
    }
  };

  return (
    <div
      className={`relative backdrop-blur-md border rounded-xl transition-all duration-300 ${getVariantStyles()} ${
        glow ? 'shadow-[0_0_40px_rgba(215,25,32,0.15)]' : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle top reflection sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
