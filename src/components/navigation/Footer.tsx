import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const Footer: React.FC = () => {
  const { setCurrentView, setControlCenterOpen, setSelectedCategory } = useCommerce();

  const scrollToTop = () => {
    aegisAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-16 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Left Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-white/[0.04] border border-white/15 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#D71920]" />
            </div>
            <span className="text-base font-mono font-bold tracking-[0.24em] text-white">
              AEGIS COMMERCE
            </span>
          </div>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/40">
            THE AUTONOMOUS DIGITAL GUARDIAN
          </span>
          <p className="text-xs font-mono text-white/50 italic mt-2">
            "AI-powered commerce. Human-controlled decisions."
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono tracking-wider uppercase text-white/60">
          <button
            onClick={() => {
              setCurrentView('shop');
              setSelectedCategory('ALL');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            SHOP
          </button>
          <button
            onClick={() => {
              setCurrentView('shop');
              setSelectedCategory('ELECTRONICS');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ELECTRONICS
          </button>
          <button
            onClick={() => {
              setCurrentView('shop');
              setSelectedCategory('FASHION');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            FASHION
          </button>
          <button
            onClick={() => {
              setCurrentView('shop');
              setSelectedCategory('LIFESTYLE');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            LIFESTYLE
          </button>
          <button
            onClick={() => {
              aegisAudio.playVerify();
              setControlCenterOpen(true);
            }}
            className="hover:text-white transition-colors cursor-pointer text-[#D71920] font-semibold"
          >
            AEGIS CONTROL CENTER
          </button>
        </div>

        {/* Right Scroll Top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 text-xs font-mono cursor-pointer"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/40 gap-4">
        <span>© 2026 AEGIS COMMERCE. ALL TRANSACTIONS PRIVATELY ENCLAVED & VERIFIED.</span>
        <span>STATUS: ● PROTECTED (0 BREACHES)</span>
      </div>
    </footer>
  );
};
