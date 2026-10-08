import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { GlassPanel } from '../ui/GlassPanel';
import { MagneticButton } from '../ui/MagneticButton';
import { SelfHealingPipeline } from './SelfHealingPipeline';
import { RollbackSection } from './RollbackSection';
import { aegisAudio } from '../../utils/audio';
import { 
  RefreshCw, 
  CheckCircle2, 
  Terminal, 
  FileCode, 
  Cpu, 
  ShieldCheck, 
  Play, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const HealGuardSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [isPatching, setIsPatching] = useState<boolean>(false);

  const testSuite = [
    { name: 'Security Fuzzing Suite (OWASP Top 10)', passed: true, time: '140ms' },
    { name: 'RBAC Authorization Regression Suite', passed: true, time: '85ms' },
    { name: 'Behavior & Contract Verification', passed: true, time: '110ms' },
    { name: 'AST Memory Leak & Performance Invariant', passed: true, time: '45ms' },
  ];

  const handleSimulatePatch = () => {
    setIsPatching(true);
    setActiveStep(1);
    aegisAudio.playAlert();

    setTimeout(() => {
      setActiveStep(2);
      aegisAudio.playCoreHum();
    }, 1200);

    setTimeout(() => {
      setActiveStep(3);
    }, 2400);

    setTimeout(() => {
      setActiveStep(4);
      aegisAudio.playVerify();
      setIsPatching(false);
    }, 3800);
  };

  return (
    <section id="heal" className="relative w-full py-32 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[450px] bg-radial from-[#D71920]/[0.04] via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionLabel label="HEALGUARD" category="LAYER 04" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-tight mb-6">
            WHEN SOFTWARE <br />
            BREAKS, AEGIS <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D71920]">
              DOESN'T PANIC.
            </span>
          </h2>

          <p className="text-lg sm:text-xl font-mono text-[#D71920] tracking-widest uppercase mb-4">
            Detect. Understand. Patch. Verify. Recover.
          </p>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8D9096] font-light leading-relaxed">
            Legacy systems crash or wait hours for human escalation. AEGIS automatically identifies root cause vulnerabilities, writes zero-trust cryptographic patches, runs automated regression verification, and canaries the fix safely.
          </p>
        </div>

        {/* Interactive Self-Healing Studio */}
        <div className="w-full mb-20">
          <GlassPanel className="p-0 overflow-hidden border-white/[0.1] shadow-2xl bg-black/70">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/[0.08] gap-4">
              <div className="flex items-center gap-3">
                <RefreshCw className={`w-4 h-4 text-[#D71920] ${isPatching ? 'animate-spin' : ''}`} />
                <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-white">
                  AUTONOMOUS AST CODE REPAIR / AUTH.TS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8D9096]">STATUS:</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SYSTEM HEALTHY
                </span>
                <MagneticButton
                  variant="primary"
                  size="sm"
                  onClick={handleSimulatePatch}
                  disabled={isPatching}
                  icon={<Play className="w-3 h-3" />}
                >
                  {isPatching ? 'RUNNING PATCH CYCLE...' : 'TRIGGER REPAIR CYCLE'}
                </MagneticButton>
              </div>
            </div>

            {/* Content: Vulnerability to Patch Flow */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Diagnostics & Root Cause */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase mb-2 block">
                    01 / ISOLATED VULNERABILITY
                  </span>
                  <div className="p-4 rounded-xl bg-[#D71920]/10 border border-[#D71920]/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#D71920]">
                        FLAW CVE-2026-AEGIS-04
                      </span>
                      <span className="text-[10px] font-mono text-white/60 bg-black/40 px-2 py-0.5 rounded">
                        FILE: auth.ts
                      </span>
                    </div>
                    <p className="text-xs font-mono text-white/90 leading-relaxed">
                      Client-controlled header parameter <span className="text-[#D71920]">"x-role"</span> directly evaluated without server-side signature verification.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase mb-2 block">
                    02 / AI ROOT CAUSE ANALYSIS
                  </span>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-[#8D9096] leading-relaxed">
                    "AST parser determined that commit 7b19a introduced an unauthenticated fallback branch when cache is warm. Replacing unsafe branch with cryptographic session assertion."
                  </div>
                </div>

                {/* Automated Test Suite Verification */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase mb-2 block">
                    03 / TEST SUITE EXECUTION & VERIFICATION
                  </span>
                  <div className="space-y-2">
                    {testSuite.map((t, idx) => (
                      <div
                        key={t.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/[0.05] text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-white/80">{t.name}</span>
                        </div>
                        <span className="text-white/40 text-[10px]">{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Code Diff View */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase">
                    04 / SYNTHESIZED PATCH DIFF (AST VERIFIED)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    CANARY READY
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-black/90 border border-white/[0.08] font-mono text-xs overflow-x-auto shadow-inner">
                  <div className="text-[#8D9096] pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                    <span>--- a/src/auth/tokenValidator.ts</span>
                    <span>+++ b/src/auth/tokenValidator.ts</span>
                  </div>

                  {/* Red deletions */}
                  <div className="space-y-1 mb-4 text-[#D71920] bg-[#D71920]/[0.08] p-3 rounded-lg border-l-2 border-[#D71920]">
                    <div>- // INSECURE CLIENT PARAMETER EVALUATION</div>
                    <div>- const clientRole = req.headers["x-role"];</div>
                    <div>- if (clientRole === "admin") grantAccess();</div>
                  </div>

                  {/* Green additions */}
                  <div className="space-y-1 text-emerald-400 bg-emerald-500/[0.08] p-3 rounded-lg border-l-2 border-emerald-400">
                    <div>+ // AEGIS CRYPTOGRAPHIC ENCLAVE VERIFICATION</div>
                    <div>+ const session = await aegisCore.verifyEnclaveSession(req.token);</div>
                    <div>+ if (!session.hasPermission("admin")) &#123;</div>
                    <div>+ &nbsp;&nbsp;throw new AegisRejectionError("TAMPER_DETECTED");</div>
                    <div>+ &#125;</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.08] text-[10px] text-[#8D9096] flex items-center justify-between">
                    <span>PATCH ID: PATCH-2026-0491</span>
                    <span>ESTIMATED RISK: 0.02%</span>
                  </div>
                </div>

                {/* Final status badge */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-white">DEPLOYMENT STATUS: CANARY 100% HEALTHY</span>
                  </div>
                  <span className="text-[#8D9096]">LATENCY IMPACT: 0.0ms</span>
                </div>
              </div>

            </div>
          </GlassPanel>
        </div>

        {/* Section 16: Safety-Gated Horizontal Pipeline */}
        <div className="w-full mb-16">
          <SelfHealingPipeline />
        </div>

        {/* Section 17: Rollback Visual Simulation */}
        <div className="w-full">
          <RollbackSection />
        </div>

      </div>
    </section>
  );
};
