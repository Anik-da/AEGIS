import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { AegisCore } from '../hero/AegisCore';
import { aegisAudio } from '../../utils/audio';

export const CommerceFinalCTA: React.FC = () => {
  const { setCurrentView } = useCommerce();

  const handleExplore = () => {
    aegisAudio.playClick();
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center py-24 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] text-center overflow-hidden select-none">
      {/* 3D Aegis Core Slowly Appearing Behind the Typography */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center">
        <AegisCore size="large" />
      </div>

      {/* Radial Vignette */}
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-[#050607]/70 to-[#050607] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D71920]/[0.06] rounded-full blur-[150px] pointer-events-none" />

      {/* Top Subtle Status */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.09] shadow-2xl backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] shadow-[0_0_8px_#D71920] animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.28em] text-white/70 uppercase">
            ● THE INVISIBLE SHIELD
          </span>
        </div>
      </div>

      {/* Centerpiece Typography & CTA */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center my-auto py-10">
        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.9] mb-8">
          SHOP WITH <br />
          <span className="italic font-light text-white/70">CONFIDENCE.</span>
        </h2>

        {/* 4 Supporting Statements */}
        <div className="space-y-1 text-base sm:text-xl font-light text-white/75 mb-10 tracking-wide font-mono">
          <p>Your intent.</p>
          <p>Your decisions.</p>
          <p>Your transaction.</p>
          <p className="text-[#FF5A3C] font-semibold mt-2">Protected by AEGIS.</p>
        </div>

        {/* Button */}
        <button
          onClick={handleExplore}
          data-cursor-text="SHOP"
          className="group px-10 py-5 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-[0.22em] uppercase hover:bg-white/90 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center gap-3 cursor-pointer"
        >
          <span>EXPLORE AEGIS COMMERCE</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      </div>

      {/* End Footer Brand Mark */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="font-mono text-2xl font-bold tracking-[0.3em] text-white">
          AEGIS
        </span>
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#D71920] uppercase mt-1">
          AI-POWERED COMMERCE DEFENSE
        </span>
      </div>
    </section>
  );
};
