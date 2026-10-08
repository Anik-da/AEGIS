import React from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { useAegis } from '../../context/AegisContext';
import { ArrowUpRight, Shield } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setCommandCenterOpen } = useAegis();

  return (
    <section className="relative w-full py-40 px-6 md:px-12 bg-[#050607] border-t border-white/[0.08] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Subtle Red Ambience */}
      <div className="absolute inset-0 bg-radial from-[#D71920]/[0.07] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Editorial Statement */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-[1.08] mb-12">
          YOU DON'T NEED <br />
          ANOTHER AI <br />
          THAT JUST ACTS. <br />
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F4F1] to-[#D71920]">
            YOU NEED ONE THAT KNOWS WHEN TO STOP.
          </span>
        </h2>

        {/* Identity Mark */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#D71920]" />
            <span className="text-xl sm:text-2xl font-mono font-bold tracking-[0.22em] text-white">
              AEGIS AI
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#8D9096]">
            THE AUTONOMOUS DIGITAL GUARDIAN.
          </span>
        </div>

        {/* CTA Button */}
        <MagneticButton
          variant="primary"
          size="lg"
          onClick={() => setCommandCenterOpen(true)}
          icon={<ArrowUpRight className="w-4 h-4" />}
          className="text-sm px-10 py-4 shadow-[0_0_40px_rgba(215,25,32,0.4)]"
        >
          ENTER AEGIS
        </MagneticButton>
      </div>
    </section>
  );
};
