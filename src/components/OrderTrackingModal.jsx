import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Search, 
  CheckCircle, 
  Clock, 
  Truck, 
  Home, 
  Sparkles,
  ExternalLink,
  Printer
} from 'lucide-react';
import { printTaxInvoice } from '../utils/invoiceGenerator';

export default function OrderTrackingModal({
  isOpen,
  onClose,
  orders = []
}) {
  if (!isOpen) return null;

  const [searchOrderId, setSearchOrderId] = useState('');
  const [activeOrder, setActiveOrder] = useState(orders.length > 0 ? orders[0] : null);

  const trackingSteps = [
    { label: 'Order Placed & Verified', desc: 'Order received and authenticated by SHYN atelier', completed: true },
    { label: 'Generational Handloom Inspection', desc: 'Silk Mark authenticity and zari purity checked', completed: true },
    { label: 'Curated Packaging', desc: 'Wrapped in royal muslin cloth with sealed brass seal', completed: true },
    { label: 'Dispatched via Express Courier', desc: 'Shipped via BlueDart / Delhivery Air Cargo', completed: true },
    { label: 'Out for Doorstep Delivery', desc: 'Delivery associate en route to destination', completed: false },
    { label: 'Delivered', desc: 'Delivered to recipient', completed: false }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    const match = orders.find(o => o.id.toLowerCase().includes(searchOrderId.trim().toLowerCase()));
    if (match) {
      setActiveOrder(match);
    } else {
      alert(`No order found matching "${searchOrderId}".`);
    }
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="header-title-box">
            <Package size={22} className="text-gold" />
            <h2>Order Tracking &amp; Delivery Timeline</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="tracking-search-bar">
          <input
            type="text"
            placeholder="Search by Order ID (e.g. SHYN-482910)"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
          />
          <button type="submit" className="tracking-search-btn">
            <Search size={16} />
            <span>Track</span>
          </button>
        </form>

        {activeOrder ? (
          <div className="tracking-content-body">
            {/* Active Order Overview */}
            <div className="tracking-order-pill">
              <div>
                <span className="pill-label">Order Number:</span>
                <strong className="order-id-highlight">{activeOrder.id}</strong>
              </div>
              <div>
                <span className="pill-label">Order Date:</span>
                <span>{activeOrder.date}</span>
              </div>
              <div>
                <span className="pill-label">Total:</span>
                <strong>₹{(Number(activeOrder.grandTotal || activeOrder.total) || 0).toLocaleString('en-IN')}</strong>
              </div>
              <div className="tracking-pill-actions">
                <button
                  type="button"
                  className="tracking-invoice-btn"
                  onClick={() => printTaxInvoice(activeOrder)}
                  title="Download Tax Invoice / Receipt (PDF)"
                >
                  <Printer size={14} className="text-gold" />
                  <span>Invoice</span>
                </button>
                <span className="status-badge-live">In Transit</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="timeline-stepper-box">
              {trackingSteps.map((st, idx) => (
                <div key={idx} className={`stepper-item ${st.completed ? 'completed' : 'pending'}`}>
                  <div className="stepper-icon-column">
                    <div className="stepper-circle">
                      {st.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                    </div>
                    {idx < trackingSteps.length - 1 && <div className="stepper-line" />}
                  </div>
                  <div className="stepper-content">
                    <h4 className="stepper-title">{st.label}</h4>
                    <p className="stepper-desc">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ordered Items Preview */}
            <div className="tracking-items-section">
              <h3>Items in this Shipment ({activeOrder.items.length})</h3>
              <div className="tracking-items-row">
                {activeOrder.items.map((it, i) => (
                  <div key={i} className="tracking-item-chip">
                    <img src={it.selectedImage || it.image} alt={it.name} />
                    <div className="chip-details">
                      <p className="chip-title">{it.name}</p>
                      <span className="chip-color">{it.selectedColor} • Qty {it.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-orders-state">
            <p>You have not placed any orders yet. Once you place an order, live tracking will appear here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
