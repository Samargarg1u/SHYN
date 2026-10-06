import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES_BY_GENDER } from '../data/products';

export default function CategoryFilters({
  selectedGender,
  selectedCategory,
  onSelectCategory,
  currentSort,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  productCount,
  searchQuery = '',
  onClearSearch
}) {
  const isSearching = Boolean(searchQuery && searchQuery.trim());
  const categories = CATEGORIES_BY_GENDER[selectedGender] || ['All'];

  return (
    <div id="catalogSection" className="filters-container-wrapper">
      <div className="filters-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h2 className="catalog-heading">
              {isSearching ? `Search Results for "${searchQuery}"` : (selectedGender === 'Women' ? 'Heritage Saree Atelier' : 'Sartorial Menswear')}
            </h2>
            {isSearching && onClearSearch && (
              <button
                type="button"
                className="clear-search-pill-btn"
                onClick={onClearSearch}
                title="Clear Search"
              >
                ✕ Clear Search
              </button>
            )}
          </div>
          <p className="catalog-subheading">
            {isSearching
              ? `Found ${productCount} creation${productCount === 1 ? '' : 's'} across Women's & Men's collections`
              : `Showing ${productCount} handcrafted luxury creation${productCount === 1 ? '' : 's'}`}
          </p>
        </div>

        {/* Sort & Quick Filter Options */}
        <div className="filters-controls-row">
          <label className="checkbox-toggle">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
            />
            <span className="toggle-label">In Stock Only</span>
          </label>

          <div className="sort-dropdown-box">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
              aria-label="Sort products by"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating (High to Low)</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Slider - Only shown when not actively searching */}
      {!isSearching && (
        <div className="category-pills-row">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat)}
              >
                {cat === 'All' ? '✨ View All' : cat}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
