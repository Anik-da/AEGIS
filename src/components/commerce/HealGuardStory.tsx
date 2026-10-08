import React, { useState } from 'react';
import { Wrench, CheckCircle2, Play, RefreshCw, Sparkles, Terminal } from 'lucide-react';
import { aegisAudio } from '../../utils/audio';

export const HealGuardStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(6); // Default to fully verified & deployed
  const [running, setRunning] = useState(false);

  const pipeline = [
    { title: 'ERROR DETECTED', detail: 'Unhandled exception in checkout tax rounding' },
    { title: 'ROOT CAUSE', detail: 'AST isolates null decimal operand in discount matrix' },
    { title: 'CANDIDATE PATCH', detail: 'Gemma 4 synthesizes defensive type-guarded patch' },
    { title: 'SANDBOX', detail: 'Executed in isolated virtual environment' },
    { title: 'SECURITY TEST', detail: 'Static vulnerability & AST safety scan: 0 alerts' },
    { title: 'VERIFIED', detail: 'Unit test suite: 29/29 tests passed (100%)' },
    { title: 'DEPLOY', detail: 'Promoted to canary release v2.4.2 with sub-second switch' },
  ];

  const handleSimulateHeal = () => {
    aegisAudio.playClick();
    setRunning(true);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < pipeline.length) {
        setActiveStep(current);
        aegisAudio.playVerify();
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 450);
  };

  return (
    <section id="heal-guard" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-[#D71920]">
              AEGIS HEALGUARD · 10
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
            WHEN SOMETHING BREAKS, <br />
            <span className="italic font-light text-white/70">AEGIS DOESN'T JUST ALERT YOU.</span>
          </h2>

          <p className="text-xl sm:text-2xl font-mono text-white/90 mt-4 tracking-wide font-light">
            It investigates.
          </p>

          <p className="text-base text-white/50 font-light mt-4 leading-relaxed max-w-2xl">
            Software exceptions in live checkout flows abandon millions in revenue.
            Instead of waiting hours for an on-call engineer, HealGuard pinpoints the fault, generates a candidate patch, verifies it in an isolated sandbox, and promotes it safely.
          </p>
        </div>

        {/* Cinematic Pipeline Stage */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-[#050607] border border-white/10 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08] flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-white">
                <Wrench className="w-4 h-4 text-[#D71920]" />
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-wider uppercase text-white font-semibold">
                  AUTONOMOUS HEALING RUNTIME
                </h3>
                <p className="text-[11px] font-mono text-white/40">
                  AST Fault Localization $\rightarrow$ Candidate Synthesis $\rightarrow$ Sandboxed Gate
                </p>
              </div>
            </div>

            <button
              onClick={handleSimulateHeal}
              disabled={running}
              data-cursor-text="HEAL"
              className="py-3 px-6 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
            >
              {running ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D71920]" />
                  <span>EXECUTING PIPELINE...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>SIMULATE REPAIR PIPELINE</span>
                </>
              )}
            </button>
          </div>

          {/* 7 Sequential Pipeline Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-10">
            {pipeline.map((step, idx) => {
              const isCurrent = running && activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.3)] scale-102'
                      : isPassed
                      ? 'bg-emerald-500/[0.08] border-emerald-500/25'
                      : 'bg-black/40 border-white/[0.06] opacity-40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-white/40">0{idx + 1}</span>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      )}
                    </div>

                    <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wide mb-1">
                      {step.title}
                    </h4>

                    <p className="text-[10px] font-mono text-white/50 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spared Cinematic Code Fragment (Minimal, Not an IDE) */}
          <div className="rounded-2xl bg-black/80 border border-white/10 p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3 text-[10px] text-white/40">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-white/60" />
                <span>HOT-PATCH CANDIDATE DIFF · demoCheckoutValidator.ts</span>
              </span>
              <span className="text-emerald-400 font-bold">SANDBOX VERIFIED ✓</span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <p className="text-white/40">  function calculateFinalTotal(basePrice: number, discount: number | null): number &#123;</p>
              <p className="text-red-400/80 bg-red-950/20 px-2 rounded">-   return basePrice - discount;</p>
              <p className="text-emerald-400 bg-emerald-950/30 px-2 rounded">+   const safeDiscount = Math.max(0, Math.min(discount ?? 0, basePrice));</p>
              <p className="text-emerald-400 bg-emerald-950/30 px-2 rounded">+   return Math.round(basePrice - safeDiscount);</p>
              <p className="text-white/40">  &#125;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
