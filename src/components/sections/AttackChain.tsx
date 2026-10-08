import React from 'react';
import { attackChainStages } from '../../data/demoThreats';
import { ArrowRight, ShieldCheck, AlertOctagon } from 'lucide-react';

export const AttackChain: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-[#D71920]" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-medium">
            CORRELATED ATTACK CHAIN / ZERO-DAY PROGRESSION
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#8D9096]">SEVERITY:</span>
          <span className="text-xs font-mono text-[#D71920] bg-[#D71920]/15 px-2 py-0.5 rounded border border-[#D71920]/40 font-bold">
            CRITICAL
          </span>
        </div>
      </div>

      {/* Horizontal Flow for the 4 Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {attackChainStages.map((stage, idx) => (
          <div key={stage.id} className="relative flex flex-col">
            <div className="p-5 rounded-xl bg-black/60 border border-[#D71920]/30 hover:border-[#D71920] transition-colors relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#D71920] font-bold">
                  STAGE 0{stage.id}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" />
              </div>

              <h4 className="text-xs font-mono font-medium text-white tracking-wider uppercase mb-1">
                {stage.title}
              </h4>

              <p className="text-[11px] font-mono text-[#8D9096] leading-relaxed">
                {stage.desc}
              </p>
            </div>

            {/* Connecting Arrow for desktop */}
            {idx < attackChainStages.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#D71920]">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-[#D71920]/[0.08] border border-[#D71920]/30 text-xs font-mono">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="w-4 h-4 text-[#D71920]" />
          <span>AUTONOMOUS MITIGATION: Token revoked & IP quashed in 18ms before payload extraction.</span>
        </div>
        <span className="text-emerald-400 font-medium">CHAIN TERMINATED</span>
      </div>
    </div>
  );
};
