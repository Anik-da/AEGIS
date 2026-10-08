import React, { useState } from 'react';
import { Shield, Sparkles, AlertOctagon, Terminal, Wrench } from 'lucide-react';
import { AegisCore } from '../hero/AegisCore';
import { aegisAudio } from '../../utils/audio';

export const DefenseCoreVisual: React.FC = () => {
  const [activeRing, setActiveRing] = useState<'intent' | 'threat' | 'tamper' | 'heal'>('intent');

  const rings = [
    {
      id: 'intent' as const,
      label: 'INTENTGUARD',
      role: 'Semantic Boundary Enforcement',
      desc: 'Monitors user goals, prevents subtle cart drift, ensures products match authentic needs.',
      icon: Sparkles,
      color: '#34D399',
    },
    {
      id: 'threat' as const,
      label: 'THREATGUARD',
      role: 'Attack Chain Correlation',
      desc: 'Correlates distributed probes across sessions and blocks high-risk vectors before exploit.',
      icon: AlertOctagon,
      color: '#F87171',
    },
    {
      id: 'tamper' as const,
      label: 'TAMPERGUARD',
      role: 'Client & Execution Integrity',
      desc: 'Detects in-memory DOM price changes and invalidates forged transactions via server authority.',
      icon: Terminal,
      color: '#FBBF24',
    },
    {
      id: 'heal' as const,
      label: 'HEALGUARD',
      role: 'Autonomous Self-Healing',
      desc: 'Synthesizes verified AST patches for runtime failures with a 420ms canary rollback guarantee.',
      icon: Wrench,
      color: '#60A5FA',
    },
  ];

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              DEFENSE CORE · 14
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            THE FOUR PILLARS <br />
            <span className="italic font-light text-white/80">OF AEGIS CORE.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            The heart of the system is the AEGIS Defense Core, coordinating semantic intent analysis,
            client integrity verification, anomaly detection, and autonomous error recovery.
          </p>
        </div>

        {/* 3D / 2.5D Nexus Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive 3D Obsidian Core */}
          <div className="lg:col-span-7 relative aspect-square max-h-[520px] rounded-3xl bg-black/50 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Live Three.js Core */}
            <div className="absolute inset-0">
              <AegisCore />
            </div>

            <div className="absolute top-6 left-6 font-mono text-[11px] text-white/50 z-10 flex items-center gap-2 bg-[#050607]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] animate-pulse" />
              <span>AEGIS DEFENSE CORE NUCLEUS</span>
            </div>
          </div>

          {/* Right: The 4 Connected Defensive Engines */}
          <div className="lg:col-span-5 space-y-4">
            {rings.map((ring) => {
              const Icon = ring.icon;
              const isSelected = activeRing === ring.id;

              return (
                <div
                  key={ring.id}
                  onClick={() => {
                    aegisAudio.playClick();
                    setActiveRing(ring.id);
                  }}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-white/[0.06] to-transparent border-white/30 shadow-xl translate-x-2'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${ring.color}20`, color: ring.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                          {ring.label}
                        </h4>
                        <span className="text-[10px] font-mono text-white/40 block">
                          {ring.role}
                        </span>
                      </div>
                    </div>

                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ring.color }}
                    />
                  </div>

                  <p className="text-xs text-white/60 font-mono mt-3 leading-relaxed">
                    {ring.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
