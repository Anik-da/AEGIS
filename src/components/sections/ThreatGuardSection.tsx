import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { ThreatIntelligenceUI } from './ThreatIntelligenceUI';
import { AttackChain } from './AttackChain';
import { ShieldAlert } from 'lucide-react';

export const ThreatGuardSection: React.FC = () => {
  return (
    <section id="threats" className="relative w-full py-32 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      {/* Background radial crimson glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#D71920]/[0.06] via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Editorial Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionLabel label="THREATGUARD" category="LAYER 02" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-tight mb-6">
            THREATS <br />
            DON'T ALWAYS <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D71920]">
              ARRIVE ALONE.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8D9096] font-light leading-relaxed">
            Modern adversaries and autonomous malicious agents rarely strike with single obvious anomalies. They orchestrate multi-step, low-entropy attack chains. AEGIS correlates distributed telemetry across time to detect the entire trajectory.
          </p>
        </div>

        {/* Attack Chain Correlated Flow */}
        <div className="w-full mb-16">
          <AttackChain />
        </div>

        {/* Security Operations Threat Intelligence Center */}
        <div className="w-full">
          <ThreatIntelligenceUI />
        </div>
      </div>
    </section>
  );
};
