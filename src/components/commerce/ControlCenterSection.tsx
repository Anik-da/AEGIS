import React from 'react';
import { Activity, ExternalLink, ShieldCheck } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const ControlCenterSection: React.FC = () => {
  const { setControlCenterOpen } = useCommerce();

  const metrics = [
    { label: 'PROTECTION SCORE', value: '94', color: 'text-emerald-400' },
    { label: 'INTENT EVENTS', value: '24', color: 'text-white' },
    { label: 'THREATS DETECTED', value: '3', color: 'text-[#FF5A3C]' },
    { label: 'TAMPER EVENTS', value: '1', color: 'text-amber-400' },
    { label: 'VERIFIED REPAIRS', value: '4', color: 'text-emerald-400' },
    { label: 'ROLLBACKS', value: '1', color: 'text-white/60' },
  ];

  const liveEvents = [
    { type: 'INTENT DRIFT EVALUATED', desc: 'Hardware constraint excursion (+16.2%) flagged with contextual AI review', severity: 'ALERT', time: 'Just now', badge: 'bg-amber-500/20 text-amber-300' },
    { type: 'CLIENT TAMPER INTERCEPTED', desc: 'DOM checkout payload modification (₹74,999 → ₹1) blocked by server authority', severity: 'BLOCKED', time: '6 mins ago', badge: 'bg-[#D71920]/20 text-[#FF5A3C]' },
    { type: 'THREAT CORRELATION', desc: '6-stage brute force & privilege probe correlated into high-confidence attack chain', severity: 'MITIGATED', time: '14 mins ago', badge: 'bg-[#D71920]/20 text-[#FF5A3C]' },
    { type: 'AST PATCH DEPLOYED', desc: 'Autonomous candidate patch passed sandbox verification and promoted to canary', severity: 'VERIFIED', time: '28 mins ago', badge: 'bg-emerald-500/20 text-emerald-300' },
    { type: 'CANARY ROLLBACK RESTORED', desc: 'Consensus engine restored stable build 2.4.1 in 420ms after error rate tripwire', severity: 'RESTORED', time: '41 mins ago', badge: 'bg-emerald-500/20 text-emerald-300' },
  ];

  return (
    <section id="control-center" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
                SECONDARY DESTINATION · 12
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
              AEGIS CONTROL <br />
              <span className="italic font-light text-white/70">CENTER.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="text-sm font-light text-white/50 max-w-md lg:text-right leading-relaxed">
              For security and audit operations. Real-time telemetry, cryptographic verification logs, and autonomous defense posture.
            </p>
            <button
              onClick={() => {
                aegisAudio.playVerify();
                setControlCenterOpen(true);
              }}
              data-cursor-text="EXPAND"
              className="py-3 px-6 rounded-full bg-white/[0.04] border border-white/12 text-white font-mono text-xs tracking-wider uppercase hover:bg-white/[0.1] hover:border-white/25 transition-all flex items-center gap-2.5 cursor-pointer shadow-lg"
            >
              <span>OPEN FULLSCREEN CONTROL CENTER</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D71920]" />
            </button>
          </div>
        </div>

        {/* Dashboard Preview Matrix */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-[#050607] border border-white/10 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
          {/* Key Metrics Bar: 94 / 24 / 3 / 1 / 4 / 1 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pb-10 border-b border-white/[0.08]">
            {metrics.map((m) => (
              <div key={m.label} className="p-5 rounded-2xl bg-black/60 border border-white/10 shadow-inner">
                <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-2">
                  {m.label}
                </span>
                <span className={`text-3xl font-mono font-bold tracking-tight ${m.color}`}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Live Event Stream */}
          <div className="pt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono tracking-widest text-white uppercase font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D71920]" />
                <span>LIVE DEFENSE EVENT STREAM</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FIREBASE RTDB STREAMING
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {liveEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] px-2.5 py-1 rounded-md font-bold uppercase ${evt.badge}`}>
                      {evt.severity}
                    </span>
                    <div>
                      <span className="text-white font-medium mr-2">{evt.type}</span>
                      <span className="text-white/50 text-[11px] block sm:inline">{evt.desc}</span>
                    </div>
                  </div>
                  <span className="text-white/40 text-[10px] shrink-0 font-mono">{evt.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
