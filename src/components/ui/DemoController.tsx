import React, { useState } from 'react';
import { useAegis } from '../../context/AegisContext';
import { GlassPanel } from './GlassPanel';
import { 
  ShieldAlert, 
  Terminal, 
  RotateCcw, 
  Cpu, 
  GitBranch, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Activity,
  Sliders
} from 'lucide-react';

export const DemoController: React.FC = () => {
  const {
    defenseStatus,
    triggerDemoScenario,
    resetDefenseState,
    soundEnabled,
    toggleSound,
    isSimulating,
    activeScenarioName,
  } = useAegis();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Control HUD */}
      {isOpen ? (
        <GlassPanel
          variant={defenseStatus !== 'protected' ? 'alert' : 'default'}
          className="p-4 mb-2 w-80 sm:w-96 shadow-2xl border-white/10"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#D71920]" />
              <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-white">
                DEMO CONTROLLER / SIMULATION
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Mute synthesized audio' : 'Enable synthesized audio'}
                className="p-1 rounded text-white/50 hover:text-white transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-white/80" /> : <VolumeX className="w-3.5 h-3.5 text-white/30" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-white/50 hover:text-white transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-[11px] text-[#8D9096] mb-3 leading-relaxed">
            Trigger simulated security events to demonstrate real-time AI defensive countermeasures across all 4 layers.
          </div>

          {/* Trigger action buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => triggerDemoScenario('intent_drift')}
              disabled={isSimulating}
              className={`p-2 rounded text-left border transition-all text-[11px] font-mono flex items-center gap-2 ${
                activeScenarioName === 'intent_drift'
                  ? 'bg-[#D71920]/30 border-[#D71920] text-white'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/20 text-white/80'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
              <span>1. Intent Drift</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('attack_chain')}
              disabled={isSimulating}
              className={`p-2 rounded text-left border transition-all text-[11px] font-mono flex items-center gap-2 ${
                activeScenarioName === 'attack_chain'
                  ? 'bg-[#D71920]/30 border-[#D71920] text-white'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/20 text-white/80'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
              <span>2. Attack Chain</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('client_tamper')}
              disabled={isSimulating}
              className={`p-2 rounded text-left border transition-all text-[11px] font-mono flex items-center gap-2 ${
                activeScenarioName === 'client_tamper'
                  ? 'bg-[#D71920]/30 border-[#D71920] text-white'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/20 text-white/80'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
              <span>3. Tamper Client</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('self_heal')}
              disabled={isSimulating}
              className={`p-2 rounded text-left border transition-all text-[11px] font-mono flex items-center gap-2 ${
                activeScenarioName === 'self_heal'
                  ? 'bg-[#D71920]/30 border-[#D71920] text-white'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/20 text-white/80'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>4. Self-Heal AST</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('rollback')}
              disabled={isSimulating}
              className={`p-2 rounded text-left border transition-all text-[11px] font-mono flex items-center gap-2 col-span-2 ${
                activeScenarioName === 'rollback'
                  ? 'bg-[#D71920]/30 border-[#D71920] text-white'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/20 text-white/80'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>5. Autonomous Canary Rollback</span>
            </button>
          </div>

          {/* Reset button */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8D9096]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span>STATUS: {defenseStatus.toUpperCase()}</span>
            </div>

            <button
              onClick={resetDefenseState}
              className="text-[11px] font-mono text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET TO PROTECTED</span>
            </button>
          </div>
        </GlassPanel>
      ) : null}

      {/* Floating Pill Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#090A0C]/90 backdrop-blur-md border border-[#D71920]/40 hover:border-[#D71920] text-white shadow-[0_0_20px_rgba(215,25,32,0.25)] hover:shadow-[0_0_30px_rgba(215,25,32,0.45)] transition-all font-mono text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D71920] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D71920]" />
          </span>
          <span className="tracking-[0.16em] uppercase">DEMO CONTROLLER</span>
          <ChevronUp className="w-3.5 h-3.5 text-white/60" />
        </button>
      )}
    </div>
  );
};
