import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, RefreshCw, XCircle, CheckCircle2, Lock } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const TamperGuardDemo: React.FC = () => {
  const { clientTamperActive, setClientTamperActive } = useCommerce();
  const [tampered, setTampered] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const handleSimulateTamper = () => {
    aegisAudio.playAlert();
    setEvaluating(true);
    setClientTamperActive(true);

    setTimeout(() => {
      setEvaluating(false);
      setTampered(true);
    }, 600);
  };

  const handleReset = () => {
    aegisAudio.playVerify();
    setTampered(false);
    setClientTamperActive(false);
  };

  return (
    <section id="tamper-guard" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Transition Away From Shopping — Cinematic Pivot */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-[#D71920]">
              AEGIS TAMPERGUARD · 08
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
            YOUR BROWSER IS NOT <br />
            <span className="italic font-light text-white/70">THE AUTHORITY.</span>
          </h2>

          <p className="text-base text-white/50 font-light mt-6 leading-relaxed max-w-2xl">
            Client-side variables can be manipulated in browser DevTools or intercepted in flight.
            AEGIS never trusts the client for critical decisions. Ground truth lives on the server.
          </p>
        </div>

        {/* Visual Storytelling Container */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-[#050607] border border-white/10 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
          {/* Controls Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08] flex-wrap gap-4">
            <div>
              <h3 className="font-mono text-sm tracking-wider uppercase text-white font-semibold">
                DOM PAYLOAD INTEGRITY TESTBENCH
              </h3>
              <p className="text-[11px] font-mono text-white/40">
                Interactive demonstration of client-side price modification vs. server reconciliation
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulateTamper}
                disabled={evaluating || tampered}
                data-cursor-text="TAMPER"
                className="py-3 px-6 rounded-full bg-[#D71920]/20 border border-[#D71920]/50 text-[#FF5A3C] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#D71920]/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {evaluating ? 'INTERCEPTING...' : 'SIMULATE TAMPER (₹74,999 → ₹1)'}
              </button>

              <button
                onClick={handleReset}
                data-cursor-text="RESET"
                className="py-3 px-5 rounded-full bg-white/[0.04] border border-white/12 text-white/70 font-mono text-xs tracking-wider uppercase hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
              >
                RESET TRUTH
              </button>
            </div>
          </div>

          {/* Visual Storytelling Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: What The Manipulated Browser Claims */}
            <div className="lg:col-span-6 rounded-2xl bg-black/60 border border-white/15 p-8 flex flex-col justify-between shadow-inner">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                    UNTRUSTED CLIENT ENVIRONMENT (BROWSER DOM)
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    tampered ? 'bg-[#D71920]/20 text-[#FF5A3C]' : 'bg-white/[0.06] text-white/40'
                  }`}>
                    {tampered ? 'MUTATED IN MEMORY' : 'NORMAL'}
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block mb-1">TARGET ITEM:</span>
                    <p className="text-white text-sm font-semibold">AEGIS PRO X1 WORKSTATION</p>
                  </div>

                  <div>
                    <span className="text-white/40 block mb-1">NORMAL AUTHORITATIVE PRICE:</span>
                    <p className="text-white text-lg">₹74,999</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                      CLIENT PAYLOAD:
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className={`text-3xl font-bold font-mono ${
                        tampered ? 'text-[#FF5A3C] animate-pulse' : 'text-white'
                      }`}>
                        {tampered ? '₹1' : '₹74,999'}
                      </span>
                      {tampered && (
                        <span className="text-xs text-[#FF5A3C] font-mono uppercase font-bold">
                          (MALICIOUS INJECTION)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06] mt-6 text-[11px] font-mono text-white/40">
                {tampered ? '⚠️ Attacker injected ₹1 into client checkout payload' : '✓ Client values match expected schema'}
              </div>
            </div>

            {/* Right: Authoritative Server Truth & Interception Decision */}
            <div className={`lg:col-span-6 rounded-2xl border p-8 flex flex-col justify-between transition-all duration-500 shadow-2xl ${
              tampered
                ? 'bg-gradient-to-b from-[#D71920]/[0.16] via-[#090A0D] to-[#050607] border-[#D71920]/60'
                : 'bg-white/[0.02] border-white/15'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-4 h-4 ${tampered ? 'text-[#FF5A3C]' : 'text-emerald-400'}`} />
                    <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase font-semibold">
                      SERVER-SIDE AEGIS ENCLAVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">TRUTH BOUNDARY</span>
                </div>

                {tampered ? (
                  /* Tampering Detected Story Card */
                  <div className="space-y-4 font-mono">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D71920]/20 border border-[#D71920]/40 w-fit">
                      <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" />
                      <span className="text-xs font-bold text-[#FF5A3C] uppercase tracking-wider">
                        SECURITY-RELEVANT TAMPERING DETECTED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-white/40 block text-[10px]">CLIENT VALUE:</span>
                        <span className="text-xl font-bold text-[#FF5A3C]">₹1</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-white/40 block text-[10px]">AUTHORITATIVE SERVER VALUE:</span>
                        <span className="text-xl font-bold text-white">₹74,999</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#D71920]/20 border border-[#D71920]/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-6 h-6 text-[#D71920]" />
                        <div>
                          <span className="text-sm font-bold uppercase text-white block">TRANSACTION</span>
                          <span className="text-xs text-[#FF5A3C] font-bold">BLOCKED IMMEDIATELY</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded bg-[#D71920] text-white font-bold uppercase">
                        ZERO CHARGE
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Baseline Normal State */
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>NOMINAL SERVER RECONCILIATION</span>
                    </div>
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                      <span className="text-white/40 block text-[10px] mb-1">AUTHORITATIVE SERVER VALUE:</span>
                      <span className="text-2xl font-bold text-white">₹74,999</span>
                    </div>
                    <p className="text-white/60 leading-relaxed">
                      Every transaction is verified against catalog records in real-time. Unauthenticated modifications cannot execute.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/[0.08] mt-6 flex justify-between items-center text-[10px] font-mono text-white/40">
                <span>DATABASE INTEGRITY: GUARANTEED</span>
                <span className="text-emerald-400">100% UNCOMPROMISED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
