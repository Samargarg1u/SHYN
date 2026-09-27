/**
 * SHYN Haute Couture & Heritage Atelier
 * Royal Tax Invoice & Certificate of Authenticity Generator
 * Generates an official, print-ready luxury tax receipt and triggers PDF download.
 */

export function printTaxInvoice(order) {
  if (!order) return;

  const invoiceWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!invoiceWindow) {
    alert('Please allow popups to download your tax invoice.');
    return;
  }

  const orderId = String(order.id || 'SHYN-1001');
  const invoiceNumber = `INV-${orderId.replace('SHYN-', '')}-${new Date().getFullYear()}`;
  const invoiceDate = order.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const items = Array.isArray(order.items) ? order.items : [];
  const shippingAddress = order.shippingAddress || (typeof order.customer === 'object' ? order.customer : { name: String(order.customer || 'Valued Patron') }) || {};
  const isGift = Boolean(order.isGift);
  const giftMessage = order.giftMessage || '';
  const giftCost = isGift ? 150 : 0;
  const subtotal = Number(order.subtotal) || items.reduce((s, it) => s + (Number(it?.price) || 0) * (Number(it?.quantity || it?.qty) || 1), 0);
  const discount = Number(order.discount) || 0;
  const shipping = Number(order.shipping) || 0;
  const grandTotal = Number(order.grandTotal || order.total) || Math.max(0, subtotal - discount + shipping + giftCost);

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tax Invoice - ${order.id} | SHYN Haute Couture</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 15mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1a1514;
      background: #ffffff;
      padding: 30px;
      line-height: 1.5;
      font-size: 13px;
    }
    .invoice-wrapper {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #d4af37;
      padding: 36px 40px;
      background: #ffffff;
      position: relative;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .invoice-inner-border {
      position: absolute;
      top: 6px;
      left: 6px;
      right: 6px;
      bottom: 6px;
      border: 1px dashed rgba(201, 162, 74, 0.5);
      pointer-events: none;
    }
    .header-table {
      width: 100%;
      margin-bottom: 24px;
      border-bottom: 2px solid #f2e9dc;
      padding-bottom: 20px;
    }
    .brand-col {
      vertical-align: top;
      width: 55%;
    }
    .invoice-col {
      vertical-align: top;
      text-align: right;
      width: 45%;
    }
    .brand-crest {
      font-family: 'Cinzel', serif;
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 5px;
      color: #081226;
      margin-bottom: 4px;
    }
    .brand-crest span {
      color: #c9a24a;
    }
    .brand-tagline {
      font-size: 10px;
      letter-spacing: 2px;
      color: #7b112b;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .atelier-address {
      font-size: 11.5px;
      color: #5d5150;
      line-height: 1.4;
    }
    .invoice-title {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      color: #7b112b;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .meta-box {
      font-size: 12px;
      color: #3e3230;
      line-height: 1.6;
    }
    .meta-box strong {
      color: #081226;
    }
    .billing-grid {
      width: 100%;
      margin-bottom: 24px;
    }
    .billing-col {
      width: 50%;
      vertical-align: top;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #7b112b;
      margin-bottom: 8px;
      border-bottom: 1px solid #ebd9c8;
      padding-bottom: 3px;
      display: inline-block;
    }
    .customer-details p {
      font-size: 12.5px;
      color: #2b2322;
      line-height: 1.45;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .items-table th {
      background: #081226;
      color: #c9a24a;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      text-align: left;
    }
    .items-table td {
      padding: 12px;
      border-bottom: 1px solid #ebd9c8;
      font-size: 12.5px;
      color: #2e2625;
    }
    .item-name {
      font-weight: 600;
      color: #081226;
    }
    .item-meta {
      font-size: 11px;
      color: #7b6f6e;
    }
    .text-right {
      text-align: right;
    }
    .text-center {
      text-align: center;
    }
    .calculation-grid {
      width: 100%;
      margin-bottom: 24px;
    }
    .gift-note-col {
      width: 55%;
      vertical-align: top;
      padding-right: 20px;
    }
    .calc-col {
      width: 45%;
      vertical-align: top;
    }
    .gift-box-preview {
      background: #fffbf2;
      border: 1px solid #d4af37;
      border-radius: 8px;
      padding: 12px 14px;
    }
    .gift-box-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #7b112b;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .gift-box-msg {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 12.5px;
      color: #3b2c1e;
      line-height: 1.4;
    }
    .calc-table {
      width: 100%;
      border-collapse: collapse;
    }
    .calc-table td {
      padding: 6px 0;
      font-size: 12.5px;
      color: #4a3e3d;
    }
    .calc-table .grand-total-row td {
      border-top: 2px solid #7b112b;
      padding-top: 10px;
      font-size: 16px;
      font-weight: 800;
      color: #7b112b;
    }
    .silk-mark-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #fdf8f0;
      border: 1px solid #d4af37;
      border-radius: 6px;
      padding: 8px 12px;
      margin-top: 12px;
    }
    .silk-mark-badge strong {
      color: #7b112b;
      font-size: 11.5px;
    }
    .footer-terms {
      border-top: 1px solid #ebd9c8;
      padding-top: 14px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 10.5px;
      color: #7c706e;
    }
    .seal-box {
      text-align: center;
    }
    .seal-stamp {
      display: inline-block;
      border: 2px solid #7b112b;
      color: #7b112b;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      font-weight: 700;
      padding: 6px 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
      border-radius: 4px;
    }
    .print-bar {
      text-align: center;
      margin-bottom: 18px;
    }
    .print-btn {
      background: #7b112b;
      color: #ffffff;
      border: 1px solid #d4af37;
      padding: 10px 24px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(123, 17, 43, 0.25);
    }
    .print-btn:hover {
      background: #081226;
    }
    @media print {
      .print-bar {
        display: none !important;
      }
      body {
        padding: 0;
        background: transparent;
      }
      .invoice-wrapper {
        border: none;
        box-shadow: none;
        padding: 0;
      }
      .invoice-inner-border {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">
      🖨️ Print / Save Tax Invoice as PDF
    </button>
  </div>

  <div class="invoice-wrapper">
    <div class="invoice-inner-border"></div>

    <table class="header-table">
      <tr>
        <td class="brand-col">
          <div class="brand-crest">SHYN <span>ATELIER</span></div>
          <div class="brand-tagline">Haute Couture &amp; Generational Heritage Handlooms</div>
          <div class="atelier-address">
            Grand Heritage Arcade, MG Boulevard, Bengaluru - 560001<br>
            GSTIN: 29AABCU9603R1ZX • CIN: U17120KA2026PTC049210<br>
            Concierge: +91 77268 74080 • samargarg019@gmail.com
          </div>
        </td>
        <td class="invoice-col">
          <div class="invoice-title">ORIGINAL TAX INVOICE</div>
          <div class="meta-box">
            <strong>Invoice No:</strong> ${invoiceNumber}<br>
            <strong>Order Reference:</strong> ${order.id}<br>
            <strong>Invoice Date:</strong> ${invoiceDate}<br>
            <strong>Payment Mode:</strong> ${order.paymentMethod || 'Prepaid Electronic'}<br>
            <strong>Status:</strong> <span style="color: #2e7d32; font-weight: 700;">Paid / Confirmed</span>
          </div>
        </td>
      </tr>
    </table>

    <table class="billing-grid">
      <tr>
        <td class="billing-col">
          <div class="section-title">Billed &amp; Delivered To</div>
          <div class="customer-details">
            <p><strong>${shippingAddress.name || 'Valued Patron'}</strong></p>
            <p>${shippingAddress.address || 'Heritage Boulevard'}</p>
            <p>${shippingAddress.city || 'Bengaluru'}, ${shippingAddress.state || 'Karnataka'} - ${shippingAddress.pincode || '560001'}</p>
            <p><strong>Phone:</strong> +91 ${shippingAddress.phone || '7726874080'}</p>
            <p><strong>Email:</strong> ${shippingAddress.email || 'customer@heritage.in'}</p>
          </div>
        </td>
        <td class="billing-col" style="text-align: right;">
          <div class="section-title">Certification of Authenticity</div>
          <div class="silk-mark-badge" style="text-align: left; float: right;">
            <div>
              <strong>👑 Silk Mark Organization Certified</strong><br>
              <span style="font-size: 11px; color: #554846;">Every handloom warp &amp; weft is tested for pure mulberry silk &amp; genuine gold zari.</span>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <table class="items-table">
      <thead>
        <tr>
          <th style="width: 5%;">#</th>
          <th style="width: 45%;">Item Description &amp; Weave</th>
          <th style="width: 18%;" class="text-center">Color Variant</th>
          <th style="width: 10%;" class="text-center">Qty</th>
          <th style="width: 11%;" class="text-right">Unit Rate</th>
          <th style="width: 11%;" class="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((it, idx) => {
          const qty = Number(it?.quantity || it?.qty || 1);
          const price = Number(it?.price || 0);
          return `
          <tr>
            <td class="text-center">${idx + 1}</td>
            <td>
              <div class="item-name">${it?.name || 'Haute Couture Product'}</div>
              <div class="item-meta">${it?.category || 'Haute Couture'} • HSN: 5007 / 6205</div>
            </td>
            <td class="text-center">${it?.selectedColor || 'Standard'}</td>
            <td class="text-center">${qty}</td>
            <td class="text-right">₹${price.toLocaleString('en-IN')}</td>
            <td class="text-right"><strong>₹${(price * qty).toLocaleString('en-IN')}</strong></td>
          </tr>
        `;
        }).join('')}
      </tbody>
    </table>

    <table class="calculation-grid">
      <tr>
        <td class="gift-note-col">
          ${isGift ? `
            <div class="gift-box-preview">
              <div class="gift-box-title">🎁 Royal Heirloom Gift Packaging Included</div>
              <p style="font-size: 11px; color: #6a5e5c; margin-bottom: 6px;">Packed in royal velvet casket with sealed monogram card:</p>
              <div class="gift-box-msg">"${giftMessage || 'With heartfelt wishes and timeless elegance.'}"</div>
            </div>
          ` : `
            <div style="background: #fbf7f2; border: 1px solid #ebd9c8; border-radius: 8px; padding: 12px; font-size: 11px; color: #6a5e5c;">
              <strong>Atelier Quality Guarantee:</strong><br>
              Inspected under 100-point handloom verification. 7-Day Doorstep Exchange &amp; Return assistance available via concierge.
            </div>
          `}
        </td>
        <td class="calc-col">
          <table class="calc-table">
            <tr>
              <td>Items Subtotal</td>
              <td class="text-right">₹${subtotal.toLocaleString('en-IN')}</td>
            </tr>
            ${discount > 0 ? `
              <tr style="color: #2e7d32;">
                <td>Promo Discount (${order.appliedCoupon?.code || 'COUPON'})</td>
                <td class="text-right">− ₹${discount.toLocaleString('en-IN')}</td>
              </tr>
            ` : ''}
            ${isGift ? `
              <tr>
                <td>Royal Heirloom Packaging &amp; Card</td>
                <td class="text-right">₹${giftCost.toLocaleString('en-IN')}</td>
              </tr>
            ` : ''}
            <tr>
              <td>Insured Doorstep Shipping</td>
              <td class="text-right">${shipping === 0 ? '<strong style="color: #2e7d32;">FREE</strong>' : `₹${shipping}`}</td>
            </tr>
            <tr class="grand-total-row">
              <td>Grand Total (Incl. Taxes)</td>
              <td class="text-right">₹${grandTotal.toLocaleString('en-IN')}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div class="footer-terms">
      <div>
        <p>• This is a computer-generated tax invoice and requires no physical seal.</p>
        <p>• Thank you for patronizing India's traditional artisan handloom weavers.</p>
      </div>
      <div class="seal-box">
        <div class="seal-stamp">SHYN AUTHENTICITY ASSURED</div>
        <div style="font-size: 10px; color: #5a4b49;">Master Weaver Atelier Seal</div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      // Auto trigger print dialog after document is fully rendered
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;

  invoiceWindow.document.open();
  invoiceWindow.document.write(htmlContent);
  invoiceWindow.document.close();
}
