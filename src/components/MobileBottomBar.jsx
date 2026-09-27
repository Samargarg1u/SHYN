import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag, Headphones } from 'lucide-react';

export default function MobileBottomBar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAssistance
}) {
  return (
    <nav className="mobile-bottom-nav md:hidden" aria-label="Mobile Navigation">
      <button
        type="button"
        className="mobile-nav-item"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        type="button"
        className="mobile-nav-item"
        onClick={() => {
          const el = document.getElementById('catalogSection');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <Sparkles size={20} />
        <span>Collection</span>
      </button>

      <button
        type="button"
        className="mobile-nav-item"
        onClick={onOpenWishlist}
      >
        <div className="relative">
          <Heart size={20} />
          {wishlistCount > 0 && <span className="mobile-badge">{wishlistCount}</span>}
        </div>
        <span>Wishlist</span>
      </button>

      <button
        type="button"
        className="mobile-nav-item"
        onClick={onOpenCart}
      >
        <div className="relative">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="mobile-badge badge-gold">{cartCount}</span>}
        </div>
        <span>Bag</span>
      </button>

      <button
        type="button"
        className="mobile-nav-item"
        onClick={onOpenAssistance}
      >
        <Headphones size={20} />
        <span>Support</span>
      </button>
    </nav>
  );
}
