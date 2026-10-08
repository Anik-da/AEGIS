import React, { useState } from 'react';
import { AlertOctagon, ArrowDown, ShieldAlert, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { aegisAudio } from '../../utils/audio';

export const ThreatGuardStory: React.FC = () => {
  const [correlated, setCorrelated] = useState(true);

  const chainNodes = [
    { id: 1, title: 'FAILED LOGIN', detail: 'IP: 185.220.101.4 · Brute-force credential permutation', risk: 'MEDIUM' },
    { id: 2, title: 'FAILED LOGIN', detail: 'Rapid consecutive password attempt · Threshold hit', risk: 'MEDIUM' },
    { id: 3, title: 'SUCCESSFUL LOGIN', detail: 'Compromised credential accepted from unusual ASN', risk: 'HIGH' },
    { id: 4, title: 'UNUSUAL ENDPOINT', detail: 'Direct access to undocumented /v1/checkout/ledger', risk: 'HIGH' },
    { id: 5, title: 'AUTHORIZATION PROBE', detail: 'Role privilege parameter tampering (BOLA vector)', risk: 'CRITICAL' },
    { id: 6, title: 'SENSITIVE RESOURCE', detail: 'Unauthorized exfiltration attempt on internal vault', risk: 'CRITICAL' },
  ];

  const handleSimulate = () => {
    aegisAudio.playAlert();
    setCorrelated(false);
    setTimeout(() => {
      setCorrelated(true);
      aegisAudio.playVerify();
    }, 800);
  };

  return (
    <section id="threat-guard" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#08090B] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-[#D71920]">
              AEGIS THREATGUARD · 09
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
            WHEN AN ATTACK <br />
            <span className="italic font-light text-white/70">ISN'T ONE EVENT.</span>
          </h2>

          <p className="text-base text-white/50 font-light mt-6 leading-relaxed max-w-2xl">
            Isolated anomalies look harmless in vacuum. AEGIS uses Gemma 4 26B causal correlation to connect discrete actions across the session lifecycle, detecting coordinated attacks before damage occurs.
          </p>
        </div>

        {/* Sophisticated Intelligence Visualization */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-[#050607] border border-white/10 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-10 border-b border-white/[0.08] flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D71920]/20 border border-[#D71920]/40 flex items-center justify-center text-[#D71920]">
                <Activity className="w-5 h-5 text-[#FF5A3C]" />
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-wider uppercase text-white font-semibold">
                  CAUSAL ATTACK-CHAIN GRAPH
                </h3>
                <p className="text-[11px] font-mono text-white/40">
                  Sequential event correlation engine · MITRE ATT&CK T1110 / T1078
                </p>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              data-cursor-text="CORRELATE"
              className="py-2.5 px-6 rounded-full bg-white/[0.04] border border-white/12 text-white/80 hover:text-white font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              RE-CORRELATE ATTACK CHAIN
            </button>
          </div>

          {/* Sequential 6-Node Attack Chain Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 relative mb-12">
            {chainNodes.map((node, idx) => (
              <div
                key={node.id}
                className="group relative rounded-2xl p-5 bg-black/60 border border-white/10 flex flex-col justify-between hover:border-[#D71920]/40 transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-white/40 font-bold">0{node.id}</span>
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                      node.risk === 'CRITICAL'
                        ? 'bg-[#D71920] text-white'
                        : node.risk === 'HIGH'
                        ? 'bg-[#D71920]/30 text-[#FF5A3C]'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {node.risk}
                    </span>
                  </div>

                  <h4 className="text-sm font-mono font-bold uppercase text-white tracking-wide mb-1.5 group-hover:text-[#FF5A3C] transition-colors">
                    {node.title}
                  </h4>

                  <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                    {node.detail}
                  </p>
                </div>

                {/* Arrow connector to next node on desktop */}
                {idx < chainNodes.length - 1 && (
                  <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#D71920] font-mono font-bold text-xs pointer-events-none">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Verdict Box: POTENTIAL ATTACK CHAIN — HIGH RISK */}
          <div className="rounded-2xl bg-gradient-to-r from-[#D71920]/[0.18] via-[#120405] to-[#050607] border-2 border-[#D71920]/50 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(215,25,32,0.25)]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#D71920]/20 text-[#D71920] shrink-0 mt-1">
                <AlertOctagon className="w-6 h-6 text-[#FF5A3C]" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#FF5A3C] font-bold">
                    POTENTIAL ATTACK CHAIN IDENTIFIED
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#D71920] text-white font-mono text-xs font-bold uppercase">
                    HIGH RISK (CONFIDENCE: 95%)
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-white/80 max-w-2xl leading-relaxed mt-2">
                  AEGIS connected the 6 discrete events into a coherent attack chain.
                  The originating session was isolated, privilege traversal was neutralized, and zero customer data was compromised.
                </p>
              </div>
            </div>

            <div className="text-right font-mono shrink-0">
              <span className="text-[10px] text-white/40 uppercase block mb-1">MITIGATION DECISION</span>
              <span className="text-base text-emerald-400 font-bold uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                CONTAINED AT EDGE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
