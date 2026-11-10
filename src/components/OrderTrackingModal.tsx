import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sprout, 
  Tag, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Mail, 
  Phone, 
  Sparkles, 
  Eye,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { CodOrder, OrderStageType } from '../types/nursery';
import { NURSERY_CONTACT, IMAGES } from '../data/plantCatalog';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GrowthStageInfo {
  id: OrderStageType;
  title: string;
  tagline: string;
  nurseryAction: string;
  expectedDuration: string;
  icon: (active: boolean, completed: boolean) => React.ReactNode;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [orders, setOrders] = useState<CodOrder[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string>('');
  const [simulatedStage, setSimulatedStage] = useState<number>(2); // Default to Ready for Visit

  // In-Person Nursery Lifecycle stages (No delivery allowed - customer comes to see and verify)
  const STAGES: GrowthStageInfo[] = [
    {
      id: 'Reserved',
      title: 'Plant Reservation Logged',
      tagline: 'Mother Nursery Beds · Birati Center',
      nurseryAction: 'Your selected species (Nilkantha, Adenium, Roses, Bougainvillea, Lotus, etc.) are logged and allocated from our outdoor acclimatization beds.',
      expectedDuration: 'Step 1: Instant Logging',
      icon: (active, completed) => (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          completed 
            ? 'bg-[#22c55e] text-[#0b100d] shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
            : active 
            ? 'bg-[#4ade80]/20 border-2 border-[#4ade80] text-[#4ade80] animate-pulse' 
            : 'bg-[#152019] text-[#4b5563] border border-[#27362c]'
        }`}>
          <Sprout className="w-5 h-5" />
        </div>
      ),
    },
    {
      id: 'Tagged',
      title: 'Tagging & Health Audit',
      tagline: 'Rootball Checked · Bio-Hydrated',
      nurseryAction: 'Our senior horticulturist tags your specific specimens with your Token ID, waters them with nutrient solution, and prepares them for your inspection.',
      expectedDuration: 'Step 2: Within 2 Hours',
      icon: (active, completed) => (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          completed 
            ? 'bg-[#22c55e] text-[#0b100d] shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
            : active 
            ? 'bg-[#4ade80]/20 border-2 border-[#4ade80] text-[#4ade80] animate-pulse' 
            : 'bg-[#152019] text-[#4b5563] border border-[#27362c]'
        }`}>
          <Tag className="w-5 h-5" />
        </div>
      ),
    },
    {
      id: 'Ready',
      title: 'Ready in Birati Inspection Bay',
      tagline: 'Holding Bay · 4No Mahajati Nagar',
      nurseryAction: 'Plants are waiting in our visitor display pavilion. Customer is invited to visit, inspect the living plants, check roots, and verify varieties in person.',
      expectedDuration: 'Step 3: Awaiting Customer Visit',
      icon: (active, completed) => (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          completed 
            ? 'bg-[#22c55e] text-[#0b100d] shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
            : active 
            ? 'bg-[#4ade80]/20 border-2 border-[#4ade80] text-[#4ade80] animate-pulse' 
            : 'bg-[#152019] text-[#4b5563] border border-[#27362c]'
        }`}>
          <MapPin className="w-5 h-5" />
        </div>
      ),
    },
    {
      id: 'Verified & Picked Up',
      title: 'In-Person Verification & Pickup',
      tagline: 'Touch & Inspect · Pay Cash or UPI',
      nurseryAction: 'You examine the plants firsthand, receive personalized care and potting advice from our horticulturist, and pay cash or UPI at the nursery counter.',
      expectedDuration: 'Step 4: On-Site Handover',
      icon: (active, completed) => (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          completed 
            ? 'bg-[#22c55e] text-[#0b100d] shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
            : active 
            ? 'bg-[#eab308]/20 border-2 border-[#eab308] text-[#eab308] animate-pulse' 
            : 'bg-[#152019] text-[#4b5563] border border-[#27362c]'
        }`}>
          <CheckCircle2 className="w-5 h-5" />
        </div>
      ),
    },
  ];

  // Load orders from localStorage or set up default demo reservation
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gachhghar_orders');
      if (stored) {
        const parsed: CodOrder[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setOrders(parsed);
          setActiveOrderId(parsed[0].orderId);
          setSimulatedStage(parsed[0].currentStageIndex ?? 2);
          return;
        }
      }

      // Default sample demonstration reservation at Birati nursery
      const demoOrder: CodOrder = {
        orderId: 'GG-PICKUP-84920',
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        customerName: 'Nilanjana Mukherjee',
        phone: '8100682397',
        address: 'Birati / Dum Dum Area',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700051',
        visitDate: 'Tomorrow',
        visitTimeSlot: 'Morning (8:00 AM – 12:00 PM)',
        deliveryNotes: 'Customer will visit to examine Nilkantha and Adenium caudex options in person.',
        items: [
          {
            plant: {
              id: 'climber-nilkantha-butterfly-pea',
              name: 'Nilkantha Flower / Butterfly Pea (Aparajita)',
              localName: 'নীলকণ্ঠ ফুল / নীল অপরাজিতা',
              scientificName: 'Clitoria ternatea',
              category: 'flowering-climbers',
              price: 249,
              originalPrice: 350,
              rating: 5.0,
              reviewsCount: 165,
              inStock: true,
              stockQuantity: 45,
              image: IMAGES.nilkantha,
              shortDescription: 'Vibrant cobalt-blue sacred blossoms.',
              fullDescription: 'The revered Nilkantha vine.',
              sunlight: 'Full Sun (6+ hrs)',
              watering: 'When top 2 inches dry',
              difficulty: 'Beginner Friendly',
              bloomSeason: 'All Year',
              matureHeight: '8 to 15 feet',
              fragrance: 'None',
              careTips: ['Provide a trellis.'],
              potOptions: [{ id: 'starter', label: '6" Grower Bag with Trellis', priceDiff: 0, description: 'Ready' }],
              reviews: [],
            },
            selectedPot: { id: 'starter', label: '6" Grower Bag with Bamboo Trellis', priceDiff: 0, description: 'Climbing stem' },
            quantity: 1,
          },
          {
            plant: {
              id: 'adenium-desert-rose',
              name: 'Adenium Obesum (Desert Rose Bonsai)',
              localName: 'মরু গোলাপ (অ্যাডেনিয়াম বনসাই)',
              scientificName: 'Adenium obesum',
              category: 'rose',
              price: 499,
              originalPrice: 699,
              rating: 5.0,
              reviewsCount: 188,
              inStock: true,
              stockQuantity: 24,
              image: IMAGES.adenium,
              shortDescription: 'Sculptural swollen caudex bonsai.',
              fullDescription: 'Prized for its thick caudex trunk.',
              sunlight: 'Full Sun (6+ hrs)',
              watering: 'When top 2 inches dry',
              difficulty: 'Beginner Friendly',
              bloomSeason: 'March to November',
              matureHeight: '1.5 to 3 feet',
              fragrance: 'Subtle Sweet',
              careTips: ['Loves bright sun.'],
              potOptions: [{ id: 'starter', label: '6" Bonsai Grow Pot', priceDiff: 0, description: 'Swollen caudex' }],
              reviews: [],
            },
            selectedPot: { id: 'starter', label: '6" Bonsai Grow Pot', priceDiff: 0, description: 'Swollen caudex' },
            quantity: 1,
          },
        ],
        subtotal: 748,
        shipping: 0,
        total: 748,
        paymentMethod: 'Pay on Nursery Pickup & Inspection (Cash / UPI)',
        status: 'Ready',
        currentStageIndex: 2,
        estimatedDelivery: 'Ready for Visit at Birati Nursery',
      };

      setOrders([demoOrder]);
      setActiveOrderId(demoOrder.orderId);
      setSimulatedStage(demoOrder.currentStageIndex);
    } catch {
      // fallback
    }
  }, []);

  const currentOrder = orders.find((o) => o.orderId === activeOrderId) || orders[0];

  const handleStageSelect = (stageIdx: number) => {
    setSimulatedStage(stageIdx);
    const updatedStatus = STAGES[stageIdx].id;
    setOrders((prev) =>
      prev.map((ord) =>
        ord.orderId === currentOrder?.orderId
          ? { ...ord, currentStageIndex: stageIdx, status: updatedStatus }
          : ord
      )
    );
  };

  const progressPercent = (simulatedStage / (STAGES.length - 1)) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#101712] rounded-3xl border border-[#27362c] text-[#f5efe2] shadow-2xl p-6 sm:p-8 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close tracking"
          className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0b100d]/80 text-[#f5efe2] hover:bg-[#1f2b23] transition-colors border border-[#27362c]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#4ade80] mb-1">
            <Eye className="w-3.5 h-3.5" />
            <span>In-Person Plant Verification & Pickup System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2]">
            NURSERY PREPARATION & VISIT LIFECYCLE
          </h2>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            No courier delivery stress. Customers come directly to our Birati nursery to inspect and verify their chosen plant species before taking them home.
          </p>
        </div>

        {/* Crucial Direct Nursery Visit Callout */}
        <div className="mb-5 p-3.5 rounded-2xl bg-[#16211a] border border-[#2e4033] flex items-start gap-3 text-xs text-[#d1e7d8]">
          <AlertCircle className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#f5efe2]">On-Site Inspection Policy:</strong> Because living plants are delicate, courier delivery is strictly prohibited. You reserve your plants online, and our staff holds them in our Birati inspection bay so you can personally see, touch, and approve their health.
          </div>
        </div>

        {/* Order Selector (if multiple reservations exist) */}
        {orders.length > 1 && (
          <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#a3b899] font-medium shrink-0">Your Reservations:</span>
            {orders.map((ord) => (
              <button
                key={ord.orderId}
                onClick={() => {
                  setActiveOrderId(ord.orderId);
                  setSimulatedStage(ord.currentStageIndex ?? 2);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono transition-colors shrink-0 ${
                  activeOrderId === ord.orderId
                    ? 'bg-[#22c55e] text-[#0b100d] font-bold'
                    : 'bg-[#141d17] border border-[#27362c] text-[#f5efe2] hover:bg-[#1c2920]'
                }`}
              >
                {ord.orderId} (₹{ord.total})
              </button>
            ))}
          </div>
        )}

        {/* Reservation Snapshot Card */}
        {currentOrder && (
          <div className="mb-6 p-4 rounded-2xl bg-[#141d17] border border-[#233128] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
            <div>
              <span className="text-[#a3b899] block font-mono text-[11px]">Reservation Token:</span>
              <span className="text-sm sm:text-base font-bold font-mono text-[#4ade80]">
                {currentOrder.orderId}
              </span>
              <span className="text-[#a3b899] block mt-0.5">
                Customer: <strong className="text-[#f5efe2]">{currentOrder.customerName}</strong> · Phone: <span className="font-mono">{currentOrder.phone}</span>
              </span>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#233128]">
              <span className="text-[#a3b899] text-[11px]">Pay on Verification:</span>
              <span className="font-mono text-base font-bold text-[#f5efe2]">
                ₹{currentOrder.total} <span className="text-xs text-[#4ade80] font-sans font-semibold">(Cash / UPI on Pickup)</span>
              </span>
            </div>
          </div>
        )}

        {/* ANIMATED PREPARATION & VISIT PROGRESS BAR */}
        <div className="p-6 rounded-3xl bg-[#0b100d] border border-[#27362c] mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#a3b899]">
              Plant Preparation Progress
            </span>
            <span className="text-xs font-mono font-semibold text-[#4ade80] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-ping" />
              Stage {simulatedStage + 1} of 4: {STAGES[simulatedStage].id}
            </span>
          </div>

          {/* Interactive Progress Bar with Custom Botanical Icons */}
          <div className="relative my-8">
            {/* Background Track Line */}
            <div className="absolute top-5 left-6 right-6 h-1.5 bg-[#1a261f] rounded-full -translate-y-1/2 z-0" />
            
            {/* Animated Glowing Foreground Progress Fill */}
            <div
              className="absolute top-5 left-6 h-1.5 bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#eab308] rounded-full -translate-y-1/2 transition-all duration-700 ease-out z-0 shadow-[0_0_12px_rgba(74,222,128,0.5)]"
              style={{ width: `calc(${progressPercent}% * 0.88)` }}
            />

            {/* Stage Icon Nodes */}
            <div className="relative z-10 flex justify-between items-center">
              {STAGES.map((stg, idx) => {
                const isCompleted = idx < simulatedStage;
                const isActive = idx === simulatedStage;

                return (
                  <button
                    key={stg.id}
                    onClick={() => handleStageSelect(idx)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    title={`Click to preview ${stg.id} stage`}
                  >
                    {/* Custom Animated Node Icon */}
                    {stg.icon(isActive, isCompleted)}

                    {/* Stage Label */}
                    <span className={`mt-2 text-xs font-semibold tracking-wide transition-colors ${
                      isActive 
                        ? 'text-[#4ade80]' 
                        : isCompleted 
                        ? 'text-[#f5efe2]' 
                        : 'text-[#6b7280]'
                    }`}>
                      {stg.id}
                    </span>

                    {/* Indicator Pin */}
                    <span className="text-[10px] text-[#a3b899] font-mono mt-0.5 hidden sm:inline">
                      {idx === 0 ? 'Logged' : idx === 1 ? 'Tagged' : idx === 2 ? 'In Holding' : 'Picked Up'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage Detail Card */}
          <div className="p-4 rounded-2xl bg-[#141d17] border border-[#233128] space-y-2 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#233128]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#a3b899]">
                  Current Plant Status
                </span>
                <h4 className="text-base font-semibold text-[#f5efe2] flex items-center gap-2">
                  <span>{STAGES[simulatedStage].title}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#4ade80] font-mono">
                    {STAGES[simulatedStage].expectedDuration}
                  </span>
                </h4>
              </div>
              <span className="text-xs text-[#a8bba1] font-mono">
                {STAGES[simulatedStage].tagline}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#d1e7d8] leading-relaxed pt-1">
              {STAGES[simulatedStage].nurseryAction}
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-[#a3b899]">
              <span className="flex items-center gap-1 text-[#eab308]">
                <Clock className="w-3.5 h-3.5" /> Scheduled Visit: {currentOrder?.visitDate || 'Tomorrow'} ({currentOrder?.visitTimeSlot || 'Morning 8:00 AM - 12:00 PM'})
              </span>
              <span className="italic hidden sm:inline text-[#6b7280]">
                (Tap milestone icons above to simulate lifecycle steps)
              </span>
            </div>
          </div>
        </div>

        {/* Nursery Pickup Location & Directions */}
        <div className="p-4 rounded-2xl bg-[#121915] border border-[#27362c] text-xs text-[#a3b899] space-y-2 mb-6">
          <div className="flex items-center gap-2 font-semibold text-[#f5efe2]">
            <MapPin className="w-4 h-4 text-[#4ade80]" />
            <span>Visit Us In-Person to Verify & Collect Your Plants:</span>
          </div>
          <p className="text-[#d1e7d8] pl-6 leading-relaxed font-medium">
            {NURSERY_CONTACT.address}
          </p>
          <div className="flex flex-wrap items-center gap-4 pl-6 text-[11px] text-[#a8bba1]">
            <span className="flex items-center gap-1 text-[#f5efe2]">
              <Phone className="w-3.5 h-3.5 text-[#4ade80]" /> Contact: <strong>{NURSERY_CONTACT.phone}</strong>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#f5efe2]">
              <Mail className="w-3.5 h-3.5 text-[#4ade80]" /> {NURSERY_CONTACT.email}
            </span>
            <span>·</span>
            <span>{NURSERY_CONTACT.hours}</span>
          </div>
          <p className="pl-6 text-[11px] text-[#eab308]">
            Landmark: Exactly opposite Indian Air Force Camp, inside the CEAT tyres building complex. Free visitor parking available.
          </p>
        </div>

        {/* Reserved Plant Species List */}
        {currentOrder && currentOrder.items && currentOrder.items.length > 0 && (
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5efe2]">
              Reserved Species Tagged For Your Visit ({currentOrder.items.length}):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#141d17] border border-[#233128] flex items-center gap-3"
                >
                  <img
                    src={item.plant.image}
                    alt={item.plant.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#18231c] shrink-0"
                  />
                  <div className="min-w-0 flex-1 text-xs">
                    <p className="font-semibold text-[#f5efe2] truncate">{item.plant.name}</p>
                    <p className="text-[11px] text-[#a3b899] truncate">{item.selectedPot.label}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-mono text-[#4ade80]">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-mono text-[#f5efe2] font-semibold">
                        ₹{(item.plant.price + item.selectedPot.priceDiff) * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 100% In-Person Inspection Guarantee */}
        <div className="p-4 rounded-2xl bg-[#16211a] border border-[#2e4033] flex items-start gap-3 text-xs text-[#d1e7d8]">
          <ShieldCheck className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#f5efe2] block">
              100% In-Person Verification & Plant Parent Satisfaction
            </span>
            <p className="text-[#a8bba1] leading-relaxed">
              When you arrive, our horticulturist will present your tagged plants. You have full freedom to inspect every leaf, test the root moisture, and examine budding branches. If you want to switch or add more saplings from our nursery beds, you can do so freely!
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#a3b899]">
            Questions before visiting? Call <strong className="text-[#4ade80] font-mono">{NURSERY_CONTACT.phone}</strong>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#f5efe2] text-[#0b100d] font-semibold text-xs hover:bg-white transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
