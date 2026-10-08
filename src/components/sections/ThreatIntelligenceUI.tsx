import React, { useState } from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { initialThreatTimeline } from '../../data/demoThreats';
import type { ThreatEvent } from '../../types';
import { aegisAudio } from '../../utils/audio';
import { ShieldAlert, Terminal, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ThreatIntelligenceUI: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(initialThreatTimeline[4].id);
  const selectedEvent = initialThreatTimeline.find((e) => e.id === selectedEventId) || initialThreatTimeline[0];

  const handleSelect = (event: ThreatEvent) => {
    aegisAudio.playClick();
    setSelectedEventId(event.id);
  };

  return (
    <GlassPanel className="p-0 overflow-hidden border-white/[0.1] shadow-2xl bg-black/70">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-[#D71920]" />
          <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-white">
            AEGIS THREAT INTELLIGENCE OPERATIONS CONSOLE
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-[#8D9096]">FEED: <span className="text-white">ENCLAVE_INGEST</span></span>
          <span className="text-[#D71920] bg-[#D71920]/20 px-2 py-0.5 rounded border border-[#D71920]/40 font-bold">
            THREAT SCORE: 98%
          </span>
        </div>
      </div>

      {/* Tri-Pane Security Operations Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
        
        {/* Pane 1: Event Stream (Left, 4 cols) */}
        <div className="lg:col-span-4 p-5 flex flex-col gap-3 max-h-[460px] overflow-y-auto">
          <div className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase pb-2 border-b border-white/[0.06] flex items-center justify-between">
            <span>EVENT STREAM ({initialThreatTimeline.length})</span>
            <span className="text-emerald-400">STREAM ACTIVE</span>
          </div>

          {initialThreatTimeline.map((item) => {
            const isSelected = item.id === selectedEventId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer font-mono ${
                  isSelected
                    ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.18)]'
                    : 'bg-white/[0.02] border-white/[0.05] hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-white/50">{item.timestamp}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      item.risk === 'CRITICAL'
                        ? 'bg-[#D71920] text-white'
                        : item.risk === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {item.risk}
                  </span>
                </div>

                <div className="text-xs font-medium text-white mb-1">
                  {item.eventType}
                </div>

                <div className="text-[10px] text-[#8D9096] truncate">
                  {item.endpoint}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pane 2: AI Analysis (Middle, 5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase pb-2 mb-4 border-b border-white/[0.06]">
              AEGIS AI CAUSAL REASONING
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4">
              <span className="text-[10px] font-mono text-white/50 uppercase block mb-1">
                EVALUATED EVENT
              </span>
              <h4 className="text-sm font-mono text-white font-semibold">
                {selectedEvent.eventType}
              </h4>
              <p className="text-xs font-mono text-[#8D9096] mt-1">
                {selectedEvent.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#D71920]/[0.08] border border-[#D71920]/30 mb-4">
              <span className="text-[10px] font-mono text-[#D71920] uppercase font-bold block mb-1">
                AI REASONING SYNTHESIS
              </span>
              <p className="text-xs font-mono text-white/90 leading-relaxed">
                "{selectedEvent.reasoning}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[#8D9096] text-[10px] block">ORIGIN IP</span>
                <span className="text-white">{selectedEvent.ip}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[#8D9096] text-[10px] block">ATTACK STAGE</span>
                <span className="text-[#D71920] font-medium">{selectedEvent.stage}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-xs font-mono text-[#8D9096]">
            <span>CONFIDENCE RATING: 99.4%</span>
            <span>MODEL: AEGIS-NEURAL-SEC-v4</span>
          </div>
        </div>

        {/* Pane 3: Risk & Mitigation Status (Right, 3 cols) */}
        <div className="lg:col-span-3 p-6 flex flex-col justify-between bg-white/[0.01]">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase pb-2 mb-6 border-b border-white/[0.06]">
              RISK MATRIX & INTERVENTION
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/50 border border-white/[0.08] mb-6">
              <span className="text-[10px] font-mono text-[#8D9096] uppercase tracking-wider mb-2">
                RISK CLASSIFICATION
              </span>
              <div className={`text-2xl font-mono font-bold tracking-wider ${
                selectedEvent.risk === 'CRITICAL'
                  ? 'text-[#D71920]'
                  : selectedEvent.risk === 'HIGH'
                  ? 'text-amber-400'
                  : 'text-white'
              }`}>
                {selectedEvent.risk}
              </div>
              <span className="text-[10px] font-mono text-white/40 mt-1">
                EXPLOITATION PROBABILITY: HIGH
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#8D9096]">ACTION:</span>
                <span className="text-white font-medium">{selectedEvent.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8D9096]">TELEMETRY:</span>
                <span className="text-emerald-400">ISOLATED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8D9096]">ZERO TRUST:</span>
                <span className="text-[#D71920]">ENFORCED</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#D71920]/20 border border-[#D71920]/50 flex items-center justify-center gap-2 text-xs font-mono text-white font-medium">
            <ShieldCheck className="w-4 h-4 text-[#D71920]" />
            <span>EXPLOIT INTERCEPTED</span>
          </div>
        </div>

      </div>
    </GlassPanel>
  );
};
