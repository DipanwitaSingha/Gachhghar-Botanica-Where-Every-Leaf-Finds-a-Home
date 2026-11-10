import React from 'react';
import { ShieldCheck, Phone, MapPin, Mail, Award, Truck } from 'lucide-react';
import { NURSERY_CONTACT } from '../data/plantCatalog';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenTracking: () => void;
  onScrollToCare: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracking,
  onScrollToCare,
}) => {
  return (
    <footer className="w-full bg-[#070c09] text-[#a3b899] border-t border-[#233128] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1b261f]">
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="text-2xl font-antonio tracking-tight text-[#f5efe2]">
            GACHHGHAR<span className="text-[#4ade80]">.</span>
          </div>
          <p className="text-xs text-[#a8bba1] leading-relaxed">
            Grow Your Own Paradise. Online botanical plant nursery providing rooted rose plants, Adenium desert roses, Nilkantha butterfly pea, vibrant bougainvillea, variety leaf houseplants, Areca palms, and sacred water lotus.
          </p>
          <div className="pt-2 text-xs font-mono text-[#d1e7d8] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
            <span>Pay on In-Person Inspection & Verification</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3 text-xs">
          <h4 className="font-semibold text-[#f5efe2] tracking-wider uppercase">Nursery Species</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectCategory('rose')}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                🌹 Roses & Adenium Desert Rose
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('bougainvillea')}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                🌺 Bougainvillea & Multicolored Hibiscus
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('flowering-climbers')}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                🌸 Nilkantha (Aparajita), Jasmine & Rangoon Creeper
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('variety-leaf')}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                🌿 Dracaena, Monstera, Croton & ZZ Plant
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('palms-bonsai')}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                🌴 Areca Palm, Tamarind Bonsai & Sacred Tulsi
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('lotus-aquatic')}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                🪷 Sacred Bowl Lotus & Water Lilies
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care & Orders */}
        <div className="space-y-3 text-xs">
          <h4 className="font-semibold text-[#f5efe2] tracking-wider uppercase">Order & Nursery Growth</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={onOpenTracking}
                className="text-[#4ade80] font-semibold hover:underline flex items-center gap-1.5 text-left"
              >
                <Truck className="w-3.5 h-3.5" /> Track Live Nursery Growth Cycle
              </button>
            </li>
            <li>
              <button
                onClick={onScrollToCare}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                Balcony Lotus & Nilkantha Growing Guide
              </button>
            </li>
            <li>
              <button
                onClick={onScrollToCare}
                className="hover:text-[#f5efe2] transition-colors text-left"
              >
                Adenium & Bougainvillea Bloom Secrets
              </button>
            </li>
            <li>
              <span className="hover:text-[#f5efe2] transition-colors">
                100% In-Person Root & Foliage Health Check
              </span>
            </li>
            <li>
              <span className="hover:text-[#f5efe2] transition-colors">
                Nursery Counter Cash / UPI Payment on Pickup
              </span>
            </li>
          </ul>
        </div>

        {/* Official Nursery Location & Contact Details (Specified by User) */}
        <div className="space-y-3 text-xs">
          <h4 className="font-semibold text-[#f5efe2] tracking-wider uppercase">Nursery Headquarters</h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
              <span className="text-[#d1e7d8] leading-relaxed">
                {NURSERY_CONTACT.address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#4ade80] shrink-0" />
              <a href={`mailto:${NURSERY_CONTACT.email}`} className="text-[#f5efe2] hover:text-[#4ade80] font-mono">
                {NURSERY_CONTACT.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#4ade80] shrink-0" />
              <span className="font-mono text-[#f5efe2]">{NURSERY_CONTACT.phone}</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#121915] border border-[#233128] text-[11px] text-[#a8bba1] leading-relaxed">
            🏡 <strong>Location Landmark:</strong> Opposite Indian Air Force Camp, CEAT Tyres Building, Birati, Kolkata-700051, West Bengal. Visitors and pickup orders welcome!
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a3b899] gap-4">
        <div>
          © {new Date().getFullYear()} Gachhghar – Grow Your Own Paradise. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span>Birati, Kolkata 700051, West Bengal</span>
          <span>·</span>
          <span>Pay On Nursery Pickup & Verification</span>
          <span>·</span>
          <span>supportgachhghar@gmail.com</span>
        </div>
      </div>
    </footer>
  );
};
