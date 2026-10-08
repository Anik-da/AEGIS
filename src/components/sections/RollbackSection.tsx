import React, { useState } from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { aegisAudio } from '../../utils/audio';
import { GitBranch, RotateCcw, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export const RollbackSection: React.FC = () => {
  const [stage, setStage] = useState<'initial' | 'deployed' | 'spike' | 'rollback' | 'recovered'>('recovered');
  const [isSimulating, setIsSimulating] = useState(false);

  const runRollbackSimulation = () => {
    setIsSimulating(true);
    setStage('initial');
    aegisAudio.playClick();

    setTimeout(() => {
      setStage('deployed');
    }, 1000);

    setTimeout(() => {
      setStage('spike');
      aegisAudio.playAlert();
    }, 2200);

    setTimeout(() => {
      setStage('rollback');
      aegisAudio.playCoreHum();
    }, 3600);

    setTimeout(() => {
      setStage('recovered');
      aegisAudio.playVerify();
      setIsSimulating(false);
    }, 5000);
  };

  return (
    <GlassPanel className="p-8 border-white/[0.1] bg-black/60 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
        <div>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-medium flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#D71920]" />
            CANARY REGRESSION & AUTONOMOUS ZERO-DOWNTIME ROLLBACK
          </span>
          <span className="text-[11px] font-mono text-[#8D9096] block mt-0.5">
            Real-time SLO monitoring reverts unexpected anomalies in 420 milliseconds.
          </span>
        </div>

        <button
          onClick={runRollbackSimulation}
          disabled={isSimulating}
          className="px-4 py-2 rounded-lg text-xs font-mono tracking-wider bg-white/[0.04] border border-white/10 hover:border-[#D71920] text-white flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'SIMULATING REVERT...' : 'RE-RUN ROLLBACK CYCLE'}</span>
        </button>
      </div>

      {/* Sequential Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
        
        {/* Step 1 */}
        <div className={`p-4 rounded-xl border text-center font-mono transition-all ${
          stage === 'initial' || stage === 'recovered'
            ? 'bg-white/[0.03] border-emerald-500/40 text-emerald-400'
            : 'bg-white/[0.01] border-white/[0.05] text-white/50'
        }`}>
          <div className="text-[10px] text-[#8D9096] mb-1">BASE STATE</div>
          <div className="text-xs font-bold text-white">VERSION 2.4.1</div>
          <div className="text-[10px] text-emerald-400 mt-1">HEALTHY (0.01% ERR)</div>
        </div>

        <div className="hidden md:flex justify-center text-white/20">↓</div>

        {/* Step 2 */}
        <div className={`p-4 rounded-xl border text-center font-mono transition-all ${
          stage === 'deployed'
            ? 'bg-amber-400/10 border-amber-400 text-amber-400'
            : 'bg-white/[0.01] border-white/[0.05] text-white/50'
        }`}>
          <div className="text-[10px] text-[#8D9096] mb-1">CANARY ROLLOUT</div>
          <div className="text-xs font-bold text-white">PATCH 2.4.2</div>
          <div className="text-[10px] text-white/60 mt-1">DEPLOYED TO 5% TRAFFIC</div>
        </div>

        <div className="hidden md:flex justify-center text-white/20">↓</div>

        {/* Step 3 */}
        <div className={`p-4 rounded-xl border text-center font-mono transition-all ${
          stage === 'spike' || stage === 'rollback'
            ? 'bg-[#D71920]/20 border-[#D71920] text-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.3)]'
            : 'bg-white/[0.01] border-white/[0.05] text-white/50'
        }`}>
          <div className="text-[10px] text-[#8D9096] mb-1">ANOMALY TRIPWIRE</div>
          <div className="text-xs font-bold text-white">ERROR RATE ↑ 12.8%</div>
          <div className="text-[10px] text-[#D71920] mt-1 font-bold">REGRESSION DETECTED</div>
        </div>

      </div>

      {/* Outcome Banner */}
      <div className="mt-8 p-5 rounded-2xl bg-[#D71920]/[0.08] border border-[#D71920]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#D71920]" />
          <div>
            <div className="text-sm font-mono text-white font-medium">
              AUTOMATIC ROLLBACK: VERSION 2.4.1 RESTORED
            </div>
            <div className="text-xs font-mono text-[#8D9096]">
              Cluster consensus restored healthy binary in 420ms. Total affected requests: 0 (rerouted).
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#8D9096]">STATUS:</span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30 font-bold">
            RECOVERED
          </span>
        </div>
      </div>
    </GlassPanel>
  );
};
