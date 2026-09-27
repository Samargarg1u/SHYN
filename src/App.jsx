import React, { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_PRODUCTS } from './data/products';

// Components
import SiteLoginGate from './components/SiteLoginGate';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import TrustBadges from './components/TrustBadges';
import CategoryFilters from './components/CategoryFilters';
import ProductList from './components/ProductList';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import CustomerAssistanceModal from './components/CustomerAssistanceModal';
import WishlistModal from './components/WishlistModal';
import LoginModal from './components/LoginModal';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import Toast from './components/Toast';
import AiAssistant from './components/AiAssistant';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // --- Persistent Storage State ---
  const [user, setUser] = useLocalStorage('shyn_user', {
    isLoggedIn: false,
    email: '',
    name: 'Guest',
    isAdmin: false
  });

  const [gateDismissed, setGateDismissed] = useLocalStorage('shyn_gate_dismissed', false);
  const [cart, setCart] = useLocalStorage('as_cart', []);
  const [wishlist, setWishlist] = useLocalStorage('as_wishlist', []);
  const [orders, setOrders] = useLocalStorage('as_orders', []);

  // --- Products Catalog (Persistent via localStorage for Admin Editing) ---
  const [products, setProducts] = useLocalStorage('as_products', INITIAL_PRODUCTS);

  // --- Filtering & Browsing State ---
  const [selectedGender, setSelectedGender] = useState('Women');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // --- Modals & Drawers UI State ---
  const [detailModal, setDetailModal] = useState({ isOpen: false, product: null, initialColor: null });
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState({ isOpen: false, data: null });
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [assistanceOpen, setAssistanceOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState('inventory');
  const [pendingAdminTab, setPendingAdminTab] = useState(null);

  // --- Toast Notification State ---
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Reset category filter when gender changes
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedCategory('All');
  };

  // --- Derived Products with useMemo (react.dev pattern) ---
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.gender !== selectedGender) return false;
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (inStockOnly && p.stock <= 0) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchFabric = p.fabric ? p.fabric.toLowerCase().includes(q) : false;
          if (!matchName && !matchCategory && !matchFabric) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (currentSort === 'price-asc') return a.price - b.price;
        if (currentSort === 'price-desc') return b.price - a.price;
        if (currentSort === 'rating') return b.rating - a.rating;
        if (currentSort === 'discount') {
          const discA = a.original ? (a.original - a.price) / a.original : 0;
          const discB = b.original ? (b.original - b.price) / b.original : 0;
          return discB - discA;
        }
        return a.id - b.id; // default featured
      });
  }, [products, selectedGender, selectedCategory, searchQuery, currentSort, inStockOnly]);

  // --- Cart Operations ---
  const handleAddToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const color = itemToAdd.selectedColor || 'Standard';
      const existingIdx = prevCart.findIndex(
        (ci) => ci.id === itemToAdd.id && (ci.selectedColor || 'Standard') === color
      );

      const qtyToAdd = itemToAdd.quantity || 1;

      if (existingIdx >= 0) {
        const next = [...prevCart];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + qtyToAdd
        };
        return next;
      }

      return [
        ...prevCart,
        {
          id: itemToAdd.id,
          name: itemToAdd.name,
          category: itemToAdd.category,
          price: itemToAdd.price,
          original: itemToAdd.original,
          image: itemToAdd.image,
          selectedColor: color,
          selectedImage: itemToAdd.selectedImage || itemToAdd.image,
          quantity: qtyToAdd
        }
      ];
    });

    addToast(`Added "${itemToAdd.name}" to your shopping bag!`);
  };

  const handleUpdateQuantity = (productId, color, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && (item.selectedColor || 'Standard') === (color || 'Standard')
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, color) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && (item.selectedColor || 'Standard') === (color || 'Standard'))
      )
    );
    addToast('Item removed from shopping bag.', 'info');
  };

  // --- Wishlist Operations ---
  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from Wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.name}" to Wishlist!`);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    addToast('Removed from wishlist.', 'info');
  };

  // --- Live Product Review Handler ---
  const handleAddProductReview = (productId, newReview) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const currentList = p.reviewsList || [
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
        const updatedList = [newReview, ...currentList];
        const newRating = Number((updatedList.reduce((s, r) => s + r.rating, 0) / updatedList.length).toFixed(1));
        const updatedProduct = {
          ...p,
          rating: newRating,
          reviews: updatedList.length,
          reviewsList: updatedList
        };
        setDetailModal((dm) => (dm.product?.id === productId ? { ...dm, product: updatedProduct } : dm));
        return updatedProduct;
      })
    );
    addToast('Thank you! Your royal review has been published.');
  };

  // --- Buy Now / Instant Checkout ---
  const handleBuyNow = (product) => {
    handleAddToCart(product);
    setDetailModal({ isOpen: false, product: null, initialColor: null });
    setCartOpen(true);
  };

  // --- Auth Handlers ---
  const handleLogin = (userData) => {
    const isStoreAdmin = Boolean(userData.isAdmin);
    setUser({
      isLoggedIn: true,
      email: userData.email,
      name: userData.name,
      isAdmin: isStoreAdmin
    });
    setGateDismissed(true);
    if (isStoreAdmin) {
      const targetTab = pendingAdminTab || 'inventory';
      setAdminInitialTab(targetTab);
      setAdminOpen(true);
      setPendingAdminTab(null);
      addToast(`Logged in as Store Administrator! Opening ${targetTab === 'analytics' ? 'Sales Analytics' : 'Admin CMS'}...`);
    } else {
      setAdminOpen(false);
      setPendingAdminTab(null);
      addToast(`Welcome back, ${userData.name}!`);
    }
  };

  const handleOpenAdmin = (tab = 'inventory') => {
    if (!user.isAdmin) {
      setPendingAdminTab(tab);
      addToast(`Store Admin access required to view ${tab === 'analytics' ? 'Sales Analytics' : 'Admin CMS'}.`, 'info');
      setLoginModalOpen(true);
      return;
    }
    setAdminInitialTab(tab);
    setAdminOpen(true);
  };

  const handleGuestEnter = () => {
    setUser({
      isLoggedIn: false,
      email: '',
      name: 'Guest',
      isAdmin: false
    });
    setAdminOpen(false);
    setGateDismissed(true);
    addToast('Welcome to SHYN Haute Couture! Browsing as Guest.', 'info');
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      email: '',
      name: 'Guest',
      isAdmin: false
    });
    setAdminOpen(false);
    setGateDismissed(false);
    addToast('You have signed out successfully.', 'info');
  };

  // --- Checkout Handlers ---
  const handleProceedToCheckout = (checkoutSummary) => {
    setCartOpen(false);
    setCheckoutModal({ isOpen: true, data: checkoutSummary });
  };

  const handleOrderSuccess = (order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    addToast(`Order ${order.id} placed successfully! Thank you.`, 'success');
  };

  // Count aggregates
  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="shyn-app-root">
      {/* Permanent Sapphire Gold Login Gate (Shown until logged in or guest entered) */}
      {!gateDismissed && (
        <SiteLoginGate
          onLogin={handleLogin}
          onGuestEnter={handleGuestEnter}
        />
      )}

      {/* Main Store Layout */}
      <Header
        user={user}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGender={selectedGender}
        onGenderChange={handleGenderChange}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenOrders={() => setTrackingOpen(true)}
        onOpenAssistance={() => setAssistanceOpen(true)}
        onOpenLoginModal={() => setLoginModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onLogout={handleLogout}
      />

      <main className="main-content-flow">
        {/* Haute Couture Hero Section */}
        <HeroBanner
          selectedGender={selectedGender}
          onGenderChange={handleGenderChange}
        />

        {/* 4 Trust Pillars */}
        <TrustBadges />

        {/* Catalog Section with Category Pills & Sorting */}
        <CategoryFilters
          selectedGender={selectedGender}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          currentSort={currentSort}
          onSortChange={setCurrentSort}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          productCount={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        <div className="catalog-wrapper">
          <ProductList
            products={filteredProducts}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onOpenDetails={(p) => setDetailModal({ isOpen: true, product: p, initialColor: null })}
            onResetFilters={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setInStockOnly(false);
              setCurrentSort('featured');
            }}
          />
        </div>

        {/* Client Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Haute Atelier Footer */}
      <Footer
        onOpenAssistance={() => setAssistanceOpen(true)}
        onOpenOrders={() => setTrackingOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Mobile App Bottom Navigation */}
      <MobileBottomBar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAssistance={() => setAssistanceOpen(true)}
      />

      {/* MODALS & DRAWERS */}

      {/* 1. Product Detail Modal */}
      {detailModal.isOpen && (
        <ProductDetailModal
          product={detailModal.product}
          initialColor={detailModal.initialColor}
          isWishlisted={wishlist.some((w) => w.id === detailModal.product?.id)}
          onClose={() => setDetailModal({ isOpen: false, product: null, initialColor: null })}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          onAddReview={handleAddProductReview}
          user={user}
        />
      )}

      {/* 2. Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* 3. Wishlist Modal */}
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      {/* 4. Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={() => setCheckoutModal({ isOpen: false, data: null })}
        checkoutData={checkoutModal.data}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 5. Live Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        orders={orders}
      />

      {/* 6. Customer Assistance & Concierge Modal */}
      <CustomerAssistanceModal
        isOpen={assistanceOpen}
        onClose={() => setAssistanceOpen(false)}
      />

      {/* 7. Member Login / Registration Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* 8. Royal AI Stylist & Concierge */}
      <AiAssistant
        products={products}
        onOpenDetails={(p) => setDetailModal({ isOpen: true, product: p, initialColor: null })}
        onAddToCart={handleAddToCart}
        onOpenOrders={() => setTrackingOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* 9. Administrative Inventory & Photo CMS - Only rendered for Store Admin */}
      {user.isAdmin && (
        <AdminPanel
          isOpen={adminOpen}
          initialTab={adminInitialTab}
          onClose={() => setAdminOpen(false)}
          products={products}
          orders={orders}
          onUpdateProducts={(updated) => {
            setProducts(updated);
            addToast('Catalog inventory updated successfully!');
          }}
          onOpenDetails={(p) => setDetailModal({ isOpen: true, product: p, initialColor: null })}
        />
      )}

      {/* Floating Animated Toasts */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
