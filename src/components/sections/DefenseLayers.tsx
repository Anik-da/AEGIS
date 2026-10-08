import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { useAegis } from '../../context/AegisContext';
import type { DefenseLayerType } from '../../types';
import { Compass, ShieldAlert, Cpu, RefreshCw, ArrowRight } from 'lucide-react';

export const DefenseLayers: React.FC = () => {
  const { setActiveLayer } = useAegis();
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(0);

  const panels = [
    {
      id: 'intent' as DefenseLayerType,
      num: '01',
      title: 'INTENTGUARD',
      question: 'Does the action still match what the human intended?',
      detail: 'Extracts human boundary constraints from prompts and monitors ongoing multi-step user & agent operations for drift, unexpected parameter changes, or divergence.',
      icon: <Compass className="w-6 h-6 text-[#D71920]" />,
      anchor: '#intent',
    },
    {
      id: 'threat' as DefenseLayerType,
      num: '02',
      title: 'THREATGUARD',
      question: 'Is the behavior becoming an attack?',
      detail: 'Correlates distributed multi-event sequences across authentication, endpoint access, and privilege requests to detect and interrupt complex attack chains in real time.',
      icon: <ShieldAlert className="w-6 h-6 text-[#D71920]" />,
      anchor: '#threats',
    },
    {
      id: 'tamper' as DefenseLayerType,
      num: '03',
      title: 'TAMPERGUARD',
      question: 'Has the application or client state been manipulated?',
      detail: 'Enforces strict cryptographic zero-trust boundaries between client-side state and backend authorization. Detects state manipulation and isolated build discrepancies.',
      icon: <Cpu className="w-6 h-6 text-[#D71920]" />,
      anchor: '#tamper',
    },
    {
      id: 'heal' as DefenseLayerType,
      num: '04',
      title: 'HEALGUARD',
      question: 'Can the system safely recover and verify itself?',
      detail: 'Autonomous root cause analysis, AST-level zero-trust patch synthesis, automated sandboxed security regression testing, and instant canary rollback when SLOs degrade.',
      icon: <RefreshCw className="w-6 h-6 text-[#D71920]" />,
      anchor: '#heal',
    },
  ];

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#D71920]/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-3xl mb-16">
          <SectionLabel label="SYSTEM ARCHITECTURE" category="03" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-tight">
            FOUR LAYERS. <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D71920]">
              ONE GUARDIAN.
            </span>
          </h2>
          <p className="mt-4 text-sm font-mono tracking-widest text-[#8D9096] uppercase">
            Interactive Defensive Chapters
          </p>
        </div>

        {/* 4 Interactive Chapter Panels */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch min-h-[500px]">
          {panels.map((panel, idx) => {
            const isHovered = hoveredPanel === idx;
            const isOtherHovered = hoveredPanel !== null && hoveredPanel !== idx;

            return (
              <motion.div
                key={panel.num}
                onMouseEnter={() => {
                  setHoveredPanel(idx);
                  setActiveLayer(panel.id);
                }}
                onMouseLeave={() => {
                  setHoveredPanel(null);
                  setActiveLayer(null);
                }}
                className={`relative rounded-2xl p-8 flex flex-col justify-between border cursor-pointer transition-all duration-500 overflow-hidden ${
                  isHovered
                    ? 'bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-[#D71920]/60 shadow-[0_0_40px_rgba(215,25,32,0.2)] lg:scale-[1.02] z-20'
                    : isOtherHovered
                    ? 'bg-white/[0.015] border-white/[0.04] opacity-70 z-10'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 z-10'
                }`}
              >
                {/* Moving red laser scanline on active/hovered */}
                {isHovered && (
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D71920] to-transparent animate-pulse shadow-[0_0_12px_#D71920]" />
                )}

                {/* Top Chapter Metadata */}
                <div>
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                    <span className="text-2xl font-light font-mono text-[#D71920]">
                      {panel.num}
                    </span>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.08]">
                      {panel.icon}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal tracking-wide text-white mb-4 font-mono">
                    {panel.title}
                  </h3>

                  <p className="text-base sm:text-lg font-light text-white/90 leading-snug italic mb-6">
                    "{panel.question}"
                  </p>

                  <p
                    className={`text-xs font-mono leading-relaxed text-[#8D9096] transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    {panel.detail}
                  </p>
                </div>

                {/* Bottom Jump Link */}
                <div className="pt-8 border-t border-white/[0.06] mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase">
                    CHAPTER {panel.num}
                  </span>

                  <a
                    href={panel.anchor}
                    className="flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-[#D71920] transition-colors"
                  >
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
