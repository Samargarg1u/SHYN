import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onOpenAssistance, onOpenOrders, onOpenAdmin }) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsEmail('');
    }, 2000);
  };

  return (
    <footer className="site-footer-atelier">
      {/* Newsletter Section */}
      <div className="footer-newsletter-banner">
        <div className="newsletter-container">
          <div className="newsletter-text-box">
            <span className="newsletter-eyebrow">
              <Sparkles size={14} className="text-gold inline mr-1" />
              JOIN THE ROYAL CIRCLE
            </span>
            <h3>Receive Invitations to Private Trunk Shows &amp; Exclusive Weaves</h3>
            <p>Subscribe to be notified of limited edition Banarasi master-crafts and sartorial releases.</p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-wrap">
              <Mail size={16} className="newsletter-mail-icon" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="newsletter-btn">
              {subscribed ? 'Subscribed!' : 'Subscribe'}
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="footer-main-container">
        <div className="footer-columns-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="brand-mark"><span>S</span></span>
              <span className="brand-title">SHYN</span>
            </div>
            <p className="footer-tagline">
              Haute Couture &amp; Heritage Atelier celebrating India's finest generational handloom artisans, pure mulberry silk, and bespoke sartorial menswear.
            </p>
            <div className="silk-mark-badge-chip">
              <ShieldCheck size={16} className="text-gold" />
              <span>Silk Mark Organization Certified</span>
            </div>
          </div>

          {/* Quick Links: Heritage Sarees */}
          <div className="footer-col">
            <h4 className="footer-heading">Heritage Sarees</h4>
            <ul className="footer-links-list">
              <li><a href="#catalogSection">Pure Banarasi Katan Silk</a></li>
              <li><a href="#catalogSection">Authentic Kanjivaram Silk</a></li>
              <li><a href="#catalogSection">Party Wear Sheer Organza</a></li>
              <li><a href="#catalogSection">Handcrafted Wedding Masterpieces</a></li>
              <li><a href="#catalogSection">Soft Breathable Linen Sarees</a></li>
            </ul>
          </div>

          {/* Quick Links: Sartorial Menswear */}
          <div className="footer-col">
            <h4 className="footer-heading">Sartorial Menswear</h4>
            <ul className="footer-links-list">
              <li><a href="#catalogSection">Giza Egyptian Cotton Shirts</a></li>
              <li><a href="#catalogSection">Tailored Wool-Touch Trousers</a></li>
              <li><a href="#catalogSection">Straight-Fit Chinos</a></li>
              <li><a href="#catalogSection">Supima Cotton T-Shirts</a></li>
              <li><a href="#catalogSection">Tapered Comfort Joggers</a></li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div className="footer-col">
            <h4 className="footer-heading">Concierge &amp; Care</h4>
            <ul className="footer-links-list">
              <li><button type="button" onClick={onOpenOrders} className="footer-link-btn">Live Order Tracking</button></li>
              <li><button type="button" onClick={onOpenAssistance} className="footer-link-btn">24/7 Styling Concierge</button></li>
              <li><button type="button" onClick={onOpenAssistance} className="footer-link-btn">Silk Saree Care Guide</button></li>
              <li><button type="button" onClick={onOpenAssistance} className="footer-link-btn">Returns &amp; Doorstep Exchange</button></li>
              <li><button type="button" onClick={onOpenAssistance} className="footer-link-btn">Corporate &amp; Bridal Trousseau</button></li>
              {onOpenAdmin && (
                <li>
                  <button 
                    type="button" 
                    onClick={() => onOpenAdmin('analytics')} 
                    className="footer-link-btn"
                    style={{ color: '#d4af37', fontWeight: 600 }}
                  >
                    📊 Admin Sales Analytics
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 SHYN Haute Couture &amp; Heritage Atelier. All rights reserved.
          </p>
          <div className="footer-bottom-badges">
            <span>256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>Razorpay Payment Verified</span>
            <span>•</span>
            <span>Handmade with Pride in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
