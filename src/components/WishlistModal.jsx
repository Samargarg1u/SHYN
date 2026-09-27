import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist = [],
  onAddToCart,
  onRemoveFromWishlist
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="wishlist-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="header-title-box">
            <Heart size={22} className="text-gold" fill="#c9a24a" />
            <h2>My Saved Wishlist ({wishlist.length})</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="wishlist-modal-body">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty-state">
              <div className="empty-icon-circle">
                <Heart size={36} className="text-muted" />
              </div>
              <h3>Your wishlist is empty</h3>
              <p>Click the golden heart on any creation to save it for weddings and festivities.</p>
              <button type="button" className="shop-btn-gold" onClick={onClose}>
                Explore Creations
              </button>
            </div>
          ) : (
            <div className="wishlist-items-grid">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <img src={item.image} alt={item.name} className="wishlist-item-img" />
                  <div className="wishlist-item-info">
                    <h4>{item.name}</h4>
                    <span className="wishlist-category">{item.category}</span>
                    <div className="wishlist-price">₹{item.price.toLocaleString('en-IN')}</div>

                    <div className="wishlist-actions">
                      <button
                        type="button"
                        className="wishlist-add-cart-btn"
                        onClick={() => {
                          onAddToCart({
                            ...item,
                            selectedColor: item.colors ? item.colors[0] : 'Standard',
                            selectedImage: item.image
                          });
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        type="button"
                        className="wishlist-remove-btn"
                        onClick={() => onRemoveFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
