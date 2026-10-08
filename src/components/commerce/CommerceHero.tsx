import React from 'react';
import { Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { AegisCore } from '../hero/AegisCore';
import { aegisAudio } from '../../utils/audio';

export const CommerceHero: React.FC = () => {
  const { setCurrentView, setSelectedProductId } = useCommerce();

  const handleExplore = () => {
    aegisAudio.playClick();
    const discoverSection = document.getElementById('discover');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('shop');
    }
  };

  const handleLearnProtect = () => {
    aegisAudio.playClick();
    const intentSection = document.getElementById('intent-intelligence');
    if (intentSection) {
      intentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-[#050607]">
      {/* Background 3D Aegis Ambient Core & Radial Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <AegisCore />
      </div>

      {/* Atmospheric Vignette & Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#050607]/80 via-transparent to-[#050607]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D71920]/[0.07] rounded-full blur-[120px] pointer-events-none" />

      {/* Top Editorial Status Pill */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.09] shadow-lg animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] shadow-[0_0_8px_#D71920] animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.24em] text-white/70 uppercase">
            ● AEGIS AI PROTECTED COMMERCE
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[10px] font-mono tracking-widest text-[#D71920] flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            AUTONOMOUS INTENT GUARD ACTIVE
          </span>
        </div>
      </div>

      {/* Centerpiece: Cinematic Editorial Headline & Hero Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8">
        {/* Left Column: Bold Editorial Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <p className="text-[11px] font-mono tracking-[0.32em] text-[#D71920] uppercase mb-4 flex items-center gap-2">
            <span>GEN-3 COMMERCE ARCHITECTURE</span>
            <span className="w-8 h-px bg-[#D71920]/40" />
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.03em] uppercase leading-[0.92] text-[#F4F4F1] mb-6">
            SHOP WITH <br />
            <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              INTENT.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/60 max-w-xl font-light leading-relaxed mb-8">
            A commerce experience that understands what you want — and protects every action.
            Continuous intent verification, client integrity monitoring, and autonomous transaction safety.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleExplore}
              className="group relative px-8 py-4 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-3 cursor-pointer"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleLearnProtect}
              className="px-6 py-4 rounded-full bg-white/[0.04] border border-white/[0.12] text-white/80 font-mono text-xs tracking-[0.18em] uppercase hover:bg-white/[0.08] hover:text-white transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#D71920]" />
              <span>HOW AEGIS PROTECTS YOU</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Hardware Showcase with Floating Intent Tag */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Layered Product Preview Frame */}
          <div
            onClick={() => {
              setSelectedProductId('aegis-pro-x1');
              setCurrentView('product');
            }}
            className="group relative w-full max-w-md aspect-[4/5] rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 p-4 shadow-2xl overflow-hidden cursor-pointer hover:border-white/25 transition-all duration-500"
          >
            {/* Product Image */}
            <div className="relative w-full h-[78%] rounded-xl overflow-hidden bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85"
                alt="AEGIS Pro X1 Workstation"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-transparent opacity-80" />

              {/* Top Floating AI Fit Badge */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-[#050607]/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono tracking-widest text-white/90">94% INTENT FIT</span>
              </div>
            </div>

            {/* Product Meta Card Base */}
            <div className="mt-3 flex items-end justify-between px-2">
              <div>
                <p className="text-[10px] font-mono tracking-[0.24em] text-white/40 uppercase">FLAGSHIP RELEASE</p>
                <h3 className="text-xl font-normal tracking-wide text-white group-hover:text-[#D71920] transition-colors">
                  AEGIS PRO X1
                </h3>
                <p className="text-xs text-white/50 font-mono">32GB RAM · RTX 4070 · 2.8K OLED</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-mono font-medium text-white">₹74,999</p>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">IN STOCK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Foot: Micro-telemetry & Quick Metrics */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/[0.07] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">INTENT RECOGNITION</span>
          <span className="text-sm font-mono text-white/90 font-medium">REAL-TIME CONSTRAINT PARSER</span>
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">CLIENT INTEGRITY</span>
          <span className="text-sm font-mono text-white/90 font-medium">DOM TAMPER RESISTANT</span>
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">CHECKOUT GATEWAY</span>
          <span className="text-sm font-mono text-white/90 font-medium">5-GATE ZERO TRUST RECEIPT</span>
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">AEGIS STATUS</span>
          <span className="text-sm font-mono text-emerald-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% SECURE & OPERATIONAL
          </span>
        </div>
      </div>
    </section>
  );
};
