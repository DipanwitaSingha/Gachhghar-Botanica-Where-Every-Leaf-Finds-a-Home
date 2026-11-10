import React, { useState } from 'react';
import { Sparkles, Sun, Droplets, Scissors, Fish, Award, ShieldCheck } from 'lucide-react';

export const PlantCareGuideSection: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<'lotus' | 'nilkantha' | 'adenium' | 'bougainvillea' | 'rose' | 'foliage'>('lotus');

  const guides = {
    lotus: {
      title: 'How to Bloom Sacred Lotus in a Balcony Water Bowl',
      subtitle: 'No pond needed — a 16-inch shallow ceramic or plastic tub is all you need.',
      badge: 'Aquatic Mastery',
      steps: [
        {
          title: '1. Prepare Heavy Clay or Silt Soil',
          desc: 'Lotus thrives in heavy alluvial clay or garden soil enriched with vermicompost. Fill the bottom 4 to 6 inches of your bowl with this mud pack.',
          icon: <Award className="w-4 h-4 text-[#4ade80]" />,
        },
        {
          title: '2. Position the Tuber Horizontally',
          desc: 'Carefully press the dormant lotus tuber horizontally into the mud with growing tips pointing slightly upward. Do not bury the tender tip too deep.',
          icon: <Sparkles className="w-4 h-4 text-[#4ade80]" />,
        },
        {
          title: '3. Add 3 to 4 Inches of Clear Water',
          desc: 'Slowly pour water over a plastic sheet or saucer so the mud does not churn. Maintain 3 to 4 inches of clear standing water above the mud layer.',
          icon: <Droplets className="w-4 h-4 text-[#4ade80]" />,
        },
        {
          title: '4. Add 2-3 Guppy Fish (Natural Mosquito Defense)',
          desc: 'Add 2 small guppies or Molly fish to the bowl. They feast on mosquito larvae, keeping the water crystal clear while naturally fertilizing the roots.',
          icon: <Fish className="w-4 h-4 text-[#4ade80]" />,
        },
      ],
    },
    nilkantha: {
      title: 'Growing Sacred Nilkantha (Aparajita) & Blue Tea',
      subtitle: 'Fast-growing conch-blue flowering climber revered in Bengal rituals.',
      badge: 'Sacred Climber',
      steps: [
        {
          title: '1. Provide Bamboo or Net Trellis',
          desc: 'Nilkantha vines send out active tendrils. Fasten early shoots to a bamboo stake or balcony grill to encourage rapid upward climbing.',
          icon: <Award className="w-4 h-4 text-[#4ade80]" />,
        },
        {
          title: '2. Full Morning Sun for Deep Blue Pigment',
          desc: 'Requires 5 to 6 hours of bright morning sun. Intense light triggers the rich anthocyanin pigment responsible for cobalt-blue petals.',
          icon: <Sun className="w-4 h-4 text-[#fbbf24]" />,
        },
        {
          title: '3. Daily Watering in Summer',
          desc: 'Keep the soil evenly moist but well-drained. Water early in the morning so the vine remains hydrated during warm sunny afternoons.',
          icon: <Droplets className="w-4 h-4 text-[#38bdf8]" />,
        },
        {
          title: '4. Snip Seedpods for Endless Flowers',
          desc: 'After flowers fade, remove green bean-like seedpods immediately. Preventing seed maturation tricks the vine into producing dozens of fresh buds.',
          icon: <Scissors className="w-4 h-4 text-[#a855f7]" />,
        },
      ],
    },
    adenium: {
      title: 'Adenium Obesum (Desert Rose) Caudex Care',
      subtitle: 'How to cultivate thick swollen sculptural trunks and trumpet blooms.',
      badge: 'Desert Bonsai',
      steps: [
        {
          title: '1. Gritty Bonsai Potting Medium',
          desc: 'Blend equal parts sand, perlite, brick grit, and vermicompost. Adenium roots must never sit in soggy, waterlogged soil.',
          icon: <Award className="w-4 h-4 text-[#4ade80]" />,
        },
        {
          title: '2. Extreme Sun Exposure',
          desc: 'Loves the hottest, brightest exposure on your terrace or south-facing window. The more sun it receives, the thicker its swollen trunk becomes.',
          icon: <Sun className="w-4 h-4 text-[#fbbf24]" />,
        },
        {
          title: '3. The Soak & Dry Watering Method',
          desc: 'Water thoroughly only when the soil has completely dried out. In winter, reduce watering to once every 2 to 3 weeks.',
          icon: <Droplets className="w-4 h-4 text-[#38bdf8]" />,
        },
        {
          title: '4. Exposing the Caudex at Repotting',
          desc: 'When repotting every spring, raise the plant 1 to 2 inches higher out of the soil to reveal its striking gnarled root structures.',
          icon: <Sparkles className="w-4 h-4 text-[#4ade80]" />,
        },
      ],
    },
    bougainvillea: {
      title: 'Unlocking Maximum Blooms on Bougainvillea',
      subtitle: 'The secret to dense magenta floral cascades is sunlight and controlled dry stress.',
      badge: 'Sun Lover',
      steps: [
        {
          title: '1. Give 6+ Hours of Unfiltered Sun',
          desc: 'Bougainvillea will only make green leaves if kept in shade. Place it in the sunniest, hottest corner of your terrace or balcony.',
          icon: <Sun className="w-4 h-4 text-[#fbbf24]" />,
        },
        {
          title: '2. Practice Controlled Water Stress',
          desc: 'Allow the top 2 inches of soil to dry out completely until leaves slightly droop before watering again. Dry stress triggers floral bracts.',
          icon: <Droplets className="w-4 h-4 text-[#38bdf8]" />,
        },
        {
          title: '3. Prune Immediately After Flowering',
          desc: 'Bracts only form on new season growth. Tip-prune branches after each floral flush to multiply flowering tips tenfold.',
          icon: <Scissors className="w-4 h-4 text-[#a855f7]" />,
        },
        {
          title: '4. Low Nitrogen, High Potash Feed',
          desc: 'Feed with organic wood ash, banana peel tea, or potassium-rich compost every 4 weeks. Excess nitrogen creates excess leaves with zero flowers.',
          icon: <Award className="w-4 h-4 text-[#4ade80]" />,
        },
      ],
    },
    rose: {
      title: 'Heirloom & English Rose Maintenance in Warm Climates',
      subtitle: 'Keep your roses blooming with huge velvet fragrant petals all year.',
      badge: 'Fragrance & Bloom',
      steps: [
        {
          title: '1. Morning Sun & Air Circulation',
          desc: 'Roses love direct morning sun from 6 AM to 12 PM. Ensure open air flow around foliage to prevent fungal mildew and black spot.',
          icon: <Sun className="w-4 h-4 text-[#fbbf24]" />,
        },
        {
          title: '2. Water at the Base, Never on Leaves',
          desc: 'Wet foliage invites fungal spores. Always water the soil directly at the base early in the morning.',
          icon: <Droplets className="w-4 h-4 text-[#38bdf8]" />,
        },
        {
          title: '3. Weekly Deadheading',
          desc: 'Snip spent blooms at the first 5-leaflet node below the flower. This stops seedpod formation and triggers a fresh flower bud within 18 days.',
          icon: <Scissors className="w-4 h-4 text-[#a855f7]" />,
        },
        {
          title: '4. Deep Organic Root Feeding',
          desc: 'Blend steamed bone meal, neem cake, and seasoned vermicompost into the top inch of soil once every 20 days.',
          icon: <Award className="w-4 h-4 text-[#4ade80]" />,
        },
      ],
    },
    foliage: {
      title: 'Caring for Dracaena, Monsteras & Exotic Variety Leaf Plants',
      subtitle: 'Keep your indoor jungle lush, shiny, and vibrant all year round.',
      badge: 'Tropical Foliage',
      steps: [
        {
          title: '1. Bright Indirect Sun Only',
          desc: 'Filter harsh sunlight through a sheer curtain. Direct midday sun will scorch delicate variegated leaf patterns.',
          icon: <Sun className="w-4 h-4 text-[#fbbf24]" />,
        },
        {
          title: '2. Wipe Leaves Monthly with Soft Cloth',
          desc: 'Household dust blocks photosynthesis. Gently wipe leaves with a damp microfiber cloth to restore deep mirror gloss.',
          icon: <Sparkles className="w-4 h-4 text-[#4ade80]" />,
        },
        {
          title: '3. Chunky Well-Draining Aroid Soil',
          desc: 'Use our Gachhghar organic mix with perlite, cocopeat, and bark chunks so roots breathe freely without staying soggy.',
          icon: <Award className="w-4 h-4 text-[#4ade80]" />,
        },
        {
          title: '4. Coco-Coir Pole Support',
          desc: 'Tuck aerial roots into a moist moss stick. As roots grip the pole, each new leaf will emerge double in size with more fenestrations.',
          icon: <Scissors className="w-4 h-4 text-[#a855f7]" />,
        },
      ],
    },
  };

  const current = guides[activeGuide];

  return (
    <section id="care-guide-section" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#233128]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#4ade80]">
            Nursery Masterclass & Field Guides
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-antonio tracking-tight text-[#f5efe2] mt-1">
            HOW YOUR SAPLINGS THRIVE
          </h2>
          <p className="text-sm text-[#a3b899] mt-2 max-w-xl">
            Every plant from Gachhghar comes hardened and acclimatized. Follow our horticulturist protocols to cultivate a thriving living sanctuary.
          </p>
        </div>

        {/* Tab Controls (Functional Segmented Buttons as per Design Constitution) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#121915] rounded-xl border border-[#233128] overflow-x-auto">
          <button
            onClick={() => setActiveGuide('lotus')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeGuide === 'lotus'
                ? 'bg-[#223629] text-[#f5efe2] border border-[#3c5243]'
                : 'text-[#a3b899] hover:text-[#f5efe2]'
            }`}
          >
            🪷 Sacred Lotus
          </button>
          <button
            onClick={() => setActiveGuide('nilkantha')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeGuide === 'nilkantha'
                ? 'bg-[#223629] text-[#f5efe2] border border-[#3c5243]'
                : 'text-[#a3b899] hover:text-[#f5efe2]'
            }`}
          >
            🌸 Nilkantha
          </button>
          <button
            onClick={() => setActiveGuide('adenium')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeGuide === 'adenium'
                ? 'bg-[#223629] text-[#f5efe2] border border-[#3c5243]'
                : 'text-[#a3b899] hover:text-[#f5efe2]'
            }`}
          >
            🪴 Desert Rose
          </button>
          <button
            onClick={() => setActiveGuide('bougainvillea')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeGuide === 'bougainvillea'
                ? 'bg-[#223629] text-[#f5efe2] border border-[#3c5243]'
                : 'text-[#a3b899] hover:text-[#f5efe2]'
            }`}
          >
            🌺 Bougainvillea
          </button>
          <button
            onClick={() => setActiveGuide('rose')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeGuide === 'rose'
                ? 'bg-[#223629] text-[#f5efe2] border border-[#3c5243]'
                : 'text-[#a3b899] hover:text-[#f5efe2]'
            }`}
          >
            🌹 Roses
          </button>
          <button
            onClick={() => setActiveGuide('foliage')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeGuide === 'foliage'
                ? 'bg-[#223629] text-[#f5efe2] border border-[#3c5243]'
                : 'text-[#a3b899] hover:text-[#f5efe2]'
            }`}
          >
            🌿 Dracaena & Foliage
          </button>
        </div>
      </div>

      {/* Guide Content Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121915] border border-[#233128] space-y-6">
        <div>
          <span className="text-xs font-mono text-[#a3b899]">{current.badge} Protocol</span>
          <h3 className="text-2xl sm:text-3xl font-antonio tracking-tight text-[#f5efe2] mt-1">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#a8bba1] mt-1">{current.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {current.steps.map((st, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[#152019] border border-[#27362c] flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#1d2a21] border border-[#344537] flex items-center justify-center mb-3">
                  {st.icon}
                </div>
                <h4 className="text-sm font-semibold text-[#f5efe2] mb-1.5">{st.title}</h4>
                <p className="text-xs text-[#a3b899] leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
