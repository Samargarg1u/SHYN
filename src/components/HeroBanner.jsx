import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HeroBanner({ selectedGender, onGenderChange }) {
  return (
    <section className="hero-banner-section">
      <div className="hero-bg-overlay" />
      <div className="hero-container">
        <div className="hero-badge">
          <Sparkles size={14} className="text-gold" />
          <span>AUTUMN / WINTER 2026 COUTURE COLLECTION</span>
        </div>

        <h1 className="hero-title">
          {selectedGender === 'Women' ? (
            <>
              Timeless Elegance in <br />
              <span className="hero-gradient-text">Pure Banarasi &amp; Kanjivaram</span>
            </>
          ) : (
            <>
              Sartorial Distinction &amp; <br />
              <span className="hero-gradient-text">Bespoke Modern Menswear</span>
            </>
          )}
        </h1>

        <p className="hero-description">
          {selectedGender === 'Women'
            ? 'Hand-woven with authentic gold and silver dipped zari, crafted by master generational artisans across Varanasi and Kanchipuram.'
            : 'Tailored with the finest Egyptian Supima cotton, wrinkle-resistant twills, and Italian cut finishes for the contemporary gentleman.'}
        </p>

        <div className="hero-actions">
          <button 
            type="button" 
            className="hero-primary-cta"
            onClick={() => {
              const el = document.getElementById('catalogSection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Explore Haute Collection</span>
            <ArrowRight size={16} />
          </button>

          <button 
            type="button" 
            className="hero-secondary-cta"
            onClick={() => onGenderChange(selectedGender === 'Women' ? 'Men' : 'Women')}
          >
            <span>Switch to {selectedGender === 'Women' ? '👔 Menswear' : '👑 Sarees'}</span>
          </button>
        </div>

        {/* Floating Mini Ribbon */}
        <div className="hero-stat-ribbon">
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Handloom Certified</span>
          </div>
          <div className="stat-separator" />
          <div className="stat-item">
            <span className="stat-number">24hr</span>
            <span className="stat-label">Dispatch Guarantee</span>
          </div>
          <div className="stat-separator" />
          <div className="stat-item">
            <span className="stat-number">4.8★</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
