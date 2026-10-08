import React, { useState } from 'react';
import { AlertTriangle, Compass, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const IntentDriftTimeline: React.FC = () => {
  const { setCartDrawerOpen, setCurrentView } = useCommerce();
  const [activeStepIndex, setActiveStepIndex] = useState(4); // Default to full drift
  const [dismissed, setDismissed] = useState(false);

  const steps = [
    {
      num: '01',
      stage: 'YOUR INTENT',
      action: 'Baseline Parameter Stated',
      value: '₹80,000 MAX',
      note: 'Nominal reference boundary',
      matchPct: '100% Match',
      isWarning: false,
    },
    {
      num: '02',
      stage: 'VIEWED',
      action: 'AEGIS Pro X1 Examined',
      value: '₹74,999 Viewed',
      note: 'Within initial boundary (-₹5,001)',
      matchPct: '94% Match',
      isWarning: false,
    },
    {
      num: '03',
      stage: 'COMPARED',
      action: 'Tensor Titan 16 Inspected',
      value: '₹79,999 Compared',
      note: 'Nominal boundary ceiling reached',
      matchPct: '92% Match',
      isWarning: false,
    },
    {
      num: '04',
      stage: 'ADDED',
      action: 'High-Tier Chassis Added',
      value: '₹84,999 Added',
      note: 'Initial budget exceeded by ₹4,999',
      matchPct: '71% Match',
      isWarning: true,
    },
    {
      num: '05',
      stage: 'WARRANTY',
      action: '3-Year Premium Shield Bundled',
      value: '₹7,999 Warranty',
      note: 'Cumulative overage rises',
      matchPct: '54% Match',
      isWarning: true,
    },
    {
      num: '06',
      stage: 'CURRENT CART',
      action: 'Final Cart Total Evaluated',
      value: '₹92,998 Current Cart',
      note: 'Exceeds original intent by ₹12,998',
      matchPct: '42% Match',
      isWarning: true,
    },
  ];

  const handleReviewCart = () => {
    aegisAudio.playClick();
    setCartDrawerOpen(true);
  };

  const handleContinueAnyway = () => {
    aegisAudio.playVerify();
    setDismissed(true);
    setCurrentView('checkout');
  };

  return (
    <section id="intent-drift" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#08090B] border-t border-white/[0.06] overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#D71920]/[0.05] rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
              SIGNATURE BEHAVIORAL INTELLIGENCE · 04
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
            HOW INTENT <br />
            <span className="italic font-light text-white/70">SLOWLY DRIFTS.</span>
          </h2>

          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Dark patterns and upselling nudges quietly pull buyers far beyond their original budget.
            AEGIS maps the drift progression across your session without blocking you, providing total clarity over every divergence.
          </p>
        </div>

        {/* Interactive Scrubbing Slider Control */}
        <div className="mb-8 flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex-wrap gap-4">
          <span className="text-xs font-mono text-white/60 tracking-wider uppercase">
            SCRUB USER JOURNEY TIMELINE:
          </span>
          <div className="flex items-center gap-2">
            {steps.map((st, sIdx) => (
              <button
                key={st.num}
                onClick={() => {
                  aegisAudio.playClick();
                  setActiveStepIndex(sIdx);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                  activeStepIndex === sIdx
                    ? 'bg-[#D71920] text-white font-bold shadow-lg'
                    : 'bg-white/[0.04] text-white/40 hover:text-white'
                }`}
              >
                {st.stage}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Step Cinematic Timeline Flow */}
        <div className="relative mb-12">
          {/* Glowing Connecting Track */}
          <div className="hidden xl:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/30 via-amber-500/30 to-[#D71920]/80 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isActive = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-500 cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-b from-[#D71920]/[0.15] via-white/[0.04] to-[#050607] border-[#D71920] shadow-[0_15px_35px_rgba(215,25,32,0.3)] scale-102'
                      : isActive
                      ? 'bg-white/[0.03] border-white/15'
                      : 'bg-black/40 border-white/[0.06] opacity-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-white/40">{step.num}</span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                          step.isWarning
                            ? 'bg-[#D71920]/20 text-[#FF5A3C]'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {step.stage}
                      </span>
                    </div>

                    <p className="text-[10px] font-mono text-white/40 uppercase mb-1">{step.action}</p>
                    <p className="text-base font-mono font-semibold text-white tracking-tight mb-2">
                      {step.value}
                    </p>
                    <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                      {step.note}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.07] mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40">MATCH</span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        step.isWarning ? 'text-[#FF5A3C]' : 'text-emerald-400'
                      }`}
                    >
                      {step.matchPct}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTENT DRIFT DETECTED Signature Alert Banner */}
        <div className="rounded-3xl bg-gradient-to-b from-[#D71920]/[0.14] via-[#090A0D] to-[#050607] border-2 border-[#D71920]/50 p-8 sm:p-10 shadow-[0_30px_70px_rgba(215,25,32,0.25)] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#D71920]/20 border border-[#D71920]/40 text-[#D71920] flex items-center justify-center shrink-0 mt-1 shadow-[0_0_20px_rgba(215,25,32,0.4)]">
              <AlertTriangle className="w-6 h-6 text-[#FF5A3C]" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5A3C] font-bold">
                  ● INTENT DRIFT DETECTED
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D71920]/20 border border-[#D71920]/40 text-xs font-mono font-bold text-white">
                  OVERAGE: +₹12,998
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-normal uppercase text-white tracking-tight mb-2">
                CURRENT CART EXCEEDS ORIGINAL INTENT BY: <span className="font-mono font-bold text-[#FF5A3C]">₹12,998</span>
              </h3>

              <p className="text-xs sm:text-sm font-mono text-white/70 max-w-2xl leading-relaxed mt-2">
                Original budget was stated at <strong className="text-white">₹80,000 MAX</strong>.
                Adding the high-tier variant (₹84,999) and 3-Year Protection Warranty (₹7,999) brought your total to <strong className="text-white">₹92,998</strong>.
                AEGIS never restricts your decisions — you remain in total control.
              </p>
            </div>
          </div>

          {/* Action Decision Buttons */}
          <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
            <button
              onClick={handleReviewCart}
              data-cursor-text="CART"
              className="flex-1 lg:flex-none py-4 px-8 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all text-center cursor-pointer shadow-xl"
            >
              REVIEW CART
            </button>

            <button
              onClick={handleContinueAnyway}
              data-cursor-text="PROCEED"
              className="flex-1 lg:flex-none py-4 px-8 rounded-full bg-white/[0.06] border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:bg-white/[0.12] hover:border-white/40 transition-all text-center cursor-pointer"
            >
              CONTINUE ANYWAY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
