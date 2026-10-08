import React from 'react';

interface StatusIndicatorProps {
  status?: 'protected' | 'analyzing' | 'alert' | 'tamper' | 'healing';
  label?: string;
  className?: string;
  showText?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status = 'protected',
  label,
  className = '',
  showText = true,
}) => {
  const getColor = () => {
    switch (status) {
      case 'alert':
      case 'tamper':
        return {
          dot: 'bg-[#D71920]',
          glow: 'bg-[#D71920]/40',
          text: 'text-[#D71920]',
          defaultLabel: 'ALERT DETECTED',
        };
      case 'analyzing':
      case 'healing':
        return {
          dot: 'bg-amber-400',
          glow: 'bg-amber-400/40',
          text: 'text-amber-400',
          defaultLabel: status === 'healing' ? 'SELF-HEALING' : 'ANALYZING',
        };
      case 'protected':
      default:
        return {
          dot: 'bg-[#D71920]',
          glow: 'bg-[#D71920]/30',
          text: 'text-white/80',
          defaultLabel: 'ACTIVE DEFENSE',
        };
    }
  };

  const config = getColor();

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.glow}`}
        />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      {showText && (
        <span className={`text-[10px] uppercase font-mono tracking-widest ${config.text}`}>
          {label || config.defaultLabel}
        </span>
      )}
    </div>
  );
};
