import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { GlassPanel } from '../ui/GlassPanel';
import { ReasoningPanel } from './ReasoningPanel';
import { useAegis } from '../../context/AegisContext';
import type { DefenseLayerType } from '../../types';
import { aegisAudio } from '../../utils/audio';
import { Shield, Compass, ShieldAlert, Cpu, RefreshCw, ArrowUpRight } from 'lucide-react';

export const DefenseCoreSection: React.FC = () => {
  const { activeLayer, setActiveLayer } = useAegis();
  const [selectedNode, setSelectedNode] = useState<DefenseLayerType>('intent');

  const nodes = [
    {
      id: 'intent' as DefenseLayerType,
      title: 'INTENT',
      sub: 'INTENTGUARD',
      desc: 'Enforces human goals and mathematical bounds prior to automated execution.',
      icon: <Compass className="w-5 h-5" />,
      pos: 'top-left',
      coords: 'left-[10%] top-[15%]',
      anchor: '#intent',
    },
    {
      id: 'threat' as DefenseLayerType,
      title: 'THREAT',
      sub: 'THREATGUARD',
      desc: 'Correlates multi-stage attack chains across authentication and RPC layers.',
      icon: <ShieldAlert className="w-5 h-5" />,
      pos: 'top-right',
      coords: 'right-[10%] top-[15%]',
      anchor: '#threats',
    },
    {
      id: 'tamper' as DefenseLayerType,
      title: 'TAMPER',
      sub: 'TAMPERGUARD',
      desc: 'Detects client-side manipulation and enforces strict server-side zero-trust gates.',
      icon: <Cpu className="w-5 h-5" />,
      pos: 'bottom-left',
      coords: 'left-[10%] bottom-[15%]',
      anchor: '#tamper',
    },
    {
      id: 'heal' as DefenseLayerType,
      title: 'HEAL',
      sub: 'HEALGUARD',
      desc: 'Autonomous AST patch synthesis, regression testing, and instant rollback.',
      icon: <RefreshCw className="w-5 h-5" />,
      pos: 'bottom-right',
      coords: 'right-[10%] bottom-[15%]',
      anchor: '#heal',
    },
  ];

  const handleNodeHover = (id: DefenseLayerType) => {
    setSelectedNode(id);
    setActiveLayer(id);
    aegisAudio.playCoreHum();
  };

  const activeNodeInfo = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      {/* Background Aura */}
      <div className="absolute inset-0 bg-radial from-[#D71920]/[0.05] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionLabel label="THE DEFENSE CORE" category="AEGIS CENTRAL" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-tight mb-6">
            THE ARCHITECTURE <br />
            OF AUTONOMOUS <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D71920]">
              PROTECTION.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8D9096] font-light leading-relaxed">
            The AEGIS Defense Core acts as the unified cryptographic brain. It receives telemetry from all four layers, running simultaneous correlation to maintain whole-system integrity.
          </p>
        </div>

        {/* 2.5D Interactive Centerpiece Hub */}
        <div className="w-full relative min-h-[580px] flex items-center justify-center p-4 sm:p-8 rounded-3xl bg-black/60 border border-white/[0.08] shadow-2xl overflow-hidden mb-16">
          
          {/* Orbital connection circles */}
          <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-white/[0.04] pointer-events-none" />
          <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-[#D71920]/[0.15] pointer-events-none animate-pulse" />

          {/* SVG Animated Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-[#D71920]/40">
            <line x1="25%" y1="25%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
            <line x1="75%" y1="25%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
            <line x1="25%" y1="75%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
            <line x1="75%" y1="75%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
          </svg>

          {/* Central Nucleus Node */}
          <div className="relative z-20 flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-[#150304] to-[#090A0C] border-2 border-[#D71920] shadow-[0_0_50px_rgba(215,25,32,0.4)] select-none">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#D71920] mb-1" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-white">
              AEGIS AI
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#8D9096] uppercase">
              DEFENSE CORE
            </span>
          </div>

          {/* 4 Surrounding Satellite Nodes (Responsive Grid / Coordinates) */}
          <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between pointer-events-none">
            {/* Top row */}
            <div className="flex justify-between w-full">
              {/* INTENT */}
              <button
                onMouseEnter={() => handleNodeHover('intent')}
                onClick={() => handleNodeHover('intent')}
                className={`pointer-events-auto p-4 sm:p-5 rounded-2xl border transition-all text-left max-w-[240px] cursor-pointer ${
                  selectedNode === 'intent'
                    ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_30px_rgba(215,25,32,0.3)] scale-105'
                    : 'bg-black/80 border-white/10 hover:border-white/30 opacity-70'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-[#D71920]">
                  <Compass className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white">
                    01 / INTENT
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8D9096] hidden sm:block">
                  Mathematical intention boundary modeling.
                </div>
              </button>

              {/* THREAT */}
              <button
                onMouseEnter={() => handleNodeHover('threat')}
                onClick={() => handleNodeHover('threat')}
                className={`pointer-events-auto p-4 sm:p-5 rounded-2xl border transition-all text-right max-w-[240px] cursor-pointer ${
                  selectedNode === 'threat'
                    ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_30px_rgba(215,25,32,0.3)] scale-105'
                    : 'bg-black/80 border-white/10 hover:border-white/30 opacity-70'
                }`}
              >
                <div className="flex items-center justify-end gap-2 mb-1 text-[#D71920]">
                  <span className="text-xs font-mono font-bold tracking-wider text-white">
                    02 / THREAT
                  </span>
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-mono text-[#8D9096] hidden sm:block">
                  Correlated attack chain interception.
                </div>
              </button>
            </div>

            {/* Bottom row */}
            <div className="flex justify-between w-full">
              {/* TAMPER */}
              <button
                onMouseEnter={() => handleNodeHover('tamper')}
                onClick={() => handleNodeHover('tamper')}
                className={`pointer-events-auto p-4 sm:p-5 rounded-2xl border transition-all text-left max-w-[240px] cursor-pointer ${
                  selectedNode === 'tamper'
                    ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_30px_rgba(215,25,32,0.3)] scale-105'
                    : 'bg-black/80 border-white/10 hover:border-white/30 opacity-70'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-[#D71920]">
                  <Cpu className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white">
                    03 / TAMPER
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8D9096] hidden sm:block">
                  Untrusted browser DOM & build enforcement.
                </div>
              </button>

              {/* HEAL */}
              <button
                onMouseEnter={() => handleNodeHover('heal')}
                onClick={() => handleNodeHover('heal')}
                className={`pointer-events-auto p-4 sm:p-5 rounded-2xl border transition-all text-right max-w-[240px] cursor-pointer ${
                  selectedNode === 'heal'
                    ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_30px_rgba(215,25,32,0.3)] scale-105'
                    : 'bg-black/80 border-white/10 hover:border-white/30 opacity-70'
                }`}
              >
                <div className="flex items-center justify-end gap-2 mb-1 text-[#D71920]">
                  <span className="text-xs font-mono font-bold tracking-wider text-white">
                    04 / HEAL
                  </span>
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-mono text-[#8D9096] hidden sm:block">
                  AST patch synthesis & automated revert.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Layer Detailed Telemetry Preview */}
        <div className="w-full mb-16">
          <GlassPanel className="p-6 bg-black/60 border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D71920]/15 border border-[#D71920]/40 flex items-center justify-center text-[#D71920]">
                {activeNodeInfo.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold text-white">
                    {activeNodeInfo.sub}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded border border-emerald-500/30">
                    ACTIVE TELEMETRY
                  </span>
                </div>
                <p className="text-xs font-mono text-[#8D9096] mt-1">
                  {activeNodeInfo.desc}
                </p>
              </div>
            </div>

            <a
              href={activeNodeInfo.anchor}
              className="px-4 py-2 rounded-lg text-xs font-mono tracking-wider bg-white/[0.04] border border-white/10 hover:border-[#D71920] text-white flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>INSPECT {activeNodeInfo.title}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D71920]" />
            </a>
          </GlassPanel>
        </div>

        {/* Section 19: AI Reasoning Panel */}
        <div className="w-full">
          <ReasoningPanel />
        </div>

      </div>
    </section>
  );
};
