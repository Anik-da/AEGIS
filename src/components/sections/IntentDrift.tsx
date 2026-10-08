import React, { useState } from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { driftTimelineData } from '../../data/demoIntent';
import { Activity, Clock, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export const IntentDrift: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<number>(driftTimelineData.length - 1);
  const activeItem = driftTimelineData[selectedPoint];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#D71920]" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-medium">
            INTENT DRIFT TIMELINE / SESSION ANALYSIS
          </span>
        </div>
        <span className="text-xs font-mono text-[#D71920] bg-[#D71920]/10 px-2.5 py-0.5 rounded border border-[#D71920]/30">
          DRIFT DETECTED: 69%
        </span>
      </div>

      {/* Interactive Horizontal Timeline Nodes */}
      <div className="relative py-6">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-[#D71920] -translate-y-1/2 opacity-40" />

        <div className="relative flex justify-between items-center z-10">
          {driftTimelineData.map((item, index) => {
            const isSelected = selectedPoint === index;
            const isDrift = item.status === 'drift_detected';
            const isWarning = item.status === 'warning';

            return (
              <button
                key={item.id}
                onClick={() => setSelectedPoint(index)}
                className="flex flex-col items-center group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#D71920] text-white ring-4 ring-[#D71920]/30 scale-110 shadow-[0_0_20px_#D71920]'
                      : isDrift
                      ? 'bg-black/90 border-2 border-[#D71920] text-[#D71920]'
                      : isWarning
                      ? 'bg-black/90 border-2 border-amber-500 text-amber-500'
                      : 'bg-black/90 border-2 border-emerald-500 text-emerald-400'
                  }`}
                >
                  {isDrift ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                </div>

                <span className="mt-2 text-[10px] font-mono text-white/70 group-hover:text-white">
                  {item.time}
                </span>
                <span className="text-[11px] font-mono font-medium text-white/90">
                  {item.currency}{item.price.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Deep Dive Inspector */}
      <GlassPanel className="p-6 bg-black/50 border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activeItem.time}
              </span>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/[0.05] text-white">
                {activeItem.action}
              </span>
            </div>

            <h4 className="text-lg font-light text-white mb-2">
              {activeItem.productTitle}
            </h4>

            <p className="text-xs font-mono text-[#8D9096] leading-relaxed">
              {activeItem.reasoning}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase mb-1">
              ALIGNMENT SCORE
            </span>
            <div className={`text-4xl font-light font-mono ${
              activeItem.intentDriftScore <= 35 ? 'text-[#D71920]' : activeItem.intentDriftScore <= 80 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {activeItem.intentDriftScore}%
            </div>
            <span className="text-[10px] font-mono text-white/50 mt-1">
              {activeItem.intentDriftScore <= 35 ? 'DRIFT ALERT ACTIVE' : 'ACCEPTABLE RANGE'}
            </span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
