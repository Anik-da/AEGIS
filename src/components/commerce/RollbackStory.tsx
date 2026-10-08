import React, { useState } from 'react';
import { RotateCcw, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { aegisAudio } from '../../utils/audio';

export const RollbackStory: React.FC = () => {
  const [stage, setStage] = useState<'initial' | 'deployed' | 'spike' | 'rollback' | 'restored'>('restored');
  const [running, setRunning] = useState(false);

  const steps = [
    { title: 'VERSION 2.4.1', subtitle: 'HEALTHY', status: 'BASE' },
    { title: 'VERSION 2.4.2', subtitle: 'DEPLOYED', status: 'CANARY' },
    { title: 'ERROR RATE ↑', subtitle: 'SPIKE > 5%', status: 'TRIPWIRE' },
    { title: 'AEGIS DETECTS REGRESSION', subtitle: 'SLO BREACH', status: 'ANALYZED' },
    { title: 'AUTOMATIC ROLLBACK', subtitle: 'ZERO-DOWNTIME', status: 'EXECUTING' },
    { title: '2.4.1 RESTORED', subtitle: 'RESILIENCE RATIFIED', status: 'COMPLETED' },
  ];

  const handleSimulateRollback = () => {
    aegisAudio.playClick();
    setRunning(true);
    setStage('initial');

    setTimeout(() => {
      setStage('deployed');
    }, 700);

    setTimeout(() => {
      setStage('spike');
      aegisAudio.playAlert();
    }, 1600);

    setTimeout(() => {
      setStage('rollback');
      aegisAudio.playClick();
    }, 2600);

    setTimeout(() => {
      setStage('restored');
      aegisAudio.playVerify();
      setRunning(false);
    }, 3800);
  };

  return (
    <section id="rollback-guard" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#08090B] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-[#D71920]">
              CANARY RESILIENCE · 11
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
            AUTOMATIC <br />
            <span className="italic font-light text-white/70">RECOVERY ROLLBACK.</span>
          </h2>

          <p className="text-base text-white/50 font-light mt-6 leading-relaxed max-w-2xl">
            Software updates in commerce carry regression risk. AEGIS monitors canary telemetry in real-time.
            If error rates spike above nominal thresholds, AEGIS triggers an instant zero-downtime rollback to the last verified stable build.
          </p>
        </div>

        {/* Cinematic Rollback Visualization Container */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-[#050607] border border-white/10 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08] flex-wrap gap-4">
            <div>
              <h3 className="font-mono text-sm tracking-wider uppercase text-white font-semibold">
                CANARY TELEMETRY & AUTO-ROLLBACK STATE MACHINE
              </h3>
              <p className="text-[11px] font-mono text-white/40">
                420ms Consensus Restores Stable Release v2.4.1
              </p>
            </div>

            <button
              onClick={handleSimulateRollback}
              disabled={running}
              data-cursor-text="ROLLBACK"
              className="py-3 px-6 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${running ? 'animate-spin' : ''}`} />
              <span>{running ? 'REVERTING TO 2.4.1...' : 'SIMULATE ROLLBACK CYCLE'}</span>
            </button>
          </div>

          {/* Sequential 6-Step Rollback Story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
            {steps.map((st, idx) => {
              const isSpike = idx === 2;
              const isFinal = idx === 5;
              const isStepActive = stage === 'restored' ? true : idx <= (stage === 'initial' ? 0 : stage === 'deployed' ? 1 : stage === 'spike' ? 2 : stage === 'rollback' ? 4 : 5);

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                    isFinal && stage === 'restored'
                      ? 'bg-emerald-500/[0.1] border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                      : isSpike && (stage === 'spike' || stage === 'rollback')
                      ? 'bg-[#D71920]/20 border-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.3)]'
                      : isStepActive
                      ? 'bg-white/[0.03] border-white/15'
                      : 'bg-black/40 border-white/[0.06] opacity-40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-white/40">
                      <span>0{idx + 1}</span>
                      <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                        isFinal
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isSpike
                          ? 'bg-[#D71920]/20 text-[#FF5A3C]'
                          : 'bg-white/[0.06] text-white/60'
                      }`}>
                        {st.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-mono font-bold uppercase text-white tracking-wide mb-1">
                      {st.title}
                    </h4>

                    <p className="text-xs font-mono text-white/60">
                      {st.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono text-white/40">
                      {idx < steps.length - 1 ? '↓ TRANSITION' : '✓ IMMUTABLE'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outcome Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/[0.1] via-white/[0.02] to-[#050607] border border-emerald-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  2.4.1 RESTORED · ZERO DOWNTIME RATIFIED
                </h4>
                <p className="text-xs font-mono text-white/60 mt-0.5">
                  Automated cluster consensus restored healthy binary in 420ms. Total dropped checkouts: 0.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold uppercase shrink-0">
              SLO MAINTAINED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
