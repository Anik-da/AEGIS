import React, { useState } from 'react';
import { ShoppingBag, Zap, Check, Star, Sparkles, ChevronRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { productsCatalog } from '../../data/products';
import { aegisAudio } from '../../utils/audio';

export const ProductDetailSpotlight: React.FC = () => {
  const { addToCart, setCurrentView, setSelectedProductId } = useCommerce();
  const product = productsCatalog[0]; // AEGIS PRO X1 Flagship
  const [selectedImg, setSelectedImg] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    aegisAudio.playClick();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    aegisAudio.playClick();
    addToCart(product, 1);
    setCurrentView('checkout');
  };

  return (
    <section id="spotlight" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
          <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
            FLAGSHIP SPOTLIGHT · 05
          </span>
        </div>

        {/* Large Format Editorial Product Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large High-Resolution Product Imagery with Multi-Angle Strip */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="group relative aspect-[16/11] rounded-3xl overflow-hidden bg-black/60 border border-white/12 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
              <img
                src={product.images[selectedImg] || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* 94% INTENT MATCH Signature Badge */}
              <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-[#050607]/90 backdrop-blur-md border border-white/15 flex items-center gap-2.5 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="text-xs font-mono font-bold text-white tracking-widest">
                  94% INTENT MATCH
                </span>
              </div>

              {/* Verified Stock Badge */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono tracking-widest text-emerald-400">
                IN STOCK · DISPATCHES IN 24H
              </div>
            </div>

            {/* Thumbnail Angle Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    aegisAudio.playClick();
                    setSelectedImg(idx);
                  }}
                  className={`w-28 aspect-[16/11] rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                    selectedImg === idx
                      ? 'border-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.4)] scale-102'
                      : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detailed Specification & WHY THIS FITS Card */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-[11px] font-mono tracking-[0.28em] text-[#D71920] uppercase font-semibold mb-2">
              {product.tagline}
            </span>

            <h2 className="text-4xl sm:text-5xl font-normal uppercase text-white tracking-tight mb-2">
              {product.name}
            </h2>

            {/* Rating Stars & Stock */}
            <div className="flex items-center gap-3 mb-6 text-xs font-mono">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-white font-semibold">4.9</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-white/50">{product.reviewsCount} REVIEWS</span>
              <span className="text-white/20">|</span>
              <span className="text-emerald-400 font-semibold">AUTHENTIC</span>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl sm:text-5xl font-mono font-medium text-white">{product.formattedPrice}</span>
              {product.originalPrice && (
                <span className="text-base font-mono text-white/30 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SAVE ₹10,000
              </span>
            </div>

            {/* Signature "WHY THIS FITS" Intent Rationale Card */}
            <div className="w-full rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/12 p-6 mb-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.07]">
                <span className="text-xs font-mono tracking-widest text-[#D71920] uppercase font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  WHY THIS FITS YOUR INTENT
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">94% FIT</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="flex items-center gap-2 text-white/90">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Budget ✓</span>
                  </span>
                  <span className="text-emerald-400 font-medium">₹74,999 ≤ ₹80,000</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="flex items-center gap-2 text-white/90">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>RAM ✓</span>
                  </span>
                  <span className="text-emerald-400 font-medium">32GB DDR5 ≥ 32GB</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="flex items-center gap-2 text-white/90">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AI / ML ✓</span>
                  </span>
                  <span className="text-emerald-400 font-medium">RTX 4070 Dedicated Tensor Cores</span>
                </div>
              </div>
            </div>

            {/* Hardware Key Specs */}
            <div className="w-full space-y-2 mb-8 font-mono text-xs text-white/70">
              {product.keySpecs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAdd}
                data-cursor-text="ADD"
                className="w-full py-4 px-6 rounded-full bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>ADDED TO CART</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                data-cursor-text="CHECKOUT"
                className="w-full py-4 px-6 rounded-full bg-[#D71920] text-white font-mono text-xs font-semibold tracking-widest uppercase hover:bg-[#D71920]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(215,25,32,0.35)]"
              >
                <Zap className="w-4 h-4" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
