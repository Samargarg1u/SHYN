/* =========================================================
   SHYN Coupon Engine & Promotion Data
   ========================================================= */

export const COUPONS = {
  "ROYAL10": {
    code: "ROYAL10",
    type: "percent",
    value: 10,
    minOrder: 500,
    desc: "10% Royal Privilege Discount on all handloom weaves & menswear"
  },
  "FIRSTWEAVE": {
    code: "FIRSTWEAVE",
    type: "fixed",
    value: 500,
    minOrder: 2000,
    desc: "Flat ₹500 Atelier Welcome Gift on purchases above ₹2,000"
  },
  "BRIDAL2026": {
    code: "BRIDAL2026",
    type: "percent",
    value: 15,
    minOrder: 4000,
    desc: "15% Exclusive Bridal Trousseau Discount on orders above ₹4,000"
  },
  "FREESHIP": {
    code: "FREESHIP",
    type: "fixed",
    value: 99,
    minOrder: 500,
    desc: "Complimentary Insured Express Doorstep Delivery"
  },
  "SHYN10": {
    code: "SHYN10",
    type: "percent",
    value: 10,
    minOrder: 500,
    desc: "10% Instant Discount on all haute couture items"
  },
  "SHYN20": {
    code: "SHYN20",
    type: "percent",
    value: 20,
    minOrder: 3000,
    desc: "20% Exclusive Member Discount on orders above ₹3,000"
  },
  "FESTIVE500": {
    code: "FESTIVE500",
    type: "fixed",
    value: 500,
    minOrder: 2500,
    desc: "Flat ₹500 Royal Festive Off on orders above ₹2,500"
  }
};

export function calculateDiscount(coupon, subtotal) {
  if (!coupon || subtotal < coupon.minOrder) return 0;
  if (coupon.type === "percent") {
    return Math.round((subtotal * coupon.value) / 100);
  }
  if (coupon.type === "fixed") {
    return Math.min(coupon.value, subtotal);
  }
  return 0;
}
