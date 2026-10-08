import React, { useState, useEffect } from 'react';
import { useAegis } from '../../context/AegisContext';
import { StatusIndicator } from '../ui/StatusIndicator';
import { MagneticButton } from '../ui/MagneticButton';
import { Shield, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { defenseStatus, setCommandCenterOpen } = useAegis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'SYSTEM', href: '#system' },
    { label: 'INTENT', href: '#intent' },
    { label: 'THREATS', href: '#threats' },
    { label: 'TAMPER', href: '#tamper' },
    { label: 'HEAL', href: '#heal' },
    { label: 'COMMAND CENTER', href: '#command-center', action: () => setCommandCenterOpen(true) },
  ];

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.action) {
      e.preventDefault();
      link.action();
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#050607]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Left Brand */}
          <a
            href="#"
            className="flex items-center gap-3.5 group select-none text-left"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.1] group-hover:border-[#D71920]/60 transition-colors">
              <Shield className="w-4 h-4 text-white group-hover:text-[#D71920] transition-colors" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#D71920] shadow-[0_0_8px_#D71920]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold tracking-[0.22em] text-[#F4F4F1] font-mono">
                  AEGIS
                </span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-[#D71920]/20 text-[#D71920] border border-[#D71920]/40 tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#8D9096] uppercase">
                AUTONOMOUS GUARDIAN
              </span>
            </div>

            <div className="hidden lg:block ml-3 pl-3 border-l border-white/[0.08]">
              <StatusIndicator
                status={
                  defenseStatus === 'threat_detected' || defenseStatus === 'tamper_alert'
                    ? 'alert'
                    : defenseStatus === 'healing'
                    ? 'healing'
                    : 'protected'
                }
              />
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`relative text-xs font-mono tracking-[0.18em] transition-colors py-1 uppercase ${
                    isActive ? 'text-white' : 'text-[#8D9096] hover:text-[#F4F4F1]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D71920] shadow-[0_0_8px_#D71920]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton
              variant="outline"
              size="sm"
              onClick={() => setCommandCenterOpen(true)}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              ENTER AEGIS
            </MagneticButton>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050607]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#D71920]" />
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-white">
                AEGIS AI
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className="text-2xl font-light tracking-[0.15em] font-mono text-[#F4F4F1] hover:text-[#D71920] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-4">
            <MagneticButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                setCommandCenterOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              ENTER AEGIS
            </MagneticButton>
            <div className="flex justify-center">
              <StatusIndicator status="protected" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
