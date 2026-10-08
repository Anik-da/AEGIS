import React, { useState } from 'react';
import { ArrowUpRight, Plus, Eye, Check } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { productsCatalog } from '../../data/products';
import { aegisAudio } from '../../utils/audio';

export const ProductDiscovery: React.FC = () => {
  const { setCurrentView, setSelectedProductId, addToCart } = useCommerce();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ELECTRONICS' | 'SMARTPHONES' | 'AUDIO' | 'FASHION' | 'LIFESTYLE'>('ALL');
  const [addedId, setAddedId] = useState<string | null>(null);

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

  return (
    <section id="discover" className="relative w-full py-28 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                CURATED SELECTION · 02
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] uppercase text-[#F4F4F1] leading-[0.96]">
              FIND WHAT <br />
              <span className="italic font-light text-white/80">ACTUALLY FITS YOU.</span>
            </h2>
          </div>

          <p className="text-sm font-light text-white/50 max-w-md leading-relaxed">
            Every device and garment in our catalog is benchmarked against real user requirements,
            monitored for supply chain authenticity, and guaranteed by AEGIS autonomous verification.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.val}
              onClick={() => {
                aegisAudio.playClick();
                setActiveFilter(cat.val);
              }}
              className={`px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.16em] uppercase whitespace-nowrap transition-all duration-300 ${
                activeFilter === cat.val
                  ? 'bg-white text-[#050607] font-semibold shadow-lg'
                  : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetric Luxury Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, idx) => {
            const isTall = idx === 0 || idx === 3;

            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className={`group relative rounded-2xl bg-white/[0.02] border border-white/[0.07] p-5 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500 hover:shadow-2xl ${
                  isTall ? 'md:row-span-1' : ''
                }`}
              >
                {/* Product Image Stage */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/40 mb-5">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* AI Fit Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#050607]/85 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-md">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        product.aiFitScore >= 90
                          ? 'bg-emerald-400'
                          : product.aiFitScore >= 80
                          ? 'bg-amber-400'
                          : 'bg-[#D71920]'
                      }`}
                    />
                    <span className="text-[10px] font-mono tracking-wider text-white">
                      {product.aiFitScore}% AI FIT
                    </span>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="p-2.5 rounded-full bg-white text-[#050607] hover:bg-white/90 shadow-xl transition-transform hover:scale-110"
                      title="Quick Add to Cart"
                    >
                      {addedId === product.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                      className="p-2.5 rounded-full bg-[#050607]/90 text-white border border-white/20 hover:bg-black transition-transform hover:scale-110"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Information Header */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.22em] text-white/40 uppercase mb-1">
                    <span>{product.subCategory || product.category}</span>
                    <span className="text-white/60">★ {product.rating.toFixed(1)}</span>
                  </div>

                  <h3 className="text-xl font-normal uppercase tracking-tight text-[#F4F4F1] group-hover:text-white transition-colors flex items-center justify-between">
                    <span>{product.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="text-xs text-white/50 line-clamp-2 mt-1.5 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Spec Highlights Pill Array */}
                <div className="flex flex-wrap gap-1.5 my-4">
                  {product.keySpecs.slice(0, 3).map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/[0.05]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Price & Action Row */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-lg font-mono font-medium text-white">{product.formattedPrice}</span>
                    {product.originalPrice && (
                      <span className="text-xs font-mono text-white/30 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-[#D71920] uppercase font-semibold">
                    EXPLORE →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
