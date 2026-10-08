import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Plus, Check, Star } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { productsCatalog } from '../../data/products';
import { aegisAudio } from '../../utils/audio';

export const ShopView: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedProductId,
    setCurrentView,
    addToCart
  } = useCommerce();

  const [sortBy, setSortBy] = useState<'fit' | 'price-asc' | 'price-desc'>('fit');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { label: 'ALL PRODUCTS', val: 'ALL' },
    { label: 'LAPTOPS & WORKSTATIONS', val: 'ELECTRONICS' },
    { label: 'SMARTPHONES', val: 'SMARTPHONES' },
    { label: 'AUDIO & ACOUSTICS', val: 'AUDIO' },
    { label: 'CAMERAS & OPTICS', val: 'CAMERAS' },
    { label: 'TECHNICAL FASHION', val: 'FASHION' },
    { label: 'LIFESTYLE & ACCESSORIES', val: 'LIFESTYLE' },
  ];

  const filtered = productsCatalog
    .filter(p => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'fit') return b.aiFitScore - a.aiFitScore;
      if (sortBy === 'price-asc') return a.price - b.price;
      return b.price - a.price;
    });

  const handleProductClick = (id: string) => {
    aegisAudio.playClick();
    setSelectedProductId(id);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    aegisAudio.playClick();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#050607]">
      <div className="max-w-7xl mx-auto">
        {/* Page Title & Breadcrumbs */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-white/40">
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">HOME</button>
            <span>/</span>
            <span className="text-[#D71920]">COLLECTION CATALOG</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-tight text-white">
            THE AEGIS ARCHIVE
          </h1>
          <p className="text-sm font-mono text-white/50 mt-2">
            Showing {filtered.length} curated products benchmarked with autonomous intent validation
          </p>
        </div>

        {/* Filter and Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.val}
                onClick={() => {
                  aegisAudio.playClick();
                  setSelectedCategory(c.val);
                }}
                className={`px-4 py-2 rounded-full font-mono text-[11px] tracking-wider uppercase whitespace-nowrap transition-all ${
                  selectedCategory === c.val
                    ? 'bg-white text-[#050607] font-semibold'
                    : 'bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.06]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-full px-4 py-2 text-white placeholder-white/30 text-xs w-44 focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-full px-3 py-1.5 text-white/70">
              <ArrowUpDown className="w-3.5 h-3.5 text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="fit" className="bg-[#090A0D]">SORT BY: AI FIT SCORE</option>
                <option value="price-asc" className="bg-[#090A0D]">PRICE: LOW TO HIGH</option>
                <option value="price-desc" className="bg-[#090A0D]">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="group rounded-2xl bg-white/[0.02] border border-white/[0.07] p-5 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 mb-5">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#050607]/85 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.aiFitScore >= 90
                        ? 'bg-emerald-400'
                        : product.aiFitScore >= 80
                        ? 'bg-amber-400'
                        : 'bg-[#D71920]'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-white font-medium">
                    {product.aiFitScore}% AI FIT
                  </span>
                </div>

                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white text-[#050607] hover:bg-white/90 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Add to Cart"
                >
                  {addedId === product.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 mb-1">
                  <span>{product.subCategory || product.category}</span>
                  <span className="flex items-center text-amber-400">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    {product.rating}
                  </span>
                </div>
                <h3 className="text-xl font-normal uppercase text-white group-hover:text-[#D71920] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-white/50 line-clamp-2 mt-1 font-light">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-5 flex justify-between items-baseline font-mono">
                <span className="text-lg font-medium text-white">{product.formattedPrice}</span>
                <span className="text-[10px] tracking-wider text-[#D71920] uppercase font-semibold">
                  SELECT SPEC →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
