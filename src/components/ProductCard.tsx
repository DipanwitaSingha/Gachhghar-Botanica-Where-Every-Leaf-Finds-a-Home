import React, { useState } from 'react';
import { Heart, Plus, Eye, Sun, Droplets, Check } from 'lucide-react';
import { PlantSpecies } from '../types/nursery';

interface ProductCardProps {
  plant: PlantSpecies;
  onQuickView: (plant: PlantSpecies) => void;
  onAddToCart: (plant: PlantSpecies) => void;
  isWishlisted: boolean;
  onToggleWishlist: (plant: PlantSpecies) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  plant,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(plant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const categoryDisplay = {
    rose: 'Rose & Desert Rose',
    bougainvillea: 'Bougainvillea & Hibiscus',
    'variety-leaf': 'Variety Leaf & Indoor',
    'lotus-aquatic': 'Sacred Aquatic Lotus',
    'flowering-climbers': 'Nilkantha & Climbers',
    'palms-bonsai': 'Palms, Bonsai & Herbs',
    'planters-soil': 'Soil & Planters',
    all: 'Nursery Sapling',
  }[plant.category];

  return (
    <article
      onClick={() => onQuickView(plant)}
      className="group relative bg-[#111713] rounded-2xl border border-[#233128] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#3c5243] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
    >
      {/* 4:3 Image Container (takes major presence) */}
      <div className="relative aspect-[4/3] w-full bg-[#18231c] overflow-hidden">
        {/* Fallback pattern while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#16211a] animate-pulse flex items-center justify-center text-[#3c5243]">
            <span className="text-xs font-mono">Loading botanical preview...</span>
          </div>
        )}

        <img
          src={plant.image}
          alt={plant.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Quiet Subtle Delivery Tag (Top Left - single unobtrusive text tag, not a candy pill) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0b100d]/80 backdrop-blur-md border border-[#27362c]/60 text-[11px] font-mono tracking-wide text-[#d1e7d8]">
          Inspect at Nursery
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(plant);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#0b100d]/80 backdrop-blur-md border border-[#27362c]/60 text-[#d1e7d8] hover:text-[#f43f5e] hover:scale-110 active:scale-95 transition-all"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#f43f5e] text-[#f43f5e]' : ''
            }`}
          />
        </button>

        {/* Quick View Floating Action (appears on hover) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center">
          <span className="px-3.5 py-1.5 rounded-full bg-[#0b100d]/90 backdrop-blur-md border border-[#3c5243] text-xs font-medium text-[#f5efe2] flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> View & Reserve
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Separator (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#a3b899] mb-1.5 font-medium">
            <span>{categoryDisplay}</span>
            <span aria-hidden="true" className="text-[#3c5243]">·</span>
            <span className="italic font-normal">{plant.scientificName}</span>
          </div>

          {/* Plant Name & Local Bengali Name */}
          <h3 className="text-base sm:text-lg font-semibold text-[#f5efe2] group-hover:text-[#4ade80] transition-colors line-clamp-1">
            {plant.name}
          </h3>
          {plant.localName && (
            <p className="text-xs text-[#a8bba1]/80 mt-0.5 line-clamp-1">
              {plant.localName}
            </p>
          )}

          {/* Key Plant Requirements (Quiet metadata strip) */}
          <div className="mt-3 py-2 border-y border-[#1f2b23] flex items-center justify-between text-xs text-[#a3b899]">
            <div className="flex items-center gap-1.5" title="Sunlight Requirement">
              <Sun className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="truncate max-w-[110px]">{plant.sunlight.split('(')[0]}</span>
            </div>
            <span className="text-[#27362c]">|</span>
            <div className="flex items-center gap-1.5" title="Watering Need">
              <Droplets className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="truncate max-w-[110px]">{plant.watering}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart Row */}
        <div className="mt-4 pt-1 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold font-mono text-[#f5efe2] tabular-nums">
                ₹{plant.price}
              </span>
              {plant.originalPrice > plant.price && (
                <span className="text-xs text-[#6b7280] line-through font-mono tabular-nums">
                  ₹{plant.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#4ade80] font-medium">Pay on Pickup</span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Reserve ${plant.name} for nursery pickup`}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 active:scale-95 ${
              addedAnimation
                ? 'bg-[#22c55e] text-[#0b100d]'
                : 'bg-[#223629] text-[#f5efe2] hover:bg-[#344d3c] border border-[#3c5243]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Reserved</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Reserve</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
