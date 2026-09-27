# SHYN — Luxury Ethnic Sarees & Sartorial Menswear
> **College Minor Project — Full Stack Modern React 19 & Vite E-Commerce Web Application**

---

## 📌 Project Overview
**SHYN** is a web-based e-commerce platform designed for ethnic sarees (Banarasi, Kanjivaram, Handloom, Organza) and executive menswear. The project has been fully migrated to **React 19** using modern **react.dev** architectural standards, component composition, custom hooks, and Vite for ultra-fast hot module replacement (HMR) and production builds.

The platform features dynamic collection browsing, real-time search & sorting, customer wishlists, promo code discounts, dual-mode checkout (Cash on Delivery & Online Razorpay/UPI), live order tracking timeline, customer concierge assistance, authentic patron reviews, and a permanent Sapphire Gold luxury login gate with interactive canvas particle physics.

---

## 🚀 Modern React Component Architecture (`src/`)

Built strictly adhering to **react.dev** best practices:
- **Component Decomposition:** Single-responsibility, reusable components with clean props & callbacks.
- **Derived State with `useMemo`:** Dynamic sorting, gender selection, search querying, and category filtering computed without redundant state duplication.
- **Custom Hook `useLocalStorage`:** Automatic, synchronized persistence for cart, wishlist, orders, and authentication across browser sessions.
- **Pure Rendering & Lifecycle Effects:** Animation frames, spotlight tracking, and canvas effects isolated cleanly in `useEffect` with comprehensive teardown handlers.

### Key Components:
1. `SiteLoginGate.jsx` — Permanent Sapphire Gold luxury gate with interactive HTML5 zari canvas, cursor spotlight, 3D card tilt, and 1-click quick demo login.
2. `Header.jsx` — Haute couture navigation, brand seal, live search, gender tabs (Women / Men), and badged action triggers.
3. `HeroBanner.jsx` — Dynamic collection hero section with gold gradient typography, CTAs, and trust metrics.
4. `TrustBadges.jsx` — Silk Mark, insured delivery, 7-day returns, and 24/7 concierge cards.
5. `CategoryFilters.jsx` — Filter pills, sort selector (Featured, Price, Rating, Discount), and in-stock checkbox.
6. `ProductCard.jsx` & `ProductList.jsx` — Luxury cards with photo hover zoom, discount badges, color variant dots, wishlist heart, and quick bag addition.
7. `ProductDetailModal.jsx` — High-resolution multi-angle gallery with color variant switching, fabric specifications, PIN code delivery estimator, and instant checkout.
8. `CartDrawer.jsx` — Slide-over drawer with itemized thumbnails, quantity modifiers, coupon code engine (`SHYN10`, `SHYN20`, `FESTIVE500`, `WELCOME50`), and checkout calculation.
9. `CheckoutModal.jsx` — Multi-step checkout (Shipping Address ➔ Razorpay / Cash on Delivery ➔ Order Confirmation with celebratory confetti).
10. `OrderTrackingModal.jsx` — Live delivery timeline stepper with Order ID search and package contents.
11. `CustomerAssistanceModal.jsx` — 24/7 Concierge with telephone hotline, email, WhatsApp chat, interactive inquiry form, and FAQ accordion.
12. `WishlistModal.jsx` — Saved creations manager with one-click "Move to Bag".
13. `ReviewsSection.jsx` — Patron reviews with verified buyer badges and interactive review submission.
14. `Footer.jsx` — Atelier footer with newsletter subscription and heritage links.
15. `MobileBottomBar.jsx` — Native-feel bottom app bar for smartphone screens.
16. `Toast.jsx` — Non-intrusive animated action notifications.

---

## 🛠️ Technology Stack
- **Frontend Framework:** React 19 (`react`, `react-dom`)
- **Build Tool & Bundler:** Vite 6 (`@vitejs/plugin-react`)
- **Icons & Effects:** Lucide React (`lucide-react`), Canvas Confetti (`canvas-confetti`)
- **Styling:** Modular CSS Variables, CSS Grid, Flexbox, Glassmorphism, 3D Parallax Tilt
- **Backend (Optional API):** Node.js 20+, Express.js, Razorpay Node SDK
- **Data & Storage:** HTML5 Web Storage API (`localStorage`), JSON data models

---

## 💻 How to Run the Project

### 1. Start the React Development Server (Vite)
Open your terminal in the project directory and run:
```bash
npm run dev
```
Open your browser at the displayed local URL (typically `http://localhost:5173`). Enjoy instant Hot Module Replacement (HMR)!

### 2. Build for Production
To generate the optimized production bundle:
```bash
npm run build
```
The output will be placed in the `dist/` directory.

### 3. Run Production Server (Express + React)
```bash
npm run server
```
This serves the compiled React app alongside the Razorpay backend API at `http://localhost:3000`.

---

> **Note:** The original vanilla HTML/JS/CSS files have been safely backed up in the `vanilla-backup/` directory for historical reference.
