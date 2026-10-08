import React from 'react';
import { Wrench, CheckCircle2, ShieldCheck, Play, RefreshCw } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const HealGuardStory: React.FC = () => {
  const { healingActive, healingStep, triggerHealSimulation } = useCommerce();

  const pipeline = [
    { num: '01', title: 'ERROR DETECTED', detail: 'Unhandled runtime discrepancy on checkout calculation' },
    { num: '02', title: 'ROOT CAUSE ANALYSIS', detail: 'AST pinpointed null pointer on coupon discount operand' },
    { num: '03', title: 'PATCH GENERATED', detail: 'Defensive semantic wrapper synthesized with type bounds' },
    { num: '04', title: 'SANDBOX TEST', detail: 'Isolated sandbox container verifies operational compute' },
    { num: '05', title: 'SECURITY TEST', detail: 'Zero regression / zero privilege escalation verified' },
    { num: '06', title: 'REGRESSION TEST', detail: '100% past test suite parity confirmed (34/34 passes)' },
    { num: '07', title: 'PATCH VERIFIED & RESTORED', detail: 'Production hot-swap deployed with sub-400ms canary' }
  ];

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              AUTONOMOUS HEALING · 12
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            WHEN THE SYSTEM <br />
            <span className="italic font-light text-white/80">BREAKS.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Software failures in production cost millions in abandoned checkouts.
            Instead of crashing for hours, AEGIS analyzes the crash, synthesizes a candidate fix,
            tests it against strict safety gates, and restores normal commerce operation autonomously.
          </p>
        </div>

        {/* Cinematic Pipeline Stage */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 md:p-12 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/[0.06] text-white">
                <Wrench className="w-4 h-4 text-[#D71920]" />
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-wider uppercase text-white font-semibold">
                  HEALGUARD 7-STAGE RESILIENCE PIPELINE
                </h3>
                <span className="text-[11px] font-mono text-white/40">Zero-downtime hot-patching architecture</span>
              </div>
            </div>

            <button
              onClick={triggerHealSimulation}
              disabled={healingActive && healingStep < 7}
              className="px-5 py-2.5 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {healingActive && healingStep < 7 ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D71920]" />
                  <span>EXECUTING REPAIR...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>SIMULATE SYSTEM HEAL</span>
                </>
              )}
            </button>
          </div>

          {/* Sequential Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipeline.map((step, idx) => {
              const isCurrent = healingActive && healingStep === idx + 1;
              const isPassed = healingActive ? healingStep > idx + 1 : idx === 6;

              return (
                <div
                  key={step.num}
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.3)]'
                      : isPassed
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-black/40 border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 font-mono text-xs">
                    <span className="text-white/40">{step.num}</span>
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    )}
                  </div>

                  <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-1">
                    {step.title}
                  </h4>
                  <p className="font-mono text-[11px] text-white/50 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Statement */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-white/50 gap-4">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>420ms CANARY REGRESSION ROLLBACK GUARANTEE</span>
            </span>
            <span className="text-white/30 uppercase tracking-widest">
              CONTINUOUS COMMERCE RESILIENCE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
