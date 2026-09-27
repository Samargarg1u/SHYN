import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2,
  Sparkles,
  MapPin,
  MessageCircle,
  Send,
  Check
} from 'lucide-react';

export default function ProductDetailModal({
  product,
  initialColor,
  isWishlisted,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onAddReview,
  user
}) {
  if (!product) return null;

  const photos = product.photos && product.photos.length > 0
    ? product.photos
    : [product.image];

  const colors = product.colors || ['Standard'];

  // Determine initial color index
  const initialIndex = initialColor 
    ? Math.max(0, colors.findIndex(c => c.toLowerCase() === initialColor.toLowerCase()))
    : 0;

  const [activePhotoIdx, setActivePhotoIdx] = useState(initialIndex >= 0 ? initialIndex % photos.length : 0);
  const [selectedColor, setSelectedColor] = useState(colors[initialIndex >= 0 ? initialIndex : 0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  // Live Review Form States
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState(
    user?.isLoggedIn && user?.name && user.name !== 'Guest' ? user.name : ''
  );
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Default reviews fallback
  const displayReviews = product.reviewsList || [
    {
      id: 1,
      author: 'Meenakshi Sundaram',
      city: 'Chennai',
      rating: 5,
      date: '1 week ago',
      verified: true,
      comment: 'The drape and sheen of this weave are extraordinary. The gold zari has a genuine antique royal finish.'
    },
    {
      id: 2,
      author: 'Devika Sharma',
      city: 'Jaipur',
      rating: 5,
      date: '3 weeks ago',
      verified: true,
      comment: 'Arrived beautifully packed with the Silk Mark authentication certificate. Truly heirloom quality!'
    }
  ];

  const handleWhatsAppOrder = () => {
    const phone = '917726874080';
    const text = encodeURIComponent(
      `👑 *Namaste SHYN Haute Couture!* 👑\n\nI would like to order / inquire about the following handcrafted weave:\n\n` +
      `✦ *Product:* ${product.name}\n` +
      `✦ *Category:* ${product.category} (${product.gender})\n` +
      `✦ *Selected Color:* ${selectedColor}\n` +
      `✦ *Quantity:* ${quantity}\n` +
      `✦ *Price:* ₹${(product.price * quantity).toLocaleString('en-IN')}\n\n` +
      `Please share availability and express delivery concierge. Dhanyavaad!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newReview = {
      id: Date.now(),
      author: reviewerName.trim() || 'Verified Patron',
      city: 'Verified Buyer',
      rating: reviewRating,
      date: 'Just now',
      verified: true,
      comment: reviewComment.trim()
    };

    if (onAddReview) {
      onAddReview(product.id, newReview);
    }
    setReviewSubmitted(true);
    setReviewComment('');
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
    }, 2000);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleColorSelect = (color, index) => {
    setSelectedColor(color);
    if (photos[index]) {
      setActivePhotoIdx(index);
    }
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPincodeResult({ valid: false, message: 'Please enter a valid 6-digit PIN code.' });
      return;
    }
    const days = pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('56') ? 2 : 4;
    const date = new Date();
    date.setDate(date.getDate() + days);
    const dateStr = date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    setPincodeResult({
      valid: true,
      message: `Delivery available! Expected delivery by ${dateStr} (Complimentary Express Shipping).`
    });
  };

  const discountPercent = product.original
    ? Math.round(((product.original - product.price) / product.original) * 100)
    : 0;

  const activeImage = photos[activePhotoIdx] || product.image;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          type="button" 
          className="modal-close-icon-btn" 
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={22} />
        </button>

        <div className="detail-modal-layout">
          {/* Left Media Gallery Column */}
          <div className="detail-gallery-column">
            <div className="detail-main-image-box">
              <img
                src={activeImage}
                alt={`${product.name} - ${selectedColor}`}
                className="detail-large-image"
              />
              {discountPercent > 0 && (
                <span className="detail-discount-badge">{discountPercent}% OFF</span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="detail-thumbnails-strip">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-thumb-btn ${activePhotoIdx === idx ? 'active' : ''}`}
                    onClick={() => {
                      setActivePhotoIdx(idx);
                      if (colors[idx]) setSelectedColor(colors[idx]);
                    }}
                  >
                    <img src={photo} alt={`View angle ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details Info Column */}
          <div className="detail-info-column">
            <div className="detail-header-meta">
              <span className="detail-category-eyebrow">
                {product.gender} Couture • {product.category}
              </span>
              <div className="detail-rating-row">
                <div className="rating-pill">
                  <Star size={14} className="star-filled" />
                  <span>{product.rating}</span>
                </div>
                <span className="reviews-count-label">({product.reviews} verified member reviews)</span>
              </div>
            </div>

            <h1 className="detail-product-title">{product.name}</h1>

            {/* Pricing Box */}
            <div className="detail-price-box">
              <span className="detail-current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.original && (
                <>
                  <span className="detail-original-price">₹{product.original.toLocaleString('en-IN')}</span>
                  <span className="detail-saved-badge">
                    Save ₹{(product.original - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
              <span className="tax-inclusive-tag">(Inclusive of all GST taxes)</span>
            </div>

            {/* Color Variant Picker */}
            <div className="detail-section-block">
              <div className="section-title-row">
                <span className="section-label">Select Color Variant:</span>
                <strong className="selected-color-name">{selectedColor}</strong>
              </div>
              <div className="color-swatches-grid">
                {colors.map((color, idx) => (
                  <button
                    key={color}
                    type="button"
                    className={`detail-color-chip ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => handleColorSelect(color, idx)}
                  >
                    <span className="color-dot-indicator" data-color={color} />
                    <span>{color}</span>
                    {selectedColor === color && <CheckCircle2 size={13} className="ml-1 text-gold" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Card */}
            <div className="detail-specs-card">
              <div className="spec-row">
                <span className="spec-title">Fabric Type:</span>
                <span className="spec-value">{product.fabric || 'Pure Heritage Handloom Silk'}</span>
              </div>
              <div className="spec-row">
                <span className="spec-title">Zari &amp; Weave:</span>
                <span className="spec-value">{product.zari || 'Gold Dipped Brocade Thread'}</span>
              </div>
              <div className="spec-row">
                <span className="spec-title">Artisan Guild Origin:</span>
                <span className="spec-value">{product.origin || 'Varanasi Weavers Guild'}</span>
              </div>
              <div className="spec-row">
                <span className="spec-title">Care Instructions:</span>
                <span className="spec-value">{product.care || 'Strictly Dry Clean Only.'}</span>
              </div>
            </div>

            {/* Description */}
            <p className="detail-description-text">{product.desc}</p>

            {/* Pincode Estimator */}
            <div className="detail-pincode-estimator">
              <label htmlFor="pincodeInput" className="pincode-label">
                <MapPin size={15} className="inline mr-1 text-gold" /> Check Doorstep Delivery Time:
              </label>
              <form onSubmit={handleCheckPincode} className="pincode-input-row">
                <input
                  id="pincodeInput"
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 560001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                />
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>
              {pincodeResult && (
                <p className={`pincode-feedback ${pincodeResult.valid ? 'success' : 'error'}`}>
                  {pincodeResult.message}
                </p>
              )}
            </div>

            {/* Quantity Selector & Action CTA Buttons */}
            <div className="detail-actions-panel">
              <div className="quantity-picker-box">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="detail-add-cart-btn"
                onClick={() => {
                  onAddToCart({
                    ...product,
                    selectedColor,
                    selectedImage: activeImage,
                    quantity
                  });
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                type="button"
                className="detail-buy-now-btn"
                onClick={() => {
                  onBuyNow({
                    ...product,
                    selectedColor,
                    selectedImage: activeImage,
                    quantity
                  });
                }}
              >
                <Zap size={18} />
                <span>Instant Checkout</span>
              </button>

              <button
                type="button"
                className="detail-whatsapp-btn"
                onClick={handleWhatsAppOrder}
                title="Order or inquire directly on WhatsApp"
              >
                <MessageCircle size={18} />
                <span>Order on WhatsApp</span>
              </button>

              <button
                type="button"
                className={`detail-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
              >
                <Heart size={20} fill={isWishlisted ? '#c9a24a' : 'transparent'} />
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="detail-trust-bullets">
              <div className="trust-bullet">
                <Truck size={14} className="text-gold" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="trust-bullet">
                <RotateCcw size={14} className="text-gold" />
                <span>7-Day Hassle-Free Returns</span>
              </div>
              <div className="trust-bullet">
                <ShieldCheck size={14} className="text-gold" />
                <span>100% Handloom Certified</span>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="detail-reviews-container">
              <div className="reviews-section-header">
                <div className="reviews-title-wrap">
                  <Star size={18} className="text-gold fill-gold" />
                  <h3>Patron Reviews ({displayReviews.length})</h3>
                  <span className="avg-rating-pill">★ {product.rating || 4.8} / 5.0</span>
                </div>
                <button
                  type="button"
                  className="write-review-toggle-btn"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {showReviewForm ? 'Cancel' : '✍️ Write a Review'}
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="detail-review-form">
                  <h4>Share Your Experience</h4>
                  <div className="star-picker-row">
                    <span className="star-picker-label">Rating:</span>
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        className={`star-select-btn ${starVal <= reviewRating ? 'selected' : ''}`}
                        onClick={() => setReviewRating(starVal)}
                      >
                        ★
                      </button>
                    ))}
                    <span className="rating-desc-text">
                      {reviewRating === 5 ? 'Exceptional (5/5)' : reviewRating === 4 ? 'Very Good (4/5)' : `${reviewRating} Stars`}
                    </span>
                  </div>

                  <div className="review-input-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="review-input-group">
                    <label>Your Review &amp; Weave Feedback *</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the fabric feel, drape, zari shine, color accuracy, and packaging..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </div>

                  {reviewSubmitted && (
                    <div className="review-success-msg">
                      <Check size={14} className="inline mr-1" />
                      <span>Thank you! Your royal review has been submitted successfully.</span>
                    </div>
                  )}

                  <button type="submit" className="submit-review-btn">
                    <Send size={15} />
                    <span>Publish Review</span>
                  </button>
                </form>
              )}

              {/* Reviews Feed */}
              <div className="reviews-feed-list">
                {displayReviews.slice(0, 3).map((rev) => (
                  <div key={rev.id} className="review-item-card">
                    <div className="review-card-top">
                      <div className="reviewer-info">
                        <strong>{rev.author}</strong>
                        {rev.verified && <span className="verified-buyer-badge">✓ Verified Buyer</span>}
                        {rev.city && <span className="reviewer-city">• {rev.city}</span>}
                      </div>
                      <div className="review-card-meta">
                        <span className="review-stars-text">{'★'.repeat(rev.rating)}</span>
                        <span className="review-date">{rev.date}</span>
                      </div>
                    </div>
                    <p className="review-comment-body">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
