import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  PackageCheck,
  Printer,
  Gift,
  MailCheck,
  Eye,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { printTaxInvoice } from '../utils/invoiceGenerator';
import { sendOrderConfirmationEmail } from '../services/emailService';
import EmailPreviewModal from './EmailPreviewModal';

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutData,
  onOrderSuccess
}) {
  if (!isOpen || !checkoutData) return null;

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [sentEmailRecord, setSentEmailRecord] = useState(null);
  const [formData, setFormData] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shyn_user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      const savedCust = localStorage.getItem('shyn_registered_customer');
      const parsedCust = savedCust ? JSON.parse(savedCust) : null;

      const defaultName = (parsedUser && parsedUser.isLoggedIn && parsedUser.name && parsedUser.name !== 'Guest')
        ? parsedUser.name
        : (parsedCust?.name || '');
      const defaultEmail = (parsedUser && parsedUser.isLoggedIn && parsedUser.email)
        ? parsedUser.email
        : (parsedCust?.email || '');

      return {
        name: defaultName,
        phone: '7726874080',
        email: defaultEmail,
        pincode: '560001',
        address: 'MG Road, Heritage Boulevard',
        city: 'Bengaluru',
        state: 'Karnataka'
      };
    } catch {
      return {
        name: '',
        phone: '',
        email: '',
        pincode: '',
        address: '',
        city: '',
        state: ''
      };
    }
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' or 'cod'
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const { 
    cart, 
    subtotal, 
    discount, 
    shipping, 
    isGift = false, 
    giftMessage = '', 
    giftCost = 0, 
    grandTotal, 
    appliedCoupon 
  } = checkoutData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill all mandatory shipping details.');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(async () => {
      setIsProcessing(false);
      const orderId = `SHYN-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderObj = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cart],
        subtotal,
        discount,
        shipping,
        isGift,
        giftMessage,
        giftCost,
        appliedCoupon,
        grandTotal,
        paymentMethod: paymentMethod === 'razorpay' ? 'Razorpay (Prepaid UPI/Card)' : 'Cash on Delivery',
        status: 'Order Placed',
        shippingAddress: formData,
        emailSent: true,
        emailRecipient: formData.email
      };

      // Push automated confirmation email to customer
      try {
        const emailRes = await sendOrderConfirmationEmail(orderObj);
        if (emailRes && emailRes.emailRecord) {
          setSentEmailRecord(emailRes.emailRecord);
        }
      } catch (err) {
        console.warn('Auto email dispatch notice:', err);
      }

      setConfirmedOrder(orderObj);
      setStep(3);

      // Trigger celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#c9a24a', '#8bb4f8', '#2e7d32']
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }

      onOrderSuccess(orderObj);
    }, 1500);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal-header">
          <div className="checkout-steps-nav">
            <span className={`step-badge ${step >= 1 ? 'active' : ''}`}>1. Shipping</span>
            <span className="step-arrow">→</span>
            <span className={`step-badge ${step >= 2 ? 'active' : ''}`}>2. Payment</span>
            <span className="step-arrow">→</span>
            <span className={`step-badge ${step === 3 ? 'active' : ''}`}>3. Confirmation</span>
          </div>
          {step !== 3 && (
            <button type="button" className="modal-close-icon-btn" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* STEP 1: Shipping Address */}
        {step === 1 && (
          <form onSubmit={handleAddressSubmit} className="checkout-step-body">
            <h2 className="step-title">Doorstep Delivery Address</h2>
            <p className="step-desc">Enter where you would like your royal heirloom pieces delivered.</p>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Phone (+91) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address (For Invoicing) *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Street Address / Flat / Building *</label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label>PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="checkout-summary-mini">
              <span>Items Subtotal: ₹{subtotal.toLocaleString('en-IN')}</span>
              <span>Grand Total: <strong>₹{grandTotal.toLocaleString('en-IN')}</strong></span>
            </div>

            <button type="submit" className="checkout-primary-btn">
              <span>Continue to Payment</span>
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        {/* STEP 2: Payment Method */}
        {step === 2 && (
          <div className="checkout-step-body">
            <h2 className="step-title">Select Payment Mode</h2>
            <p className="step-desc">All transactions are secured with 256-bit SSL encryption.</p>

            <div className="payment-options-grid">
              <label className={`payment-card-option ${paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMode"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                />
                <div className="payment-option-info">
                  <div className="payment-title-row">
                    <CreditCard size={18} className="text-gold" />
                    <strong>Razorpay Instant Checkout (Recommended)</strong>
                  </div>
                  <p>Pay securely via UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards &amp; NetBanking.</p>
                  <span className="payment-perk-chip">⚡ Instant confirmation &amp; priority dispatch</span>
                </div>
              </label>

              <label className={`payment-card-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMode"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <div className="payment-option-info">
                  <div className="payment-title-row">
                    <Truck size={18} className="text-gold" />
                    <strong>Cash on Delivery (COD)</strong>
                  </div>
                  <p>Pay cash or UPI upon package inspection at your doorstep.</p>
                </div>
              </label>
            </div>

            <div className="final-order-breakdown">
              <h3>Order Summary</h3>
              <div className="breakdown-row">
                <span>Items ({cart.length})</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="breakdown-row text-green">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>− ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {isGift && (
                <div className="breakdown-row text-gold">
                  <span>Royal Heirloom Gift Packaging</span>
                  <span>+ ₹{giftCost}</span>
                </div>
              )}
              <div className="breakdown-row">
                <span>Express Insured Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              {isGift && giftMessage && (
                <div className="checkout-gift-preview-card">
                  <Gift size={13} className="text-gold inline mr-1" />
                  <span>Calligraphy Card: "{giftMessage}"</span>
                </div>
              )}
              <div className="breakdown-row total-highlight">
                <span>Total Amount Payable</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="checkout-actions-row">
              <button
                type="button"
                className="checkout-back-btn"
                onClick={() => setStep(1)}
              >
                Back to Address
              </button>

              <button
                type="button"
                className="checkout-primary-btn"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span>Processing Securely...</span>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Confirm &amp; Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 3 && confirmedOrder && (
          <div className="checkout-step-body confirmation-screen">
            <div className="confirmation-icon-box">
              <CheckCircle2 size={54} className="text-green" />
            </div>

            <h2 className="confirm-title">Order Placed Successfully!</h2>
            <p className="confirm-subtitle">
              Thank you for shopping at <strong>SHYN Haute Couture Atelier</strong>.
            </p>

            {/* Automated Email Push Notification Card */}
            <div className="email-dispatched-card">
              <div className="email-dispatched-icon-col">
                <div className="email-icon-pulse-wrapper">
                  <MailCheck size={24} />
                  <span className="email-pulse-ring" />
                </div>
              </div>
              <div className="email-dispatched-content-col">
                <div className="email-status-pill">
                  <span className="live-dot" />
                  <span>AUTOMATED EMAIL PUSHED</span>
                </div>
                <h4 className="email-card-title">Order Confirmation &amp; Digital Invoice Sent</h4>
                <p className="email-card-desc">
                  An official digital receipt with itemized summary has been automatically transmitted to:
                </p>
                <div className="email-recipient-highlight">
                  <strong>{confirmedOrder.shippingAddress?.email || 'customer@heritage.in'}</strong>
                </div>

                <div className="email-quick-actions">
                  <button
                    type="button"
                    className="email-action-link-btn"
                    onClick={() => setShowEmailModal(true)}
                  >
                    <Eye size={14} />
                    <span>View Dispatched Email</span>
                  </button>
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="email-action-link-btn gmail-link"
                  >
                    <ExternalLink size={14} />
                    <span>Open in Gmail</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="order-receipt-card">
              <div className="receipt-row">
                <span>Order Reference:</span>
                <strong className="order-id-badge">{confirmedOrder.id}</strong>
              </div>
              <div className="receipt-row">
                <span>Date:</span>
                <span>{confirmedOrder.date}</span>
              </div>
              <div className="receipt-row">
                <span>Payment Mode:</span>
                <span>{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="receipt-row">
                <span>Amount Paid:</span>
                <strong>₹{confirmedOrder.grandTotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="receipt-row">
                <span>Shipping To:</span>
                <span>{confirmedOrder.shippingAddress.name}, {confirmedOrder.shippingAddress.city}</span>
              </div>
              {confirmedOrder.isGift && (
                <div className="receipt-row text-gold">
                  <span>Gift Service:</span>
                  <span>Royal Heirloom Box &amp; Personalized Message Card</span>
                </div>
              )}
            </div>

            <div className="confirmation-actions">
              <button
                type="button"
                className="checkout-download-invoice-btn"
                onClick={() => printTaxInvoice(confirmedOrder)}
              >
                <Printer size={18} className="text-gold inline mr-2" />
                <span>Download Tax Invoice (PDF)</span>
              </button>

              <button
                type="button"
                className="checkout-primary-btn"
                onClick={onClose}
              >
                <PackageCheck size={18} />
                <span>Track Order &amp; Continue Shopping</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Automated Email Preview Client Modal */}
      <EmailPreviewModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        emailData={sentEmailRecord}
      />
    </div>
  );
}
