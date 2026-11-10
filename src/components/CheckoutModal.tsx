import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  Calendar, 
  Eye, 
  Sparkles, 
  Banknote,
  AlertCircle
} from 'lucide-react';
import { CartItem, CodOrder } from '../types/nursery';
import { NURSERY_CONTACT } from '../data/plantCatalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderPlaced: (order: CodOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [visitDate, setVisitDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Morning (8:00 AM – 12:00 PM)');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CodOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.plant.price + item.selectedPot.priceDiff) * item.quantity,
    0
  );
  const total = subtotal; // No shipping fees because delivery is not permitted

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !phone.trim() || !visitDate) {
      setErrorMsg('Please provide your name, 10-digit mobile number, and preferred nursery visit date.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number so we can coordinate your nursery visit.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const newOrder: CodOrder = {
        orderId: `GG-PICKUP-${randomNum}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: area.trim() || 'Visiting Customer',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700051',
        visitDate,
        visitTimeSlot: timeSlot,
        deliveryNotes: specialNotes.trim(),
        items: [...cart],
        subtotal,
        shipping: 0,
        total,
        paymentMethod: 'Pay on Nursery Pickup & Inspection (Cash / UPI)',
        status: 'Reserved',
        currentStageIndex: 0,
        estimatedDelivery: `Visit on ${visitDate} (${timeSlot})`,
      };

      // Save to localStorage
      try {
        const stored = localStorage.getItem('gachhghar_orders');
        const orders: CodOrder[] = stored ? JSON.parse(stored) : [];
        localStorage.setItem('gachhghar_orders', JSON.stringify([newOrder, ...orders]));
      } catch {
        // LocalStorage fallback
      }

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#101712] rounded-3xl border border-[#27362c] text-[#f5efe2] shadow-2xl p-6 sm:p-8 my-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0b100d]/80 text-[#f5efe2] hover:bg-[#1f2b23] transition-colors border border-[#27362c]"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Nursery Visit Confirmation Pass */
          <div className="py-4 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center mx-auto text-[#4ade80]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#4ade80]">
                Plant Reservation Confirmed · On-Site Pickup
              </span>
              <h2 className="text-3xl font-antonio tracking-tight text-[#f5efe2] mt-1">
                Your Plants Are Being Tagged & Prepared!
              </h2>
              <p className="text-sm text-[#a3b899] mt-1.5 max-w-md mx-auto">
                Thank you, <strong className="text-[#f5efe2]">{confirmedOrder.customerName}</strong>. Our Birati nursery horticulturist is tagging your selected saplings in our holding bay for your personal visit.
              </p>
            </div>

            {/* Visit Pass Card */}
            <div className="p-5 rounded-2xl bg-[#141d17] border border-[#233128] text-left space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-[#233128]">
                <div>
                  <span className="text-xs text-[#a3b899] block font-mono">Pickup Token / Slip:</span>
                  <span className="font-mono text-base font-bold text-[#4ade80]">
                    {confirmedOrder.orderId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#a3b899] block font-mono">Amount Payable on Inspection:</span>
                  <span className="font-mono text-lg font-bold text-[#f5efe2]">
                    ₹{confirmedOrder.total}
                  </span>
                </div>
              </div>

              {/* Visit Schedule & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[#a3b899] block font-medium">Your Scheduled Visit:</span>
                  <p className="text-[#f5efe2] font-semibold mt-0.5">
                    {confirmedOrder.visitDate}
                  </p>
                  <p className="text-[#4ade80] mt-0.5">{confirmedOrder.visitTimeSlot}</p>
                </div>
                <div>
                  <span className="text-[#a3b899] block font-medium">Payment Protocol:</span>
                  <p className="text-[#eab308] font-semibold mt-0.5">
                    Pay upon In-Person Verification
                  </p>
                  <p className="text-[11px] text-[#a3b899]">
                    Cash or UPI QR accepted at nursery counter after you inspect and approve the plants.
                  </p>
                </div>
              </div>

              {/* Nursery Address & Landmarks */}
              <div className="p-3.5 rounded-xl bg-[#0b100d] border border-[#27362c] text-xs space-y-1">
                <span className="text-[#4ade80] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Nursery Pickup Destination:
                </span>
                <p className="text-[#d1e7d8] leading-relaxed">
                  {NURSERY_CONTACT.address}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#a8bba1] pt-1">
                  <span>Helpline: <strong className="text-[#f5efe2] font-mono">{NURSERY_CONTACT.phone}</strong></span>
                  <span>·</span>
                  <span>Email: <strong className="text-[#f5efe2] font-mono">{NURSERY_CONTACT.email}</strong></span>
                </div>
              </div>

              {/* Reserved Plants List */}
              <div className="pt-2">
                <span className="text-xs text-[#a3b899] block mb-2 font-medium">
                  Reserved Species ({confirmedOrder.items.length}):
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-[#d1e7d8] p-1.5 rounded-lg bg-[#111913]">
                      <span>
                        {it.quantity}x {it.plant.name} ({it.selectedPot.label})
                      </span>
                      <span className="font-mono font-medium text-[#f5efe2]">
                        ₹{(it.plant.price + it.selectedPot.priceDiff) * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-xl bg-[#f5efe2] text-[#0b100d] font-semibold text-sm hover:bg-white transition-colors"
            >
              Back to Gachhghar Nursery
            </button>
          </div>
        ) : (
          /* Booking Form: Nursery Visit & Plant Reservation */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#4ade80] mb-1">
                <Eye className="w-4 h-4" />
                <span>In-Person Inspection & Direct Pickup</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2]">
                Reserve Plants for Nursery Visit
              </h2>
              <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
                No delivery courier system. Reserve your chosen species online, visit our Birati, West Bengal nursery to personally examine each plant's health, and pay only upon pickup.
              </p>
            </div>

            {/* Crucial Business Constraint Callout */}
            <div className="mb-5 p-3.5 rounded-xl bg-[#16211a] border border-[#2e4233] flex items-start gap-3 text-xs text-[#d1e7d8]">
              <AlertCircle className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#f5efe2]">Strictly No Courier Delivery:</strong> Customers must visit our nursery in person to verify their chosen species (Nilkantha, Adenium, Bougainvillea, Roses, Lotus, etc.) before taking them home. Zero advance risk!
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#d1e7d8] mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#4ade80]" /> Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Subrata Mukherjee"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d17] border border-[#27362c] focus:border-[#4ade80] focus:outline-none text-sm text-[#f5efe2] placeholder:text-[#3c5243]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d1e7d8] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#4ade80]" /> Mobile Number (For Visit Coordination) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 8100682397"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d17] border border-[#27362c] focus:border-[#4ade80] focus:outline-none text-sm text-[#f5efe2] font-mono placeholder:text-[#3c5243]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#d1e7d8] mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#4ade80]" /> Preferred Visit Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d17] border border-[#27362c] focus:border-[#4ade80] focus:outline-none text-sm text-[#f5efe2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d1e7d8] mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#4ade80]" /> Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d17] border border-[#27362c] focus:border-[#4ade80] focus:outline-none text-xs sm:text-sm text-[#f5efe2]"
                  >
                    <option value="Morning (8:00 AM – 12:00 PM)">Morning (8:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM – 4:00 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
                    <option value="Evening (4:00 PM – 7:30 PM)">Evening (4:00 PM – 7:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d1e7d8] mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4ade80]" /> Your Locality / Area (e.g. Birati, Dum Dum, Barasat, Kolkata)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birati / Lake Gardens / Dum Dum"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141d17] border border-[#27362c] focus:border-[#4ade80] focus:outline-none text-sm text-[#f5efe2] placeholder:text-[#3c5243]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a3b899] mb-1">
                  Plant Selection Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Want to inspect multiple Adenium caudex shapes, hold 2 Nilkantha vines"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141d17] border border-[#27362c] focus:border-[#4ade80] focus:outline-none text-xs text-[#f5efe2] placeholder:text-[#3c5243]"
                />
              </div>

              {/* Pickup Address Card */}
              <div className="p-3.5 rounded-2xl bg-[#0b100d] border border-[#27362c] text-xs space-y-1">
                <span className="text-[#eab308] font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Nursery Pickup Address:
                </span>
                <p className="text-[#f5efe2] font-medium">
                  {NURSERY_CONTACT.address}
                </p>
                <p className="text-[11px] text-[#a8bba1]">
                  Landmark: Opposite Indian Air Force Camp, CEAT Tyres Building. Call <strong>{NURSERY_CONTACT.phone}</strong> for gate directions.
                </p>
              </div>

              {/* Price & Zero Advance Note */}
              <div className="pt-2 flex items-center justify-between text-sm">
                <div>
                  <span className="text-[#a3b899] block text-xs">Total Payable on In-Person Verification:</span>
                  <span className="text-[11px] text-[#4ade80] font-medium">Zero advance payment required</span>
                </div>
                <span className="font-mono text-xl font-bold text-[#4ade80] tabular-nums">
                  ₹{total}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#f5efe2] text-[#0b100d] font-bold text-sm hover:bg-white active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Saplings...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-[#0b100d]" />
                    <span>Confirm Plant Reservation & Book Visit (₹{total})</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
