import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Upload, 
  Image as ImageIcon, 
  Search, 
  ShieldCheck, 
  Check, 
  AlertTriangle,
  Sparkles,
  Layers,
  DollarSign,
  Package,
  Eye,
  TrendingUp,
  BarChart3,
  Printer,
  RefreshCw
} from 'lucide-react';
import { INITIAL_PRODUCTS, CATEGORIES_BY_GENDER } from '../data/products';
import { printTaxInvoice } from '../utils/invoiceGenerator';

export default function AdminPanel({
  isOpen,
  onClose,
  products = [],
  onUpdateProducts,
  onOpenDetails,
  orders = [],
  initialTab = 'inventory'
}) {
  if (!isOpen) return null;

  const [adminTab, setAdminTab] = useState(initialTab); // 'inventory' | 'analytics'

  useEffect(() => {
    if (initialTab) {
      setAdminTab(initialTab);
    }
  }, [initialTab, isOpen]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [editingProduct, setEditingProduct] = useState(null); // null if not editing/adding
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Form State for Editing/Adding
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    gender: 'Women',
    category: 'Banarasi',
    price: 3499,
    original: 4999,
    stock: 10,
    rating: 4.8,
    reviews: 120,
    fabric: '',
    zari: '',
    origin: '',
    care: '',
    desc: '',
    image: '',
    photos: [],
    colors: []
  });

  const [newColorInput, setNewColorInput] = useState('');
  const [newPhotoUrlInput, setNewPhotoUrlInput] = useState('');

  // Filtering products in table
  const filteredProducts = products.filter(p => {
    if (filterGender !== 'All' && p.gender !== filterGender) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchId = String(p.id).includes(q);
      if (!matchName && !matchCat && !matchId) return false;
    }
    return true;
  });

  // Safe lists
  const safeOrders = Array.isArray(orders) ? orders.filter(Boolean) : [];
  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];

  // Summary Metrics
  const totalProducts = safeProducts.length;
  const sareesCount = safeProducts.filter(p => p.gender === 'Women').length;
  const menswearCount = safeProducts.filter(p => p.gender === 'Men').length;
  const lowStockProducts = safeProducts.filter(p => Number(p.stock || 0) <= 5);
  const lowStockCount = lowStockProducts.length;

  // Sales Analytics Metrics
  const totalRevenue = safeOrders.reduce((sum, o) => sum + (Number(o?.grandTotal || o?.total) || 0), 0);
  const totalUnitsSold = safeOrders.reduce((sum, o) => {
    const itms = Array.isArray(o?.items) ? o.items : [];
    return sum + itms.reduce((s, it) => s + (Number(it?.quantity || it?.qty) || 1), 0);
  }, 0);

  // Quick Restock helper (+10 units)
  const handleQuickRestock = (productId, amount = 10) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        return { ...p, stock: (p.stock || 0) + amount };
      }
      return p;
    });
    onUpdateProducts(updated);
  };

  // Open Edit Form for a product
  const handleOpenEdit = (product) => {
    setIsNewProduct(false);
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name || '',
      gender: product.gender || 'Women',
      category: product.category || 'Banarasi',
      price: product.price || 0,
      original: product.original || 0,
      stock: product.stock || 0,
      rating: product.rating || 4.5,
      reviews: product.reviews || 50,
      fabric: product.fabric || '',
      zari: product.zari || '',
      origin: product.origin || '',
      care: product.care || '',
      desc: product.desc || '',
      image: product.image || '',
      photos: product.photos ? [...product.photos] : [product.image],
      colors: product.colors ? [...product.colors] : ['Standard']
    });
  };

  // Open Add New Product Form
  const handleOpenAdd = () => {
    setIsNewProduct(true);
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const defaultItem = {
      id: newId,
      name: '',
      gender: 'Women',
      category: 'Banarasi',
      price: 2999,
      original: 4499,
      stock: 12,
      rating: 4.8,
      reviews: 1,
      fabric: 'Pure Katan Silk',
      zari: 'Antique Gold Zari',
      origin: 'Varanasi Weavers Guild',
      care: 'Dry Clean Only. Store in muslin cloth.',
      desc: 'Handcrafted luxury heritage creation woven by master generational artisans.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      photos: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
      ],
      colors: ['Maroon', 'Gold']
    };
    setEditingProduct(defaultItem);
    setFormData(defaultItem);
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product from the live catalog?')) {
      const updated = products.filter(p => p.id !== productId);
      onUpdateProducts(updated);
    }
  };

  // Reset to initial 13 master products
  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog back to default 13 luxury master creations? Any custom added products will be replaced.')) {
      onUpdateProducts(INITIAL_PRODUCTS);
    }
  };

  // Handle local file upload for Main Image (FileReader -> Base64)
  const handleMainImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (base64Url) {
        setFormData(prev => ({
          ...prev,
          image: base64Url,
          photos: prev.photos.length === 0 ? [base64Url] : [base64Url, ...prev.photos.slice(1)]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle local file upload for Additional Photos
  const handleAdditionalPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (base64Url) {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, base64Url]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Add photo via Web URL
  const handleAddPhotoUrl = () => {
    if (!newPhotoUrlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, newPhotoUrlInput.trim()]
    }));
    setNewPhotoUrlInput('');
  };

  // Remove photo at index
  const handleRemovePhoto = (index) => {
    setFormData(prev => {
      const updated = prev.photos.filter((_, idx) => idx !== index);
      return {
        ...prev,
        photos: updated,
        image: updated.length > 0 ? updated[0] : ''
      };
    });
  };

  // Add Color Variant
  const handleAddColor = () => {
    if (!newColorInput.trim()) return;
    if (!formData.colors.includes(newColorInput.trim())) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColorInput.trim()]
      }));
    }
    setNewColorInput('');
  };

  // Remove Color Variant
  const handleRemoveColor = (colorToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== colorToRemove)
    }));
  };

  // Save Product Changes
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Product name is required.');
      return;
    }

    const cleanedProduct = {
      ...formData,
      price: Number(formData.price) || 0,
      original: Number(formData.original) || Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
      image: formData.photos.length > 0 ? formData.photos[0] : formData.image,
      photos: formData.photos.length > 0 ? formData.photos : [formData.image],
      colors: formData.colors.length > 0 ? formData.colors : ['Standard']
    };

    let updatedList;
    if (isNewProduct) {
      updatedList = [cleanedProduct, ...products];
    } else {
      updatedList = products.map(p => p.id === cleanedProduct.id ? cleanedProduct : p);
    }

    onUpdateProducts(updatedList);
    setEditingProduct(null);
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-window">
        {/* Admin Navigation Header */}
        <div className="admin-header-bar">
          <div className="admin-brand-box">
            <ShieldCheck size={26} className="text-gold" />
            <div>
              <h2>SHYN Haute Atelier • Store Administration CMS</h2>
              <p className="admin-subtext">Manage Live Catalog, Pricing, Inventory &amp; High-Resolution Photos</p>
            </div>
          </div>

          <div className="admin-top-actions">
            <button
              type="button"
              className="admin-btn-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Add New Creation</span>
            </button>

            <button
              type="button"
              className="admin-btn-secondary"
              onClick={handleResetCatalog}
              title="Reset inventory to initial master catalogue"
            >
              <RotateCcw size={15} />
              <span>Reset Catalog</span>
            </button>

            <button
              type="button"
              className="admin-close-btn"
              onClick={onClose}
              aria-label="Close Admin Panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="admin-nav-switcher">
          <button
            type="button"
            className={`admin-nav-tab-btn ${adminTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setAdminTab('inventory')}
          >
            <Package size={17} />
            <span>Catalog &amp; Inventory ({safeProducts.length})</span>
          </button>
          <button
            type="button"
            className={`admin-nav-tab-btn ${adminTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setAdminTab('analytics')}
          >
            <BarChart3 size={17} />
            <span>Sales Analytics &amp; Orders ({safeOrders.length})</span>
            {lowStockCount > 0 && <span className="admin-badge-warning">{lowStockCount} Low</span>}
          </button>
        </div>

        {adminTab === 'inventory' ? (
          <>
            {/* Stats Summary Bar */}
            <div className="admin-stats-row">
          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-maroon">
              <Package size={20} className="text-white" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Total Inventory</span>
              <strong className="stat-val">{totalProducts} Items</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-gold">
              <Sparkles size={20} className="text-maroon" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Heritage Sarees</span>
              <strong className="stat-val">{sareesCount} Handlooms</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-sapphire">
              <Layers size={20} className="text-white" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Sartorial Menswear</span>
              <strong className="stat-val">{menswearCount} Suits/Shirts</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-warning">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Low Stock Alerts</span>
              <strong className="stat-val text-red">{lowStockCount} Items (≤5)</strong>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="admin-controls-bar">
          <div className="admin-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by Product Name, ID, or Category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="admin-filter-tabs">
            <button
              type="button"
              className={`filter-btn ${filterGender === 'All' ? 'active' : ''}`}
              onClick={() => setFilterGender('All')}
            >
              All Items ({products.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filterGender === 'Women' ? 'active' : ''}`}
              onClick={() => setFilterGender('Women')}
            >
              👑 Sarees ({sareesCount})
            </button>
            <button
              type="button"
              className={`filter-btn ${filterGender === 'Men' ? 'active' : ''}`}
              onClick={() => setFilterGender('Men')}
            >
              👔 Menswear ({menswearCount})
            </button>
          </div>
        </div>

        {/* Product Inventory Table View */}
        <div className="admin-table-container">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>ID</th>
                <th>Name &amp; Category</th>
                <th>Gender</th>
                <th>Selling Price</th>
                <th>Stock Status</th>
                <th>Colors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const isLow = p.stock <= 5;
                const isOut = p.stock <= 0;
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="table-img-box">
                        <img src={p.image} alt={p.name} />
                        {p.photos && p.photos.length > 1 && (
                          <span className="photo-count-badge">+{p.photos.length}</span>
                        )}
                      </div>
                    </td>
                    <td><span className="id-badge">#{p.id}</span></td>
                    <td>
                      <div className="table-product-title">{p.name}</div>
                      <span className="table-category-tag">{p.category}</span>
                    </td>
                    <td>
                      <span className={`gender-badge ${p.gender.toLowerCase()}`}>
                        {p.gender === 'Women' ? '👑 Women' : '👔 Men'}
                      </span>
                    </td>
                    <td>
                      <div className="table-price">₹{p.price.toLocaleString('en-IN')}</div>
                      {p.original && (
                        <div className="table-orig-price">₹{p.original.toLocaleString('en-IN')}</div>
                      )}
                    </td>
                    <td>
                      <span className={`stock-pill ${isOut ? 'out' : isLow ? 'low' : 'ok'}`}>
                        {isOut ? 'Out of Stock' : `${p.stock} units`}
                      </span>
                    </td>
                    <td>
                      <div className="table-colors-row">
                        {p.colors && p.colors.map(c => (
                          <span key={c} className="table-color-chip" title={c}>{c}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="table-actions-row">
                        <button
                          type="button"
                          className="table-action-btn edit"
                          onClick={() => handleOpenEdit(p)}
                          title="Edit Details & Photos"
                        >
                          <Edit3 size={15} />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          className="table-action-btn view"
                          onClick={() => onOpenDetails(p)}
                          title="View Live Store Page"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          className="table-action-btn delete"
                          onClick={() => handleDeleteProduct(p.id)}
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    ) : (
      /* SALES ANALYTICS & ORDERS DASHBOARD VIEW */
      <div className="admin-analytics-dashboard">
        {/* 4 Stat Cards */}
        <div className="admin-stats-row">
          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-gold">
              <DollarSign size={20} className="text-maroon" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Total Store Revenue</span>
              <strong className="stat-val text-green">₹{totalRevenue.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-maroon">
              <Package size={20} className="text-white" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Orders Processed</span>
              <strong className="stat-val">{safeOrders.length} Orders</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-sapphire">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Total Units Sold</span>
              <strong className="stat-val">{totalUnitsSold} Weaves</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-warning">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div className="stat-info">
              <span className="stat-title">Critical Low Stock</span>
              <strong className="stat-val text-red">{lowStockCount} Items (≤5)</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Critical Low Stock Alerts with 1-Click Restock */}
        <div className="analytics-card-section mb-6">
          <div className="analytics-section-header">
            <div className="header-with-badge">
              <AlertTriangle size={18} className="text-red inline mr-2" />
              <h3>Critical Low Stock Monitor (≤ 5 Units Left)</h3>
            </div>
            <span className="analytics-subbadge">{lowStockProducts.length} Items Need Restock</span>
          </div>

          {lowStockProducts.length > 0 ? (
            <div className="low-stock-grid">
              {lowStockProducts.map(p => (
                <div key={p.id} className="low-stock-item-pill">
                  <img src={p.image} alt={p.name} className="pill-thumb" />
                  <div className="pill-body">
                    <h4 className="pill-name">{p.name}</h4>
                    <span className="pill-cat">{p.category} • ₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pill-stock-danger">
                    <span>{p.stock} in stock</span>
                  </div>
                  <button
                    type="button"
                    className="quick-restock-btn"
                    onClick={() => handleQuickRestock(p.id, 10)}
                    title="Add 10 units of stock immediately"
                  >
                    <RefreshCw size={13} />
                    <span>+10 Restock</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-stock-alert">
              <Check size={18} className="text-green inline mr-2" />
              <span>All atelier items are healthy in stock! No inventory shortages.</span>
            </div>
          )}
        </div>

        {/* Section 2: Recent Customer Orders & Invoices */}
        <div className="analytics-card-section">
          <div className="analytics-section-header">
            <div className="header-with-badge">
              <Printer size={18} className="text-gold inline mr-2" />
              <h3>Customer Orders &amp; Live Invoicing Feed</h3>
            </div>
            <span className="analytics-subbadge">{safeOrders.length} Recorded Orders</span>
          </div>

          {safeOrders.length > 0 ? (
            <div className="admin-table-container">
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer / Destination</th>
                    <th>Items</th>
                    <th>Payment Mode</th>
                    <th>Grand Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {safeOrders.map((ord, idx) => {
                    const orderId = String(ord?.id || `ORD-${idx + 1}`);
                    const orderDate = ord?.date || 'Recent';
                    const customerName = ord?.shippingAddress?.name || ord?.customer?.name || (typeof ord?.customer === 'string' ? ord.customer : 'Patron');
                    const city = ord?.shippingAddress?.city || ord?.customer?.city || '';
                    const state = ord?.shippingAddress?.state || ord?.customer?.state || '';
                    const customerLoc = [city, state].filter(Boolean).join(', ') || 'India';
                    const orderItems = Array.isArray(ord?.items) ? ord.items : [];
                    const firstItemName = orderItems[0]?.name ? `${orderItems[0].name.slice(0, 20)}...` : '';
                    const paymentMethod = ord?.paymentMethod || 'Prepaid';
                    const totalAmount = Number(ord?.grandTotal || ord?.total || 0);

                    return (
                      <tr key={orderId}>
                        <td>
                          <strong className="order-id-highlight">{orderId}</strong>
                          {ord?.isGift && <span className="gift-tag-micro">🎁 Gift</span>}
                        </td>
                        <td>{orderDate}</td>
                        <td>
                          <strong>{customerName}</strong>
                          <div className="subtext">{customerLoc}</div>
                        </td>
                        <td>
                          <span>{orderItems.length} items</span>
                          {firstItemName && <div className="subtext">{firstItemName}</div>}
                        </td>
                        <td>
                          <span className="mode-badge">{paymentMethod}</span>
                        </td>
                        <td>
                          <strong className="text-gold">₹{totalAmount.toLocaleString('en-IN')}</strong>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="admin-invoice-download-btn"
                            onClick={() => printTaxInvoice(ord)}
                            title="Download / Print Official Tax Invoice"
                          >
                            <Printer size={14} className="text-gold" />
                            <span>Invoice (PDF)</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-orders-view">
              <p>No customer orders recorded yet. As orders are placed in the store, they will automatically appear here with one-click tax invoice generation!</p>
            </div>
          )}
        </div>
      </div>
    )}

        {/* EDIT / ADD PRODUCT MODAL DIALOG */}
        {editingProduct && (
          <div className="edit-modal-backdrop" onClick={() => setEditingProduct(null)}>
            <div className="edit-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="edit-modal-header">
                <div className="edit-title-box">
                  <Edit3 size={20} className="text-gold" />
                  <h3>{isNewProduct ? 'Add New Luxury Creation' : `Edit: ${formData.name}`}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={() => setEditingProduct(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="edit-modal-body">
                {/* 1. Basic Information Grid */}
                <div className="form-section-card">
                  <h4 className="section-title">1. Essential Details &amp; Pricing</h4>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Product Title / Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kanjivaram Pure Mulberry Silk Saree"
                        required
                      />
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Collection Gender *</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => {
                            const gen = e.target.value;
                            const cats = CATEGORIES_BY_GENDER[gen] || [];
                            setFormData({
                              ...formData,
                              gender: gen,
                              category: cats[1] || 'All'
                            });
                          }}
                        >
                          <option value="Women">👑 Women (Sarees)</option>
                          <option value="Men">👔 Men (Sartorial)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          {(CATEGORIES_BY_GENDER[formData.gender] || []).filter(c => c !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label>Selling Price (₹) *</label>
                      <input
                        type="number"
                        min="100"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Original MRP (₹ strike-through)</label>
                      <input
                        type="number"
                        min="100"
                        value={formData.original}
                        onChange={(e) => setFormData({ ...formData, original: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Current Stock Units *</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Craftsmanship & Fabric Details */}
                <div className="form-section-card">
                  <h4 className="section-title">2. Craftsmanship, Zari &amp; Guild Origin</h4>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Fabric Specification</label>
                      <input
                        type="text"
                        value={formData.fabric}
                        onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                        placeholder="e.g. 100% Pure Mulberry Katan Silk (Silk Mark)"
                      />
                    </div>

                    <div className="form-group">
                      <label>Zari &amp; Weave Type</label>
                      <input
                        type="text"
                        value={formData.zari}
                        onChange={(e) => setFormData({ ...formData, zari: e.target.value })}
                        placeholder="e.g. Pure Silver Dipped 24K Gold Zari"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Artisan Guild / Origin</label>
                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        placeholder="e.g. Varanasi Heritage Guild, Uttar Pradesh"
                      />
                    </div>

                    <div className="form-group">
                      <label>Care Instructions</label>
                      <input
                        type="text"
                        value={formData.care}
                        onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                        placeholder="e.g. Strictly Dry Clean Only. Store in muslin cloth."
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Product Description Story</label>
                    <textarea
                      rows={2}
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                      placeholder="Write evocative details about the drape, pallu motifs, and border design..."
                    />
                  </div>
                </div>

                {/* 3. Color Variants Manager */}
                <div className="form-section-card">
                  <h4 className="section-title">3. Color Variants</h4>
                  <div className="colors-manager-row">
                    <div className="active-colors-chips">
                      {formData.colors.map(color => (
                        <span key={color} className="color-tag-pill">
                          <span>{color}</span>
                          <button
                            type="button"
                            className="remove-tag-btn"
                            onClick={() => handleRemoveColor(color)}
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="add-color-input-box">
                      <input
                        type="text"
                        placeholder="Add new color (e.g. Emerald Green)"
                        value={newColorInput}
                        onChange={(e) => setNewColorInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddColor();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="add-color-btn"
                        onClick={handleAddColor}
                      >
                        + Add Color
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. High-Resolution Photos & Media Gallery Manager (Crucial Requirement!) */}
                <div className="form-section-card">
                  <h4 className="section-title">
                    <ImageIcon size={16} className="inline mr-1 text-gold" />
                    4. Photos &amp; Image Gallery Manager
                  </h4>
                  <p className="photo-manager-desc">
                    Add high-resolution Web URLs (Unsplash, CDN) or upload local photo files directly from your computer.
                  </p>

                  {/* Main Primary Image Upload */}
                  <div className="primary-photo-row">
                    <div className="primary-preview-box">
                      {formData.image ? (
                        <img src={formData.image} alt="Primary Preview" />
                      ) : (
                        <div className="no-photo-placeholder">No Image</div>
                      )}
                      <span className="primary-badge-tag">Cover Photo</span>
                    </div>

                    <div className="primary-photo-inputs">
                      <label>Cover Photo URL (Web / Cloud):</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => {
                          const url = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            image: url,
                            photos: prev.photos.length > 0 ? [url, ...prev.photos.slice(1)] : [url]
                          }));
                        }}
                        placeholder="https://images.unsplash.com/..."
                      />

                      <div className="local-file-upload-block">
                        <span className="or-divider">— OR Upload From Computer —</span>
                        <label className="file-upload-btn-label">
                          <Upload size={14} />
                          <span>Upload Local Photo File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageFileUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Additional Multi-Angle Gallery Photos */}
                  <div className="additional-photos-block">
                    <label className="section-sublabel">
                      Multi-Angle Gallery Photos ({formData.photos.length}):
                    </label>

                    <div className="gallery-thumbnails-grid">
                      {formData.photos.map((photoUrl, idx) => (
                        <div key={idx} className="thumb-manage-card">
                          <img src={photoUrl} alt={`Angle ${idx + 1}`} />
                          <button
                            type="button"
                            className="remove-thumb-icon"
                            onClick={() => handleRemovePhoto(idx)}
                            title="Remove this photo"
                          >
                            ✕
                          </button>
                          <span className="thumb-idx-label">#{idx + 1}</span>
                        </div>
                      ))}

                      {/* Add photo via Local Upload Box */}
                      <label className="add-thumb-upload-box">
                        <Upload size={20} className="text-gold" />
                        <span>Upload Angle</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAdditionalPhotoUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>

                    {/* Add photo via URL */}
                    <div className="add-photo-url-row">
                      <input
                        type="text"
                        placeholder="Or paste an additional photo image URL..."
                        value={newPhotoUrlInput}
                        onChange={(e) => setNewPhotoUrlInput(e.target.value)}
                      />
                      <button
                        type="button"
                        className="add-photo-url-btn"
                        onClick={handleAddPhotoUrl}
                      >
                        + Add Image URL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Footer Action Buttons */}
                <div className="edit-form-footer">
                  <button
                    type="button"
                    className="cancel-edit-btn"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-product-btn"
                  >
                    <Check size={16} />
                    <span>{isNewProduct ? 'Publish New Creation' : 'Save All Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
