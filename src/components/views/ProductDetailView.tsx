import React, { useState } from 'react';
import { ShoppingBag, Zap, ShieldCheck, Check, Star, Sparkles, ArrowLeft, Heart } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    setCurrentView,
    toggleWishlist,
    isWishlisted
  } = useCommerce();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState<boolean>(true);
  const [selectedTravelKit, setSelectedTravelKit] = useState<boolean>(false);

  const handleAddToCart = () => {
    aegisAudio.playClick();
    const addons = [];
    if (selectedWarranty) addons.push({ name: 'AEGIS Care+ 2-Yr Warranty', price: 9999 });
    if (selectedTravelKit) addons.push({ name: '140W GaN Travel Accessory Pack', price: 4999 });

    addToCart(selectedProduct, 1, { accessoryAddons: addons });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    aegisAudio.playClick();
    const addons = [];
    if (selectedWarranty) addons.push({ name: 'AEGIS Care+ 2-Yr Warranty', price: 9999 });
    if (selectedTravelKit) addons.push({ name: '140W GaN Travel Accessory Pack', price: 4999 });

    addToCart(selectedProduct, 1, { accessoryAddons: addons });
    setCurrentView('checkout');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#050607]">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => {
            aegisAudio.playClick();
            setCurrentView('shop');
          }}
          className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CATALOG</span>
        </button>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Image Stage & Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
              <img
                src={selectedProduct.images[activeImgIdx] || selectedProduct.primaryImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* AI Fit Overlay */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#050607]/85 backdrop-blur-md border border-white/15 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedProduct.aiFitScore >= 90
                      ? 'bg-emerald-400'
                      : selectedProduct.aiFitScore >= 70
                      ? 'bg-amber-400'
                      : 'bg-[#D71920]'
                  }`}
                />
                <span className="text-xs font-mono font-semibold text-white tracking-widest">
                  {selectedProduct.aiFitScore}% AI INTENT MATCH
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="absolute top-5 right-5 p-3 rounded-full bg-[#050607]/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted(selectedProduct.id) ? 'fill-[#D71920] text-[#D71920]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Array */}
            <div className="flex items-center gap-3">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    aegisAudio.playClick();
                    setActiveImgIdx(idx);
                  }}
                  className={`w-24 aspect-[16/11] rounded-xl overflow-hidden border transition-all ${
                    activeImgIdx === idx
                      ? 'border-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.4)] scale-102'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Pricing, Specs, AI Intelligence, CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#D71920] uppercase font-semibold mb-1">
              {selectedProduct.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl font-normal uppercase text-white tracking-tight mb-2">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center gap-3 mb-6 text-xs font-mono">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-white font-semibold">{selectedProduct.rating}</span>
              </div>
              <span className="text-white/30">|</span>
              <span className="text-white/50">{selectedProduct.reviewsCount} REVIEWS</span>
              <span className="text-white/30">|</span>
              <span className="text-emerald-400 font-semibold">IN STOCK</span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-mono font-medium text-white">
                {selectedProduct.formattedPrice}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm font-mono text-white/40 line-through">
                  ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* AI Fit Intelligence Callout */}
            <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#D71920] uppercase font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI INTENT FIT ANALYSIS
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {selectedProduct.aiFitScore}% ACCORD
                </span>
              </div>
              <p className="text-xs font-mono text-white/70 leading-relaxed">
                "{selectedProduct.aiFitReason}"
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-white/60 font-light leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* Optional Protection Addons */}
            <div className="w-full space-y-2.5 mb-8">
              <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                CONFIGURE COMPANION ADDONS:
              </label>

              <div
                onClick={() => setSelectedWarranty(!selectedWarranty)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all font-mono text-xs ${
                  selectedWarranty
                    ? 'bg-white/[0.06] border-[#D71920]/40 text-white'
                    : 'bg-white/[0.02] border-white/10 text-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={selectedWarranty} readOnly className="rounded accent-[#D71920]" />
                  <span>AEGIS Care+ 2-Year Hardware Coverage</span>
                </div>
                <span>+₹9,999</span>
              </div>

              <div
                onClick={() => setSelectedTravelKit(!selectedTravelKit)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all font-mono text-xs ${
                  selectedTravelKit
                    ? 'bg-white/[0.06] border-[#D71920]/40 text-white'
                    : 'bg-white/[0.02] border-white/10 text-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={selectedTravelKit} readOnly className="rounded accent-[#D71920]" />
                  <span>140W GaN Travel Accessory Pack</span>
                </div>
                <span>+₹4,999</span>
              </div>
            </div>

            {/* Procurement Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
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

        {/* Full Specifications Table */}
        <div className="pt-16 border-t border-white/[0.08]">
          <h2 className="text-2xl font-normal uppercase text-white tracking-wide mb-8">
            FULL TECHNICAL SPECIFICATIONS
          </h2>

          <div className="rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
            {Object.entries(selectedProduct.fullSpecs).map(([key, val], idx) => (
              <div
                key={key}
                className={`grid grid-cols-1 md:grid-cols-3 p-4 gap-2 ${
                  idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                } border-b border-white/[0.05]`}
              >
                <span className="text-white/50 uppercase">{key}</span>
                <span className="md:col-span-2 text-white font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
