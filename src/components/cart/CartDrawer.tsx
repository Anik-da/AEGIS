import React from 'react';
import { X, Trash2, ArrowRight, AlertTriangle, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { aegisAudio } from '../../utils/audio';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartExceedsBudget,
    cartBudgetOverage,
    setCurrentView,
    dismissedCartNotice,
    setDismissedCartNotice
  } = useCommerce();

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090A0D] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-fade-in font-mono">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2 text-white">
                <ShoppingBag className="w-4 h-4 text-[#D71920]" />
                <span className="text-xs tracking-widest uppercase font-semibold">YOUR SHOPPING CART</span>
                <span className="text-xs text-white/40">({cart.length})</span>
              </div>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="p-1 rounded-full text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AEGIS Intent Notice if over budget */}
            {cartExceedsBudget && (
              <div className="rounded-xl bg-[#D71920]/15 border border-[#D71920]/40 p-4 mb-6 text-xs animate-fade-in">
                <div className="flex items-center gap-2 text-[#FF5A3C] font-bold mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AEGIS BUDGET NOTICE</span>
                </div>
                <p className="text-white/80 text-[11px] leading-relaxed">
                  Your cart has moved beyond your original stated budget by{' '}
                  <span className="text-white font-bold">₹{cartBudgetOverage.toLocaleString('en-IN')}</span>.
                </p>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-white/40 text-xs">
                  Your cart is currently empty.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-14 h-12 rounded-lg object-cover bg-black"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs text-white uppercase truncate font-medium">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-white/40">₹{item.product.price.toLocaleString('en-IN')}</p>
                      
                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center text-white/70 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center text-white/70 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-white/30 hover:text-[#D71920] p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Checkout Summary */}
          <div className="pt-6 border-t border-white/[0.08]">
            <div className="flex justify-between items-baseline mb-4 text-xs">
              <span className="text-white/50">ESTIMATED TOTAL</span>
              <span className="text-2xl font-bold text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => {
                aegisAudio.playVerify();
                setCartDrawerOpen(false);
                setCurrentView('checkout');
              }}
              disabled={cart.length === 0}
              className="w-full py-4 rounded-xl bg-white text-[#050607] text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-40"
            >
              <span>PROCEED TO VERIFIED CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
