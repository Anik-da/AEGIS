import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { GlassPanel } from '../ui/GlassPanel';
import { User, Bot, Zap, HelpCircle, Shield, CheckCircle2, Lock, Cpu } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problemSteps = [
    { icon: <User className="w-5 h-5" />, label: 'USER', detail: 'Initiates high-level prompt' },
    { icon: <Bot className="w-5 h-5" />, label: 'AI AGENT', detail: 'Interprets with latent ambiguity' },
    { icon: <Zap className="w-5 h-5 text-amber-400" />, label: 'ACTION', detail: 'Executes high-privilege RPCs' },
    { icon: <HelpCircle className="w-5 h-5 text-[#D71920]" />, label: 'UNKNOWN CONSEQUENCE', detail: 'Drift, exploits, silent failure' },
  ];

  const aegisSteps = [
    { icon: <Shield className="w-5 h-5 text-[#D71920]" />, label: 'AEGIS', detail: 'Autonomous guardian boundary' },
    { icon: <Cpu className="w-5 h-5 text-white" />, label: 'UNDERSTANDS', detail: 'Extracts cryptographic intent bounds' },
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, label: 'VALIDATES', detail: 'Monitors drift & tampering pre-flight' },
    { icon: <Lock className="w-5 h-5 text-white" />, label: 'PROTECTS', detail: 'Enforces safe zero-trust state' },
  ];

  return (
    <section id="system" className="relative w-full py-32 px-6 md:px-12 bg-[#050607] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionLabel label="THE CRISIS OF AUTONOMY" category="02" />

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-[#F4F4F1] leading-tight mb-8">
            DIGITAL SYSTEMS <br />
            ARE BECOMING <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#D71920]">
              MORE AUTONOMOUS.
            </span>
          </h2>

          <div className="inline-block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <p className="text-sm font-mono tracking-widest text-[#8D9096] uppercase mb-2">
              THE FUNDAMENTAL PARADOX
            </p>
            <p className="text-lg sm:text-2xl font-light text-white italic max-w-2xl leading-relaxed">
              "Did the system actually do what the human intended?"
            </p>
          </div>
        </div>

        {/* Visual Comparison Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: The Vulnerable Current Paradigm */}
          <GlassPanel className="p-8 sm:p-10 flex flex-col justify-between border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
                  UNCHECKED AUTONOMY
                </span>
                <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  FRAGILE
                </span>
              </div>

              {/* Sequence */}
              <div className="space-y-4">
                {problemSteps.map((step, idx) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 }}
                    className="flex items-center gap-4 p-3.5 rounded-lg bg-black/40 border border-white/[0.04]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-mono font-medium tracking-wider text-white">
                        {step.label}
                      </div>
                      <div className="text-[11px] text-[#8D9096] font-mono">
                        {step.detail}
                      </div>
                    </div>
                    {idx < problemSteps.length - 1 && (
                      <span className="text-white/20 font-mono text-xs">↓</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs font-mono text-[#8D9096] flex items-center justify-between">
              <span>OUTCOME: EXPLOITABLE BLIND SPOT</span>
              <span className="text-[#D71920]">HIGH RISK</span>
            </div>
          </GlassPanel>

          {/* Card 2: The AEGIS Protected Paradigm */}
          <GlassPanel
            variant="active"
            className="p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-[#D71920]/30"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D71920]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-white">
                  AEGIS VERIFIED AUTONOMY
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  DETERMINISTIC
                </span>
              </div>

              {/* Sequence */}
              <div className="space-y-4">
                {aegisSteps.map((step, idx) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 }}
                    className="flex items-center gap-4 p-3.5 rounded-lg bg-black/60 border border-[#D71920]/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D71920]/15 border border-[#D71920]/40 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-mono font-medium tracking-wider text-white">
                        {step.label}
                      </div>
                      <div className="text-[11px] text-[#8D9096] font-mono">
                        {step.detail}
                      </div>
                    </div>
                    {idx < aegisSteps.length - 1 && (
                      <span className="text-[#D71920]/60 font-mono text-xs">↓</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs font-mono text-[#8D9096] flex items-center justify-between">
              <span>OUTCOME: ZERO-TRUST SAFETY ASSURED</span>
              <span className="text-emerald-400">VERIFIED</span>
            </div>
          </GlassPanel>

        </div>
      </div>
    </section>
  );
};
