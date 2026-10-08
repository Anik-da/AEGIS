import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { AegisCore } from '../hero/AegisCore';
import { aegisAudio } from '../../utils/audio';
import { useMousePosition } from '../../hooks/useMousePosition';

export const CommerceHero: React.FC = () => {
  const { setCurrentView, setSelectedProductId } = useCommerce();
  const mouse = useMousePosition();
  const [entranceStage, setEntranceStage] = useState(0);

  // Cinematic 8-Stage Entrance Choreography
  useEffect(() => {
    const timers = [
      setTimeout(() => setEntranceStage(1), 150),  // 1. Dark screen ambient awakening
      setTimeout(() => setEntranceStage(2), 400),  // 2. Product imagery gradually appears
      setTimeout(() => setEntranceStage(3), 700),  // 3. Masked typography reveals
      setTimeout(() => setEntranceStage(4), 1000), // 4. Secondary text follows
      setTimeout(() => setEntranceStage(5), 1250), // 5. Staggered action buttons enter
      setTimeout(() => setEntranceStage(6), 1500), // 6. Micro-telemetry foot settles
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

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
    const intentSection = document.getElementById('intent-layer');
    if (intentSection) {
      intentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3D Parallax Tilt Calculation
  const tiltX = (mouse.normalizedY * -12).toFixed(2);
  const tiltY = (mouse.normalizedX * 14).toFixed(2);
  const ambientGlowX = (mouse.normalizedX * 40).toFixed(1);
  const ambientGlowY = (mouse.normalizedY * 40).toFixed(1);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#050607] select-none">
      {/* Stage Background: Layered Depth & Atmospheric Lighting */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: entranceStage >= 1 ? 0.5 : 0 }}
      >
        <AegisCore size="large" />
      </div>

      {/* Dynamic Midground Ambient Glow shifting with Mouse */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#D71920]/[0.08] blur-[140px] pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          top: '30%',
          right: '15%',
          transform: `translate(${ambientGlowX}px, ${ambientGlowY}px)`,
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-radial from-transparent via-[#050607]/60 to-[#050607]" />

      {/* Top Editorial Status Pill (Staggered Entrance) */}
      <div 
        className={`relative z-10 max-w-7xl mx-auto w-full pt-2 transition-all duration-700 ${
          entranceStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.09] shadow-2xl backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] shadow-[0_0_10px_#D71920] animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.24em] text-white/80 uppercase">
            AEGIS AI PROTECTED COMMERCE
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[10px] font-mono tracking-widest text-[#D71920] flex items-center gap-1.5">
            <Sparkles className="w-2.5 h-2.5" />
            AUTONOMOUS INTENT GUARD ACTIVE
          </span>
        </div>
      </div>

      {/* Main Hero Centerpiece: Editorial Layout & 3D Hardware */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-8">
        {/* Left Column: Masked Typography Reveal */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subheading pill */}
          <div 
            className={`overflow-hidden mb-4 transition-all duration-700 ${
              entranceStage >= 2 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-[11px] font-mono tracking-[0.34em] text-[#D71920] uppercase flex items-center gap-2.5">
              <span>GEN-3 AUTONOMOUS COMMERCE</span>
              <span className="w-10 h-px bg-[#D71920]/40" />
            </p>
          </div>

          {/* Masked Editorial Headline: SHOP WITH INTENT */}
          <div className="overflow-hidden mb-2">
            <h1 
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-medium tracking-[-0.04em] uppercase leading-[0.88] text-[#F4F4F1] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                entranceStage >= 3 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              SHOP WITH
            </h1>
          </div>

          <div className="overflow-hidden mb-6">
            <h1 
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-light italic tracking-[-0.04em] uppercase leading-[0.88] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 transition-transform duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                entranceStage >= 3 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              INTENT.
            </h1>
          </div>

          {/* Secondary Supporting Text (Blur-to-sharp & Staggered Reveal) */}
          <p 
            className={`text-base sm:text-lg text-white/60 max-w-xl font-light leading-relaxed mb-9 transition-all duration-700 delay-200 ${
              entranceStage >= 4 
                ? 'opacity-100 translate-y-0 filter-none' 
                : 'opacity-0 translate-y-6 blur-sm'
            }`}
          >
            A commerce experience that understands what you want — and protects every action.
            Continuous intent verification, client integrity monitoring, and autonomous transaction safety.
          </p>

          {/* Staggered CTAs */}
          <div 
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${
              entranceStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={handleExplore}
              data-cursor-text="EXPLORE"
              className="group relative px-8 py-4 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.2)] flex items-center gap-3 cursor-pointer"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            <button
              onClick={handleLearnProtect}
              data-cursor-text="SHIELD"
              className="px-6 py-4 rounded-full bg-white/[0.04] border border-white/[0.12] text-white/80 font-mono text-xs tracking-[0.18em] uppercase hover:bg-white/[0.08] hover:text-white hover:border-white/25 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#D71920]" />
              <span>HOW AEGIS PROTECTS YOU</span>
            </button>
          </div>
        </div>

        {/* Right Column: Floating 3D Hardware Object with Specular Lighting & Parallax */}
        <div 
          className={`lg:col-span-5 relative flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            entranceStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-md'
          }`}
        >
          {/* 3D Perspective Card with Gyroscopic Tilt */}
          <div
            onClick={() => {
              setSelectedProductId('aegis-pro-x1');
              setCurrentView('product');
            }}
            data-cursor-text="VIEW"
            style={{
              transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transition: 'transform 0.15s ease-out, border-color 0.4s ease',
            }}
            className="group relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-[#050607] border border-white/12 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer hover:border-[#D71920]/40 transition-colors"
          >
            {/* Specular Edge Glow */}
            <div className="absolute inset-0 bg-radial from-white/[0.06] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Product Photography Stage */}
            <div className="relative w-full h-[78%] rounded-2xl overflow-hidden bg-black/60 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"
                alt="AEGIS Pro X1 Flagship Workstation"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-transparent opacity-85" />

              {/* Floating Top Intent Badge */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-[#050607]/90 backdrop-blur-md border border-white/15 flex items-center gap-2 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="text-[10px] font-mono tracking-widest text-white/90 font-medium">94% INTENT FIT</span>
              </div>

              {/* Verified Hardware Badge */}
              <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[9px] font-mono tracking-widest text-white/60">
                SERIES 01
              </div>
            </div>

            {/* Product Meta Card Base */}
            <div className="mt-3.5 flex items-end justify-between px-2">
              <div>
                <p className="text-[10px] font-mono tracking-[0.26em] text-white/40 uppercase">FLAGSHIP WORKSTATION</p>
                <h3 className="text-2xl font-normal tracking-wide text-white group-hover:text-[#D71920] transition-colors">
                  AEGIS PRO X1
                </h3>
                <p className="text-xs text-white/50 font-mono mt-0.5">32GB RAM · RTX 4070 · 2.8K OLED</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-mono font-medium text-white">₹74,999</p>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center justify-end gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  IN STOCK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Foot: Micro-telemetry & Live Metrics (Entrance Stage 6) */}
      <div 
        className={`relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/[0.07] grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${
          entranceStage >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            100% SECURE & OPERATIONAL
          </span>
        </div>
      </div>
    </section>
  );
};
