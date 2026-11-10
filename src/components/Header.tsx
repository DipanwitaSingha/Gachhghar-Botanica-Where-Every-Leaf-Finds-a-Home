import React from 'react';
import { ShoppingBag, Heart, Search } from 'lucide-react';
import { PlantCategory } from '../types/nursery';

interface HeaderProps {
  activeCategory: PlantCategory;
  onSelectCategory: (cat: PlantCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onScrollToCare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onScrollToCare,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b100d]/90 backdrop-blur-md border-b border-[#27362c]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark as per Top Bar Contract) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2] hover:text-[#4ade80] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>GACHHGHAR</span>
          <span className="text-[#4ade80] text-lg font-mono">.</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.16em] uppercase font-medium text-[#d1e7d8]">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#f5efe2] pb-1 border-b ${
              activeCategory === 'all'
                ? 'border-[#4ade80] text-[#f5efe2]'
                : 'border-transparent text-[#a3b899]'
            }`}
          >
            All Saplings
          </button>
          <button
            onClick={() => onSelectCategory('rose')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#f5efe2] pb-1 border-b ${
              activeCategory === 'rose'
                ? 'border-[#4ade80] text-[#f5efe2]'
                : 'border-transparent text-[#a3b899]'
            }`}
          >
            Rose Plants
          </button>
          <button
            onClick={() => onSelectCategory('bougainvillea')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#f5efe2] pb-1 border-b ${
              activeCategory === 'bougainvillea'
                ? 'border-[#4ade80] text-[#f5efe2]'
                : 'border-transparent text-[#a3b899]'
            }`}
          >
            Bougainvillea
          </button>
          <button
            onClick={() => onSelectCategory('variety-leaf')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#f5efe2] pb-1 border-b ${
              activeCategory === 'variety-leaf'
                ? 'border-[#4ade80] text-[#f5efe2]'
                : 'border-transparent text-[#a3b899]'
            }`}
          >
            Variety Leaf
          </button>
          <button
            onClick={() => onSelectCategory('lotus-aquatic')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#f5efe2] pb-1 border-b ${
              activeCategory === 'lotus-aquatic'
                ? 'border-[#4ade80] text-[#f5efe2]'
                : 'border-transparent text-[#a3b899]'
            }`}
          >
            Sacred Lotus
          </button>
          <button
            onClick={onScrollToCare}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#f5efe2] pb-1 border-b border-transparent text-[#a3b899]"
          >
            Care Guides
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search plant varieties"
            className="p-2 text-[#a3b899] hover:text-[#f5efe2] rounded-full hover:bg-[#16211a] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            aria-label="View saved plants"
            className="relative p-2 text-[#a3b899] hover:text-[#f5efe2] rounded-full hover:bg-[#16211a] transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#e11d48] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag & COD Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View plant cart"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#f5efe2] text-[#0b100d] font-semibold text-xs sm:text-sm hover:bg-white active:scale-95 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Nursery Bag</span>
            <span className="w-5 h-5 rounded-full bg-[#0b100d] text-[#f5efe2] text-xs flex items-center justify-center font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
