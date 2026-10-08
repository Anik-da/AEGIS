import React, { useState } from 'react';
import { ShieldAlert, Activity, AlertOctagon, CheckCircle2, Lock } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const ThreatGuardStory: React.FC = () => {
  const { threatActive, triggerThreatSimulation, clearThreatSimulation } = useCommerce();

  const events = [
    { type: 'SUSPICIOUS REQUEST', detail: 'Rapid credential payload cycling over /api/v1/auth', status: 'ANOMALOUS' },
    { type: 'ABNORMAL SESSION', detail: 'Geo-velocity vector mismatch (Delhi → Frankfurt in 200ms)', status: 'CORRELATED' },
    { type: 'AUTHORIZATION PROBE', detail: 'Unauthorized traversal test on /v1/checkout/ledger', status: 'ALERT' },
    { type: 'UNUSUAL API ACCESS', detail: 'High-frequency inventory scraping outside user intent envelope', status: 'CONTAINED' },
  ];

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#08090B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              THREATGUARD · 11
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
            WHEN SOMETHING <br />
            <span className="italic font-light text-white/80">DOESN'T BELONG.</span>
          </h2>
          <p className="text-base text-white/50 font-light mt-6 leading-relaxed">
            Multi-stage automated attacks rarely happen as single errors. AEGIS correlates probe signals
            across the session lifecycle, isolating malicious actors before user data or inventory can be compromised.
          </p>
        </div>

        {/* Threat Correlation Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Sequence Event Log */}
          <div className="lg:col-span-7 rounded-3xl bg-black/60 border border-white/10 p-8 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                SESSION TELEMETRY & ATTACK SIGNALS
              </span>
              <span className="text-[10px] font-mono text-emerald-400">CORRELATION ENGINE ONLINE</span>
            </div>

            <div className="space-y-3">
              {events.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono text-xs"
                >
                  <div>
                    <span className="text-[10px] text-[#D71920] uppercase font-semibold block mb-0.5">
                      {evt.type}
                    </span>
                    <span className="text-white/70">{evt.detail}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/60 shrink-0 ml-4">
                    {evt.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
              <span className="text-white/40">CAUSAL SEQUENCE REASONING</span>
              <button
                onClick={() => {
                  if (threatActive) clearThreatSimulation();
                  else triggerThreatSimulation();
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white/80 hover:text-white hover:bg-white/[0.1] text-xs transition-all cursor-pointer"
              >
                {threatActive ? 'RESET THREAT SIMULATION' : 'SIMULATE MULTI-STEP ATTACK'}
              </button>
            </div>
          </div>

          {/* Right: AEGIS Verdict & Blast-Radius Containment */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#D71920]/[0.12] to-transparent border border-[#D71920]/40 p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#D71920]/20 text-[#D71920]">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold uppercase text-white tracking-wider">
                    THREAT DETECTED
                  </h3>
                  <span className="text-[10px] font-mono text-white/50">PROBING VECTOR NEUTRALIZED</span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs mb-8">
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex justify-between items-center">
                  <span className="text-white/50">Risk Classification:</span>
                  <span className="text-[#FF5A3C] font-bold">HIGH (98.4% Confidence)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex justify-between items-center">
                  <span className="text-white/50">Action Taken:</span>
                  <span className="text-emerald-400 font-bold">BLOCKED (Session Quarantined)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex justify-between items-center">
                  <span className="text-white/50">Blast Radius:</span>
                  <span className="text-white">Zero Customer Impact</span>
                </div>
              </div>

              <p className="text-xs font-mono text-white/70 leading-relaxed">
                The session sequence was correlated across 4 distinct edge requests. The client IP was rate-limited
                and sensitive commerce endpoints were shielded without interrupting authentic shoppers.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>ZERO DATA EXFILTRATION</span>
              <span className="text-emerald-400 font-bold">GUARD: OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
