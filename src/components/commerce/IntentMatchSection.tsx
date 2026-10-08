import React, { useState } from 'react';
import { Check, X, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

interface LaptopCandidate {
  id: string;
  name: string;
  category: string;
  price: number;
  formattedPrice: string;
  matchScore: number;
  ram: string;
  gpu: string;
  storage: string;
  image: string;
  reasons: { label: string; passed: boolean; note: string }[];
}

export const IntentMatchSection: React.FC = () => {
  const { setSelectedProductId, setCurrentView, addToCart } = useCommerce();
  const [selectedId, setSelectedId] = useState<string>('aegis-pro-x1');

  const candidates: LaptopCandidate[] = [
    {
      id: 'aegis-pro-x1',
      name: 'AEGIS PRO X1',
      category: 'FLAGSHIP AI WORKSTATION',
      price: 74999,
      formattedPrice: '₹74,999',
      matchScore: 94,
      ram: '32GB DDR5',
      gpu: 'RTX 4070 (AI Acceleration)',
      storage: '1TB NVMe Gen4',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85',
      reasons: [
        { label: 'Within budget', passed: true, note: '₹74,999 is below ₹80,000 ceiling' },
        { label: '32GB RAM', passed: true, note: '32GB DDR5 meets memory floor' },
        { label: 'Strong AI/ML performance', passed: true, note: 'Dedicated RTX 4070 Tensor Cores' },
      ],
    },
    {
      id: 'tensor-titan-16',
      name: 'TENSOR TITAN 16',
      category: 'DEEP LEARNING EDITION',
      price: 79999,
      formattedPrice: '₹79,999',
      matchScore: 92,
      ram: '32GB DDR5',
      gpu: 'RTX 4060 Max-Q',
      storage: '1TB SSD',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=85',
      reasons: [
        { label: 'Within budget', passed: true, note: '₹79,999 is within ₹80,000 boundary' },
        { label: '32GB RAM', passed: true, note: '32GB DDR5 meets memory floor' },
        { label: 'Strong AI/ML performance', passed: true, note: 'Good tensor support on 4060' },
      ],
    },
    {
      id: 'creator-studio-15',
      name: 'CREATOR STUDIO 15',
      category: 'MEDIA EDITING SUITE',
      price: 84999,
      formattedPrice: '₹84,999',
      matchScore: 71,
      ram: '32GB DDR5',
      gpu: 'RTX 4050 Mobile',
      storage: '512GB SSD',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=85',
      reasons: [
        { label: 'Within budget', passed: false, note: 'Exceeds budget by +₹4,999' },
        { label: '32GB RAM', passed: true, note: 'Satisfies 32GB floor' },
        { label: 'Strong AI/ML performance', passed: true, note: 'Adequate for inference' },
      ],
    },
    {
      id: 'stealth-slim-air',
      name: 'STEALTH SLIM AIR',
      category: 'ULTRA-PORTABLE NOTEBOOK',
      price: 89999,
      formattedPrice: '₹89,999',
      matchScore: 31,
      ram: '16GB LPDDR5',
      gpu: 'Integrated Iris Xe',
      storage: '512GB SSD',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
      reasons: [
        { label: 'Within budget', passed: false, note: 'Exceeds budget by +₹9,999' },
        { label: '32GB RAM', passed: false, note: 'Only 16GB RAM (-16GB gap)' },
        { label: 'Strong AI/ML performance', passed: false, note: 'No dedicated tensor hardware' },
      ],
    },
  ];

  const currentCandidate = candidates.find(c => c.id === selectedId) || candidates[0];

  const handleSelect = (id: string) => {
    aegisAudio.playClick();
    setSelectedId(id);
  };

  const handleInspectProduct = (id: string) => {
    aegisAudio.playClick();
    setSelectedProductId(id);
    setCurrentView('product');
  };

  return (
    <section id="intent-match" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
                INTENT EVALUATION · 03
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
              INTENT MATCH <br />
              <span className="italic font-light text-white/70">ACROSS THE CATALOG.</span>
            </h2>
          </div>

          <p className="text-sm font-light text-white/50 max-w-md lg:text-right leading-relaxed">
            Every candidate laptop is scored in real-time against your stated budget of ₹80,000, 32GB RAM floor, and AI/ML workloads.
            The strongest match visually elevates above the rest.
          </p>
        </div>

        {/* 4 Ranked Candidate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end mb-12">
          {candidates.map((laptop) => {
            const isHighest = laptop.matchScore === 94;
            const isSelected = selectedId === laptop.id;

            return (
              <div
                key={laptop.id}
                onClick={() => handleSelect(laptop.id)}
                data-cursor-text="SCORE"
                className={`group relative rounded-3xl p-5 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 ${
                  isHighest
                    ? 'lg:-translate-y-6 bg-gradient-to-b from-[#D71920]/[0.12] via-white/[0.04] to-[#050607] border-2 border-[#D71920]/60 shadow-[0_30px_70px_rgba(215,25,32,0.25)]'
                    : isSelected
                    ? 'bg-white/[0.05] border border-white/30 shadow-2xl'
                    : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Highest Fit Halo */}
                {isHighest && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#D71920] text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-bl-xl shadow-lg">
                    ★ HIGHEST MATCH
                  </div>
                )}

                {/* Product Image Stage */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 mb-5">
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent opacity-60" />

                  {/* Dynamic Match Score Pill */}
                  <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full backdrop-blur-md border flex items-center gap-1.5 shadow-xl ${
                    laptop.matchScore >= 90
                      ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                      : laptop.matchScore >= 70
                      ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                      : 'bg-[#D71920]/20 border-[#D71920]/50 text-[#FF5A3C]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      laptop.matchScore >= 90 ? 'bg-emerald-400' : laptop.matchScore >= 70 ? 'bg-amber-400' : 'bg-[#D71920]'
                    }`} />
                    <span className="font-mono text-xs font-bold tracking-wider">
                      {laptop.matchScore}% MATCH
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-1">
                    {laptop.category}
                  </span>
                  <h3 className="text-xl font-normal uppercase text-white tracking-tight group-hover:text-white transition-colors">
                    {laptop.name}
                  </h3>
                  <p className="text-lg font-mono font-medium text-white mt-2">
                    {laptop.formattedPrice}
                  </p>
                </div>

                {/* Spec Highlights */}
                <div className="pt-4 mt-4 border-t border-white/[0.06] text-xs font-mono text-white/50 space-y-1">
                  <p>RAM: {laptop.ram}</p>
                  <p>GPU: {laptop.gpu}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Product Breakdown: WHY IT MATCHES */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-mono text-sm tracking-wider uppercase text-white font-semibold">
                  WHY {currentCandidate.name} FITS YOUR INTENT
                </h4>
                <p className="text-[11px] font-mono text-white/40">
                  Detailed semantic reasoning against your declared parameters
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {currentCandidate.reasons.map((reason, rIdx) => (
                <div
                  key={rIdx}
                  className={`p-4 rounded-2xl border font-mono ${
                    reason.passed
                      ? 'bg-emerald-500/[0.06] border-emerald-500/20 text-white'
                      : 'bg-[#D71920]/[0.06] border-[#D71920]/25 text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {reason.passed ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <X className="w-4 h-4 text-[#D71920]" />
                    )}
                    <span className="text-xs font-bold tracking-wide">
                      {reason.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {reason.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => handleInspectProduct(currentCandidate.id)}
              className="py-4 px-8 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <span>INSPECT SPECIFICATIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
