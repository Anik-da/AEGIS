import React from 'react';
import { pipelineSteps } from '../../data/demoRepairs';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SelfHealingPipeline: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-medium">
            SAFETY-GATED AUTONOMOUS REPAIR PIPELINE
          </span>
          <span className="text-[11px] font-mono text-[#8D9096] block mt-0.5">
            Zero blind commits: every candidate patch must satisfy 10 discrete safety gates before canary rollout.
          </span>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 font-medium">
          DETERMINISTIC
        </span>
      </div>

      {/* Horizontal Pipeline Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 items-center">
        {pipelineSteps.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col">
            <div className={`p-3 rounded-xl border text-center transition-all ${
              step.id === '10'
                ? 'bg-[#D71920]/[0.05] border-[#D71920]/30 hover:border-[#D71920]'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
            }`}>
              <div className="flex items-center justify-center mb-1.5">
                {step.id === '10' ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-[#D71920]" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <div className="text-[10px] font-mono font-bold text-white tracking-wider">
                {step.label}
              </div>
              <div className="text-[9px] font-mono text-[#8D9096] mt-0.5">
                {step.sublabel}
              </div>
            </div>

            {/* Connecting dot for desktop */}
            {idx < pipelineSteps.length - 1 && (
              <div className="hidden lg:block absolute -right-1 top-1/2 -translate-y-1/2 z-10 text-white/20 text-[10px]">
                ›
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
