import React from 'react';

interface SectionLabelProps {
  label: string;
  category?: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  category = 'AEGIS DEFENSE SYSTEM',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.25em] uppercase text-[#8D9096] mb-4 select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]/80 shadow-[0_0_8px_#D71920]" />
      <span>{category}</span>
      <span className="text-white/20">/</span>
      <span className="text-[#F4F4F1] font-medium tracking-[0.2em]">{label}</span>
    </div>
  );
};
