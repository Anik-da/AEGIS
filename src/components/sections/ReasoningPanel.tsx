import React from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { Terminal, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';

export const ReasoningPanel: React.FC = () => {
  return (
    <GlassPanel className="p-8 border-white/[0.1] bg-black/75 shadow-2xl relative overflow-hidden">
      {/* Background corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-[#D71920]" />
          <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-white">
            AEGIS REASONING ENGINE / REAL-TIME EVIDENCE DOSSIER
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#8D9096]">MODEL ASSURANCE:</span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 font-medium">
            HIGH FIDELITY
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[10px] text-[#8D9096] uppercase block mb-1">EVENT</span>
          <span className="text-white font-medium">Unauthorized administrative request</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[10px] text-[#8D9096] uppercase block mb-1">CONTEXT</span>
          <span className="text-white font-medium">User role = standard (Tier 1)</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[10px] text-[#8D9096] uppercase block mb-1">TELEMETRY HISTORY</span>
          <span className="text-amber-400 font-medium">6 failed authorization attempts</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[10px] text-[#8D9096] uppercase block mb-1">CURRENT ACTION</span>
          <span className="text-white font-medium">Admin endpoint requested (/v1/vault)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#D71920]/10 border border-[#D71920]/30">
          <span className="text-[10px] text-[#D71920] uppercase block mb-1 font-bold">AI ASSESSMENT</span>
          <span className="text-white font-medium">Possible privilege escalation attempt</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[10px] text-[#8D9096] uppercase block mb-1">CONFIDENCE</span>
          <span className="text-2xl font-light font-mono text-emerald-400 font-bold">97%</span>
        </div>
      </div>

      {/* Action Outcome */}
      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-[#D71920]" />
          <div>
            <span className="text-white font-medium">DECISION: BLOCK + ISOLATE + MONITOR</span>
            <div className="text-[11px] text-[#8D9096]">
              Deterministic policy applied within 12ms. Zero false-positive impact on adjacent tenant workloads.
            </div>
          </div>
        </div>

        <div className="text-[10px] text-white/50">
          CHAIN-OF-VERIFICATION RECORDED IN SECURE ENCLAVE
        </div>
      </div>
    </GlassPanel>
  );
};
