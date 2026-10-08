import React from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { useAegis } from '../../context/AegisContext';
import { Activity, ShieldCheck, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export const LiveEventStream: React.FC = () => {
  const { liveEvents } = useAegis();

  return (
    <GlassPanel className="p-6 border-white/[0.08] bg-black/60 shadow-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#D71920]" />
            <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-white">
              LIVE ENCLAVE TELEMETRY STREAM
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            STREAMING
          </span>
        </div>

        {/* Real-time Event Log */}
        <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
          {liveEvents.slice(0, 7).map((evt) => (
            <div
              key={evt.id}
              className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-start gap-3 font-mono text-xs transition-all hover:bg-white/[0.04]"
            >
              <div className="mt-0.5 shrink-0">
                {evt.severity === 'critical' ? (
                  <AlertCircle className="w-3.5 h-3.5 text-[#D71920]" />
                ) : evt.severity === 'warning' ? (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                ) : evt.severity === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Info className="w-3.5 h-3.5 text-white/50" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-white font-medium truncate">{evt.type}</span>
                  <span className="text-[10px] text-white/40 shrink-0">{evt.time}</span>
                </div>
                <div className="text-[11px] text-[#8D9096] truncate">
                  {evt.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40">
        <span>ENCRYPTED RPC PROTOCOL (QUIC/mTLS)</span>
        <span>LATENCY: 1.2ms</span>
      </div>
    </GlassPanel>
  );
};
