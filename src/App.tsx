/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { InteractiveValleyHero } from './components/InteractiveValleyHero';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { SearchModal } from './components/SearchModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { PlantCareGuideSection } from './components/PlantCareGuideSection';
import { NurseryTrustBanner } from './components/NurseryTrustBanner';
import { Footer } from './components/Footer';
import { PLANT_CATALOG, NURSERY_STATS, IMAGES } from './data/plantCatalog';
import { PlantSpecies, PlantCategory, CartItem, PotOption, CodOrder } from './types/nursery';
import { Filter, Sparkles, Check, ArrowRight, ShieldCheck, Truck, Package, Eye } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<PlantCategory>('all');
  const [selectedSunlight, setSelectedSunlight] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modals & Drawers
  const [selectedPlant, setSelectedPlant] = useState<PlantSpecies | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Cart & Wishlist state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('gachhghar_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<PlantSpecies[]>(() => {
    try {
      const stored = localStorage.getItem('gachhghar_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gachhghar_cart', JSON.stringify(cart));
    } catch {
      // fallback
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gachhghar_wishlist', JSON.stringify(wishlist));
    } catch {
      // fallback
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to cart handler
  const handleAddToCart = (plant: PlantSpecies, pot?: PotOption, quantity: number = 1) => {
    const chosenPot = pot || plant.potOptions[0];
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.plant.id === plant.id && it.selectedPot.id === chosenPot.id
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { plant, selectedPot: chosenPot, quantity }];
      }
    });
    showToast(`Added ${plant.name} to your Nursery Bag!`);
  };

  // Update cart quantity
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Removed item from your bag.');
  };

  // Wishlist toggle
  const handleToggleWishlist = (plant: PlantSpecies) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === plant.id);
      if (exists) {
        showToast(`Removed from saved plants.`);
        return prev.filter((p) => p.id !== plant.id);
      } else {
        showToast(`Saved ${plant.name} to Wishlist!`);
        return [...prev, plant];
      }
    });
  };

  // Order placed
  const handleOrderPlaced = (order: CodOrder) => {
    setCart([]);
    showToast(`Plant reservation ${order.orderId} confirmed! Visit Birati nursery for in-person verification.`);
  };

  // Filtered & sorted plants
  const filteredPlants = useMemo(() => {
    return PLANT_CATALOG.filter((plant) => {
      if (activeCategory !== 'all' && plant.category !== activeCategory) {
        return false;
      }
      if (selectedSunlight !== 'all' && !plant.sunlight.toLowerCase().includes(selectedSunlight.toLowerCase())) {
        return false;
      }
      if (selectedDifficulty !== 'all' && plant.difficulty !== selectedDifficulty) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, selectedSunlight, selectedDifficulty, sortBy]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCare = () => {
    const el = document.getElementById('care-guide-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategoryAndScroll = (cat: string) => {
    setActiveCategory(cat as PlantCategory);
    scrollToCatalog();
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b100d] text-[#f5efe2] font-sans selection:bg-[#4ade80]/20 selection:text-[#f5efe2]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#141d17] border border-[#4ade80]/40 text-[#f5efe2] text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fade-in backdrop-blur-md">
          <Check className="w-4 h-4 text-[#4ade80]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3D Valley Hero (Fernhollow Night Flower Valley Recreation for Gachhghar) */}
      <InteractiveValleyHero
        onExploreClick={scrollToCatalog}
        onCategorySelect={handleSelectCategoryAndScroll}
      />

      {/* Header with Top Bar Contract */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onScrollToCare={scrollToCare}
      />

      {/* Nursery Key Figures Strip (Claim-to-Proof Adjacency) */}
      <section className="border-b border-[#233128] bg-[#0e1611] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {NURSERY_STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-[#f5efe2] tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#a3b899] mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main E-Commerce Catalog Section */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Section Header & Narrative */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#4ade80] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gachhghar Certified Plant Nursery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-antonio tracking-tight text-[#f5efe2]">
              LIVING BOTANICAL COLLECTION
            </h2>
            <p className="text-xs sm:text-sm text-[#a3b899] mt-1.5 max-w-xl">
              Specializing in blooming roses, cascading bougainvillea, variegated variety leaf foliage, and sacred dwarf bowl lotus. <strong className="text-[#f5efe2]">No courier shipping</strong> — visit our Birati nursery to personally examine and verify living plants before paying.
            </p>
          </div>

          {/* Quick Tracking Button */}
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-[#141d17] hover:bg-[#1f2b23] border border-[#27362c] text-xs font-medium text-[#d1e7d8] flex items-center gap-2 transition-colors shrink-0"
          >
            <Package className="w-4 h-4 text-[#4ade80]" />
            <span>Track Plant Reservation & Visit</span>
          </button>
        </div>

        {/* Category Filter Tabs (Functional Segmented Control) */}
        <div className="flex items-center gap-2 p-1.5 bg-[#121915] rounded-2xl border border-[#233128] overflow-x-auto mb-6">
          {[
            { id: 'all', label: 'All Plants (35+)' },
            { id: 'rose', label: '🌹 Roses & Desert Rose (Adenium)' },
            { id: 'flowering-climbers', label: '🌸 Nilkantha & Jasmine' },
            { id: 'bougainvillea', label: '🌺 Bougainvillea & Hibiscus' },
            { id: 'variety-leaf', label: '🌿 Variety Leaf & Indoor (Dracaena, Croton, ZZ)' },
            { id: 'palms-bonsai', label: '🌴 Palms, Bonsai & Sacred Tulsi' },
            { id: 'lotus-aquatic', label: '🪷 Sacred Lotus & Lilies' },
            { id: 'planters-soil', label: '🌱 Soil & Mixes' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as PlantCategory)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#223629] text-[#f5efe2] border border-[#3c5243] shadow-sm'
                  : 'text-[#a3b899] hover:text-[#f5efe2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-xl bg-[#0d140f] border border-[#233128] mb-8 text-xs text-[#a3b899]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#4ade80]" />
              <span className="font-medium text-[#f5efe2]">Filter By:</span>
            </div>

            {/* Sunlight Selector */}
            <select
              value={selectedSunlight}
              onChange={(e) => setSelectedSunlight(e.target.value)}
              className="bg-[#141d17] border border-[#27362c] rounded-lg px-2.5 py-1.5 text-xs text-[#f5efe2] focus:outline-none"
            >
              <option value="all">All Sunlight Needs</option>
              <option value="Full Sun">Full Sun (6+ hrs)</option>
              <option value="Bright Indirect">Bright Indirect Light</option>
              <option value="Direct Aquatic">Aquatic Direct Sun</option>
            </select>

            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#141d17] border border-[#27362c] rounded-lg px-2.5 py-1.5 text-xs text-[#f5efe2] focus:outline-none"
            >
              <option value="all">All Experience Levels</option>
              <option value="Beginner Friendly">Beginner Friendly</option>
              <option value="Moderate">Moderate</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
              className="bg-[#141d17] border border-[#27362c] rounded-lg px-2.5 py-1.5 text-xs text-[#f5efe2] focus:outline-none font-medium"
            >
              <option value="featured">Featured Varieties</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        {filteredPlants.length === 0 ? (
          <div className="py-20 text-center text-[#a3b899] bg-[#101712] rounded-3xl border border-[#233128] p-8">
            <p className="text-base font-semibold text-[#f5efe2]">No plants match the selected filters.</p>
            <p className="text-xs text-[#a8bba1] mt-1">Try resetting the sunlight or difficulty filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedSunlight('all');
                setSelectedDifficulty('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#223629] text-[#f5efe2] text-xs font-semibold hover:bg-[#2c4233]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlants.map((plant) => (
              <ProductCard
                key={plant.id}
                plant={plant}
                onQuickView={setSelectedPlant}
                onAddToCart={(p) => handleAddToCart(p)}
                isWishlisted={wishlist.some((w) => w.id === plant.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Curated Botanical Spotlight (Split Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Spotlight 1: Sacred Lotus */}
          <div className="p-6 rounded-3xl bg-[#111813] border border-[#233128] flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#4ade80]">
                Balcony Aquatic Gardening
              </span>
              <h3 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2] mt-1.5">
                SACRED INDIAN BOWL LOTUS
              </h3>
              <p className="text-xs text-[#a3b899] mt-2 leading-relaxed">
                Spiritual serenity on your balcony. Dwarf varieties bloom in shallow 16-inch ceramic bowls. Sprouted tubers with live transit guarantee.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1f2b23] flex items-center justify-between">
              <span className="text-lg font-bold font-mono text-[#f5efe2]">₹549</span>
              <button
                onClick={() => {
                  setActiveCategory('lotus-aquatic');
                  scrollToCatalog();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#f5efe2] text-[#0b100d] text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1"
              >
                <span>View Lotus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Spotlight 2: Nilkantha (Aparajita) */}
          <div className="p-6 rounded-3xl bg-[#111813] border border-[#233128] flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
                Sacred Climber & Herbal Tea
              </span>
              <h3 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2] mt-1.5">
                NILKANTHA (APARAJITA)
              </h3>
              <p className="text-xs text-[#a3b899] mt-2 leading-relaxed">
                Cobalt-blue conch flowers sacred for puja and antioxidant-packed blue tea. Vigorous climber supplied on bamboo trellises.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1f2b23] flex items-center justify-between">
              <span className="text-lg font-bold font-mono text-[#f5efe2]">₹249</span>
              <button
                onClick={() => {
                  setActiveCategory('flowering-climbers');
                  scrollToCatalog();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#f5efe2] text-[#0b100d] text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1"
              >
                <span>View Nilkantha</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Spotlight 3: Adenium Desert Rose */}
          <div className="p-6 rounded-3xl bg-[#111813] border border-[#233128] flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f43f5e]">
                Sculptural Caudex Bonsai
              </span>
              <h3 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2] mt-1.5">
                ADENIUM DESERT ROSE
              </h3>
              <p className="text-xs text-[#a3b899] mt-2 leading-relaxed">
                Thick bulbous water-storing caudex trunk crowned with trumpet blooms in vivid crimson. Heat-loving and drought-hardy.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1f2b23] flex items-center justify-between">
              <span className="text-lg font-bold font-mono text-[#f5efe2]">₹499</span>
              <button
                onClick={() => {
                  setActiveCategory('rose');
                  scrollToCatalog();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#f5efe2] text-[#0b100d] text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1"
              >
                <span>View Adenium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Spotlight 4: Bougainvillea & Hibiscus */}
          <div className="p-6 rounded-3xl bg-[#111813] border border-[#233128] flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#e879f9]">
                Terrace Sun Showstoppers
              </span>
              <h3 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2] mt-1.5">
                BOUGAINVILLEA & HIBISCUS
              </h3>
              <p className="text-xs text-[#a3b899] mt-2 leading-relaxed">
                Royal purple cascading paper bracts and giant multi-petal Joba flowers. 365 days of nonstop flowering under bright sun.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1f2b23] flex items-center justify-between">
              <span className="text-lg font-bold font-mono text-[#f5efe2]">₹329</span>
              <button
                onClick={() => {
                  setActiveCategory('bougainvillea');
                  scrollToCatalog();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#f5efe2] text-[#0b100d] text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1"
              >
                <span>View Blooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Animated Preparation & Visit Lifecycle Callout Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121915] via-[#16221a] to-[#121915] border border-[#2a3c30] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#4ade80]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Birati Mother Nursery · In-Person Visit System</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2]">
              VISUALIZE YOUR PLANT'S PREPARATION & VISIT LIFECYCLE
            </h3>
            <p className="text-xs sm:text-sm text-[#a3b899] max-w-2xl leading-relaxed">
              No delivery stress. Track your reserved plants in real time: <strong>Reserved</strong> (specimen allocated) → <strong>Tagged</strong> (root audit & bio-hydration) → <strong>Ready</strong> (waiting in Birati inspection bay) → <strong>Verified & Picked Up</strong> (in-person examination & collection).
            </p>
          </div>

          <button
            onClick={() => setIsTrackingOpen(true)}
            className="px-6 py-3.5 rounded-full bg-[#f5efe2] text-[#0b100d] font-bold text-xs sm:text-sm hover:bg-white active:scale-95 transition-all shadow-lg flex items-center gap-2.5 shrink-0"
          >
            <Eye className="w-4 h-4 text-[#0b100d]" />
            <span>Launch Plant Visit Tracker</span>
          </button>
        </div>
      </section>

      {/* Nursery Trust Banner (Highlighting Cash on Delivery Guarantee) */}
      <NurseryTrustBanner />

      {/* Plant Care Masterclass Section */}
      <PlantCareGuideSection />

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategoryAndScroll}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onScrollToCare={scrollToCare}
      />

      {/* Modals & Slide-Overs */}
      <ProductModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedPlant ? wishlist.some((w) => w.id === selectedPlant.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderPlaced={handleOrderPlaced}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(plant) => {
          handleAddToCart(plant);
          handleToggleWishlist(plant);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        plants={PLANT_CATALOG}
        onSelectPlant={setSelectedPlant}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </div>
  );
}
