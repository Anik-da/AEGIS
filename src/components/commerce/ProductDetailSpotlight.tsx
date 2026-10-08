import React, { useState } from 'react';
import { ShoppingBag, Zap, ShieldCheck, Check, Star, Sparkles } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { productsCatalog } from '../../data/products';
import { aegisAudio } from '../../utils/audio';

export const ProductDetailSpotlight: React.FC = () => {
  const { addToCart, setCurrentView, setSelectedProductId } = useCommerce();
  const product = productsCatalog[0]; // AEGIS PRO X1
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
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Marker */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
            PRODUCT FOCUS · 06
          </span>
        </div>

        {/* Real Luxury E-Commerce Product Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Large High-Resolution Product Imagery with Angle Thumbnails */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
              <img
                src={product.images[selectedImg] || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Verified Badge */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#050607]/85 backdrop-blur-md border border-white/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-semibold text-white tracking-widest">
                  94% INTENT MATCH
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery Bar */}
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    aegisAudio.playClick();
                    setSelectedImg(idx);
                  }}
                  className={`w-24 aspect-[16/11] rounded-xl overflow-hidden border transition-all ${
                    selectedImg === idx
                      ? 'border-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.4)] scale-102'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Technical Specifications & Commercial Procurement */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Title & Tagline */}
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#D71920] uppercase font-semibold mb-1">
              {product.tagline}
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal uppercase text-white tracking-tight mb-2">
              {product.name}
            </h2>

            {/* Review Stars & Availability */}
            <div className="flex items-center gap-3 mb-4 text-xs font-mono">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-white font-semibold">4.9</span>
              </div>
              <span className="text-white/30">|</span>
              <span className="text-white/50">{product.reviewsCount} VERIFIED BENCHMARKS</span>
              <span className="text-white/30">|</span>
              <span className="text-emerald-400 font-semibold">IN STOCK</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-mono font-medium text-white">{product.formattedPrice}</span>
              <span className="text-sm font-mono text-white/40 line-through">
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SAVE ₹10,000
              </span>
            </div>

            {/* AI Fit Intelligence Callout */}
            <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#D71920] uppercase font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  AI FIT RATIONALE
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">94% CONFIDENCE</span>
              </div>
              <p className="text-xs font-mono text-white/70 leading-relaxed">
                "Strong match for your stated requirements. Provides 32GB RAM floor, tensor hardware GPU acceleration,
                and stays within your ₹80,000 budget boundary."
              </p>
            </div>

            {/* Key Specs Pill Checklist */}
            <div className="w-full space-y-2 mb-8 font-mono text-xs text-white/80">
              {product.keySpecs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Dual Procurement CTA Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAdd}
                className="w-full py-4 px-6 rounded-xl bg-white text-[#050607] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
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
                className="w-full py-4 px-6 rounded-xl bg-[#D71920] text-white font-mono text-xs font-semibold tracking-widest uppercase hover:bg-[#D71920]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(215,25,32,0.3)]"
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
