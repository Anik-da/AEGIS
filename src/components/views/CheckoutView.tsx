import React from 'react';
import { CheckoutSection } from '../commerce/CheckoutSection';
import { ArrowLeft } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CheckoutView: React.FC = () => {
  const { setCurrentView } = useCommerce();

  return (
    <div className="min-h-screen pt-24 bg-[#050607]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <button
          onClick={() => {
            aegisAudio.playClick();
            setCurrentView('shop');
          }}
          className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO SHOPPING</span>
        </button>
      </div>
      <CheckoutSection />
    </div>
  );
};
