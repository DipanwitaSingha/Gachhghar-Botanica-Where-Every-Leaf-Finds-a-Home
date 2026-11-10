import React from 'react';
import { Eye, ShieldCheck, MapPin, Sprout } from 'lucide-react';

export const NurseryTrustBanner: React.FC = () => {
  const promises = [
    {
      icon: <Eye className="w-6 h-6 text-[#4ade80]" />,
      title: '100% In-Person Verification',
      desc: 'No delivery guesswork. You visit our nursery to examine leaves, roots, and buds before deciding.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#4ade80]" />,
      title: 'Pay on Pickup (Cash / UPI)',
      desc: 'Zero advance payment. Pay cash or UPI only after you personally inspect and approve each plant.',
    },
    {
      icon: <Sprout className="w-6 h-6 text-[#4ade80]" />,
      title: 'Zero Transit Shock',
      desc: 'No courier boxes or broken stems. Take your potted plants home fresh and vibrant with expert potting tips.',
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#4ade80]" />,
      title: 'Birati Mother Nursery, West Bengal',
      desc: 'Opposite Indian Air Force Camp, CEAT Tyres Building, Birati, Kolkata-700051, West Bengal. Open 7 days a week.',
    },
  ];

  return (
    <div className="w-full bg-[#0d140f] border-y border-[#233128] py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {promises.map((p, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-2xl bg-[#121915] border border-[#233128]"
          >
            <div className="p-2.5 rounded-xl bg-[#18231c] border border-[#2a3a2f] shrink-0">
              {p.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f5efe2] mb-1">{p.title}</h4>
              <p className="text-xs text-[#a3b899] leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
