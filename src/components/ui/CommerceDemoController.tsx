import React, { useState } from 'react';
import { Play, RotateCcw, ChevronDown, ChevronUp, Sparkles, AlertTriangle, ShieldAlert, Terminal, Wrench } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CommerceDemoController: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    triggerIntentDriftDemo,
    triggerCartMismatchDemo,
    triggerTamperDemo,
    triggerThreatSimulation,
    triggerHealSimulation,
    resetAllDemos,
    clientTamperActive,
    cartExceedsBudget,
    threatActive,
    healingActive
  } = useCommerce();

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono text-xs">
      <div className="rounded-2xl bg-[#090A0D]/95 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-md max-w-xs transition-all duration-300">
        {/* Header Toggle */}
        <div
          onClick={() => {
            aegisAudio.playClick();
            setCollapsed(!collapsed);
          }}
          className="flex items-center justify-between p-3.5 bg-white/[0.04] border-b border-white/[0.08] cursor-pointer hover:bg-white/[0.08] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />
            <span className="font-semibold text-white tracking-widest text-[11px] uppercase">
              AEGIS DEMO CONTROLLER
            </span>
          </div>
          <button className="text-white/40 hover:text-white">
            {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Action Triggers */}
        {!collapsed && (
          <div className="p-3.5 space-y-2">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
              TRIGGER REAL-TIME SCENARIOS:
            </p>

            {/* 1. Simulate Intent Drift */}
            <button
              onClick={triggerIntentDriftDemo}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.08] text-white/80 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1. SIMULATE INTENT DRIFT</span>
              </div>
              <span className="text-[9px] text-amber-400">31% DRIFT</span>
            </button>

            {/* 2. Simulate Cart Mismatch */}
            <button
              onClick={triggerCartMismatchDemo}
              className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                cartExceedsBudget
                  ? 'bg-[#D71920]/15 border-[#D71920]/40 text-[#FF5A3C]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.08] text-white/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#D71920]" />
                <span>2. SIMULATE CART MISMATCH</span>
              </div>
              <span className="text-[9px] text-[#D71920]">+₹9,997 OVER</span>
            </button>

            {/* 3. Simulate Client Tampering */}
            <button
              onClick={triggerTamperDemo}
              className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                clientTamperActive
                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.08] text-white/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>3. SIMULATE TAMPERING (₹1)</span>
              </div>
              <span className="text-[9px] text-red-400">{clientTamperActive ? 'BLOCKED' : 'READY'}</span>
            </button>

            {/* 4. Simulate Threat */}
            <button
              onClick={triggerThreatSimulation}
              className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                threatActive
                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.08] text-white/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span>4. SIMULATE THREAT</span>
              </div>
              <span className="text-[9px] text-red-400">{threatActive ? 'ISOLATED' : 'READY'}</span>
            </button>

            {/* 5. Simulate Heal */}
            <button
              onClick={triggerHealSimulation}
              className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                healingActive
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.08] text-white/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                <span>5. SIMULATE HEAL REPAIR</span>
              </div>
              <span className="text-[9px] text-blue-400">{healingActive ? 'RUNNING' : 'READY'}</span>
            </button>

            {/* Reset Button */}
            <div className="pt-2 border-t border-white/[0.08] mt-2">
              <button
                onClick={resetAllDemos}
                className="w-full py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[10px] uppercase font-bold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET ALL DEMOS TO BASELINE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
