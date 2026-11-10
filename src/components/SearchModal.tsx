import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { PlantSpecies } from '../types/nursery';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: PlantSpecies[];
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  plants,
  onSelectPlant,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = plants.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.scientificName.toLowerCase().includes(q) ||
      (p.localName && p.localName.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.sunlight.toLowerCase().includes(q)
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#101712] rounded-3xl border border-[#27362c] text-[#f5efe2] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-[#233128] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#4ade80]" />
          <input
            autoFocus
            type="text"
            placeholder="Search roses, bougainvillea, lotus, variety leaf plants..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm text-[#f5efe2] placeholder:text-[#3c5243] focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-full hover:bg-[#1a251e] text-[#a3b899]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick query pills */}
        <div className="px-4 py-2.5 bg-[#0b100d] border-b border-[#1f2b23] flex items-center gap-2 overflow-x-auto text-xs text-[#a3b899]">
          <span className="shrink-0 text-[#3c5243]">Try:</span>
          {['Nilkantha', 'Adenium', 'Dracaena', 'Hibiscus', 'Bowl Lotus', 'Monstera', 'Areca Palm'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-md bg-[#141d17] hover:bg-[#1f2b23] hover:text-[#f5efe2] shrink-0 border border-[#233128] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#a3b899]">
              No plant species found for "{query}". Try searching "Rose", "Bougainvillea", or "Lotus".
            </div>
          ) : (
            filtered.map((plant) => (
              <div
                key={plant.id}
                onClick={() => {
                  onSelectPlant(plant);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-[#141d17] hover:bg-[#1b261f] border border-[#233128] flex items-center gap-3 cursor-pointer transition-colors group"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-12 h-12 rounded-xl object-cover bg-[#18231c] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#f5efe2] group-hover:text-[#4ade80] transition-colors truncate">
                    {plant.name}
                  </h4>
                  <p className="text-xs text-[#a3b899] truncate font-mono">
                    {plant.scientificName} · {plant.sunlight}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-sm font-bold text-[#f5efe2]">₹{plant.price}</span>
                  <ArrowRight className="w-4 h-4 text-[#a3b899] group-hover:text-[#4ade80] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
