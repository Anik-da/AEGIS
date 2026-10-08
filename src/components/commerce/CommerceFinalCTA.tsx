import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CommerceFinalCTA: React.FC = () => {
  const { setCurrentView, setControlCenterOpen } = useCommerce();

  const handleStartShopping = () => {
    aegisAudio.playClick();
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreAegis = () => {
    aegisAudio.playVerify();
    setControlCenterOpen(true);
  };

  return (
    <section className="relative w-full py-36 px-6 md:px-12 bg-gradient-to-b from-[#050607] via-[#090A0D] to-[#050607] border-t border-white/[0.06] text-center overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D71920]/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Top Status */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.09] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] shadow-[0_0_8px_#D71920] animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.28em] text-white/70 uppercase">
            ● AEGIS PROTECTED COMMERCE
          </span>
        </div>

        {/* Hero Editorial Display Header */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.92] mb-6">
          SHOP WITH INTENT. <br />
          <span className="italic font-light text-white/80">LIVE WITH CONFIDENCE.</span>
        </h2>

        {/* Small Supporting Text */}
        <p className="text-base sm:text-lg text-white/60 font-light max-w-lg mb-10 leading-relaxed">
          AI-powered commerce with intelligent protection built into every action.
          Your intent is respected. Your checkout is secured.
        </p>

        {/* Dual Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleStartShopping}
            className="px-9 py-4 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white/90 transition-all shadow-[0_0_35px_rgba(255,255,255,0.2)] flex items-center gap-3 cursor-pointer"
          >
            <span>START SHOPPING</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleExploreAegis}
            className="px-7 py-4 rounded-full bg-white/[0.04] border border-white/[0.12] text-white/80 font-mono text-xs tracking-[0.18em] uppercase hover:bg-white/[0.08] hover:text-white transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#D71920]" />
            <span>EXPLORE AEGIS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
