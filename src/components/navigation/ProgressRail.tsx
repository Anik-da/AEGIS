import React, { useState } from 'react';
import { aegisAudio } from '../../utils/audio';

interface ProgressRailProps {
  activeSection: string;
}

export const ProgressRail: React.FC<ProgressRailProps> = ({ activeSection }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const sections = [
    { id: 'hero', num: '01', label: 'SHOP WITH INTENT' },
    { id: 'discover', num: '02', label: 'DISCOVER' },
    { id: 'intent-layer', num: '03', label: 'AI UNDERSTANDS INTENT' },
    { id: 'intent-match', num: '04', label: 'INTENT MATCH' },
    { id: 'intent-drift', num: '05', label: 'INTENT DRIFT' },
    { id: 'spotlight', num: '06', label: 'PRODUCT DETAIL' },
    { id: 'cart-preview', num: '07', label: 'CART REVIEW' },
    { id: 'checkout-preview', num: '08', label: 'CHECKOUT' },
    { id: 'tamper-guard', num: '09', label: 'TAMPERGUARD' },
    { id: 'threat-guard', num: '10', label: 'THREATGUARD' },
    { id: 'heal-guard', num: '11', label: 'HEALGUARD' },
    { id: 'rollback-guard', num: '12', label: 'ROLLBACK' },
    { id: 'control-center', num: '13', label: 'CONTROL CENTER' },
    { id: 'defense-core', num: '14', label: 'AEGIS CORE' },
    { id: 'final-cta', num: '15', label: 'SHOP WITH CONFIDENCE' },
  ];

  const handleScrollTo = (id: string) => {
    aegisAudio.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Section navigation rail"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2 pointer-events-auto select-none"
    >
      {sections.map((sec, idx) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={sec.id}
            className="relative flex items-center justify-end group cursor-pointer"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => handleScrollTo(sec.id)}
          >
            {/* Tooltip Label */}
            {isHovered && (
              <div className="absolute right-8 py-1 px-2.5 rounded bg-black/95 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white shadow-xl whitespace-nowrap animate-fade-in z-50">
                <span className="text-[#D71920] mr-1.5">{sec.num}</span>
                <span>{sec.label}</span>
              </div>
            )}

            {/* Dash bar */}
            <button
              aria-label={`Jump to ${sec.label}`}
              className="py-1 px-1 flex items-center justify-end focus:outline-none cursor-pointer"
            >
              <span
                className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-7 bg-[#D71920] shadow-[0_0_10px_#D71920]'
                    : isHovered
                    ? 'w-5 bg-white/70'
                    : 'w-2.5 bg-white/20'
                }`}
              />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
