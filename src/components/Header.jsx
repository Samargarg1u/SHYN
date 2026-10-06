import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Headphones, 
  LogOut, 
  Package, 
  ShieldCheck, 
  Sparkles,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

export default function Header({
  user,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  selectedGender,
  onGenderChange,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenAssistance,
  onOpenLoginModal,
  onOpenAdmin,
  onLogout
}) {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = Boolean(user && user.isLoggedIn);
  const isAdmin = user && user.isAdmin;

  return (
    <header className="site-header-wrapper">
      {/* Top Luxury Announcement Ticker */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <Sparkles size={13} className="inline mr-1 text-gold" />
          <span>Complimentary Silk Saree Muslin Bag &amp; Free Insured Delivery across India on orders above ₹1,000</span>
          <span className="announcement-divider">•</span>
          <span>Use code <strong>SHYN10</strong> for 10% instant discount</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-header">
        <div className="header-container">
          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            className="mobile-menu-btn md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Luxury Atelier Brand Lockup */}
          <div className="header-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="brand-mark">
              <span>S</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">SHYN</span>
              <span className="brand-subtitle">HAUTE COUTURE</span>
            </div>
          </div>

          {/* Gender Tabs */}
          <div className="gender-tabs">
            <button
              type="button"
              className={`gender-tab-btn ${selectedGender === 'Women' ? 'active' : ''}`}
              onClick={() => onGenderChange('Women')}
            >
              👑 Women (Sarees)
            </button>
            <button
              type="button"
              className={`gender-tab-btn ${selectedGender === 'Men' ? 'active' : ''}`}
              onClick={() => onGenderChange('Men')}
            >
              👔 Men (Sartorial)
            </button>
          </div>

          {/* Search Bar */}
          <div className="header-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search Sarees, Shirts, Fabrics, Colors (All Collections)..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value.trim()) {
                  const catalogEl = document.getElementById('catalogSection');
                  if (catalogEl) {
                    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const catalogEl = document.getElementById('catalogSection');
                  if (catalogEl) {
                    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              aria-label="Search all collections"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Customer Assistance Concierge */}
            <button
              type="button"
              className="action-icon-btn assistance-trigger"
              onClick={onOpenAssistance}
              title="Customer Assistance & Concierge"
            >
              <Headphones size={20} />
              <span className="action-label">Support</span>
            </button>

            {/* Orders Tracker */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={onOpenOrders}
              title="Track Orders"
            >
              <Package size={20} />
              <span className="action-label">Orders</span>
            </button>

            {/* Wishlist */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={onOpenWishlist}
              title="My Wishlist"
            >
              <div className="icon-with-badge">
                <Heart size={20} />
                {wishlistCount > 0 && <span className="badge-pill">{wishlistCount}</span>}
              </div>
              <span className="action-label">Wishlist</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              className="action-icon-btn cart-btn"
              onClick={onOpenCart}
              title="Shopping Cart"
            >
              <div className="icon-with-badge">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="badge-pill badge-gold">{cartCount}</span>}
              </div>
              <span className="action-label">Cart</span>
            </button>

            {/* Store Admin Panel Shortcuts - ONLY visible when logged in as Store Admin */}
            {isAdmin && (
              <>
                <button
                  type="button"
                  className="action-icon-btn admin-shortcut-btn"
                  onClick={() => onOpenAdmin('inventory')}
                  title="Open Admin CMS: Edit Details & Photos"
                >
                  <ShieldCheck size={20} className="text-gold" />
                  <span className="action-label text-gold font-bold">Admin CMS</span>
                </button>

                <button
                  type="button"
                  className="action-icon-btn admin-shortcut-btn"
                  onClick={() => onOpenAdmin('analytics')}
                  title="Open Admin Sales Analytics, Revenue & Orders"
                >
                  <BarChart3 size={20} className="text-gold" />
                  <span className="action-label text-gold font-bold">Sales Analytics</span>
                </button>
              </>
            )}

            {/* User Account / Profile Dropdown */}
            <div className="account-dropdown-wrapper">
              <button
                type="button"
                className="action-icon-btn account-btn"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              >
                <User size={20} />
                <span className="action-label">
                  {isLoggedIn ? (user.name ? user.name.split(' ')[0] : 'Account') : 'Sign In'}
                </span>
              </button>

              {showAccountDropdown && (
                <div className="account-menu-popover">
                  {isLoggedIn ? (
                    <>
                      <div className="account-menu-header">
                        <div className="user-avatar-badge">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="user-info">
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                          {isAdmin && (
                            <span className="admin-chip">
                              <ShieldCheck size={12} className="inline mr-1" /> Administrator
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="menu-divider" />
                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            className="menu-item admin-menu-highlight"
                            onClick={() => {
                              setShowAccountDropdown(false);
                              onOpenAdmin('inventory');
                            }}
                          >
                            <ShieldCheck size={16} className="text-gold" />
                            <span><strong>🛡️ Edit Products &amp; Photos (CMS)</strong></span>
                          </button>
                          <button
                            type="button"
                            className="menu-item admin-menu-highlight"
                            onClick={() => {
                              setShowAccountDropdown(false);
                              onOpenAdmin('analytics');
                            }}
                          >
                            <BarChart3 size={16} className="text-gold" />
                            <span><strong>📊 Admin Sales Analytics &amp; Orders</strong></span>
                          </button>
                          <div className="menu-divider" />
                        </>
                      )}
                      <button
                        type="button"
                        className="menu-item"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          onOpenOrders();
                        }}
                      >
                        <Package size={15} /> My Orders &amp; Invoices
                      </button>
                      <button
                        type="button"
                        className="menu-item"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          onOpenWishlist();
                        }}
                      >
                        <Heart size={15} /> Saved Wishlist
                      </button>
                      <button
                        type="button"
                        className="menu-item"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          onOpenAssistance();
                        }}
                      >
                        <Headphones size={15} /> Concierge Assistance
                      </button>
                      <div className="menu-divider" />
                      <button
                        type="button"
                        className="menu-item text-red"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          onLogout();
                        }}
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="account-menu-guest">
                      <p>Sign in to track orders, save sarees, and enjoy member benefits.</p>
                      <button
                        type="button"
                        className="login-popup-btn"
                        onClick={() => {
                          setShowAccountDropdown(false);
                          onOpenLoginModal();
                        }}
                      >
                        Sign In / Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
