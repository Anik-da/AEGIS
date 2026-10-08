import React, { useState } from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { useAegis } from '../../context/AegisContext';
import { StatusIndicator } from '../ui/StatusIndicator';
import { MagneticButton } from '../ui/MagneticButton';
import { 
  Shield, 
  ShieldAlert, 
  X, 
  Activity, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Lock, 
  RotateCcw, 
  ArrowUpRight,
  TrendingDown,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';

interface CommandCenterProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ isModal = false, onClose }) => {
  const {
    defenseStatus,
    securityScore,
    setCommandCenterOpen,
    liveEvents,
    triggerDemoScenario,
    resetDefenseState,
    isSimulating,
  } = useAegis();

  const [activeTab, setActiveTab] = useState<'overview' | 'threats' | 'intent' | 'repairs' | 'reasoning'>('overview');

  const stats = [
    { label: 'SYSTEM STATUS', value: defenseStatus.toUpperCase(), highlight: defenseStatus === 'protected' ? 'text-emerald-400' : 'text-[#D71920]' },
    { label: 'THREAT LEVEL', value: defenseStatus === 'protected' ? 'LOW' : 'ELEVATED', highlight: defenseStatus === 'protected' ? 'text-white' : 'text-[#D71920]' },
    { label: 'ACTIVE SESSIONS', value: '1,284', highlight: 'text-white' },
    { label: 'THREATS DETECTED', value: '17', highlight: 'text-white' },
    { label: 'THREATS BLOCKED', value: '14', highlight: 'text-emerald-400' },
    { label: 'TAMPER EVENTS', value: '6', highlight: 'text-amber-400' },
    { label: 'AUTO REPAIRS', value: '4', highlight: 'text-blue-400' },
    { label: 'ROLLBACKS', value: '1', highlight: 'text-white/60' },
    { label: 'AI CONFIDENCE', value: `${securityScore.overall}.8%`, highlight: 'text-emerald-400' },
  ];

  const recentRepairs = [
    { id: 'R-1', file: 'auth.ts', issue: 'Header spoofing flaw bypassed', status: 'PATCH VERIFIED', time: '14m ago' },
    { id: 'R-2', file: 'api.ts', issue: 'Unbounded rate limit probe', status: 'RESOLVED', time: '1h ago' },
    { id: 'R-3', file: 'checkout.ts', issue: 'Stale session token race condition', status: 'CANARY HEALTHY', time: '3h ago' },
  ];

  return (
    <div className={`w-full ${isModal ? 'fixed inset-0 z-50 bg-[#050607]/95 backdrop-blur-2xl p-4 sm:p-8 overflow-y-auto' : 'py-20 px-6 max-w-7xl mx-auto'}`}>
      <GlassPanel className="p-6 sm:p-8 border-white/[0.1] bg-black/80 shadow-2xl">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D71920]/20 border border-[#D71920]/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#D71920]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-mono font-bold tracking-[0.2em] text-white uppercase">
                  AEGIS COMMAND CENTER
                </h3>
                <StatusIndicator status={defenseStatus === 'protected' ? 'protected' : 'alert'} />
              </div>
              <span className="text-xs font-mono text-[#8D9096]">
                AUTONOMOUS ZERO-TRUST THREAT INTELLIGENCE & REPAIR OPERATIONS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetDefenseState}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider bg-white/[0.04] border border-white/10 hover:border-white/30 text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>NORMALIZE SYSTEM</span>
            </button>

