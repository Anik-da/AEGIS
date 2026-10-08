import React, { useState, useEffect } from 'react';
import { AegisProvider } from './context/AegisContext';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { CommerceNavbar } from './components/navigation/CommerceNavbar';
import { Footer } from './components/navigation/Footer';
import { ProgressRail } from './components/navigation/ProgressRail';
import { CustomCursor } from './components/ui/CustomCursor';
import { CartDrawer } from './components/cart/CartDrawer';
import { CommerceDemoController } from './components/ui/CommerceDemoController';
import { CommandCenter } from './components/dashboard/CommandCenter';

// Dedicated Views
import { HomeView } from './components/views/HomeView';
import { ShopView } from './components/views/ShopView';
import { ProductDetailView } from './components/views/ProductDetailView';
import { CheckoutView } from './components/views/CheckoutView';
import { AccountView } from './components/views/AccountView';
import './App.css';

const AegisCommerceInner: React.FC = () => {
  const { currentView, controlCenterOpen, setControlCenterOpen } = useCommerce();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (currentView !== 'home') return;

    const sectionIds = [
      'hero',
      'discover',
      'intent-layer',
      'intent-match',
      'intent-drift',
      'spotlight',
      'cart-preview',
      'checkout-preview',
      'trust-story',
      'tamper-guard',
      'threat-guard',
      'heal-guard',
      'control-center',
      'defense-core',
      'final-cta'
    ];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.25 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [currentView]);

  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F4F4F1] overflow-x-hidden film-grain font-sans selection:bg-[#D71920] selection:text-white">
      {/* Global Ambient Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-radial from-[#D71920]/[0.06] via-transparent to-transparent pointer-events-none blur-3xl z-0" />

      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Luxury E-Commerce Navigation */}
      <CommerceNavbar />

      {/* Section Progress Rail (active on Home view) */}
      {currentView === 'home' && <ProgressRail activeSection={activeSection} />}

      {/* Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* Primary Experience View Router */}
      <main className="relative z-10 flex flex-col w-full">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'control_center' && (
          <div className="pt-24 min-h-screen bg-[#050607]">
            <CommandCenter />
          </div>
        )}
      </main>

      {/* Commerce Footer */}
      <Footer />

      {/* Floating Demo Mode Controller */}
      <CommerceDemoController />

      {/* Secondary AEGIS Control Center Modal */}
      {controlCenterOpen && (
        <CommandCenter isModal={true} onClose={() => setControlCenterOpen(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AegisProvider>
      <CommerceProvider>
        <AegisCommerceInner />
      </CommerceProvider>
    </AegisProvider>
  );
}
