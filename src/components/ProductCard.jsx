import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenDetails
}) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const discountPercent = product.original
    ? Math.round(((product.original - product.price) / product.original) * 100)
    : 0;

  const currentImage = product.photos && product.photos[activePhotoIdx]
    ? product.photos[activePhotoIdx]
    : product.image;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedColor: product.colors ? product.colors[activePhotoIdx] || product.colors[0] : 'Standard',
      selectedImage: currentImage
    });
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1400);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article className="luxury-product-card" onClick={() => onOpenDetails(product)}>
      {/* Product Image Frame */}
      <div className="card-media-wrapper">
        <img
          src={currentImage}
          alt={product.name}
          className="product-thumbnail"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="card-badge-row">
          {discountPercent > 0 && (
            <span className="badge-discount">{discountPercent}% OFF</span>
          )}
          {product.stock <= 5 && (
            <span className="badge-low-stock">Only {product.stock} Left</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isWishlisted ? '#c9a24a' : 'transparent'} />
        </button>

        {/* Quick View Overlay Button */}
        <button
          type="button"
          className="card-quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
        >
          <Eye size={15} />
          <span>View Details</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="card-body">
        <div className="card-meta-row">
          <span className="card-category-tag">{product.category}</span>
          <div className="card-rating">
            <Star size={13} className="star-filled" />
            <span className="rating-score">{product.rating}</span>
            <span className="rating-count">({product.reviews})</span>
          </div>
        </div>

        <h3 className="card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Color Variant Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="card-swatches-row" onClick={(e) => e.stopPropagation()}>
            <span className="swatches-label">Colors:</span>
            <div className="swatches-dots">
              {product.colors.map((color, idx) => (
                <button
                  key={color}
                  type="button"
                  className={`swatch-dot ${activePhotoIdx === idx ? 'active' : ''}`}
                  title={color}
                  onClick={() => setActivePhotoIdx(idx % (product.photos ? product.photos.length : 1))}
                >
                  <span className="swatch-inner" data-color-name={color} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing & Add to Cart Row */}
        <div className="card-footer-row">
          <div className="pricing-box">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.original && (
              <span className="original-price">₹{product.original.toLocaleString('en-IN')}</span>
            )}
          </div>

          <button
            type="button"
            className={`card-add-cart-btn ${isAddedAnim ? 'success' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAddedAnim ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
