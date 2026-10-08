import React from 'react';
import { ShoppingBag, ArrowRight, AlertTriangle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CartSection: React.FC = () => {
  const { setCurrentView, setCartDrawerOpen } = useCommerce();

  return (
    <section id="cart-preview" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#08090B] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
                CINEMATIC CART · 06
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
              AN INTELLIGENT <br />
              <span className="italic font-light text-white/70">SHOPPING CART.</span>
            </h2>
          </div>

          <p className="text-sm font-light text-white/50 max-w-md lg:text-right leading-relaxed">
            No sneaky subscriptions or hidden fees. AEGIS continuously evaluates your basket against your stated budget ceiling, providing continuous financial transparency.
          </p>
        </div>

        {/* Cinematic Cart Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Line Items (Product, Quantity, Price, Warranty, Accessories) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-[#050607] border border-white/10 p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                ACTIVE CART ITEMS (2 ITEMS)
              </span>
              <span className="text-[10px] font-mono text-emerald-400">STATE: VERIFIED SERVER-SIDE</span>
            </div>

            {/* Line Item 1: Hardware Product */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded-2xl overflow-hidden bg-black/60 border border-white/10 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80"
                    alt="AEGIS Pro X1 Workstation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-normal text-white uppercase">AEGIS PRO X1</h4>
                  <p className="text-xs font-mono text-white/40">Quantity: 1 · 32GB RAM · 1TB SSD · RTX 4070</p>
                  <span className="text-[10px] font-mono text-emerald-400 mt-1 inline-block">✓ HARDWARE FLOOR SATISFIED</span>
                </div>
              </div>
              <div className="text-right font-mono">
                <p className="text-xl font-medium text-white">₹84,999</p>
                <span className="text-[10px] text-white/40">HIGH-TIER CHASSIS</span>
              </div>
            </div>

            {/* Line Item 2: Protection Warranty */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-xs text-[#D71920] font-bold shrink-0">
                  CARE+
                </div>
                <div>
                  <h4 className="text-base font-normal text-white uppercase">3-YEAR AEGIS CARE+ WARRANTY</h4>
                  <p className="text-xs font-mono text-white/40">Quantity: 1 · Comprehensive Accidental & Drop Shield</p>
                  <span className="text-[10px] font-mono text-white/40 mt-1 inline-block">OPTIONAL ADDON</span>
                </div>
              </div>
              <div className="text-right font-mono">
                <p className="text-lg font-medium text-white">₹7,999</p>
                <span className="text-[10px] text-white/40">36-MONTH ENCLAVE</span>
              </div>
            </div>

            {/* Subtotal Row */}
            <div className="pt-2 flex justify-between items-center font-mono text-sm text-white/60">
              <span>SUBTOTAL (INCL. GST & SHIPPING)</span>
              <span className="text-2xl text-white font-medium">₹92,998</span>
            </div>
          </div>

          {/* Right Column: AEGIS REVIEW Analysis Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl bg-gradient-to-b from-[#D71920]/[0.15] via-[#090A0D] to-[#050607] border-2 border-[#D71920]/50 p-8 shadow-[0_30px_70px_rgba(215,25,32,0.25)] relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                <div className="w-10 h-10 rounded-xl bg-[#D71920]/20 border border-[#D71920]/40 flex items-center justify-center text-[#D71920]">
                  <Sparkles className="w-5 h-5 text-[#FF5A3C]" />
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold uppercase tracking-widest text-white">
                    AEGIS REVIEW
                  </h3>
                  <p className="text-[10px] font-mono text-white/50">
                    Real-time autonomous cart drift analysis
                  </p>
                </div>
              </div>

              {/* Exact Numerical Comparison Matrix */}
              <div className="space-y-3 font-mono text-xs mb-6">
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-white/40">ORIGINAL BUDGET:</span>
                  <span className="text-white font-medium text-sm">₹80,000</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-white/40">CURRENT TOTAL:</span>
                  <span className="text-white font-medium text-sm">₹92,998</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#D71920]/20 border border-[#D71920]/50">
                  <span className="text-[#FF5A3C] font-bold">DRIFT:</span>
                  <span className="text-xl text-[#FF5A3C] font-bold">+₹12,998</span>
                </div>
              </div>

              <p className="text-xs font-mono text-white/70 leading-relaxed mb-6">
                AEGIS detected an upward excursion of <strong className="text-white">₹12,998</strong>.
                You remain in full authority — proceed with checkout or modify components anytime.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    aegisAudio.playVerify();
                    setCurrentView('checkout');
                  }}
                  data-cursor-text="CHECKOUT"
                  className="flex-1 py-4 px-6 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