            {isModal && (
              <button
                onClick={() => {
                  setCommandCenterOpen(false);
                  onClose?.();
                }}
                className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close command center"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 9 Key Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left font-mono"
            >
              <div className="text-[9px] text-[#8D9096] uppercase tracking-wider mb-1 truncate">
                {s.label}
              </div>
              <div className={`text-base font-bold tracking-tight ${s.highlight}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/[0.06] overflow-x-auto text-xs font-mono">
          {[
            { id: 'overview', label: 'OVERVIEW MATRIX' },
            { id: 'threats', label: 'THREAT CHAINS' },
            { id: 'intent', label: 'INTENT MONITOR' },
            { id: 'repairs', label: 'AUTO REPAIRS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg transition-all uppercase tracking-wider cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white border border-white/20 font-bold'
                  : 'text-[#8D9096] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview Grid */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Risk Distribution & System Health (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="p-6 rounded-2xl bg-black/50 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-widest text-[#8D9096] uppercase">
                    ACTIVE SESSIONS & RISK DISTRIBUTION
                  </span>
                  <span className="text-xs font-mono text-emerald-400">99.8% NOMINAL</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs mb-4">
                  <div className="p-3 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20">
                    <span className="text-[10px] text-emerald-400 block">TIER 1 (SAFE)</span>
                    <span className="text-lg font-bold text-white">1,268</span>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/[0.08] border border-amber-500/20">
                    <span className="text-[10px] text-amber-400 block">MONITORED</span>
                    <span className="text-lg font-bold text-white">14</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#D71920]/[0.1] border border-[#D71920]/30">
                    <span className="text-[10px] text-[#D71920] block">QUARANTINED</span>
                    <span className="text-lg font-bold text-white">2</span>
                  </div>
                </div>

                {/* Simulated session activity stream */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono text-[#8D9096] space-y-2">
                  <div className="flex justify-between">
                    <span>1,284 active micro-enclaves holding signed session state</span>
                    <span className="text-emerald-400">SYNCED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zero-trust token verification latency average</span>
                    <span className="text-white">0.82ms</span>
                  </div>
                </div>
              </div>

              {/* Recent Autonomous Repairs */}
              <div className="p-6 rounded-2xl bg-black/50 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-widest text-[#8D9096] uppercase">
                    RECENT AUTONOMOUS REPAIRS & CANARY ROLLOUTS
                  </span>
                  <span className="text-xs font-mono text-blue-400">4 APPLIED</span>
                </div>

                <div className="space-y-2.5">
                  {recentRepairs.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] font-mono text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{r.file}</span>
                          <span className="text-[10px] text-[#8D9096]">({r.id})</span>
                        </div>
                        <div className="text-[11px] text-[#8D9096] mt-0.5">{r.issue}</div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                          {r.status}
                        </span>
                        <div className="text-[10px] text-white/40 mt-1">{r.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Security Events Feed (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/50 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                  <span className="text-xs font-mono tracking-widest text-[#8D9096] uppercase">
                    ACTIVE TELEMETRY EVENT LOG
                  </span>
                  <span className="text-[10px] font-mono text-white/50">LIVE INGESTION</span>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {liveEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] font-mono text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{evt.type}</span>
                        <span className="text-[10px] text-white/40">{evt.time}</span>
                      </div>
                      <p className="text-[11px] text-[#8D9096] leading-relaxed">
                        {evt.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#8D9096]">
                <span>AUDIT RECORD: IMMUTABLE MERKLE TREE</span>
                <span className="text-emerald-400 font-bold">100% HEALTHY</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Threats */}
        {activeTab === 'threats' && (
          <div className="p-6 rounded-2xl bg-black/50 border border-white/[0.06] font-mono text-xs">
            <h4 className="text-sm font-bold text-white mb-4">CORRELATED THREAT TRAJECTORY ANALYSIS</h4>
            <p className="text-[#8D9096] mb-6">
              AEGIS intercepts horizontal reconnaissance attempts before privilege escalation payloads reach internal database or enclave barriers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-white font-bold block mb-1">RECONNAISSANCE MITIGATION</span>
                <p className="text-[#8D9096] text-[11px]">Unauthenticated endpoint crawling throttled with dynamic cryptographic tarpits.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-white font-bold block mb-1">AUTHENTICATION ENCLAVE</span>
                <p className="text-[#8D9096] text-[11px]">Impossible velocity detection triggers out-of-band hardware attestation.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Intent */}
        {activeTab === 'intent' && (
          <div className="p-6 rounded-2xl bg-black/50 border border-white/[0.06] font-mono text-xs">
            <h4 className="text-sm font-bold text-white mb-4">INTENT BOUNDARY & CONSTRAINTS TELEMETRY</h4>
            <p className="text-[#8D9096] mb-4">
              Current system intent bounds: Budget ≤ ₹80,000, RAM ≥ 32GB, Task focus: AI/ML.
            </p>
            <div className="p-4 rounded-xl bg-[#D71920]/10 border border-[#D71920]/30 text-white">
              INTENT DRIFT INTERVENTION ACTIVE: Cart addition prevented pending human acknowledgment.
            </div>
          </div>
        )}

        {/* Tab 4: Repairs */}
        {activeTab === 'repairs' && (
          <div className="p-6 rounded-2xl bg-black/50 border border-white/[0.06] font-mono text-xs">
            <h4 className="text-sm font-bold text-white mb-4">AUTONOMOUS AST REPAIRS & CANARY CANVASES</h4>
            <p className="text-[#8D9096] mb-4">
              Patch candidate PATCH-2026-0491 successfully verified across 4 test suites and deployed to canary ring.
            </p>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              ZERO REGRESSIONS REPORTED ACROSS 10,000 SYNTHETIC TRAFFIC CYCLES.
            </div>
          </div>
        )}

      </GlassPanel>
    </div>
  );
};
