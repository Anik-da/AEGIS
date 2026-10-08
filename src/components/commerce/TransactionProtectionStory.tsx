import React from 'react';
import { User, MousePointerClick, ShieldCheck, CheckCircle2, LockKeyhole } from 'lucide-react';

export const TransactionProtectionStory: React.FC = () => {
  const steps = [
    {
      label: 'USER',
      sublabel: 'Verified Intent',
      icon: User,
      detail: 'Declares authentic goal & budget boundary',
    },
    {
      label: 'ACTION',
      sublabel: 'Interaction Stream',
      icon: MousePointerClick,
      detail: 'Add to cart, spec selection, checkout event',
    },
    {
      label: 'AEGIS',
      sublabel: 'Autonomous Guardian',
      icon: ShieldCheck,
      detail: 'Continuous state & boundary validation',
      accent: true,
    },
    {
      label: 'VERIFICATION',
      sublabel: 'Cryptographic Check',
      icon: LockKeyhole,
      detail: 'Server-side price, signature & auth checks',
    },
    {
      label: 'SAFE TRANSACTION',
      sublabel: 'Settled Order',
      icon: CheckCircle2,
      detail: 'Zero-fraud execution with full user control',
    },
  ];

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#08090B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              ARCHITECTURE OF TRUST · 09
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            EVERY ACTION <br />
            <span className="italic font-light text-white/80">HAS A GUARDIAN.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Behind the minimal typography and effortless purchasing lives a defensive protocol
            that validates every click, prevents price tampering, and guarantees transaction authenticity.
          </p>
        </div>

        {/* Cinematic Pipeline Visualization */}
        <div className="relative">
          {/* Subtle connecting rail */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-white/10 via-[#D71920]/40 to-white/10 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.label}
                  className={`rounded-2xl p-6 border flex flex-col items-center text-center justify-between transition-all duration-300 ${
                    step.accent
                      ? 'bg-gradient-to-b from-[#D71920]/[0.12] to-transparent border-[#D71920]/40 shadow-xl'
                      : 'bg-white/[0.02] border-white/[0.08]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 text-white">
                    <Icon className={`w-5 h-5 ${step.accent ? 'text-[#D71920]' : 'text-white/80'}`} />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-white block mb-1">
                      {step.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#D71920] uppercase tracking-wider block mb-3">
                      {step.sublabel}
                    </span>
                    <p className="text-xs text-white/50 font-light leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  <div className="w-full pt-4 mt-4 border-t border-white/[0.06] text-[10px] font-mono text-white/30">
                    STAGE 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
