import React from 'react';
import { User, ShieldCheck, Clock, Package, ExternalLink, Settings, Sparkles } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const AccountView: React.FC = () => {
  const { userIntent, setControlCenterOpen, setCurrentView } = useCommerce();

  const pastOrders = [
    {
      id: 'AEGIS-948102',
      date: 'March 28, 2026',
      total: '₹74,999',
      items: 'AEGIS PRO X1 Workstation (32GB / 1TB)',
      status: 'DELIVERED',
      aegisProof: '0x8f2a...Verified',
    },
    {
      id: 'AEGIS-819234',
      date: 'February 14, 2026',
      total: '₹24,999',
      items: 'Obsidian Acoustic ANC Reference Headphones',
      status: 'DELIVERED',
      aegisProof: '0x3c91...Verified',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#050607]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/[0.08] mb-12 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D71920] uppercase font-semibold">
              AUTHENTICATED CLIENT IDENTITY
            </span>
            <h1 className="text-4xl sm:text-5xl font-normal uppercase text-white mt-1">
              ANIK DUTTA
            </h1>
            <p className="text-xs font-mono text-white/50 mt-1">
              Verified Zero-Trust Session · Hardware Enclave Active
            </p>
          </div>

          <button
            onClick={() => {
              aegisAudio.playVerify();
              setControlCenterOpen(true);
            }}
            className="px-6 py-3.5 rounded-xl bg-[#D71920]/15 border border-[#D71920]/40 text-white font-mono text-xs tracking-wider uppercase hover:bg-[#D71920]/25 transition-all flex items-center gap-2.5 cursor-pointer shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#D71920]" />
            <span>OPEN AEGIS CONTROL CENTER</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Intent Profile */}
          <div className="lg:col-span-5 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold uppercase">
              <Sparkles className="w-4 h-4 text-[#D71920]" />
              <span>ACTIVE AEGIS SHOPPING INTENT</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-3">
              <div>
                <span className="text-white/40 block text-[10px]">RAW PARSED QUERY:</span>
                <p className="text-white/90">"{userIntent.rawQuery}"</p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex justify-between">
                <span className="text-white/40">BUDGET CEILING:</span>
                <span className="text-white font-semibold">≤ ₹{userIntent.budgetMax.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/40">MEMORY FLOOR:</span>
                <span className="text-white font-semibold">{userIntent.minRam}GB+ RAM</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/40">INTENT ACCORD:</span>
                <span className="text-emerald-400 font-semibold">ACTIVE & ENFORCED</span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed font-light">
              This intent profile operates silently in the background of your shopping sessions to detect price drift,
              warn of unneeded bundled upselling, and safeguard transactions.
            </p>
          </div>

          {/* Right Column: Order Ledger & Security Audit */}
          <div className="lg:col-span-7 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6">
            <h3 className="text-xs font-mono tracking-widest text-white/40 uppercase mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-white/60" />
              <span>CRYPTOGRAPHIC PROCUREMENT LEDGER</span>
            </h3>

            <div className="space-y-4">
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl bg-black/50 border border-white/[0.07] font-mono text-xs space-y-2"
                >
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold tracking-wider">{order.id}</span>
                    <span className="text-emerald-400 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10">
                      {order.status}
                    </span>
                  </div>

                  <p className="text-white/70">{order.items}</p>

                  <div className="pt-2 border-t border-white/[0.06] flex justify-between items-center text-white/40 text-[11px]">
                    <span>{order.date}</span>
                    <span className="text-white font-semibold">{order.total}</span>
                    <span className="text-emerald-400/80">{order.aegisProof}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
