import React from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, MapPin, CheckCircle } from 'lucide-react';
import { CartItem } from '../types/nursery';
import { NURSERY_CONTACT } from '../data/plantCatalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.plant.price + item.selectedPot.priceDiff) * item.quantity,
    0
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#0d140f] text-[#f5efe2] border-l border-[#27362c] shadow-2xl flex flex-col justify-between"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#233128] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4ade80]" />
            <h2 className="text-lg font-semibold tracking-wide text-[#f5efe2]">
              Reserved Saplings ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close reservation bag"
            className="p-2 rounded-full hover:bg-[#1a251e] text-[#a3b899] hover:text-[#f5efe2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nursery Holding & Inspection Notice (No Courier Delivery Allowed) */}
        <div className="bg-[#121915] px-5 py-3 border-b border-[#233128] text-xs">
          <div className="flex items-center gap-2 text-[#4ade80] font-medium">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Free Nursery Holding & Quality Preparation</span>
          </div>
          <p className="text-[11px] text-[#a8bba1] mt-1 leading-relaxed">
            Your plants will be tagged and reserved in our Birati inspection bay. Come in-person to verify leaves, roots & buds before paying.
          </p>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#a3b899]">
              <div className="w-16 h-16 rounded-full bg-[#141d17] border border-[#27362c] flex items-center justify-center mb-4 text-[#3c5243]">
                <ShoppingBag className="w-8 h-8 text-[#4ade80]/60" />
              </div>
              <p className="text-base font-semibold text-[#f5efe2]">No saplings reserved yet</p>
              <p className="text-xs text-[#a8bba1] mt-1 max-w-xs">
                Explore our healthy Nilkantha, Adenium desert roses, bougainvillea, and variety leaf foliage to reserve for your nursery visit.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-full bg-[#f5efe2] text-[#0b100d] text-xs font-semibold hover:bg-white transition-colors"
              >
                Browse Fresh Saplings
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const itemUnitPrice = item.plant.price + item.selectedPot.priceDiff;
              return (
                <div
                  key={`${item.plant.id}-${item.selectedPot.id}-${index}`}
                  className="p-3.5 rounded-2xl bg-[#121915] border border-[#233128] flex gap-3.5 items-center"
                >
                  <img
                    src={item.plant.image}
                    alt={item.plant.name}
                    className="w-18 h-18 rounded-xl object-cover bg-[#18231c] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#f5efe2] truncate">
                      {item.plant.name}
                    </h4>
                    <p className="text-[11px] text-[#a3b899] truncate mt-0.5">
                      {item.selectedPot.label}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-sm font-bold text-[#f5efe2] tabular-nums">
                        ₹{itemUnitPrice * item.quantity}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#27362c] rounded-lg bg-[#0d140f] text-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-1 text-[#a3b899] hover:text-[#f5efe2]"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-[#f5efe2]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 text-[#a3b899] hover:text-[#f5efe2]"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(index)}
                        aria-label="Remove item"
                        className="text-[#6b7280] hover:text-[#f43f5e] p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & On-Site Pickup CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#233128] bg-[#0f1711] space-y-3">
            {/* On-Site Visit Assurance */}
            <div className="p-3 rounded-xl bg-[#16211a] border border-[#2e4033] flex items-start gap-2.5 text-xs text-[#d1e7d8]">
              <MapPin className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
              <div>
                <strong>Direct Nursery Pickup Only:</strong> No delivery stress. Visit 4No Mahajati Nagar, Birati, Kolkata-700051, West Bengal to verify your plants in person.
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#a3b899]">
                <span>Selected Saplings</span>
                <span className="font-mono text-[#f5efe2] tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#a3b899]">
                <span>Nursery Tagging & Holding Service</span>
                <span className="font-mono text-[#4ade80] font-medium">FREE</span>
              </div>
              <div className="pt-2 border-t border-[#233128] flex justify-between text-sm font-bold text-[#f5efe2]">
                <span>Pay on In-Person Verification</span>
                <span className="font-mono text-base text-[#4ade80] tabular-nums">₹{subtotal}</span>
              </div>
            </div>

            {/* Book Visit Action */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#f5efe2] text-[#0b100d] font-semibold text-sm hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Book Nursery Visit & Reserve Plants</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
