import React from 'react';
import ProductCard from './ProductCard';
import { SearchX, RotateCcw } from 'lucide-react';

export default function ProductList({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onOpenDetails,
  onResetFilters
}) {
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  if (products.length === 0) {
    return (
      <div className="empty-catalog-state">
        <div className="empty-icon-box">
          <SearchX size={44} className="text-muted" />
        </div>
        <h3>No Heritage Creations Found</h3>
        <p>We could not find any items matching your selected criteria or search term.</p>
        <button
          type="button"
          className="reset-filters-btn"
          onClick={onResetFilters}
        >
          <RotateCcw size={16} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="products-grid-layout">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={isWishlisted(product.id)}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
