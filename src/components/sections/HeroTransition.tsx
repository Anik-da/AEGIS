import React from 'react';
import { motion } from 'framer-motion';

export const HeroTransition: React.FC = () => {
  const words = [
    { text: 'UNDERSTAND.', sub: 'Deep intent modeling prior to state execution' },
    { text: 'DETECT.', sub: 'Correlated attack chain telemetry without latency' },
    { text: 'DEFEND.', sub: 'Zero-trust isolation beyond browser trust boundaries' },
    { text: 'HEAL.', sub: 'Verified AST self-patching and immediate rollback' },
  ];

  return (
    <section id="transition" className="relative w-full py-28 md:py-44 px-6 md:px-12 bg-[#050607] border-y border-white/[0.06] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-[#D71920]/[0.05] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Section Label */}
        <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#8D9096] mb-16 select-none flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
          <span>AUTONOMOUS LIFECYCLE</span>
        </div>

        {/* Cinematic Staggered Large Words */}
        <div className="w-full flex flex-col gap-16 md:gap-24">
          {words.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="text-xs sm:text-sm font-mono text-[#D71920] tracking-widest opacity-80">
                  0{index + 1}
                </span>
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[-0.03em] text-white/90 group-hover:text-white transition-colors duration-500">
                  {item.text}
                </h2>
              </div>
              <p className="mt-3 text-xs sm:text-sm font-mono tracking-[0.2em] text-[#8D9096] uppercase max-w-lg">
                {item.sub}
              </p>
              {index < words.length - 1 && (
                <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent mt-12 opacity-50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
