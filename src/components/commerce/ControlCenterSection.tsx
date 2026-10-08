import React from 'react';
import { ShieldCheck, Activity, AlertTriangle, ShieldX, CheckCircle2, RotateCcw, ExternalLink } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const ControlCenterSection: React.FC = () => {
  const { setControlCenterOpen } = useCommerce();

  const metrics = [
    { label: 'SYSTEM STATUS', value: '● PROTECTED', color: 'text-emerald-400' },
    { label: 'INTENT EVENTS', value: '24', color: 'text-white' },
    { label: 'THREATS BLOCKED', value: '17', color: 'text-[#FF5A3C]' },
    { label: 'TAMPER EVENTS', value: '6', color: 'text-amber-400' },
    { label: 'VERIFIED REPAIRS', value: '4', color: 'text-emerald-400' },
    { label: 'ROLLBACKS', value: '1', color: 'text-white/60' },
  ];

  const liveEvents = [
    { type: 'INTENT DRIFT', desc: 'Hardware constraint excursion (+11%)', severity: 'MEDIUM', time: '2 mins ago', badge: 'bg-amber-500/20 text-amber-300' },
    { type: 'CLIENT TAMPERING', desc: 'DOM price payload modification (₹74,999 → ₹1)', severity: 'BLOCKED', time: '8 mins ago', badge: 'bg-[#D71920]/20 text-[#FF5A3C]' },
    { type: 'SUSPICIOUS API REQUEST', desc: 'High-frequency credential cycle on /v1/auth', severity: 'BLOCKED', time: '14 mins ago', badge: 'bg-[#D71920]/20 text-[#FF5A3C]' },
    { type: 'PATCH VERIFIED', desc: 'Autonomous AST repair hot-swapped (checkout.ts)', severity: 'RESTORED', time: '22 mins ago', badge: 'bg-emerald-500/20 text-emerald-300' },
  ];

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#08090B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                ADMINISTRATION & AUDIT · 13
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
              AEGIS CONTROL CENTER <br />
              <span className="italic font-light text-white/80">(SECONDARY SOC DASHBOARD).</span>
            </h2>
          </div>

          <button
            onClick={() => {
              aegisAudio.playVerify();
              setControlCenterOpen(true);
            }}
            className="px-6 py-3 rounded-full bg-white/[0.06] border border-white/15 text-white font-mono text-xs tracking-wider uppercase hover:bg-white/[0.12] transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span>LAUNCH FULLSCREEN SOC VIEW</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dashboard Preview Container */}
        <div className="rounded-3xl bg-black/60 border border-white/10 p-8 md:p-10 shadow-2xl">
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pb-8 border-b border-white/[0.08]">
            {metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-1">
                  {m.label}
                </span>
                <span className={`text-xl font-mono font-bold ${m.color}`}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Live Events Table */}
          <div className="pt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono tracking-widest text-white uppercase font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D71920]" />
                <span>LIVE AEGIS DEFENSE LEDGER</span>
              </span>
              <span className="text-[10px] font-mono text-white/40">CRYPTOGRAPHIC MERKLE LOG</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {liveEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${evt.badge}`}>
                      {evt.severity}
                    </span>
                    <div>
                      <span className="text-white font-medium mr-2">{evt.type}</span>
                      <span className="text-white/50 text-[11px]">{evt.desc}</span>
                    </div>
                  </div>
                  <span className="text-white/40 text-[10px] shrink-0">{evt.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
