/**
 * SHYN Haute Couture Atelier — Automated Order Confirmation Email Engine
 * Generates bespoke responsive luxury HTML emails and dispatches to customers.
 */

export function generateOrderEmailHtml(order) {
  if (!order) return '';

  const orderId = String(order.id || 'SHYN-ORDER');
  const orderDate = order.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const items = Array.isArray(order.items) ? order.items : [];
  const shippingAddress = order.shippingAddress || (typeof order.customer === 'object' ? order.customer : { name: String(order.customer || 'Valued Patron') }) || {};
  const isGift = Boolean(order.isGift);
  const giftMessage = order.giftMessage || '';
  const giftCost = isGift ? 150 : 0;
  const subtotal = Number(order.subtotal) || items.reduce((s, it) => s + (Number(it?.price) || 0) * (Number(it?.quantity || it?.qty) || 1), 0);
  const discount = Number(order.discount) || 0;
  const shipping = Number(order.shipping) || 0;
  const grandTotal = Number(order.grandTotal || order.total) || Math.max(0, subtotal - discount + shipping + giftCost);
  const paymentMethod = order.paymentMethod || 'Prepaid Electronic';
  const customerName = shippingAddress.name || 'Valued Patron';
  const customerEmail = shippingAddress.email || 'patron@shyn.atelier';
  const trackingNumber = order.trackingNumber || `BD${Math.floor(100000000 + Math.random() * 900000000)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed — ${orderId} | SHYN Haute Couture</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f7f3ee;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #2a201f;
      -webkit-font-smoothing: antialiased;
    }
    .email-wrapper {
      max-width: 650px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #ebd9c8;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(42, 8, 8, 0.08);
    }
    .header-banner {
      background: linear-gradient(135deg, #1e0606 0%, #3e0c0c 60%, #144191 100%);
      padding: 36px 30px;
      text-align: center;
      color: #ffffff;
    }
    .crest-badge {
      display: inline-block;
      width: 44px;
      height: 44px;
      line-height: 44px;
      background: linear-gradient(135deg, #d4af37 0%, #aa8010 100%);
      color: #2a0808;
      font-size: 22px;
      font-weight: 800;
      border-radius: 50%;
      margin-bottom: 12px;
      font-family: 'Cinzel', Georgia, serif;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 4px;
      margin: 0 0 6px;
      color: #ffffff;
      font-family: Georgia, serif;
    }
    .brand-subtitle {
      font-size: 11px;
      letter-spacing: 2.5px;
      color: #d4af37;
      text-transform: uppercase;
      font-weight: 600;
    }
    .status-ribbon {
      background: #fcf9f5;
      border-bottom: 1px solid #ebd9c8;
      padding: 16px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status-text {
      color: #2e7d32;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.5px;
    }
    .order-ref {
      font-size: 13px;
      color: #7a6e6b;
      font-weight: 600;
    }
    .content-body {
      padding: 30px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 700;
      color: #2a0808;
      margin-bottom: 12px;
    }
    .intro-p {
      font-size: 14px;
      color: #554846;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .details-box {
      background: #fbf7f2;
      border: 1px solid #ebd9c8;
      border-radius: 8px;
      padding: 18px;
      margin-bottom: 24px;
    }
    .details-grid {
      width: 100%;
      border-collapse: collapse;
    }
    .details-grid td {
      padding: 6px 0;
      font-size: 13px;
      vertical-align: top;
    }
    .details-grid td.label {
      color: #8c7f7d;
      width: 38%;
      font-weight: 500;
    }
    .details-grid td.val {
      color: #2a0808;
      font-weight: 600;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #2a0808;
      border-bottom: 1.5px solid #ebd9c8;
      padding-bottom: 8px;
      margin: 28px 0 16px;
      text-transform: uppercase;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .items-table th {
      background: #f4ece4;
      padding: 10px 12px;
      text-align: left;
      font-size: 11.5px;
      font-weight: 700;
      color: #4a3c39;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .items-table td {
      padding: 14px 12px;
      border-bottom: 1px solid #f0e6dc;
      font-size: 13px;
      vertical-align: middle;
    }
    .item-img {
      width: 50px;
      height: 65px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid #ebd9c8;
    }
    .item-title {
      font-weight: 600;
      color: #2a0808;
      margin-bottom: 4px;
    }
    .item-sub {
      font-size: 11.5px;
      color: #7a6e6b;
    }
    .totals-table {
      width: 100%;
      max-width: 320px;
      margin-left: auto;
      border-collapse: collapse;
      margin-bottom: 28px;
    }
    .totals-table td {
      padding: 6px 10px;
      font-size: 13px;
    }
    .totals-table .grand-row td {
      border-top: 2px solid #ebd9c8;
      font-size: 16px;
      font-weight: 800;
      color: #2a0808;
      padding-top: 10px;
    }
    .grand-price {
      color: #144191;
    }
    .gift-banner {
      background: #fff9ea;
      border: 1px solid #f1dda9;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
    }
    .gift-title {
      font-weight: 700;
      font-size: 13px;
      color: #926d0b;
      margin-bottom: 4px;
    }
    .gift-msg {
      font-style: italic;
      font-size: 12.5px;
      color: #4c3e1b;
      background: #ffffff;
      padding: 8px 12px;
      border-radius: 6px;
      border-left: 3px solid #d4af37;
      margin-top: 6px;
    }
    .tracking-card {
      background: #f0f5fc;
      border: 1px solid #cadbf2;
      border-radius: 8px;
      padding: 16px 20px;
      text-align: center;
      margin-bottom: 28px;
    }
    .tracking-code {
      font-family: monospace;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #144191;
      background: #ffffff;
      padding: 4px 12px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 6px;
    }
    .silk-seal {
      text-align: center;
      background: #fbf7f2;
      border: 1px dashed #c9a24a;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 28px;
    }
    .silk-seal-text {
      font-size: 12px;
      color: #554846;
      line-height: 1.5;
    }
    .help-box {
      border-top: 1px solid #ebd9c8;
      padding-top: 20px;
      font-size: 12.5px;
      color: #7a6e6b;
      line-height: 1.6;
    }
    .footer-bar {
      background: #1e0606;
      color: #c7b299;
      padding: 24px 30px;
      text-align: center;
      font-size: 11px;
      line-height: 1.6;
    }
    .footer-links a {
      color: #d4af37;
      text-decoration: none;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header-banner">
      <div class="crest-badge">S</div>
      <h1 class="brand-title">SHYN</h1>
      <div class="brand-subtitle">HAUTE COUTURE &amp; HERITAGE ATELIER</div>
    </div>

    <!-- Status Ribbon -->
    <div class="status-ribbon">
      <span class="status-text">✓ ORDER CONFIRMED &amp; DISPATCHED FOR WEAVING</span>
      <span class="order-ref">${orderId}</span>
    </div>

    <!-- Main Content -->
    <div class="content-body">
      <div class="greeting">Namaste, ${customerName}!</div>
      <p class="intro-p">
        Thank you for choosing <strong>SHYN Haute Couture</strong>. We have received your order and our generational master weavers and sartorial artisans have commenced preparing your exquisite creation with meticulous craftsmanship.
      </p>

      <!-- Order Metadata Box -->
      <div class="details-box">
        <table class="details-grid">
          <tr>
            <td class="label">Order Reference:</td>
            <td class="val">${orderId}</td>
          </tr>
          <tr>
            <td class="label">Order Date:</td>
            <td class="val">${orderDate}</td>
          </tr>
          <tr>
            <td class="label">Payment Method:</td>
            <td class="val">${paymentMethod}</td>
          </tr>
          <tr>
            <td class="label">Delivery Address:</td>
            <td class="val">
              ${shippingAddress.address || 'Heritage Boulevard'}, ${shippingAddress.city || 'Bengaluru'}, ${shippingAddress.state || 'Karnataka'} - ${shippingAddress.pincode || '560001'}
            </td>
          </tr>
          <tr>
            <td class="label">Contact Phone:</td>
            <td class="val">+91 ${shippingAddress.phone || '7726874080'}</td>
          </tr>
        </table>
      </div>

      ${isGift ? `
        <div class="gift-banner">
          <div class="gift-title">🎁 Royal Heirloom Gift Packaging Included</div>
          <div>Your order will be encased in an imperial velvet keepsake casket with a monogrammed seal.</div>
          ${giftMessage ? `<div class="gift-msg">"${giftMessage}"</div>` : ''}
        </div>
      ` : ''}

      <!-- Itemized Products -->
      <div class="section-title">Itemized Order Summary</div>
      <table class="items-table">
        <thead>
          <tr>
            <th style="width: 60px;">Item</th>
            <th>Creation &amp; Weave</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(it => {
            const qty = Number(it?.quantity || it?.qty || 1);
            const price = Number(it?.price || 0);
            return `
            <tr>
              <td>
                <img src="${it?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80'}" alt="${it?.name || 'Item'}" class="item-img" />
              </td>
              <td>
                <div class="item-title">${it?.name || 'Handcrafted Heritage Item'}</div>
                <div class="item-sub">Selected Shade: <strong>${it?.selectedColor || 'Standard'}</strong> • ${it?.category || 'Atelier'}</div>
              </td>
              <td style="text-align: center; font-weight: 600;">${qty}</td>
              <td style="text-align: right; font-weight: 700;">₹${(price * qty).toLocaleString('en-IN')}</td>
            </tr>
          `;
          }).join('')}
        </tbody>
      </table>

      <!-- Financial Totals -->
      <table class="totals-table">
        <tr>
          <td style="color: #7a6e6b;">Subtotal:</td>
          <td style="text-align: right; font-weight: 600;">₹${subtotal.toLocaleString('en-IN')}</td>
        </tr>
        ${discount > 0 ? `
          <tr style="color: #2e7d32;">
            <td>Coupon Discount:</td>
            <td style="text-align: right; font-weight: 600;">-₹${discount.toLocaleString('en-IN')}</td>
          </tr>
        ` : ''}
        <tr>
          <td style="color: #7a6e6b;">Express BlueDart Shipping:</td>
          <td style="text-align: right; font-weight: 600; color: #2e7d32;">
            ${shipping === 0 ? 'FREE (Royal Complimentary)' : `₹${shipping}`}
          </td>
        </tr>
        ${isGift ? `
          <tr>
            <td style="color: #7a6e6b;">Royal Heirloom Gift Box:</td>
            <td style="text-align: right; font-weight: 600;">+₹150</td>
          </tr>
        ` : ''}
        <tr class="grand-row">
          <td>Total Paid:</td>
          <td style="text-align: right;" class="grand-price">₹${grandTotal.toLocaleString('en-IN')}</td>
        </tr>
      </table>

      <!-- Live Express Tracking -->
      <div class="tracking-card">
        <div style="font-size: 12px; font-weight: 700; color: #144191; letter-spacing: 1px; text-transform: uppercase;">
          🚀 BlueDart Royal Express Air Logistics
        </div>
        <div style="font-size: 13px; color: #3e4f68; margin-top: 4px;">
          Estimated Doorstep Delivery: <strong>3–5 Business Days</strong>
        </div>
        <div>
          <span class="tracking-code">Waybill: ${trackingNumber}</span>
        </div>
      </div>

      <!-- Silk Mark Seal -->
      <div class="silk-seal">
        <strong style="color: #926d0b; font-size: 13px;">👑 Silk Mark Organization Certified Pure Silk</strong>
        <p class="silk-seal-text" style="margin: 4px 0 0;">
          Every yarn is laboratory-tested for 100% pure mulberry silk and authentic zari. Your heirloom parcel contains the official tamper-proof authentication certificate.
        </p>
      </div>

      <!-- Concierge & Care -->
      <div class="help-box">
        <strong>Need Assistance with Saree Drapery, Blouse Stitching, or Delivery?</strong><br>
        Our dedicated styling concierge desk is at your service 7 days a week (9 AM – 9 PM IST):<br>
        📞 Telephone: <strong>+91 77268 74080</strong> &nbsp;|&nbsp; 
        💬 WhatsApp: <strong>+91 77268 74080</strong> &nbsp;|&nbsp; 
        ✉️ Email: <strong>samargarg019@gmail.com</strong>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <p style="margin: 0 0 8px;">
        © 2026 SHYN Haute Couture &amp; Heritage Atelier. All rights reserved.<br>
        Grand Heritage Arcade, MG Boulevard, Bengaluru, Karnataka 560001
      </p>
      <div class="footer-links">
        <a href="#track">Live Tracking</a> • 
        <a href="#care">Silk Care Guide</a> • 
        <a href="#concierge">Styling Desk</a> • 
        <a href="#terms">Patron Terms</a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Dispatches automated order confirmation email to the customer.
 * Supports both Node.js Express backend (/api/send-order-email) and frontend local outbox storage.
 */
export async function sendOrderConfirmationEmail(order) {
  if (!order) return { success: false, error: 'No order provided' };

  const customerEmail = order.shippingAddress?.email || (typeof order.customer === 'object' ? order.customer?.email : order.email) || 'customer@heritage.in';
  const customerName = order.shippingAddress?.name || (typeof order.customer === 'object' ? order.customer?.name : order.customer) || 'Valued Patron';
  const subject = `👑 Order Confirmed: ${order.id} | SHYN Haute Couture Atelier`;
  const html = generateOrderEmailHtml(order);

  const emailRecord = {
    id: `MAIL-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    orderId: order.id,
    to: customerEmail,
    recipientName: customerName,
    subject,
    html,
    sentAt: new Date().toISOString(),
    status: 'Delivered',
    provider: 'SHYN Automated Dispatcher'
  };

  // 1. Save to client-side Sent Mail Outbox
  try {
    const existing = JSON.parse(localStorage.getItem('as_sent_emails') || '[]');
    const updated = [emailRecord, ...existing.filter(e => e.orderId !== order.id)];
    localStorage.setItem('as_sent_emails', JSON.stringify(updated.slice(0, 50)));
  } catch (err) {
    console.warn('Could not store email in localStorage:', err);
  }

  // 2. Push to backend API if available
  let backendSuccess = false;
  try {
    // Try current host or localhost:3000
    const endpoints = ['/api/send-order-email', 'http://localhost:3000/api/send-order-email'];
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: customerEmail,
            subject,
            html,
            orderId: order.id,
            customerName
          })
        });
        if (response.ok) {
          backendSuccess = true;
          break;
        }
      } catch {
        // Continue to next endpoint if this one is unreachable
      }
    }
  } catch (err) {
    console.info('Backend email service not reachable, frontend simulated dispatch confirmed:', err);
  }

  return {
    success: true,
    emailRecord,
    customerEmail,
    customerName,
    subject,
    backendPushed: backendSuccess
  };
}

/**
 * Retrieves all sent emails from outbox.
 */
export function getSentEmails() {
  try {
    return JSON.parse(localStorage.getItem('as_sent_emails') || '[]');
  } catch {
    return [];
  }
}

/**
 * Retrieves sent email for a specific order ID.
 */
export function getSentEmailForOrder(orderId) {
  const emails = getSentEmails();
  return emails.find(e => e.orderId === orderId) || null;
}
