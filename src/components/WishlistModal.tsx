import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { PlantSpecies } from '../types/nursery';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: PlantSpecies[];
  onRemoveFromWishlist: (plant: PlantSpecies) => void;
  onMoveToCart: (plant: PlantSpecies) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden bg-[#101712] rounded-3xl border border-[#27362c] text-[#f5efe2] shadow-2xl flex flex-col"
      >
        <div className="p-5 border-b border-[#233128] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#f43f5e] text-[#f43f5e]" />
            <h2 className="text-lg font-semibold">Saved Plants ({wishlist.length})</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-2 rounded-full hover:bg-[#1a251e] text-[#a3b899] hover:text-[#f5efe2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center text-[#a3b899]">
              <Heart className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium text-[#f5efe2]">No saved plants yet</p>
              <p className="text-xs text-[#a8bba1] mt-1">
                Tap the heart on any rose, bougainvillea, or lotus plant to save it for later.
              </p>
            </div>
          ) : (
            wishlist.map((plant) => (
              <div
                key={plant.id}
                className="p-3 rounded-2xl bg-[#141d17] border border-[#233128] flex items-center gap-3.5"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-16 h-16 rounded-xl object-cover bg-[#18231c] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#f5efe2] truncate">{plant.name}</h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono text-sm font-bold text-[#f5efe2]">
                      ₹{plant.price}
                    </span>
                    <span className="text-[11px] text-[#4ade80]">COD Available</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onMoveToCart(plant)}
                    aria-label="Move to cart"
                    className="px-3 py-1.5 rounded-lg bg-[#223629] text-[#f5efe2] hover:bg-[#2e4736] text-xs font-semibold flex items-center gap-1 border border-[#3c5243]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(plant)}
                    aria-label="Remove from wishlist"
                    className="p-1.5 rounded-lg text-[#6b7280] hover:text-[#f43f5e] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
