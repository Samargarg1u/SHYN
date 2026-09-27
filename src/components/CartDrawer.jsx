import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck,
  Gift
} from 'lucide-react';
import { COUPONS, calculateDiscount } from '../data/coupons';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon ? calculateDiscount(appliedCoupon, subtotal) : 0;
  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : (appliedCoupon?.code === 'FREESHIP' ? 0 : 99);
  const giftCost = isGift ? 150 : 0;
  const grandTotal = Math.max(0, subtotal - discount + shipping + giftCost);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCodeInput).trim().toUpperCase();
    setCouponError('');
    if (!code) return;

    const coupon = COUPONS[code];
    if (!coupon) {
      setCouponError('Invalid coupon code. Try SHYN10 or SHYN20.');
      return;
    }

    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order value of ₹${coupon.minOrder.toLocaleString('en-IN')} required for ${code}.`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCodeInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="drawer-backdrop-overlay" onClick={onClose}>
      <aside className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-box">
            <ShoppingBag size={20} className="text-gold" />
            <h2>Your Shopping Bag</h2>
            <span className="items-count-badge">
              ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="free-shipping-bar-box">
          {subtotal >= 1999 ? (
            <div className="shipping-progress-text success">
              <Check size={14} className="inline mr-1" />
              <span>Congratulations! You have unlocked <strong>Free Insured Express Delivery</strong></span>
            </div>
          ) : (
            <div className="shipping-progress-text">
              <span>Add ₹{(1999 - subtotal).toLocaleString('en-IN')} more to unlock <strong>Free Insured Delivery</strong></span>
              <div className="shipping-progress-track">
                <div
                  className="shipping-progress-fill"
                  style={{ width: `${Math.min(100, (subtotal / 1999) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Body / Cart Items List */}
        <div className="drawer-items-scroll">
          {cart.length === 0 ? (
            <div className="cart-empty-view">
              <div className="cart-empty-icon">
                <ShoppingBag size={48} className="text-muted" />
              </div>
              <h3>Your bag is empty</h3>
              <p>Explore our royal Banarasi silks and sartorial menswear to add your favorites.</p>
              <button
                type="button"
                className="cart-shop-now-btn"
                onClick={onClose}
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {cart.map((item, idx) => (
                <li key={`${item.id}-${item.selectedColor || 'std'}-${idx}`} className="cart-item-row">
                  <img
                    src={item.selectedImage || item.image}
                    alt={item.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.name}</h4>
                    {item.selectedColor && (
                      <span className="cart-item-variant">
                        Color: <strong>{item.selectedColor}</strong>
                      </span>
                    )}
                    <div className="cart-item-price">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      {item.quantity > 1 && (
                        <span className="unit-price">
                          (₹{item.price.toLocaleString('en-IN')} each)
                        </span>
                      )}
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="cart-item-actions-row">
                      <div className="cart-qty-selector">
                        <button
                          type="button"
                          className="qty-btn-mini"
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty-number-mini">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn-mini"
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove-item-btn"
                        onClick={() => onRemoveItem(item.id, item.selectedColor)}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer & Checkout Calculation */}
        {cart.length > 0 && (
          <div className="drawer-footer-panel">
            {/* Promo Coupon Box */}
            <div className="drawer-coupon-box">
              {appliedCoupon ? (
                <div className="applied-coupon-pill">
                  <div className="coupon-pill-left">
                    <Tag size={13} className="text-gold mr-1" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied!</span>
                    <span className="coupon-desc-text">(-₹{discount.toLocaleString('en-IN')})</span>
                  </div>
                  <button
                    type="button"
                    className="remove-coupon-btn"
                    onClick={handleRemoveCoupon}
                    aria-label="Remove coupon"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApplyCoupon();
                  }}
                  className="coupon-form-row"
                >
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. SHYN10)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  />
                  <button type="submit" className="coupon-apply-btn">
                    Apply
                  </button>
                </form>
              )}

              {couponError && <p className="coupon-error-msg">{couponError}</p>}

              {/* Quick Coupon Chips */}
              {!appliedCoupon && (
                <div className="quick-coupon-chips">
                  <span className="quick-chip-label">⚡ Coupons:</span>
                  <button
                    type="button"
                    className="quick-chip"
                    onClick={() => handleApplyCoupon('ROYAL10')}
                  >
                    ROYAL10 (10% Off)
                  </button>
                  <button
                    type="button"
                    className="quick-chip"
                    onClick={() => handleApplyCoupon('FIRSTWEAVE')}
                  >
                    FIRSTWEAVE (₹500 Off)
                  </button>
                  <button
                    type="button"
                    className="quick-chip"
                    onClick={() => handleApplyCoupon('BRIDAL2026')}
                  >
                    BRIDAL2026 (15% Off)
                  </button>
                </div>
              )}
            </div>

            {/* Royal Heirloom Gift Packaging Box */}
            <div className="cart-gift-packaging-box">
              <label className="gift-packaging-toggle">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                />
                <div className="gift-toggle-text">
                  <div className="gift-title-row">
                    <Gift size={15} className="text-gold" />
                    <span><strong>Add Royal Gift Packaging (+₹150)</strong></span>
                  </div>
                  <p>Handcrafted velvet presentation box &amp; personalized calligraphy card.</p>
                </div>
              </label>

              {isGift && (
                <div className="gift-calligraphy-input">
                  <textarea
                    rows={2}
                    placeholder="Enter personal gift message (e.g. Wishing you timeless elegance & joy on your special day! - With love)..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    maxLength={220}
                  />
                  <span className="char-count">{giftMessage.length}/220</span>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="cart-summary-table">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row text-green">
                  <span>Promotion Savings ({appliedCoupon.code})</span>
                  <span>− ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {isGift && (
                <div className="summary-row text-gold">
                  <span>Royal Gift Packaging &amp; Card</span>
                  <span>+ ₹150</span>
                </div>
              )}
              <div className="summary-row">
                <span>Insured Express Shipping</span>
                <span>{shipping === 0 ? <strong className="text-green">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              className="drawer-checkout-btn"
              onClick={() => {
                onProceedToCheckout({
                  cart,
                  subtotal,
                  discount,
                  shipping,
                  isGift,
                  giftMessage,
                  giftCost,
                  grandTotal,
                  appliedCoupon
                });
              }}
            >
              <span>Proceed to Royal Checkout</span>
              <ArrowRight size={17} />
            </button>

            <div className="drawer-security-note">
              <ShieldCheck size={13} className="text-gold inline mr-1" />
              <span>256-Bit Encrypted Secure Checkout • Razorpay Certified</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
