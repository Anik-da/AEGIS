import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, CreditCard, Check, Sparkles } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CheckoutSection: React.FC = () => {
  const { placeOrder, lastOrder } = useCommerce();
  const [placed, setPlaced] = useState(false);
  const [verifyingIndex, setVerifyingIndex] = useState<number>(0);
  const [checksComplete, setChecksComplete] = useState<boolean>(false);

  const checks = [
    { title: 'PRICE INTEGRITY', status: '✓ VERIFIED', note: 'Catalog database price matches server truth' },
    { title: 'PRODUCT AVAILABILITY', status: '✓ VERIFIED', note: 'Physical stock allocated and locked' },
    { title: 'CART INTEGRITY', status: '✓ VERIFIED', note: 'Quantity constraints and totals ratified' },
    { title: 'INTENT ALIGNMENT', status: '✓ VERIFIED', note: 'Session parameters approved' },
    { title: 'SESSION SECURITY', status: '✓ VERIFIED', note: 'Client fingerprint & mTLS verified' },
  ];

  // Auto-animate individual checks sequentially
  useEffect(() => {
    if (verifyingIndex < checks.length) {
      const timer = setTimeout(() => {
        setVerifyingIndex(prev => prev + 1);
        aegisAudio.playVerify();
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setChecksComplete(true);
    }
  }, [verifyingIndex]);

  const handleCompleteOrder = () => {
    aegisAudio.playClick();
    const success = placeOrder(
      {
        fullName: 'Anik Dutta',
        street: '74 Cyber Horizon Boulevard',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560103',
        country: 'India',
      },
      'AEGIS Zero-Trust Card'
    );
    if (success) {
      setPlaced(true);
    }
  };

  return (
    <section id="checkout-preview" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
              PRE-FLIGHT VERIFICATION · 07
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
            PREMIUM <br />
            <span className="italic font-light text-white/70">MINIMAL CHECKOUT.</span>
          </h2>

          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Prior to authorizing any financial transfer, AEGIS executes a 5-point transaction check.
            An invisible protection layer guaranteeing price truth, stock availability, and session safety.
          </p>
        </div>

        {placed && lastOrder ? (
          /* Order Confirmed View */
          <div className="rounded-3xl bg-gradient-to-b from-emerald-500/[0.1] via-white/[0.02] to-[#050607] border border-emerald-500/30 p-10 md:p-16 text-center max-w-3xl mx-auto shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-6">
              <Check className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono tracking-[0.3em] text-emerald-400 uppercase">
              ORDER AUTHORIZED & VERIFIED
            </span>
            <h3 className="text-3xl font-normal uppercase text-white my-3">
              ORDER #{lastOrder.orderId}
            </h3>
            <p className="text-sm font-mono text-white/60 mb-8">
              Total Amount: ₹92,998 · Cryptographic Receipt Issued
            </p>

            <button
              onClick={() => setPlaced(false)}
              className="px-8 py-4 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all cursor-pointer"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          /* The 5-Point AEGIS TRANSACTION CHECK Stage */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Minimal Recipient & Payment Protocol */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-4">
                  1. RECIPIENT ENCLAVE
                </span>
                <div className="space-y-1 font-mono text-sm text-white/90">
                  <p className="font-semibold text-white">Anik Dutta</p>
                  <p className="text-white/60">74 Cyber Horizon Boulevard, Silicon District</p>
                  <p className="text-white/60">Bengaluru, Karnataka 560103, India</p>
                </div>
              </div>

              <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-4">
                  2. PAYMENT GATEWAY
                </span>
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between font-mono text-xs text-white">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>AEGIS SECURE TOKENIZED SETTLEMENT</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">256-BIT mTLS</span>
                </div>
              </div>
            </div>

            {/* Right: Signature AEGIS TRANSACTION CHECK Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-[#050607] border border-white/15 p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D71920]/20 border border-[#D71920]/40 flex items-center justify-center text-[#D71920]">
                      <ShieldCheck className="w-5 h-5 text-[#FF5A3C]" />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm tracking-wider uppercase text-white font-bold">
                        AEGIS TRANSACTION CHECK
                      </h3>
                      <p className="text-[10px] font-mono text-white/40">
                        Pre-flight safety inspection
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase ${
                    checksComplete 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-white/[0.06] text-white/60'
                  }`}>
                    {checksComplete ? 'ALL GATES PASSED' : `CHECKING ${verifyingIndex}/5`}
                  </span>
                </div>

                {/* 5 Animated Individual Checks */}
                <div className="space-y-4 font-mono text-xs mb-8">
                  {checks.map((chk, idx) => {
                    const isPassed = idx < verifyingIndex;
                    const isCurrent = idx === verifyingIndex;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                          isPassed
                            ? 'bg-emerald-500/[0.06] border-emerald-500/25 text-white'
                            : isCurrent
                            ? 'bg-white/[0.05] border-white/20 animate-pulse text-white'
                            : 'bg-black/40 border-white/[0.06] opacity-40 text-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                          )}
                          <span className="font-medium tracking-wide">{chk.title}</span>
                        </div>

                        <span className={`text-[10px] font-bold ${
                          isPassed ? 'text-emerald-400' : 'text-white/40'
                        }`}>
                          {isPassed ? chk.status : 'PENDING'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Status Callout: READY TO COMPLETE */}
                {checksComplete && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center mb-6 animate-fade-in">
                    <span className="text-xs font-mono tracking-widest uppercase text-emerald-300 font-bold flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      READY TO COMPLETE
                    </span>
                  </div>
                )}

                {/* Total & Final Place Order CTA */}
                <div className="pt-4 border-t border-white/[0.08] mb-6 flex justify-between items-baseline font-mono">
                  <span className="text-white/60 text-xs">ORDER TOTAL</span>
                  <span className="text-3xl text-white font-medium">₹92,998</span>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  disabled={!checksComplete}
                  data-cursor-text="CONFIRM"
                  className="w-full py-4 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-40"
                >
                  <span>COMPLETE TRANSACTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
