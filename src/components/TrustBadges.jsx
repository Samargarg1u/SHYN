import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Silk Mark Certified',
      desc: '100% authentic handloom pure mulberry silk with authenticity seal.'
    },
    {
      icon: Truck,
      title: 'Complimentary Delivery',
      desc: 'Insured tamper-proof express delivery across India with live GPS.'
    },
    {
      icon: RotateCcw,
      title: '7-Day Effortless Returns',
      desc: 'Doorstep exchange and full refund guarantee on original condition.'
    },
    {
      icon: Headphones,
      title: 'Haute Concierge 24/7',
      desc: 'Dedicated saree drapery stylists and personalized fashion assistance.'
    }
  ];

  return (
    <section className="trust-badges-section">
      <div className="trust-badges-grid">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="trust-badge-card">
              <div className="badge-icon-box">
                <Icon size={24} className="text-gold" />
              </div>
              <div className="badge-content">
                <h3 className="badge-title">{b.title}</h3>
                <p className="badge-desc">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
