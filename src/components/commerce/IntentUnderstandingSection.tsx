import React, { useState, useEffect } from 'react';
import { Cpu, DollarSign, Database, CheckCircle2, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const IntentUnderstandingSection: React.FC = () => {
  const { userIntent, setUserIntent } = useCommerce();
  const [activeStage, setActiveStage] = useState<'prompt' | 'crystallizing' | 'structured'>('structured');
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const fullPrompt = "I need a laptop under ₹80,000, minimum 32GB RAM, mainly for AI/ML.";

  // Typewriter Loop when prompted
  useEffect(() => {
    if (activeStage !== 'prompt') return;
    if (typewriterIndex < fullPrompt.length) {
      const timer = setTimeout(() => {
        setTypewriterIndex(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timer);
    } else {
      // Prompt complete, transition into crystallizing
      const timer = setTimeout(() => {
        setActiveStage('crystallizing');
        aegisAudio.playVerify();
        setTimeout(() => {
          setActiveStage('structured');
        }, 900);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [activeStage, typewriterIndex]);

  const handleRerun = () => {
    aegisAudio.playClick();
    setTypewriterIndex(0);
    setActiveStage('prompt');
  };

  return (
    <section id="intent-layer" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#08090B] border-t border-white/[0.06] overflow-hidden select-none">
      {/* Background Radiance */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#D71920]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
              INTENT RECOGNITION · 02
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
            NOT JUST WHAT YOU CLICK. <br />
            <span className="italic font-light text-white/70">WHAT YOU MEAN.</span>
          </h2>

          <div className="mt-6 flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#D71920]/15 border border-[#D71920]/30 text-[#D71920] font-mono text-[10px] tracking-widest uppercase font-semibold">
              AEGIS INTENTGUARD
            </span>
            <span className="text-xs font-mono text-white/40">
              Autonomous Natural Language Extraction Layer
            </span>
          </div>

          <p className="text-base text-white/50 font-light mt-4 leading-relaxed max-w-2xl">
            Standard commerce records button clicks and guesses what to upsell.
            AEGIS ingests raw intent, extracts hard constraints, and reorganizes the entire catalog around your exact requirement.
          </p>
        </div>

        {/* Cinematic Transformation Container */}
        <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-[#050607] border border-white/10 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D71920]/15 border border-[#D71920]/30 flex items-center justify-center text-[#D71920]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-wider uppercase text-white font-semibold">
                  NATURAL INTENT COMPILER
                </h3>
                <p className="text-[11px] font-mono text-white/40">
                  Compiles unstructured buyer statements into mathematical boundary matrices
                </p>
              </div>
            </div>

            <button
              onClick={handleRerun}
              data-cursor-text="REPLAY"
              className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/12 text-white/80 hover:text-white hover:bg-white/[0.08] transition-all font-mono text-[11px] tracking-wider uppercase flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REPLAY TRANSFORMATION</span>
            </button>
          </div>

          {/* Transformation Stage: Natural Language Input vs Structured Extraction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Natural Language Stream */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] text-white/40 uppercase block mb-3">
                  1. DECLARED INTENT STREAM
                </span>

                <div className="relative min-h-[140px] rounded-2xl bg-black/60 border border-white/15 p-6 flex flex-col justify-center shadow-inner">
                  <div className="flex items-start gap-3">
                    <span className="text-[#D71920] font-mono text-lg font-bold">“</span>
                    <p className="font-mono text-base sm:text-lg text-white/95 leading-relaxed tracking-wide">
                      {activeStage === 'prompt' ? fullPrompt.slice(0, typewriterIndex) : fullPrompt}
                      {activeStage === 'prompt' && (
                        <span className="inline-block w-2 h-5 bg-[#D71920] ml-1 animate-pulse" />
                      )}
                    </p>
                    <span className="text-[#D71920] font-mono text-lg font-bold">”</span>
                  </div>

                  {activeStage === 'crystallizing' && (
                    <div className="absolute inset-0 bg-[#D71920]/10 backdrop-blur-xs flex items-center justify-center rounded-2xl border border-[#D71920]/40 animate-pulse">
                      <span className="font-mono text-xs tracking-widest text-white uppercase font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D71920]" />
                        EXTRACTING CONSTRAINTS VIA GEMMA 4 26B...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-white/40">
                <span>INTENT STATUS: </span>
                <span className="text-emerald-400 font-semibold">AUTHENTICATED & IMMUTABLE</span>
              </div>
            </div>

            {/* Right: Crystallized Structured Constraints */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] text-white/40 uppercase block mb-3">
                  2. EXTRACTED INTENT CONTRACT
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Card 1: Budget */}
                  <div className={`p-5 rounded-2xl border transition-all duration-700 ${
                    activeStage === 'structured'
                      ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/20 shadow-xl'
                      : 'bg-black/40 border-white/[0.08] opacity-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-white">
                        <DollarSign className="w-3.5 h-3.5 text-[#D71920]" />
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">
                      BUDGET
                    </span>
                    <span className="text-lg font-mono font-medium text-white block">
                      ₹80,000 MAX
                    </span>
                    <span className="text-[10px] font-mono text-white/40 mt-1 block">
                      Hard Ceiling Cap
                    </span>
                  </div>

                  {/* Card 2: RAM */}
                  <div className={`p-5 rounded-2xl border transition-all duration-700 delay-100 ${
                    activeStage === 'structured'
                      ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/20 shadow-xl'
                      : 'bg-black/40 border-white/[0.08] opacity-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-white">
                        <Database className="w-3.5 h-3.5 text-[#D71920]" />
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">
                      RAM
                    </span>
                    <span className="text-lg font-mono font-medium text-white block">
                      32GB MIN
                    </span>
                    <span className="text-[10px] font-mono text-white/40 mt-1 block">
                      Hardware Floor
                    </span>
                  </div>

                  {/* Card 3: Purpose */}
                  <div className={`p-5 rounded-2xl border transition-all duration-700 delay-200 ${
                    activeStage === 'structured'
                      ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/20 shadow-xl'
                      : 'bg-black/40 border-white/[0.08] opacity-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-white">
                        <Cpu className="w-3.5 h-3.5 text-[#D71920]" />
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">
                      PURPOSE
                    </span>
                    <span className="text-lg font-mono font-medium text-white block">
                      AI / ML
                    </span>
                    <span className="text-[10px] font-mono text-white/40 mt-1 block">
                      Tensor Acceleration
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
                <span>CONSTRAINTS: 3 LOCKED</span>
                <span className="text-emerald-400 font-semibold">CATALOG REORGANIZED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
