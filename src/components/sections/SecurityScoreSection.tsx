import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { GlassPanel } from '../ui/GlassPanel';
import { LiveEventStream } from './LiveEventStream';
import { useAegis } from '../../context/AegisContext';
import { ShieldCheck, BarChart3, Lock, Cpu, RotateCcw } from 'lucide-react';

export const SecurityScoreSection: React.FC = () => {
  const { securityScore } = useAegis();

  const metrics = [
    { label: 'INTENT SAFETY', score: securityScore.intentSafety, desc: 'Human goal alignment tolerance' },
    { label: 'APPLICATION SECURITY', score: securityScore.applicationSecurity, desc: 'Threat chain interception' },
    { label: 'CLIENT INTEGRITY', score: securityScore.clientIntegrity, desc: 'Zero-trust DOM state protection' },
    { label: 'RECOVERY READINESS', score: securityScore.recoveryReadiness, desc: 'AST self-healing & rollback SLA' },
  ];

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionLabel label="INTEGRITY METRICS" category="05" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-tight mb-6">
            AEGIS PROTECTION <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D71920]">
              CONFIDENCE SCORE.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8D9096] font-light leading-relaxed">
            Composite posture calculated continuously across all 4 defensive layers.
          </p>
        </div>

        {/* Dual Grid: Big Protection Score Gauge + Live Event Stream */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Overall Score + Breakdown (7 cols) */}
          <GlassPanel className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between border-white/[0.08] bg-black/60 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D71920]" />
                  <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-medium">
                    AEGIS PROTECTION SCORE
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  OPTIMAL POSTURE
                </span>
              </div>

              {/* Central Big Score Display */}
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
                <div className="relative flex items-center justify-center w-36 h-36 rounded-full border border-white/[0.1] bg-black/80 shadow-[0_0_40px_rgba(215,25,32,0.25)]">
                  <div className="text-6xl font-light font-mono text-white tracking-tight">
                    {securityScore.overall}
                  </div>
                  <div className="absolute inset-2 rounded-full border-2 border-[#D71920]/40 border-t-[#D71920] animate-spin-slow" />
                </div>

                <div className="flex-1 text-left">
                  <h4 className="text-xl font-light text-white mb-2">
                    Verified Defense Enclave
                  </h4>
                  <p className="text-xs font-mono text-[#8D9096] leading-relaxed">
                    Zero anomalous drift vectors detected. All 4 layers report synchronized state consensus.
                  </p>
                </div>
              </div>

              {/* 4 Score Breakdown Bars */}
              <div className="space-y-4">
                {metrics.map((m) => (
                  <div key={m.label} className="space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80">{m.label}</span>
                      <span className="text-[#D71920] font-bold">{m.score}/100</span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-white/60 to-[#D71920] rounded-full transition-all duration-1000"
                        style={{ width: `${m.score}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-white/40">
                      {m.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#8D9096]">
              <span>SAMPLE INTERVAL: 1,000ms</span>
              <span className="text-white font-medium">CRYPTOGRAPHICALLY SIGNED</span>
            </div>
          </GlassPanel>

          {/* Right: Live Event Stream (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <LiveEventStream />
          </div>

        </div>

      </div>
    </section>
  );
};
