import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, ShieldCheck, X } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CommerceNavbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setSelectedCategory,
    cartCount,
    setCartDrawerOpen,
    setControlCenterOpen,
    searchQuery,
    setSearchQuery,
    soundEnabled,
    toggleSound
  } = useCommerce();

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'SHOP', category: 'ALL', view: 'shop' as const },
    { label: 'NEW ARRIVALS', category: 'ALL', view: 'shop' as const },
    { label: 'ELECTRONICS', category: 'ELECTRONICS', view: 'shop' as const },
    { label: 'FASHION', category: 'FASHION', view: 'shop' as const },
    { label: 'LIFESTYLE', category: 'LIFESTYLE', view: 'shop' as const },
    { label: 'DEALS', category: 'ALL', view: 'shop' as const },
  ];

  const handleNavClick = (category: string, view: 'shop') => {
    aegisAudio.playClick();
    setSelectedCategory(category);
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    aegisAudio.playClick();
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050607]/85 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#050607]/90 via-[#050607]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="AEGIS Commerce Home"
          >
            {/* Subtle Minimal Geometric Shield Icon */}
            <div className="w-7 h-7 rounded bg-white/[0.04] border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-[#D71920]/60 group-hover:bg-[#D71920]/10">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0.5L13.5 3V7.5C13.5 11.5 10.5 14.5 7 15.5C3.5 14.5 0.5 11.5 0.5 7.5V3L7 0.5Z" stroke="#F4F4F1" strokeWidth="1.2" strokeLinejoin="round"/>
                <circle cx="7" cy="8" r="2" fill="#D71920"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono text-base tracking-[0.28em] font-semibold text-[#F4F4F1] group-hover:text-white transition-colors">
                AEGIS
              </span>
              <span className="text-[9px] font-mono tracking-[0.32em] text-white/40 -mt-0.5">
                COMMERCE
              </span>
            </div>
          </button>

          {/* Subtle AEGIS Protected Pill Status */}
          <button
            onClick={() => {
              aegisAudio.playVerify();
              setControlCenterOpen(true);
            }}
            title="Open AEGIS AI Security & Control Center"
            className="hidden lg:flex items-center gap-2 py-1 px-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#D71920]/40 hover:bg-[#D71920]/[0.06] transition-all cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] shadow-[0_0_8px_#D71920] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
              AEGIS PROTECTED
            </span>
          </button>
        </div>

        {/* Center: Commerce Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.category, item.view)}
              className="relative text-[11px] font-mono tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors py-1 group cursor-pointer"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D71920] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right: Commerce Utility Actions */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Search Toggle */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-white/[0.06] border border-white/20 rounded-full px-3 py-1 animate-fade-in">
                <Search className="w-3.5 h-3.5 text-white/60 mr-2" />
                <input
                  type="text"
                  placeholder="SEARCH CATALOG..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCurrentView('shop');
                    }
                  }}
                  autoFocus
                  className="bg-transparent text-[11px] font-mono tracking-wider text-white placeholder-white/40 focus:outline-none w-28 sm:w-40"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-white/40 hover:text-white p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  aegisAudio.playClick();
                  setSearchOpen(true);
                }}
                className="p-2 rounded-full hover:bg-white/[0.06] text-white/70 hover:text-white transition-colors"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="p-2 rounded-full hover:bg-white/[0.06] text-white/70 hover:text-white transition-colors"
              aria-label="User Account & Control Center"
            >
              <User className="w-4 h-4" />
            </button>

            {accountMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#090A0D] border border-white/10 shadow-2xl py-2 px-1 z-50 animate-fade-in font-mono text-[11px] tracking-wider">
                <div className="px-3 py-2 border-b border-white/[0.06] text-white/40 text-[10px]">
                  ACCOUNT & CONTROLS
                </div>
                <button
                  onClick={() => {
                    aegisAudio.playClick();
                    setCurrentView('account');
                    setAccountMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  MY PROFILE & ORDERS
                </button>
                <button
                  onClick={() => {
                    aegisAudio.playClick();
                    setCurrentView('shop');
                    setAccountMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  BROWSE ALL PRODUCTS
                </button>
                <div className="my-1 border-t border-white/[0.06]" />
                <button
                  onClick={() => {
                    aegisAudio.playVerify();
                    setControlCenterOpen(true);
                    setAccountMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-[#F4F4F1] hover:bg-[#D71920]/15 hover:text-white flex items-center justify-between transition-colors border border-[#D71920]/20"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D71920]" />
                    <span className="font-semibold">AEGIS CONTROL CENTER</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon & Counter */}
          <button
            onClick={() => {
              aegisAudio.playClick();
              setCartDrawerOpen(true);
            }}
            className="relative p-2 rounded-full hover:bg-white/[0.06] text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#D71920] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-[0_0_8px_#D71920]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0D]/95 border-b border-white/10 px-6 py-6 animate-fade-in">
          <div className="flex flex-col gap-4 font-mono text-xs tracking-widest">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.category, item.view)}
                className="text-left py-2 text-white/80 hover:text-white border-b border-white/[0.05]"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setControlCenterOpen(true);
                setMobileMenuOpen(false);
              }}
              className="py-3 px-4 rounded-lg bg-[#D71920]/10 border border-[#D71920]/30 text-white flex items-center justify-between mt-2"
            >
              <span>AEGIS CONTROL CENTER</span>
              <ShieldCheck className="w-4 h-4 text-[#D71920]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
