import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CartSection: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    userIntent,
    cartExceedsBudget,
    cartBudgetOverage,
    setCurrentView,
    dismissedCartNotice,
    setDismissedCartNotice
  } = useCommerce();

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#08090B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                INTENT-AWARE COMMERCE · 07
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
              A CART THAT REMEMBERS <br />
              <span className="italic font-light text-white/80">YOUR TRUE BUDGET.</span>
            </h2>
          </div>

          <p className="text-sm font-light text-white/50 max-w-md">
            Most checkout carts encourage silent overspending. AEGIS calculates your stated ceiling in real-time,
            keeping you informed without stopping your freedom.
          </p>
        </div>

        {/* Cart Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Line Items */}
          <div className="lg:col-span-7 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6">
            <h3 className="text-xs font-mono tracking-widest text-white/40 uppercase mb-4">
              CURRENT PROCUREMENT BUFFER ({cart.length} ITEMS)
            </h3>

            {/* Line Item 1: Primary Workstation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80"
                  alt="AEGIS Pro X1"
                  className="w-20 h-16 rounded-xl object-cover bg-black"
                />
                <div>
                  <h4 className="text-base font-normal text-white uppercase">AEGIS PRO X1</h4>
                  <p className="text-xs font-mono text-white/40">32GB RAM · 1TB SSD · RTX 4070</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <p className="text-base font-medium text-white">₹74,999</p>
                <span className="text-[10px] text-emerald-400">OPTIMAL FIT</span>
              </div>
            </div>

            {/* Line Item 2: Extended Warranty Addon */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-20 h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-[10px] text-white/60">
                  CARE+
                </div>
                <div>
                  <h4 className="text-sm font-normal text-white uppercase">AEGIS CARE+ EXTENDED WARRANTY</h4>
                  <p className="text-[11px] font-mono text-white/40">2-Year Comprehensive Accidental & Hardware</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <p className="text-sm font-medium text-white">₹9,999</p>
                <span className="text-[10px] text-white/40">OPTIONAL ADDON</span>
              </div>
            </div>

            {/* Line Item 3: Accessories */}
            <div className="flex items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-[10px] text-white/60">
                  TRAVEL
                </div>
                <div>
                  <h4 className="text-sm font-normal text-white uppercase">140W GAN DUAL-PORT TRAVEL ACCESSORY</h4>
                  <p className="text-[11px] font-mono text-white/40">Braided 240W 2m Cable + Travel Case</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <p className="text-sm font-medium text-white">₹4,999</p>
                <span className="text-[10px] text-white/40">ACCESSORY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Total Summary & Core Feature Notification */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Elegant AEGIS Intent Overage Notice */}
            <div className="rounded-3xl bg-gradient-to-b from-[#D71920]/[0.12] to-transparent border border-[#D71920]/40 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#D71920]/20 text-[#D71920]">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h4 className="font-mono text-sm tracking-widest text-white uppercase font-semibold">
                  AEGIS NOTICE
                </h4>
              </div>

              <p className="text-xs font-mono text-white/80 leading-relaxed mb-4">
                Your cart has moved beyond your original budget by{' '}
                <span className="text-[#FF5A3C] font-semibold">₹9,997</span>.
              </p>

              {/* Constraint comparison */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/40">Original intent budget:</span>
                  <span className="text-white font-medium">≤ ₹80,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Current cart total:</span>
                  <span className="text-[#FF5A3C] font-semibold">₹89,997</span>
                </div>
              </div>

              {/* Action Buttons: Human remains in control */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    aegisAudio.playClick();
                    setDismissedCartNotice(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-white text-[#050607] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-all text-center cursor-pointer"
                >
                  [ REVIEW CART ]
                </button>
                <button
                  onClick={() => {
                    aegisAudio.playVerify();
                    setDismissedCartNotice(true);
                    setCurrentView('checkout');
                  }}
                  className="flex-1 py-3 rounded-xl bg-white/[0.08] border border-white/15 text-white/90 font-mono text-xs tracking-wider uppercase hover:bg-white/[0.15] transition-all text-center cursor-pointer"
                >
                  [ CONTINUE ]
                </button>
              </div>
            </div>

            {/* Total Block & Checkout CTA */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8">
              <div className="space-y-2.5 font-mono text-xs text-white/60 mb-6">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-medium">₹89,997</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURE SHIPPING</span>
                  <span className="text-emerald-400">FREE (AEGIS EXPRESS)</span>
                </div>
                <div className="pt-3 border-t border-white/[0.08] flex justify-between text-base font-medium text-white">
                  <span>TOTAL</span>
                  <span className="text-2xl text-white font-mono">₹89,997</span>
                </div>
              </div>

              <button
                onClick={() => {
                  aegisAudio.playVerify();
                  setCurrentView('checkout');
                }}
                className="w-full py-4 rounded-xl bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>PROCEED TO VERIFIED CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
