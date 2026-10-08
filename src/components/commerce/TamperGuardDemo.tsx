import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, RefreshCw, Terminal, CheckCircle2, XCircle } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const TamperGuardDemo: React.FC = () => {
  const { clientTamperActive, setClientTamperActive } = useCommerce();
  const [tamperedPriceInput, setTamperedPriceInput] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [serverCheckResult, setServerCheckResult] = useState<'IDLE' | 'BLOCKED' | 'NORMAL'>('IDLE');

  const handleSimulateTamper = () => {
    aegisAudio.playAlert();
    setClientTamperActive(true);
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setServerCheckResult('BLOCKED');
    }, 700);
  };

  const handleReset = () => {
    aegisAudio.playVerify();
    setClientTamperActive(false);
    setServerCheckResult('NORMAL');
  };

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              TAMPERGUARD · 10
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            CLIENT-SIDE TAMPERING. <br />
            <span className="italic font-light text-white/80">SERVER-SIDE TRUTH.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Anyone can inspect elements, mutate local state in DevTools, or forge client payloads.
            AEGIS guarantees that the browser is never trusted alone for authorization or settlement.
          </p>
        </div>

        {/* Central Callout Banner */}
        <div className="mb-12 py-5 px-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
          <span className="text-xl sm:text-2xl md:text-3xl font-mono tracking-widest uppercase text-white/90 font-light">
            "THE BROWSER IS NOT THE TRUST BOUNDARY."
          </span>
        </div>

        {/* Interactive Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Simulated Browser DOM State */}
          <div className="lg:col-span-6 rounded-3xl bg-black/60 border border-white/15 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2 font-mono text-xs text-white/60">
                  <Terminal className="w-4 h-4 text-[#D71920]" />
                  <span>CLIENT-SIDE DOM MEMORY INSPECTOR</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-white/40">
                  UNTRUSTED RUNTIME
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-white/40 block mb-1">TARGET OBJECT:</span>
                  <p className="text-white font-medium">AEGIS PRO X1 (SKU: X1-32GB-RTX)</p>
                </div>

                <div>
                  <span className="text-white/40 block mb-1">DISPLAYED PRICE IN DOM:</span>
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-bold ${clientTamperActive ? 'text-[#FF5A3C] line-through' : 'text-white'}`}>
                      ₹74,999
                    </span>
                    {clientTamperActive && (
                      <span className="text-2xl font-bold text-red-500 animate-pulse">
                        ₹1 (FORGED)
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase mb-1">PAYLOAD FORGERY ACTION</span>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Clicking below simulates a malicious user altering the client-side cart price payload in memory to ₹1 before sending.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex gap-3">
              <button
                onClick={handleSimulateTamper}
                className="flex-1 py-3.5 rounded-xl bg-[#D71920]/20 border border-[#D71920]/40 text-[#FF5A3C] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#D71920]/30 transition-all cursor-pointer"
              >
                SIMULATE CLIENT HACK (₹1)
              </button>
              <button
                onClick={handleReset}
                className="py-3.5 px-5 rounded-xl bg-white/[0.06] border border-white/15 text-white/70 font-mono text-xs tracking-wider uppercase hover:bg-white/[0.1] transition-all cursor-pointer"
              >
                RESET
              </button>
            </div>
          </div>

          {/* Right Column: AEGIS Authoritative Server Verification Gate */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2 font-mono text-xs text-white/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>AUTHORITATIVE AEGIS SERVER ENGINE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  TRUE TRUST BOUNDARY
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-white/50">EXPECTED SERVER PRICE:</span>
                  <span className="text-white font-bold">₹74,999 (Verified)</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-white/50">CLIENT SUBMITTED VALUE:</span>
                  <span className={clientTamperActive ? 'text-[#FF5A3C] font-bold' : 'text-white font-bold'}>
                    {clientTamperActive ? '₹1 (Tampered)' : '₹74,999 (Nominal)'}
                  </span>
                </div>

                {/* Final Result Card */}
                <div
                  className={`p-5 rounded-xl border transition-all ${
                    clientTamperActive
                      ? 'bg-[#D71920]/15 border-[#D71920]/40'
                      : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 font-mono font-bold text-sm">
                    {clientTamperActive ? (
                      <>
                        <XCircle className="w-5 h-5 text-[#D71920]" />
                        <span className="text-[#FF5A3C]">TRANSACTION BLOCKED</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300">INTEGRITY VERIFIED</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {clientTamperActive
                      ? 'AEGIS cryptographic hash mismatch detected. Client DOM modification was intercepted and rejected. Zero charge executed.'
                      : 'Cryptographic signature matches server database. Session is protected and ready for settlement.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex justify-between items-center text-[11px] font-mono text-white/40">
              <span>ZERO TRUST CRYPTOGRAPHIC RATIFICATION</span>
              <span className="text-emerald-400">STATUS: 100% IMMUTABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
