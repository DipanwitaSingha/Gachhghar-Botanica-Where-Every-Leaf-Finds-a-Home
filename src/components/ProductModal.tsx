import React, { useState } from 'react';
import { X, Sun, Droplets, Sparkles, ShieldCheck, Truck, Star, Heart, Check, Compass } from 'lucide-react';
import { PlantSpecies, PotOption } from '../types/nursery';

interface ProductModalProps {
  plant: PlantSpecies | null;
  onClose: () => void;
  onAddToCart: (plant: PlantSpecies, selectedPot: PotOption, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (plant: PlantSpecies) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  plant,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!plant) return null;

  const [selectedPot, setSelectedPot] = useState<PotOption>(plant.potOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'care' | 'reviews'>('overview');
  const [added, setAdded] = useState(false);
  const [sunHours, setSunHours] = useState(6);

  const totalPrice = (plant.price + selectedPot.priceDiff) * quantity;

  const handleAdd = () => {
    onAddToCart(plant, selectedPot, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#101712] rounded-3xl border border-[#27362c] text-[#f5efe2] shadow-2xl flex flex-col md:flex-row my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0b100d]/80 text-[#f5efe2] hover:bg-[#1f2b23] transition-colors border border-[#27362c]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Showcase & Guarantee Strip */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#0d140f] border-b md:border-b-0 md:border-r border-[#223127]">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#18231c]">
            <img
              src={plant.image}
              alt={plant.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Live plant verification badge */}
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[#0b100d]/90 backdrop-blur-md border border-[#3c5243] text-xs font-medium text-[#4ade80] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
              <span>In-Person Plant Verification</span>
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => onToggleWishlist(plant)}
              aria-label="Wishlist toggle"
              className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#0b100d]/80 backdrop-blur-md border border-[#27362c] text-[#f5efe2] hover:text-[#f43f5e] transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#f43f5e] text-[#f43f5e]' : ''}`} />
            </button>
          </div>

          {/* Species Quick Specs Grid */}
          <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#141d17] border border-[#233128]">
              <span className="text-[#a3b899] block mb-1">Sunlight Need</span>
              <span className="font-semibold text-[#f5efe2] flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#fbbf24]" />
                {plant.sunlight}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#141d17] border border-[#233128]">
              <span className="text-[#a3b899] block mb-1">Watering Cycle</span>
              <span className="font-semibold text-[#f5efe2] flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#38bdf8]" />
                {plant.watering}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#141d17] border border-[#233128]">
              <span className="text-[#a3b899] block mb-1">Bloom Season</span>
              <span className="font-semibold text-[#f5efe2] truncate block">
                {plant.bloomSeason}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#141d17] border border-[#233128]">
              <span className="text-[#a3b899] block mb-1">Gardener Level</span>
              <span className="font-semibold text-[#f5efe2] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#a855f7]" />
                {plant.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module & Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="text-xs uppercase tracking-[0.16em] text-[#a3b899] mb-1 font-mono">
              {plant.category} · {plant.scientificName}
            </div>

            <h2 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2]">
              {plant.name}
            </h2>
            {plant.localName && (
              <p className="text-sm text-[#4ade80] font-medium mt-0.5">
                {plant.localName}
              </p>
            )}

            {/* Price & Rating */}
            <div className="mt-3 flex items-center justify-between pb-3 border-b border-[#233128]">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#f5efe2] tabular-nums">
                  ₹{plant.price + selectedPot.priceDiff}
                </span>
                {plant.originalPrice > plant.price && (
                  <span className="text-sm text-[#6b7280] line-through font-mono tabular-nums">
                    ₹{plant.originalPrice + selectedPot.priceDiff}
                  </span>
                )}
                <span className="text-xs text-[#22c55e] font-semibold bg-[#22c55e]/10 px-2 py-0.5 rounded">
                  Save ₹{plant.originalPrice - plant.price}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#a3b899]">
                <Star className="w-4 h-4 fill-[#eab308] text-[#eab308]" />
                <span className="font-semibold text-[#f5efe2]">{plant.rating}</span>
                <span>({plant.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Tabs for Overview, Care, Reviews */}
            <div className="flex items-center gap-4 mt-4 border-b border-[#233128] text-xs font-medium tracking-wide">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-[#4ade80] text-[#f5efe2]'
                    : 'border-transparent text-[#a3b899] hover:text-[#f5efe2]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'care'
                    ? 'border-[#4ade80] text-[#f5efe2]'
                    : 'border-transparent text-[#a3b899] hover:text-[#f5efe2]'
                }`}
              >
                Care Instructions
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-[#4ade80] text-[#f5efe2]'
                    : 'border-transparent text-[#a3b899] hover:text-[#f5efe2]'
                }`}
              >
                Reviews ({plant.reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4 text-xs sm:text-sm text-[#d1e7d8] leading-relaxed max-h-48 overflow-y-auto pr-1">
              {activeTab === 'overview' && (
                <div className="space-y-3">
                  <p>{plant.fullDescription}</p>
                  <div className="flex items-center gap-3 text-xs text-[#a3b899]">
                    <span>Fragrance: <strong className="text-[#f5efe2]">{plant.fragrance}</strong></span>
                    <span>·</span>
                    <span>Mature Height: <strong className="text-[#f5efe2]">{plant.matureHeight}</strong></span>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2.5">
                  <div className="font-semibold text-[#f5efe2]">Nursery Master Tips:</div>
                  <ul className="space-y-1.5 list-disc pl-4 text-xs text-[#d1e7d8]">
                    {plant.careTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>

                  {/* Interactive Sunlight Hours Visualizer */}
                  <div className="mt-3 p-3 rounded-xl bg-[#141d17] border border-[#233128]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#a3b899]">Simulate Your Balcony Sun:</span>
                      <span className="font-semibold text-[#fbbf24]">{sunHours} Hours/Day</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={sunHours}
                      onChange={(e) => setSunHours(Number(e.target.value))}
                      className="w-full accent-[#4ade80] cursor-pointer"
                    />
                    <p className="text-[11px] text-[#a8bba1] mt-1">
                      {sunHours >= 6
                        ? '🌟 Ideal! This plant will produce abundant blooms and deep coloration.'
                        : sunHours >= 4
                        ? '⛅ Good for healthy green leaves, moderate flowering.'
                        : '⚠️ Low light for this variety. Supplement or place in brighter exposure.'}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {plant.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 rounded-xl bg-[#141d17] border border-[#233128]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#f5efe2]">{rev.author}</span>
                        <span className="text-[#a3b899]">{rev.date} · {rev.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1 text-[#eab308]">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-[#d1e7d8]">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pot Option Selector */}
            <div className="mt-2">
              <label className="text-xs font-semibold text-[#f5efe2] block mb-1.5">
                Select Pot / Planting Setup:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {plant.potOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedPot(opt)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                      selectedPot.id === opt.id
                        ? 'bg-[#1b2720] border-[#4ade80] text-[#f5efe2]'
                        : 'bg-[#121915] border-[#27362c] text-[#a3b899] hover:border-[#3c5243]'
                    }`}
                  >
                    <div className="font-medium flex justify-between items-center">
                      <span>{opt.label}</span>
                      {opt.priceDiff > 0 && (
                        <span className="font-mono text-[#4ade80]">+₹{opt.priceDiff}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#a8bba1]/80 mt-0.5">{opt.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Contiguous Action Bar */}
          <div className="mt-6 pt-4 border-t border-[#233128] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#27362c] rounded-xl overflow-hidden bg-[#121915]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-[#a3b899] hover:text-[#f5efe2] hover:bg-[#1a251e] transition-colors"
              >
                -
              </button>
              <span className="px-3 py-2 font-mono text-sm font-semibold text-[#f5efe2] tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-[#a3b899] hover:text-[#f5efe2] hover:bg-[#1a251e] transition-colors"
              >
                +
              </button>
            </div>

            {/* Primary Buy CTA: Nursery Pickup & Verification */}
            <button
              onClick={handleAdd}
              className={`flex-1 w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                added
                  ? 'bg-[#22c55e] text-[#0b100d]'
                  : 'bg-[#f5efe2] text-[#0b100d] hover:bg-white shadow-lg shadow-black/40'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Reserved for Nursery Visit</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Reserve for Nursery Inspection (₹{totalPrice})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
