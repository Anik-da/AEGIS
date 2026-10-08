import React, { useState } from 'react';
import { Cpu, DollarSign, Database, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const IntentUnderstandingSection: React.FC = () => {
  const { userIntent, setUserIntent } = useCommerce();
  const [customInput, setCustomInput] = useState(userIntent.rawQuery);
  const [isParsing, setIsParsing] = useState(false);

  const samplePrompts = [
    "I need a laptop under ₹80,000, minimum 32GB RAM, mainly for AI/ML.",
    "Looking for reference audio headphones under ₹30,000 with planar magnetic drivers.",
    "Need a 4K camera under ₹1,20,000 with dual CFexpress card slots for cinema."
  ];

  const handleSelectSample = (prompt: string) => {
    aegisAudio.playClick();
    setCustomInput(prompt);
    setIsParsing(true);

    setTimeout(() => {
      aegisAudio.playVerify();
      setIsParsing(false);
      if (prompt.includes('laptop')) {
        setUserIntent({
          rawQuery: prompt,
          budgetMax: 80000,
          currency: '₹',
          minRam: 32,
          primaryUse: 'AI / ML Tensor Computation',
          extractedTags: [
            { label: 'BUDGET', value: '≤ ₹80K MAX', isSatisfied: true },
            { label: 'RAM', value: '32GB+ MIN', isSatisfied: true },
            { label: 'USE', value: 'AI / ML ACCELERATION', isSatisfied: true },
          ],
          activeDriftPercent: 0,
        });
      } else if (prompt.includes('audio')) {
        setUserIntent({
          rawQuery: prompt,
          budgetMax: 30000,
          currency: '₹',
          minRam: 0,
          primaryUse: 'Studio Mastering / Acoustic Precision',
          extractedTags: [
            { label: 'BUDGET', value: '≤ ₹30K MAX', isSatisfied: true },
            { label: 'DRIVER', value: 'PLANAR MAGNETIC', isSatisfied: true },
            { label: 'USE', value: 'LOSSLESS STUDIO MONITORING', isSatisfied: true },
          ],
          activeDriftPercent: 0,
        });
      } else {
        setUserIntent({
          rawQuery: prompt,
          budgetMax: 120000,
          currency: '₹',
          minRam: 0,
          primaryUse: 'Cinema Production',
          extractedTags: [
            { label: 'BUDGET', value: '≤ ₹1.2L MAX', isSatisfied: true },
            { label: 'STORAGE', value: 'DUAL CFEXPRESS', isSatisfied: true },
            { label: 'USE', value: '8K PRORES RAW CINEMA', isSatisfied: true },
          ],
          activeDriftPercent: 0,
        });
      }
    }, 600);
  };

  return (
    <section id="intent-intelligence" className="relative w-full py-28 px-6 md:px-12 bg-[#08090B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              INTENT LAYER · 03
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            NOT JUST WHAT YOU CLICK. <br />
            <span className="italic font-light text-white/80">WHAT YOU MEAN.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Conventional stores track clicks and shove high-margin recommendations into your path.
            AEGIS extracts the exact semantic intent of your mission, establishing an immutable baseline
            that guides and protects your session.
          </p>
        </div>

        {/* Interactive Shopping Simulation Container */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D71920]/[0.05] rounded-full blur-3xl pointer-events-none" />

          {/* Top Simulation Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#D71920]/10 border border-[#D71920]/30 text-[#D71920]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-widest text-white uppercase font-semibold">
                  NATURAL INTENT INGESTION SIMULATOR
                </h3>
                <p className="text-[11px] font-mono text-white/40">
                  Real-time semantic constraint extraction · Zero chatbot gimmicks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              INTENT BUFFER: ARMED
            </div>
          </div>

          {/* Prompt Selection and Input */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Query Surface */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <label className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
                USER DECLARED NEED / INGESTION STREAM
              </label>

              <div className="relative">
                <div className="w-full rounded-2xl bg-black/60 border border-white/15 p-5 text-white/90 font-mono text-sm leading-relaxed min-h-[90px] flex items-center">
                  {isParsing ? (
                    <div className="flex items-center gap-3 text-white/60">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#D71920]" />
                      <span>Extracting multidimensional constraints...</span>
                    </div>
                  ) : (
                    <span>"{customInput}"</span>
                  )}
                </div>
              </div>

              {/* Preset Sample Queries */}
              <div>
                <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2">
                  TRY INTERACTIVE BENCHMARKS:
                </p>
                <div className="flex flex-col gap-2">
                  {samplePrompts.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSelectSample(prompt)}
                      className={`text-left p-3 rounded-xl border text-xs font-mono tracking-wide transition-all ${
                        customInput === prompt
                          ? 'border-[#D71920]/60 bg-[#D71920]/10 text-white'
                          : 'border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      → "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Extracted AEGIS Constraint Layer */}
            <div className="lg:col-span-5 rounded-2xl bg-[#050607]/90 border border-white/15 p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-4 mb-5">
                <span className="text-[10px] font-mono tracking-[0.24em] text-[#D71920] uppercase font-semibold">
                  AEGIS INTENT MATRIX
                </span>
                <span className="text-[10px] font-mono text-white/40">3 ACTIVE CONSTRAINTS</span>
              </div>

              <div className="space-y-4">
                {/* Constraint 1: Budget */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-white/[0.06] text-white">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                        EXPLICIT BUDGET
                      </span>
                      <span className="text-base font-mono font-medium text-white">
                        ₹80K MAX
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Constraint 2: RAM */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-white/[0.06] text-white">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                        MEMORY FLOOR
                      </span>
                      <span className="text-base font-mono font-medium text-white">
                        32GB+ RAM
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Constraint 3: Primary Use */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-white/[0.06] text-white">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                        PRIMARY WORKLOAD
                      </span>
                      <span className="text-base font-mono font-medium text-white">
                        AI / ML WORKSTATION
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* Bottom Verification Note */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-white/50 leading-relaxed">
                ✓ Locked into browser session enclave. AEGIS will silently verify all browsed specifications
                and cart totals against this active matrix.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
