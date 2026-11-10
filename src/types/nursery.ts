export type PlantCategory = 
  | 'all'
  | 'rose'
  | 'bougainvillea'
  | 'variety-leaf'
  | 'lotus-aquatic'
  | 'flowering-climbers'
  | 'palms-bonsai'
  | 'planters-soil';

export interface PotOption {
  id: string;
  label: string;
  priceDiff: number;
  description: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  location: string;
  verifiedBuyer: boolean;
}

export interface PlantSpecies {
  id: string;
  name: string;
  localName?: string;
  scientificName: string;
  category: PlantCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  sunlight: 'Full Sun (6+ hrs)' | 'Partial Sun (3-5 hrs)' | 'Bright Indirect' | 'Direct Aquatic Sun';
  watering: 'Daily' | 'Twice a week' | 'When top 2 inches dry' | 'Standing Water (5-10cm)';
  difficulty: 'Beginner Friendly' | 'Moderate' | 'Experienced';
  bloomSeason: string;
  matureHeight: string;
  fragrance: 'High' | 'Mild' | 'Foliage Scent' | 'Subtle Sweet' | 'None';
  careTips: string[];
  potOptions: PotOption[];
  reviews: CustomerReview[];
  featured?: boolean;
}

export interface CartItem {
  plant: PlantSpecies;
  selectedPot: PotOption;
  quantity: number;
}

export type OrderStageType = 
  | 'Reserved' 
  | 'Tagged' 
  | 'Ready' 
  | 'Verified & Picked Up'
  | 'Processing'
  | 'Packaged'
  | 'In-Transit'
  | 'Delivered';

export interface CodOrder {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  visitDate?: string;
  visitTimeSlot?: string;
  deliveryNotes?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'Pay on Nursery Pickup & Inspection (Cash / UPI)' | 'Cash on Delivery (COD)';
  status: OrderStageType;
  currentStageIndex: number; // 0: Reserved, 1: Tagged, 2: Ready for Visit, 3: Verified & Picked Up
  estimatedDelivery: string;
  statusHistory?: {
    stage: OrderStageType;
    timestamp: string;
    note: string;
  }[];
}
