import React from 'react';
import { AegisCore } from './AegisCore';
import { SectionLabel } from '../ui/SectionLabel';
import { MagneticButton } from '../ui/MagneticButton';
import { useAegis } from '../../context/AegisContext';
import { useMousePosition } from '../../hooks/useMousePosition';
import { aegisAudio } from '../../utils/audio';
import { ArrowUpRight, ShieldCheck, Terminal, Compass, ShieldAlert, Cpu, RefreshCw, Activity, Lock } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCommandCenterOpen, defenseStatus } = useAegis();
  const mouse = useMousePosition();

  const handleExploreClick = () => {
    aegisAudio.playClick();
    const el = document.getElementById('transition');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChapterClick = (id: string) => {
    aegisAudio.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const chapters = [
    { id: 'intent', num: '01', title: 'INTENTGUARD', desc: 'Mathematical goal alignment tolerance', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'threats', num: '02', title: 'THREATGUARD', desc: 'Correlated multi-stage attack chains', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'tamper', num: '03', title: 'TAMPERGUARD', desc: 'Untrusted client DOM boundary gate', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'heal', num: '04', title: 'HEALGUARD', desc: 'AST patch synthesis & zero-downtime revert', icon: <RefreshCw className="w-3.5 h-3.5" /> },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 overflow-hidden bg-[#050607]">
      {/* Background Interactive Lighting Layer */}
      <div
        className="absolute pointer-events-none transition-transform duration-700 ease-out"
        style={{
          left: `${(mouse.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 30}%`,
          top: `${(mouse.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 25}%`,
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(215, 25, 32, 0.08) 0%, rgba(5, 6, 7, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      {/* Subtle Grid Matrix Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" 
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <SectionLabel label="01" category="AI DEFENSE SYSTEM" />

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-[#F4F4F1] leading-[0.95] mb-6">
            THE AI <br />
            THAT GUARDS <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F4F1] to-[#D71920]">
              YOUR INTENT.
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-[#8D9096] font-light leading-relaxed mb-8 tracking-wide">
            AEGIS protects the actions you take, the applications you trust, and the software that powers them with autonomous, self-verifying zero-trust intelligence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => setCommandCenterOpen(true)}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              ENTER AEGIS
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={handleExploreClick}
              icon={<ShieldCheck className="w-4 h-4 text-[#D71920]" />}
            >
              EXPLORE DEFENSE
            </MagneticButton>
          </div>

          {/* Micro Telemetry Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-[11px] font-mono text-[#8D9096]">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">SLO</span>
              <span className="text-[#D71920]">99.999%</span>
            </div>
            <div className="w-px h-3 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">INTEGRITY</span>
              <span className="text-emerald-400">HARDENED</span>
            </div>
            <div className="w-px h-3 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">RECOVERY</span>
              <span>420ms RESTORE</span>
            </div>
          </div>
        </div>

        {/* Right 3D Aegis Core Visual & Floating Enclave Window */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[440px] lg:min-h-[580px]">
          {/* Subtle outer orbit ring backdrop */}
          <div className="absolute inset-0 m-auto w-72 h-72 rounded-full border border-white/[0.04] pointer-events-none" />
          <div className="absolute inset-0 m-auto w-96 h-96 rounded-full border border-[#D71920]/[0.08] pointer-events-none animate-pulse" />
          
          <AegisCore size="normal" className="w-full" />

          {/* Floating Enclave Peek Window (inspired by Kage's floating live window) */}
          <div className="absolute right-0 top-4 hidden sm:flex flex-col p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl max-w-[210px] text-left font-mono z-20 hover:border-[#D71920]/50 transition-colors">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5 text-[10px] text-white font-medium">
                <Lock className="w-3 h-3 text-[#D71920]" />
                <span>SECURE ENCLAVE</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-[#8D9096] space-y-1">
              <div>HOST: <span className="text-white">aegis-tokyo-01</span></div>
              <div>SIG: <span className="text-[#D71920]">ED25519_VALID</span></div>
              <div>ATTEST: <span className="text-emerald-400">HARDWARE_TPM</span></div>
            </div>
            <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] text-white/50">
              <span className="flex items-center gap-1">
                <Activity className="w-2.5 h-2.5 text-[#D71920]" /> 0.8ms
              </span>
              <span>LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Foot: 4 Interactive Chapter Chips */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/[0.08] pt-6">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleChapterClick(ch.id)}
              className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/15 transition-all text-left group cursor-pointer"
            >
              <span className="text-xl font-mono text-[#D71920] font-light group-hover:scale-105 transition-transform">
                {ch.num}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-white group-hover:text-white mb-0.5">
                  <span className="opacity-70 text-[#D71920]">{ch.icon}</span>
                  <span className="truncate">{ch.title}</span>
                </div>
                <p className="text-[10px] font-mono text-[#8D9096] truncate">
                  {ch.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Indicator & Telemetry */}
        <div className="flex justify-between items-center mt-6 text-[10px] font-mono text-[#8D9096]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#D71920]" />
            <span>AEGIS DEFENSE CORE // BUILD 4.2.0</span>
          </div>

          <button
            onClick={handleExploreClick}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span>SCROLL TO ENTER</span>
            <div className="w-6 h-px bg-[#D71920]" />
          </button>
        </div>
      </div>
    </section>
  );
};
