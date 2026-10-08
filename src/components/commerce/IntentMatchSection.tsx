import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const IntentMatchSection: React.FC = () => {
  const { setSelectedProductId, setCurrentView, addToCart } = useCommerce();
  const [activeTab, setActiveTab] = useState<'match' | 'drift'>('match');
  const [dismissedDrift, setDismissedDrift] = useState(false);

  const product1 = {
    id: 'aegis-pro-x1',
    name: 'AEGIS PRO X1',
    category: 'AI WORKSTATION LAPTOP',
    price: 74999,
    formattedPrice: '₹74,999',
    ram: '32GB DDR5',
    storage: '1TB NVMe Gen4',
    gpu: 'RTX 4070 (AI Acceleration)',
    matchScore: 94,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85',
  };

  const product2 = {
    id: 'ultrabook-stealth-x',
    name: 'ULTRABOOK STEALTH X',
    category: 'CREATOR SLIM EDITION',
    price: 89999,
    formattedPrice: '₹89,999',
    ram: '16GB LPDDR5X',
    storage: '512GB SSD',
    gpu: 'Integrated Arc Graphics',
    matchScore: 31,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
  };

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                VERIFICATION MOMENT · 04
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
              INTENT MATCH <br />
              <span className="italic font-light text-white/80">& ACTIVE DRIFT NOTICES.</span>
            </h2>
          </div>

          {/* Interactive Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <button
              onClick={() => {
                aegisAudio.playClick();
                setActiveTab('match');
              }}
              className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all ${
                activeTab === 'match'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              PRODUCT A (94% MATCH)
            </button>
            <button
              onClick={() => {
                aegisAudio.playAlert();
                setActiveTab('drift');
              }}
              className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all ${
                activeTab === 'drift'
                  ? 'bg-[#D71920]/20 text-[#FF5A3C] border border-[#D71920]/40'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              PRODUCT B (INTENT DRIFT)
            </button>
          </div>
        </div>

        {/* Product Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Product Card in Focus */}
          <div className="lg:col-span-7 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 relative">
              <img
                src={activeTab === 'match' ? product1.image : product2.image}
                alt="Product in view"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeTab === 'match' ? 'bg-emerald-400' : 'bg-[#D71920]'
                  }`}
                />
                <span className="text-xs font-mono font-bold text-white">
                  {activeTab === 'match' ? '94% INTENT MATCH' : '31% INTENT DRIFT'}
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  {activeTab === 'match' ? product1.category : product2.category}
                </span>
                <h3 className="text-2xl font-normal text-white uppercase mt-1 mb-2">
                  {activeTab === 'match' ? product1.name : product2.name}
                </h3>
                <p className="text-2xl font-mono font-medium text-white mb-4">
                  {activeTab === 'match' ? product1.formattedPrice : product2.formattedPrice}
                </p>

                <div className="space-y-1.5 text-xs font-mono text-white/60 mb-6">
                  <p>• RAM: {activeTab === 'match' ? product1.ram : product2.ram}</p>
                  <p>• GPU: {activeTab === 'match' ? product1.gpu : product2.gpu}</p>
                  <p>• STORAGE: {activeTab === 'match' ? product1.storage : product2.storage}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  aegisAudio.playClick();
                  setSelectedProductId(activeTab === 'match' ? product1.id : product2.id);
                  setCurrentView('product');
                }}
                className="w-full py-3 rounded-xl bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW SPECIFICATIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Active AEGIS Intent Feedback */}
          <div className="lg:col-span-5">
            {activeTab === 'match' ? (
              /* High Match Confirmation Card */
              <div className="rounded-3xl bg-gradient-to-b from-emerald-500/[0.08] to-transparent border border-emerald-500/20 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm uppercase tracking-widest text-emerald-300 font-semibold">
                      AEGIS ALIGNMENT CONFIRMED
                    </h4>
                    <p className="text-[11px] font-mono text-white/50">Optimal candidate within nominal boundary</p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-white/80 my-6 bg-black/40 p-4 rounded-xl border border-white/[0.08]">
                  <div className="flex justify-between">
                    <span className="text-white/40">Budget ceiling:</span>
                    <span className="text-emerald-400">₹74,999 ≤ ₹80,000 (Passes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Memory spec:</span>
                    <span className="text-emerald-400">32GB ≥ 32GB (Passes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Tensor compute:</span>
                    <span className="text-emerald-400">Dedicated RTX 4070 (Passes)</span>
                  </div>
                </div>

                <p className="text-xs text-white/60 leading-relaxed font-light">
                  All active constraints verified. No hidden traps, no upselling pressure.
                  Ready for safe procurement.
                </p>
              </div>
            ) : (
              /* Core Feature: Elegant AEGIS Intervention Card */
              <div className="rounded-3xl bg-gradient-to-b from-[#D71920]/[0.12] to-transparent border border-[#D71920]/40 p-8 shadow-2xl relative overflow-hidden animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#D71920]/20 text-[#D71920]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm uppercase tracking-widest text-white font-semibold flex items-center gap-2">
                      <span>AEGIS NOTICE</span>
                      <span className="text-[10px] py-0.5 px-2 rounded bg-[#D71920] text-white">31% MATCH</span>
                    </h4>
                    <p className="text-[11px] font-mono text-white/50">
                      Non-intrusive autonomous intent guardian
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed font-mono my-4">
                  This product differs from your original requirements.
                </p>

                {/* Structured Discrepancy Breakdown */}
                <div className="space-y-2.5 font-mono text-xs bg-black/60 p-4 rounded-xl border border-white/10 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">Budget:</span>
                    <span className="text-[#FF5A3C] font-semibold">₹89,999 / ₹80,000 (+₹9,999)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">RAM:</span>
                    <span className="text-[#FF5A3C] font-semibold">16GB / 32GB (-16GB)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">Intent match:</span>
                    <span className="text-[#FF5A3C] font-bold">31%</span>
                  </div>
                </div>

                {/* Dual Decision Actions: Human remains in control */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      aegisAudio.playVerify();
                      setActiveTab('match');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-white text-[#050607] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-all text-center cursor-pointer"
                  >
                    [ REVIEW ]
                  </button>
                  <button
                    onClick={() => {
                      aegisAudio.playClick();
                      setDismissedDrift(true);
                      setSelectedProductId(product2.id);
                      setCurrentView('product');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/[0.06] border border-white/15 text-white/80 font-mono text-xs tracking-wider uppercase hover:bg-white/[0.12] hover:text-white transition-all text-center cursor-pointer"
                  >
                    [ CONTINUE ANYWAY ]
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
