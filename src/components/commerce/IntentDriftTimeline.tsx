import React from 'react';
import { ArrowDown, AlertTriangle, TrendingUp, Compass, Shield } from 'lucide-react';

export const IntentDriftTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      stage: 'ORIGINAL INTENT',
      action: 'Initial User Parameter Stated',
      value: 'Laptop under ₹70,000',
      status: 'BASELINE',
      delta: 'Nominal Reference',
      drift: '100% Match',
      isWarning: false
    },
    {
      num: '02',
      stage: 'VIEWED',
      action: 'Browse candidate specs',
      value: '₹72,000 viewed',
      status: '+₹2,000 (+2.8%)',
      delta: 'Minor drift; within margin',
      drift: '94% Match',
      isWarning: false
    },
    {
      num: '03',
      stage: 'VIEWED',
      action: 'High-tier variant opened',
      value: '₹78,000 viewed',
      status: '+₹8,000 (+11.4%)',
      delta: 'Noticeable upward excursion',
      drift: '78% Match',
      isWarning: false
    },
    {
      num: '04',
      stage: 'ADDED TO CART',
      action: 'Warranty & accessory bundle bundled',
      value: '₹85,000 added',
      status: '+₹15,000 (+21.4%)',
      delta: 'Budget boundary crossed',
      drift: '52% Match',
      isWarning: true
    },
    {
      num: '05',
      stage: 'CHECKOUT ATTEMPT',
      action: 'Final procurement initiated',
      value: '₹92,000 checkout',
      status: '+₹22,000 (+31.4%)',
      delta: 'Critical intent violation',
      drift: '31% Match',
      isWarning: true
    }
  ];

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#08090B] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              BEHAVIORAL DRIFT · 05
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            HOW SHOPPING CARTS <br />
            <span className="italic font-light text-white/80">DRIFT IN SILENCE.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Dark UX patterns, bundled add-ons, and progressive upsells silently push buyers far beyond
            their authentic budget. AEGIS maps the deviation vector across every interaction.
          </p>
        </div>

        {/* Timeline Visualization Grid */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/40 via-amber-500/40 to-[#D71920] -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                  step.isWarning
                    ? 'bg-gradient-to-b from-[#D71920]/[0.08] to-transparent border-[#D71920]/30 shadow-lg'
                    : 'bg-white/[0.02] border-white/[0.08]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-white/40">{step.num}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                        step.isWarning
                          ? 'bg-[#D71920]/20 text-[#FF5A3C]'
                          : 'bg-white/[0.06] text-white/70'
                      }`}
                    >
                      {step.stage}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-white/50 mb-1">{step.action}</p>
                  <p className="text-lg font-mono font-semibold text-white tracking-tight mb-2">
                    {step.value}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40">{step.status}</span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      idx >= 3 ? 'text-[#FF5A3C]' : 'text-emerald-400'
                    }`}
                  >
                    {step.drift}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Explanation Callout Banner */}
        <div className="mt-12 rounded-2xl bg-white/[0.02] border border-[#D71920]/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#D71920]/15 text-[#D71920] shrink-0 mt-1">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                  AEGIS DIAGNOSTIC EXPLANATION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D71920] text-white">
                  31% RESIDUAL INTENT
                </span>
              </div>
              <p className="text-sm font-mono text-white/80 leading-relaxed">
                "Your current cart has progressively moved away from your original budget of ₹70,000 by +₹22,000.
                AEGIS preserves this audit trail so you can approve intentional expansions or reset with one tap."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right font-mono">
              <span className="text-[10px] text-white/40 uppercase block">OVERAGE DELTA</span>
              <span className="text-xl text-[#FF5A3C] font-semibold">+₹22,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
