import React, { useState, useRef } from 'react';
import { ArrowUpRight, Plus, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { productsCatalog } from '../../data/products';
import { aegisAudio } from '../../utils/audio';

export const ProductDiscovery: React.FC = () => {
  const { setCurrentView, setSelectedProductId, addToCart } = useCommerce();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ELECTRONICS' | 'SMARTPHONES' | 'AUDIO' | 'FASHION' | 'LIFESTYLE'>('ALL');
  const [addedId, setAddedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { label: 'ALL COLLECTIONS', val: 'ALL' },
    { label: 'WORKSTATIONS & LAPTOPS', val: 'ELECTRONICS' },
    { label: 'SMARTPHONES', val: 'SMARTPHONES' },
    { label: 'ACOUSTICS & AUDIO', val: 'AUDIO' },
    { label: 'TECHNICAL APPAREL', val: 'FASHION' },
    { label: 'LUXURY ACCESSORIES', val: 'LIFESTYLE' },
  ] as const;

  const displayProducts = activeFilter === 'ALL' 
    ? productsCatalog 
    : productsCatalog.filter(p => p.category === activeFilter);

  const handleProductClick = (id: string) => {
    aegisAudio.playClick();
    setSelectedProductId(id);
    setCurrentView('product');
  };

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    aegisAudio.playClick();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  const scrollLeft = () => {
    aegisAudio.playClick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    aegisAudio.playClick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  return (
    <section id="discover" className="relative w-full py-32 px-6 md:px-12 lg:px-16 bg-[#050607] border-t border-white/[0.06] overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D71920]/[0.04] blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto mb-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-white/50">
                COLLECTION DISCOVERY · 01
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] uppercase text-[#F4F4F1] leading-[0.92]">
              FIND WHAT <br />
              <span className="italic font-light text-white/70">ACTUALLY FITS YOU.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="text-sm font-light text-white/50 max-w-md lg:text-right leading-relaxed">
              Large-format editorial pieces engineered for precision. Every device is cataloged with verified hardware specifications and guarded by AEGIS.
            </p>

            {/* Navigation Arrows for Horizontal Scroll Track */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollLeft}
                aria-label="Previous products"
                className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next products"
                className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.val}
              onClick={() => {
                aegisAudio.playClick();
                setActiveFilter(cat.val);
              }}
              className={`px-5 py-2.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeFilter === cat.val
                  ? 'bg-white text-[#050607] font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.08] border border-white/[0.07]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrolling Gallery Track */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pb-8 pt-4 px-6 md:px-12 lg:px-16 scrollbar-none snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {displayProducts.map((product, idx) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            data-cursor-text="EXPLORE"
            className="group relative flex-none w-[340px] sm:w-[420px] md:w-[460px] rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-[#050607] border border-white/10 p-6 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-white/25 transition-all duration-700 hover:shadow-[0_30px_70px_rgba(0,0,0,0.8)] snap-start"
          >
            {/* Ambient Card Glow */}
            <div className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Editorial Product Image Stage */}
            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-black/60 mb-6 shadow-inner">
              <img
                src={product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

              {/* Floating Top Match Pill */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-[#050607]/85 backdrop-blur-md border border-white/15 flex items-center gap-2 shadow-lg">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    product.aiFitScore >= 90
                      ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                      : product.aiFitScore >= 80
                      ? 'bg-amber-400'
                      : 'bg-[#D71920]'
                  }`}
                />
                <span className="text-[10px] font-mono tracking-widest text-white/90">
                  {product.aiFitScore}% INTENT FIT
                </span>
              </div>

              {/* Quick Add CTA */}
              <button
                onClick={(e) => handleQuickAdd(e, product)}
                className="absolute bottom-3.5 right-3.5 p-3 rounded-full bg-white text-[#050607] hover:bg-white/90 shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer"
                title="Quick Add"
              >
                {addedId === product.id ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Minimal Editorial Information */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.24em] text-white/40 uppercase mb-1.5">
                <span>{product.subCategory || product.category}</span>
                <span className="text-white/60">★ {product.rating.toFixed(1)}</span>
              </div>

              <h3 className="text-2xl font-normal uppercase tracking-tight text-[#F4F4F1] group-hover:text-white transition-colors flex items-center justify-between">
                <span>{product.name}</span>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </h3>

              <p className="text-xs text-white/50 line-clamp-2 mt-2 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Metadata Specs & Price Row */}
            <div className="pt-6 mt-6 border-t border-white/[0.07] flex items-center justify-between">
              <div>
                <span className="text-2xl font-mono font-medium text-white">{product.formattedPrice}</span>
                {product.originalPrice && (
                  <span className="text-xs font-mono text-white/30 line-through ml-2">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-mono tracking-[0.2em] text-[#D71920] uppercase font-semibold group-hover:text-white transition-colors">
                DETAILS →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
