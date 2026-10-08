import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { GlassPanel } from '../ui/GlassPanel';
import { MagneticButton } from '../ui/MagneticButton';
import { IntentDrift } from './IntentDrift';
import { 
  userIntentQuery, 
  extractedConstraints, 
  currentBrowsedProduct, 
  intentConflicts 
} from '../../data/demoIntent';
import { aegisAudio } from '../../utils/audio';
import { 
  Compass, 
  AlertTriangle, 
  CheckCircle, 
  Laptop, 
  Sliders, 
  ArrowRight,
  ShieldAlert,
  Search,
  ShoppingCart
} from 'lucide-react';

export const IntentGuardSection: React.FC = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [overridden, setOverridden] = useState(false);

  const handleReview = () => {
    aegisAudio.playClick();
    setReviewModalOpen(true);
  };

  const handleContinueAnyway = () => {
    aegisAudio.playAlert();
    setOverridden(true);
  };

  return (
    <section id="intent" className="relative w-full py-32 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionLabel label="INTENTGUARD" category="LAYER 01" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-tight mb-6">
            INTENT <br />
            BEFORE <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D71920]">
              ACTION.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8D9096] font-light leading-relaxed">
            Autonomous systems frequently hallucinate intermediate goals or drift away from human boundary conditions. AEGIS enforces mathematical intent adherence before actions reach execution.
          </p>
        </div>

        {/* Complete Simulated Browser & Intent Verification Interface */}
        <div className="w-full mb-16">
          <GlassPanel className="p-0 overflow-hidden border-white/[0.1] shadow-2xl bg-black/60">
            
            {/* Simulated Browser Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D71920]/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-4 text-xs font-mono text-[#8D9096] hidden sm:inline">
                  aegis-intent-proxy://active-session/checkout-sandbox
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#8D9096]">INTENT GUARD:</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> ACTIVE PROXY
                </span>
              </div>
            </div>

            {/* Inner Content: Dual Column */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Intent Extraction Extraction Engine */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase mb-2 block">
                    01 / HUMAN GOAL INGESTION
                  </span>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-sm text-white/90 font-mono italic flex items-start gap-3">
                    <Search className="w-4 h-4 text-[#D71920] shrink-0 mt-0.5" />
                    <span>"{userIntentQuery}"</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase mb-3 block">
                    02 / EXTRACTED CRYPTOGRAPHIC BOUNDS
                  </span>
                  <div className="space-y-2.5">
                    {extractedConstraints.map((c) => (
                      <div
                        key={c.label}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/[0.06]"
                      >
                        <span className="text-xs font-mono text-[#8D9096]">{c.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-medium text-white">{c.value}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-white/60">
                            LOCKED
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#D71920]/[0.05] border border-[#D71920]/20 text-xs font-mono text-[#8D9096] flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#D71920] shrink-0" />
                  <span>State machine tracks real-time distance vector across all checkout steps.</span>
                </div>
              </div>

              {/* Right Column: Simulated User Browsing & Dynamic Intervention */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8D9096] uppercase mb-2 block">
                    03 / ACTIVE ACTION BEING EVALUATED
                  </span>

                  {/* Simulated Product Card */}
                  <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                          <Laptop className="w-6 h-6 text-white/70" />
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-white">
                            {currentBrowsedProduct.title}
                          </h4>
                          <span className="text-xs font-mono text-[#8D9096]">
                            {currentBrowsedProduct.category} • {currentBrowsedProduct.ram}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-light font-mono text-[#D71920]">
                          {currentBrowsedProduct.formattedPrice}
                        </div>
                        <span className="text-[10px] font-mono text-white/40">
                          (Intended budget: ≤ ₹80,000)
                        </span>
                      </div>
                    </div>

                    {/* AEGIS Interception Panel */}
                    <div className="mt-6 p-5 rounded-xl bg-[#D71920]/10 border border-[#D71920]/40">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-[#D71920]" />
                          <span className="text-xs font-mono font-medium tracking-wider text-white uppercase">
                            INTENT DRIFT DETECTED
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <span className="text-[#8D9096]">INTENT MATCH:</span>
                          <span className="text-lg font-light text-[#D71920] font-mono font-bold">
                            31%
                          </span>
                        </div>
                      </div>

                      {/* Conflict list */}
                      <div className="space-y-2 mb-6">
                        {intentConflicts.map((conflict, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-mono text-white/90">
                            <span className="text-[#D71920] font-bold">✕</span>
                            <span>{conflict}</span>
                          </div>
                        ))}
                      </div>

                      {/* Intervention action buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <MagneticButton
                          variant="primary"
                          size="sm"
                          onClick={handleReview}
                        >
                          REVIEW INTENT
                        </MagneticButton>

                        <button
                          onClick={handleContinueAnyway}
                          className="px-4 py-2 rounded-lg text-xs font-mono tracking-wider border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-colors"
                        >
                          {overridden ? 'OVERRIDDEN BY USER (LOGGED)' : 'CONTINUE ANYWAY'}
                        </button>
                      </div>

                      {overridden && (
                        <p className="mt-3 text-[10px] font-mono text-amber-400">
                          Warning: Human override recorded in tamper-proof cryptographic audit log.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </GlassPanel>
        </div>

        {/* Section 10: Intent Drift Timeline */}
        <IntentDrift />

      </div>

      {/* Review Modal Dialog */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <GlassPanel className="p-8 max-w-lg w-full bg-[#090A0C] border-white/20">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#D71920]" />
                <h3 className="text-base font-mono font-medium text-white tracking-wider">
                  AEGIS INTENT RESOLUTION
                </h3>
              </div>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-white/40 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#8D9096] font-mono leading-relaxed mb-6">
              AEGIS prevented automated cart execution because the selected item departs significantly from your initial specified bounds:
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 mb-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#8D9096]">Stated Budget Limit:</span>
                <span className="text-white">₹80,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8D9096]">Item Price:</span>
                <span className="text-[#D71920]">₹87,990 (+₹7,990)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8D9096]">Stated RAM:</span>
                <span className="text-white">≥ 32GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8D9096]">Item RAM:</span>
                <span className="text-[#D71920]">16GB (-50%)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <MagneticButton
                variant="outline"
                size="sm"
                onClick={() => setReviewModalOpen(false)}
              >
                RETURN TO SEARCH
              </MagneticButton>
              <MagneticButton
                variant="primary"
                size="sm"
                onClick={() => {
                  setReviewModalOpen(false);
                  setOverridden(true);
                }}
              >
                ACKNOWLEDGE & PROCEED
              </MagneticButton>
            </div>
          </GlassPanel>
        </div>
      )}
    </section>
  );
};
