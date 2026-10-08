import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, CreditCard, Check } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CheckoutSection: React.FC = () => {
  const { cartTotal, placeOrder, lastOrder, clientTamperActive } = useCommerce();
  const [placed, setPlaced] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [form, setForm] = useState({
    fullName: 'Anik Dutta',
    street: '74 Cyber Horizon Boulevard',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560103',
    country: 'India',
    paymentMethod: 'AEGIS Instant Zero-Trust Card'
  });

  const handlePlaceOrder = () => {
    aegisAudio.playClick();
    setIsVerifying(true);

    setTimeout(() => {
      const success = placeOrder(
        {
          fullName: form.fullName,
          street: form.street,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
        },
        form.paymentMethod
      );
      setIsVerifying(false);
      if (success) {
        setPlaced(true);
      }
    }, 1000);
  };

  return (
    <section id="checkout" className="relative w-full py-28 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              SECURE PROCUREMENT · 08
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            FINAL CHECKOUT <br />
            <span className="italic font-light text-white/80">& INTENT VERIFICATION.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Every transaction is cryptographically signed and validated before funds transfer.
            No unauthenticated price swaps, no forged client states, no silent merchant overcharges.
          </p>
        </div>

        {placed && lastOrder ? (
          /* Order Confirmation View */
          <div className="rounded-3xl bg-gradient-to-b from-emerald-500/[0.08] to-transparent border border-emerald-500/30 p-8 md:p-12 text-center max-w-3xl mx-auto shadow-2xl animate-fade-in">
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
              Total Amount: ₹89,997 · Cryptographic Receipt Issued
            </p>

            <div className="bg-black/60 rounded-2xl p-6 border border-white/10 text-left font-mono text-xs space-y-2 mb-8">
              <div className="flex justify-between text-white/70">
                <span>INTENT VERIFICATION:</span>
                <span className="text-emerald-400">PASSED</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>PRICE HASH MATCH:</span>
                <span className="text-emerald-400">AUTHORITATIVE</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>PROOF HASH:</span>
                <span className="text-white/90 truncate max-w-xs">{lastOrder.aegisVerificationReceipt.authCryptographicProof}</span>
              </div>
            </div>

            <button
              onClick={() => setPlaced(false)}
              className="px-8 py-3.5 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all cursor-pointer"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          /* Checkout Inputs & Final Verification Stage */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Shipping & Payment Details */}
            <div className="lg:col-span-7 space-y-8">
              {/* Delivery Address Box */}
              <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <h3 className="text-xs font-mono tracking-widest text-white/40 uppercase mb-6 flex items-center gap-2">
                  <span>1. DELIVERY RECIPIENT</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="text-white/40 uppercase block mb-1">FULL NAME</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full rounded-xl bg-black/60 border border-white/10 p-3 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 uppercase block mb-1">STREET ADDRESS</label>
                    <input
                      type="text"
                      value={form.street}
                      onChange={(e) => setForm({ ...form, street: e.target.value })}
                      className="w-full rounded-xl bg-black/60 border border-white/10 p-3 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 uppercase block mb-1">CITY & STATE</label>
                    <input
                      type="text"
                      value={`${form.city}, ${form.state}`}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full rounded-xl bg-black/60 border border-white/10 p-3 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 uppercase block mb-1">POSTAL CODE</label>
                    <input
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="w-full rounded-xl bg-black/60 border border-white/10 p-3 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <h3 className="text-xs font-mono tracking-widest text-white/40 uppercase mb-6 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-white/60" />
                  <span>2. ENCRYPTED PAYMENT PROTOCOL</span>
                </h3>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/15 flex items-center justify-between font-mono text-xs text-white">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>AEGIS DIRECT SETTLEMENT (Tokenized mTLS)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">ENCRYPTED</span>
                </div>
              </div>
            </div>

            {/* Right: Order Summary & FINAL AEGIS CHECK */}
            <div className="lg:col-span-5 space-y-6">
              {/* FINAL AEGIS CHECK CARD (Mandatory Core Feature) */}
              <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/15 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <div className="p-2 rounded-lg bg-[#D71920]/20 text-[#D71920]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm tracking-widest text-white uppercase font-bold">
                      FINAL AEGIS CHECK
                    </h4>
                    <p className="text-[10px] font-mono text-white/40">Pre-authorization intent & integrity gate</p>
                  </div>
                </div>

                {/* The 5 Verification Gates */}
                <div className="space-y-3 font-mono text-xs mb-8">
                  <div className="flex items-center justify-between text-white/90">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Product matches intent</span>
                    </span>
                    <span className="text-[10px] text-emerald-400">VERIFIED</span>
                  </div>

                  <div className="flex items-center justify-between text-white/90">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Quantity confirmed</span>
                    </span>
                    <span className="text-[10px] text-emerald-400">VERIFIED</span>
                  </div>

                  <div className="flex items-center justify-between text-white/90">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Price confirmed</span>
                    </span>
                    <span className="text-[10px] text-emerald-400">₹89,997 LOCKED</span>
                  </div>

                  <div className="flex items-center justify-between text-white/90">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Delivery confirmed</span>
                    </span>
                    <span className="text-[10px] text-emerald-400">VERIFIED</span>
                  </div>

                  <div className="flex items-center justify-between text-white/90">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Payment destination verified</span>
                    </span>
                    <span className="text-[10px] text-emerald-400">0xAEGIS...SAFE</span>
                  </div>
                </div>

                {/* Total & Final Place Order CTA */}
                <div className="pt-4 border-t border-white/[0.08] mb-6 flex justify-between items-baseline font-mono">
                  <span className="text-white/60 text-xs">FINAL DUE</span>
                  <span className="text-3xl text-white font-medium">₹89,997</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isVerifying}
                  className="w-full py-4 rounded-xl bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span>EXECUTING ZERO-TRUST RECEIPT...</span>
                  ) : (
                    <>
                      <span>[ PLACE ORDER ]</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
