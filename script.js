/* =========================================================
   SHYN — Clothing & Style (Minor Project)
   Core Application Engine & State Management
   ========================================================= */

// --- Demo Catalog Initializer ---
const demo = [
  {
    id: 1,
    gender: "Women",
    name: "Banarasi Silk Zari Saree",
    category: "Banarasi",
    price: 3499,
    original: 4999,
    stock: 12,
    rating: 4.6,
    reviews: 186,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Maroon", "Gold", "Royal Blue"],
    desc: "Exquisite Banarasi silk saree with intricate golden zari weaving, heavy pallu, and festive border. Comes with an unstitched blouse piece (0.8m)."
  },
  {
    id: 2,
    gender: "Women",
    name: "Pure Cotton Handloom Saree",
    category: "Cotton",
    price: 1899,
    original: 2499,
    stock: 20,
    rating: 4.3,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1663475928660-7afa0461b005?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Indigo", "Mustard Yellow", "Forest Green"],
    desc: "Lightweight and breathable pure organic cotton handloom saree. Perfect for daily office elegance and warm weather comfort."
  },
  {
    id: 3,
    gender: "Women",
    name: "Designer Wedding Saree",
    category: "Wedding",
    price: 5999,
    original: 7999,
    stock: 7,
    rating: 4.8,
    reviews: 241,
    image: "https://images.unsplash.com/photo-1770748147161-b2d41e21058b?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1770748147161-b2d41e21058b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1783495696062-48c44e2eea95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1667053312811-6594186d37ca?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Crimson Red", "Burgundy", "Emerald Green"],
    desc: "Showstopper bridal and wedding collection saree featuring heavy embroidery, stone embellishments, and an opulent border drape."
  },
  {
    id: 4,
    gender: "Women",
    name: "Kanjivaram Silk Saree",
    category: "Silk",
    price: 7499,
    original: 9999,
    stock: 5,
    rating: 4.7,
    reviews: 137,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Deep Purple", "Teal", "Golden Mustard"],
    desc: "Authentic South Indian Kanjivaram silk saree made from pure mulberry silk with rich contrast temple motifs and lustrous finish."
  },
  {
    id: 5,
    gender: "Women",
    name: "Party Wear Organza Saree",
    category: "Party Wear",
    price: 2899,
    original: 3999,
    stock: 10,
    rating: 4.4,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1775486101691-709191f1228e?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1775486101691-709191f1228e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1752469126219-f3771bdd2400?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1752469113412-cb988552e387?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Powder Pink", "Lilac", "Sky Blue"],
    desc: "Modern sheer organza saree with delicate digital floral prints and a scalloped lace border. Featherlight and effortlessly chic for receptions."
  },
  {
    id: 6,
    gender: "Women",
    name: "Floral Designer Saree",
    category: "Designer",
    price: 3199,
    original: 4499,
    stock: 15,
    rating: 4.5,
    reviews: 318,
    image: "https://images.unsplash.com/photo-1634651462912-d2d519c68e26?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1634651462912-d2d519c68e26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1752469113412-cb988552e387?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1775486101691-709191f1228e?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Navy Blue", "Wine Red", "White Floral"],
    desc: "Flowing designer saree with delicate floral motifs and graceful fall. Elegant drape that flatters all body types."
  },
  {
    id: 7,
    gender: "Women",
    name: "Bridal Red Silk Saree",
    category: "Wedding",
    price: 8499,
    original: 10999,
    stock: 4,
    rating: 4.9,
    reviews: 205,
    image: "https://images.unsplash.com/photo-1783495696062-48c44e2eea95?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1783495696062-48c44e2eea95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Sindoor Red", "Maroon"],
    desc: "A timeless heritage bridal masterpiece woven with real gold-plated silver thread motifs for auspicious celebrations."
  },
  {
    id: 8,
    gender: "Women",
    name: "Soft Linen Saree",
    category: "Cotton",
    price: 2199,
    original: 2999,
    stock: 18,
    rating: 4.2,
    reviews: 61,
    image: "https://images.unsplash.com/photo-1663475928660-7afa0461b005?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1663475928660-7afa0461b005?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Beige", "Olive Green", "Rust"],
    desc: "Pure breathable soft linen saree with delicate handwoven texture and tassel pallu. High comfort for all-day wear."
  },
  {
    id: 9,
    gender: "Men",
    name: "Classic Formal Shirt",
    category: "Formal Shirts",
    price: 1499,
    original: 2199,
    stock: 16,
    rating: 4.5,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["White", "Sky Blue", "Navy Blue"],
    desc: "Crisp 100% Egyptian cotton formal shirt tailored for executive boardroom polish and breathability."
  },
  {
    id: 10,
    gender: "Men",
    name: "Tailored Formal Pants",
    category: "Formal Pants",
    price: 1899,
    original: 2699,
    stock: 12,
    rating: 4.4,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Charcoal Grey", "Jet Black", "Navy Blue"],
    desc: "Wrinkle-resistant tailored trousers with flexible waistband and clean front pleats for corporate comfort."
  },
  {
    id: 11,
    gender: "Men",
    name: "Everyday Straight Trousers",
    category: "Trousers",
    price: 1699,
    original: 2399,
    stock: 14,
    rating: 4.3,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Khaki", "Olive", "Navy Blue"],
    desc: "Versatile straight-fit stretch cotton chinos. Pairs effortlessly with shirts, polos, and casual tees."
  },
  {
    id: 12,
    gender: "Men",
    name: "Tapered Casual Joggers",
    category: "Joggers",
    price: 1299,
    original: 1899,
    stock: 18,
    rating: 4.6,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black", "Heather Grey", "Navy Blue"],
    desc: "Soft brushed-fleece cotton joggers with ribbed cuffs and secure zippered side pockets."
  },
  {
    id: 13,
    gender: "Men",
    name: "Essential Cotton T-Shirt",
    category: "T-Shirts",
    price: 799,
    original: 1199,
    stock: 24,
    rating: 4.5,
    reviews: 103,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1663475928660-7afa0461b005?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["White", "Black", "Maroon", "Olive"],
    desc: "Premium heavyweight Supima cotton crew-neck tee made for lasting shape, zero shrinkage, and supreme softness."
  }
];

// --- Coupon Engine Definitions ---
const COUPONS = {
  "SHYN10": { type: "percent", value: 10, minOrder: 500, desc: "10% Instant Discount on all orders" },
  "SHYN20": { type: "percent", value: 20, minOrder: 3000, desc: "20% Off on orders above ₹3,000" },
  "FESTIVE500": { type: "fixed", value: 500, minOrder: 2500, desc: "Flat ₹500 Off on orders above ₹2,500" },
  "WELCOME50": { type: "fixed", value: 150, minOrder: 999, desc: "Flat ₹150 Off for welcome purchase" }
};

// --- Application State & Auto-Migration ---
const CATALOG_SYNC_VERSION = "shyn_v4_color_variants";
let products = JSON.parse(localStorage.getItem("as_products") || "null");

if (!products || !products.length || localStorage.getItem("as_img_version") !== CATALOG_SYNC_VERSION) {
  // Sync exact matching images to all products in localStorage
  if (products && products.length) {
    products = products.map(p => {
      const match = demo.find(d => d.id === p.id);
      if (match) {
        return {
          ...p,
          name: match.name,
          category: match.category,
          image: match.image,
          photos: match.photos,
          colors: match.colors
        };
      }
      return p;
    });
  } else {
    products = [...demo];
  }
  localStorage.setItem("as_products", JSON.stringify(products));
  localStorage.setItem("as_img_version", CATALOG_SYNC_VERSION);
}

let cart = JSON.parse(localStorage.getItem("as_cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("as_wishlist") || "[]");
let orders = JSON.parse(localStorage.getItem("as_orders") || "[]");

let selectedGender = "Women";
let filter = "All";
let searchQuery = "";
let currentSort = "featured";
let inStockOnly = false;
let appliedCoupon = null;

let activeCheckoutContext = null; // Holds items currently being purchased

// --- Toast Notification System ---
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- Navigation & Auth UI ---
function updateAccountDisplay() {
  const logged = localStorage.getItem("as_logged_in") === "true";
  const name = localStorage.getItem("as_name") || "Guest";
  const email = localStorage.getItem("as_user") || "";
  const g = document.getElementById("accountGreeting");
  const l = document.getElementById("accountLabel");
  const mn = document.getElementById("menuName");
  const me = document.getElementById("menuEmail");
  const adminLink = document.getElementById("menuAdminLink");
  const isAdmin = logged && email.toLowerCase().includes("admin");

  if (adminLink) {
    adminLink.style.display = isAdmin ? "block" : "none";
  }

  if (!g) return;
  if (logged) {
    if (isAdmin) {
      g.textContent = `🛡️ Admin (${name.split(" ")[0]})`;
      l.textContent = "Store Controls ▾";
      if (mn) mn.textContent = `${name} (Administrator)`;
    } else {
      g.textContent = `Hello, ${name.split(" ")[0]}`;
      l.textContent = "My Account ▾";
      if (mn) mn.textContent = name;
    }
    if (me) me.textContent = email;
  } else {
    g.textContent = "👤 Welcome";
    l.textContent = "Sign in ▾";
    if (mn) mn.textContent = "Guest Account";
    if (me) me.textContent = "Sign in to track orders";
  }
}

function openAccountMenu() {
  updateAccountDisplay();
  document.getElementById("accountMenu").classList.toggle("open");
}

function closeAccountMenu() {
  document.getElementById("accountMenu").classList.remove("open");
}

document.addEventListener("click", (e) => {
  const accountBtn = document.getElementById("accountBtn");
  const menu = document.getElementById("accountMenu");
  if (menu && accountBtn && !accountBtn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("open");
  }
});

// --- Site Login Gate ---
// --- Login Gate & Authentication Operations ---
function enterStore() {
  const emailInput = document.getElementById("gateEmail");
  const passInput = document.getElementById("gatePassword");
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passInput ? passInput.value : "";
  
  if (!email || !password) {
    showToast("⚠️ Please enter your email/mobile and password.", "error");
    return;
  }
  
  const displayName = email.includes("@") ? email.split("@")[0] : (email || "Customer");
  localStorage.setItem("as_logged_in", "true");
  localStorage.setItem("as_user", email);
  localStorage.setItem("as_name", displayName);
  document.getElementById("siteLoginGate").style.display = "none";
  updateAccountDisplay();
  showToast(`✨ Welcome to SHYN Atelier, ${displayName}!`, "success");
  fireCelebrationConfetti();
}

function quickFillGate(role) {
  const emailInput = document.getElementById("gateEmail");
  const passInput = document.getElementById("gatePassword");
  if (!emailInput || !passInput) return;
  
  if (role === "admin") {
    emailInput.value = "admin@shyn.in";
    passInput.value = "admin2026";
    showToast("Filled Store Admin credentials. Logging in...", "info");
  } else {
    emailInput.value = "aditi@shyn.in";
    passInput.value = "shyn2026";
    showToast("Filled Customer Demo credentials. Logging in...", "info");
  }
  setTimeout(() => enterStore(), 250);
}

function quickFillModal(role) {
  const emailInput = document.getElementById("loginEmail");
  const passInput = document.getElementById("loginPassword");
  if (!emailInput || !passInput) return;
  
  if (role === "admin") {
    emailInput.value = "admin@shyn.in";
    passInput.value = "admin2026";
    showToast("Filled Store Admin credentials. Signing in...", "info");
  } else {
    emailInput.value = "aditi@shyn.in";
    passInput.value = "shyn2026";
    showToast("Filled Customer Demo credentials. Signing in...", "info");
  }
  setTimeout(() => loginUser(), 250);
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    if (btn) btn.textContent = "🙈";
  } else {
    input.type = "password";
    if (btn) btn.textContent = "👁️";
  }
}

function skipLogin() {
  document.getElementById("siteLoginGate").style.display = "none";
  showToast("Browsing SHYN catalog as Guest.", "info");
}

function openLoginFromGate() {
  document.getElementById("siteLoginGate").style.display = "none";
  openLogin();
}

// --- Interactive Login Background & 3D Tilt Engine ---
let gateAnimationId = null;
let gateParticles = [];
let gateSparks = [];
const gateThemeColors = {
  crimson: ['#d4af37', '#fce8bb', '#e6a15c', '#ffd275', '#ffffff'],
  midnight: ['#d4af37', '#8bb4f8', '#c2e0ff', '#f5d77f', '#ffffff'],
  emerald: ['#d4af37', '#69f0ae', '#b9f6ca', '#fce8bb', '#ffffff'],
  amber: ['#ffd275', '#f3e5ab', '#ffb74d', '#ffffff', '#e8c07d']
};

function getActiveGatePalette() {
  return gateThemeColors.midnight;
}

function spawnGateSparks(x, y, count = 22) {
  const palette = getActiveGatePalette();
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4.5 + 1.5;
    gateSparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 2.8 + 1.2,
      color: palette[Math.floor(Math.random() * palette.length)],
      life: 1.0,
      decay: Math.random() * 0.025 + 0.02
    });
  }
}

function initLoginInteractiveBackground() {
  const gate = document.getElementById("siteLoginGate");
  const canvas = document.getElementById("gateInteractiveCanvas");
  const spotlight = document.getElementById("gateCursorSpotlight");
  if (!gate || !canvas) return;

  const card = gate.querySelector(".site-login-card");
  const glow1 = gate.querySelector(".glow-1");
  const glow2 = gate.querySelector(".glow-2");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.removeEventListener("resize", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);

  // Initialize floating golden zari particles
  const numParticles = Math.min(65, Math.floor((width * height) / 18000));
  gateParticles = [];
  const palette = getActiveGatePalette();
  for (let i = 0; i < numParticles; i++) {
    gateParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.45 + 0.2),
      radius: Math.random() * 2.2 + 1.0,
      baseAlpha: Math.random() * 0.45 + 0.3,
      alpha: 0.5,
      pulseAngle: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.01,
      color: palette[Math.floor(Math.random() * palette.length)]
    });
  }

  // Pointer position tracking
  const mouse = { x: -1000, y: -1000, active: false };

  function handlePointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    mouse.x = clientX;
    mouse.y = clientY;
    mouse.active = true;

    // 1. Move Cursor Spotlight
    if (spotlight) {
      spotlight.style.left = `${clientX}px`;
      spotlight.style.top = `${clientY}px`;
      spotlight.style.opacity = "1";
    }

    // 2. 3D Parallax Tilt on Card
    if (card) {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      const deltaX = (clientX - cardX) / (window.innerWidth / 2);
      const deltaY = (clientY - cardY) / (window.innerHeight / 2);
      const rotX = Math.max(-8, Math.min(8, -deltaY * 7));
      const rotY = Math.max(-8, Math.min(8, deltaX * 7));
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-2px)`;

      // Counter-parallax on ambient glow orbs
      if (glow1) glow1.style.transform = `translate(${deltaX * 30}px, ${deltaY * 30}px)`;
      if (glow2) glow2.style.transform = `translate(${-deltaX * 35}px, ${-deltaY * 35}px)`;
    }
  }

  function handlePointerLeave() {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
    if (spotlight) spotlight.style.opacity = "0";
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }
    if (glow1) glow1.style.transform = "translate(0, 0)";
    if (glow2) glow2.style.transform = "translate(0, 0)";
  }

  function handleGateClick(e) {
    if (e.target.closest("input, button, a, select, textarea")) return;
    const clickX = e.clientX || (e.touches && e.touches[0].clientX) || width / 2;
    const clickY = e.clientY || (e.touches && e.touches[0].clientY) || height / 2;
    spawnGateSparks(clickX, clickY, 26);
  }

  gate.onmousemove = handlePointerMove;
  gate.ontouchmove = handlePointerMove;
  gate.onmouseleave = handlePointerLeave;
  gate.ontouchend = handlePointerLeave;
  gate.onmousedown = handleGateClick;

  // Animation Loop
  function loop() {
    if (gate.style.display === "none") {
      gateAnimationId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Draw and update particles
    for (let i = 0; i < gateParticles.length; i++) {
      const p = gateParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulseAngle += p.pulseSpeed;
      p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.25;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Mouse interactive influence
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          p.x -= (dx / dist) * force * 1.6;
          p.y -= (dy / dist) * force * 1.6;

          // Connect cursor to particle with shimmering ray
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist / 130) * 0.35;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
      ctx.fill();

      // Constellation lines between nearby particles
      for (let j = i + 1; j < gateParticles.length; j++) {
        const p2 = gateParticles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 85) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist2 / 85) * 0.22;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // 2. Draw and update interactive click sparks
    for (let s = gateSparks.length - 1; s >= 0; s--) {
      const sp = gateSparks[s];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.08;
      sp.vx *= 0.96;
      sp.vy *= 0.96;
      sp.life -= sp.decay;

      if (sp.life <= 0) {
        gateSparks.splice(s, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.globalAlpha = sp.life;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    gateAnimationId = requestAnimationFrame(loop);
  }

  if (gateAnimationId) cancelAnimationFrame(gateAnimationId);
  gateAnimationId = requestAnimationFrame(loop);
}

// --- Permanent Sapphire Gold Login Theme Engine ---
function setLoginTheme(themeName) {
  initLoginTheme();
}

function initLoginTheme() {
  const gate = document.getElementById("siteLoginGate");
  if (gate) {
    gate.classList.remove("theme-crimson", "theme-emerald", "theme-amber");
    gate.classList.add("theme-midnight");
  }
  localStorage.setItem("shyn_login_theme", "midnight");
}

function showSiteLoginGate() {
  const gate = document.getElementById("siteLoginGate");
  initLoginTheme();
  if (localStorage.getItem("as_logged_in") === "true") {
    gate.style.display = "none";
  } else {
    gate.style.display = "flex";
    initLoginInteractiveBackground();
  }
}

// --- Login Modal Operations ---
function openLogin() {
  document.getElementById("loginModal").classList.add("open");
  const logged = localStorage.getItem("as_logged_in") === "true";
  if (logged) {
    document.getElementById("loginTitle").textContent = "Account Active";
    document.getElementById("loginForm").innerHTML = `
      <p style="text-align:center; color: #555; margin: 15px 0;">You are currently signed in as <b>${localStorage.getItem("as_user")}</b> (${localStorage.getItem("as_name") || "Member"}).</p>
      <button class="login-primary" onclick="logoutUser()">Sign Out</button>
    `;
  }
}

function closeLogin() {
  document.getElementById("loginModal").classList.remove("open");
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("forgotForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("loginTitle").textContent = "Create Account";
}

function showSignin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("forgotForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("loginTitle").textContent = "Welcome Back";
}

function showForgot(e) {
  if (e) e.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("forgotForm").style.display = "block";
  document.getElementById("loginTitle").textContent = "Reset Password";
}

function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value;
  if (!email || !pass) {
    showToast("⚠️ Please enter email/mobile and password.", "error");
    return;
  }
  const displayName = email.includes("@") ? email.split("@")[0] : email;
  localStorage.setItem("as_logged_in", "true");
  localStorage.setItem("as_user", email);
  if (!localStorage.getItem("as_name")) {
    localStorage.setItem("as_name", displayName);
  }
  closeLogin();
  updateAccountDisplay();
  showToast(`Signed in successfully! Welcome back, ${localStorage.getItem("as_name") || displayName}.`, "success");
  fireCelebrationConfetti();
}

function signupUser() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const mobile = document.getElementById("signupMobile").value.trim();
  const pass = document.getElementById("signupPassword").value;
  if (!name || !email || !mobile || !pass) {
    showToast("⚠️ Please fill all required fields.", "error");
    return;
  }
  localStorage.setItem("as_logged_in", "true");
  localStorage.setItem("as_user", email);
  localStorage.setItem("as_name", name);
  localStorage.setItem("as_phone", mobile);
  closeLogin();
  updateAccountDisplay();
  showToast(`Account created successfully! Welcome to SHYN, ${name}.`, "success");
  fireCelebrationConfetti();
}

function forgotPassword() {
  const email = document.getElementById("forgotEmail").value.trim();
  if (!email) {
    showToast("⚠️ Please enter your registered email address.", "error");
    return;
  }
  showToast(`✓ Password reset instructions sent to ${email}`, "info");
  showSignin();
}

function logoutUser() {
  localStorage.removeItem("as_logged_in");
  localStorage.removeItem("as_user");
  localStorage.removeItem("as_name");
  closeLogin();
  updateAccountDisplay();
  document.getElementById("siteLoginGate").style.display = "flex";
  document.getElementById("gateEmail").value = "";
  document.getElementById("gatePassword").value = "";
  showToast("Signed out successfully.");
}

// --- Collection & Product Filtering / Search / Sorting ---
function selectCollection(gender) {
  selectedGender = gender === "Men" ? "Men" : "Women";
  filter = "All";
  searchQuery = "";
  const sInput = document.getElementById("searchInput");
  if (sInput) sInput.value = "";

  const title = document.getElementById("collectionTitle");
  const tag = document.getElementById("collectionTag");
  const intro = document.getElementById("collectionIntro");

  if (title) title.textContent = selectedGender === "Men" ? "Men's Signature Collection" : "Women's Royal Saree Collection";
  if (tag) tag.textContent = selectedGender === "Men" ? "MEN'S EDIT" : "WOMEN'S EDIT";
  if (intro) intro.textContent = selectedGender === "Men" ? "Polished formalwear, relaxed essentials, and tailored everyday styles." : "Discover timeless silk, handloom, and bridal sarees curated by SHYN.";

  document.querySelectorAll("[data-collection]").forEach(el => {
    const active = el.dataset.collection === selectedGender;
    if (el.tagName === "BUTTON") {
      el.classList.toggle("active", active);
      el.setAttribute("aria-pressed", String(active));
    }
  });

  renderFilters();
  renderProducts();
}

function renderFilters() {
  const visible = products.filter(p => (p.gender || "Women") === selectedGender);
  const categories = ["All", ...new Set(visible.map(p => p.category))];
  if (!categories.includes(filter)) filter = "All";

  const container = document.getElementById("filters");
  if (!container) return;
  container.innerHTML = categories.map(c => `
    <button class="${filter === c ? 'active' : ''}" onclick="setFilter('${c}')">${c}</button>
  `).join("");
}

function setFilter(c) {
  filter = c;
  renderFilters();
  renderProducts();
}

function handleSearch(val) {
  searchQuery = (val || "").trim().toLowerCase();
  const clearBtn = document.getElementById("searchClear");
  if (clearBtn) clearBtn.style.display = searchQuery ? "block" : "none";
  renderProducts();
}

function clearSearch() {
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  handleSearch("");
}

function handleSort(sortVal) {
  currentSort = sortVal;
  renderProducts();
}

function toggleInStock(checked) {
  inStockOnly = checked;
  renderProducts();
}

// --- Product Color & Variant Helpers ---
function getProductColorImage(p, colorName, index = 0) {
  if (!p) return "";
  if (p.photos && p.photos.length) {
    if (colorName && p.colors && p.colors.length) {
      const idx = p.colors.findIndex(c => c.toLowerCase().trim() === colorName.toLowerCase().trim());
      if (idx !== -1 && p.photos[idx]) {
        return p.photos[idx];
      }
    }
    if (typeof index === "number" && p.photos[index]) {
      return p.photos[index];
    }
    return p.photos[0];
  }
  return p.image || "";
}

function changeCardColor(pid, colorName, imgUrl, el) {
  const card = el.closest(".card");
  if (!card) return;
  const imgEl = card.querySelector(".pic img");
  if (imgEl && imgUrl) {
    imgEl.src = imgUrl;
  }
  card.querySelectorAll(".card-swatch").forEach(s => s.classList.remove("active"));
  el.classList.add("active");
  const viewBtn = card.querySelector(".cardactions button.secondary");
  if (viewBtn) {
    viewBtn.setAttribute("onclick", `viewProduct(${pid}, '${colorName}')`);
  }
  const picEl = card.querySelector(".pic");
  if (picEl) {
    picEl.setAttribute("onclick", `viewProduct(${pid}, '${colorName}')`);
  }
  showToast(`Previewing ${colorName} edition`);
}

// --- Product Catalog Rendering ---
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  // 1. Filter by collection gender
  let list = products.filter(p => (p.gender || "Women") === selectedGender);

  // 2. Filter by category
  if (filter !== "All") {
    list = list.filter(p => p.category === filter);
  }

  // 3. Filter by search query
  if (searchQuery) {
    list = list.filter(p => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.desc || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      const colors = (p.colors || []).join(" ").toLowerCase();
      return name.includes(searchQuery) || desc.includes(searchQuery) || cat.includes(searchQuery) || colors.includes(searchQuery);
    });
  }

  // 4. Filter by stock
  if (inStockOnly) {
    list = list.filter(p => p.stock > 0);
  }

  // 5. Sort list
  if (currentSort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating-desc") {
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (currentSort === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (!list.length) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 45px 20px; background: #fff; border-radius: 12px; border: 1px dashed #ded3c9;">
        <h3 style="margin: 0 0 8px; color: var(--maroon);">No products found</h3>
        <p style="color: var(--muted); margin: 0 0 16px;">Try adjusting your search terms or filters.</p>
        <button class="primary" onclick="clearSearch(); setFilter('All');">Clear All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(p => {
    const isWish = wishlist.includes(p.id);
    const discount = p.original && p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0;
    const thumbImg = p.image || (p.photos && p.photos.length ? p.photos[0] : "");

    return `
      <div class="card">
        <button class="card-wish-btn ${isWish ? 'active' : ''}" title="${isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
          ${isWish ? '♥' : '♡'}
        </button>
        <div class="pic" style="cursor: pointer;" onclick="viewProduct(${p.id})">
          ${thumbImg ? `<img src="${thumbImg}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('image-error');">` : ''}
          <span class="image-fallback">SHYN</span>
        </div>
        <div class="cardbody">
          <div class="tag">${p.category}</div>
          <div class="name">${p.name}</div>
          <div class="rating-badge">★ ${(p.rating || 4.2).toFixed(1)} <small>(${p.reviews || 84})</small></div>
          ${p.colors && p.colors.length ? `
            <div class="card-swatches" title="Available colour variants (click to preview)">
              ${p.colors.map((c, i) => {
                const cImg = getProductColorImage(p, c, i);
                return `
                  <span class="card-swatch ${i === 0 ? 'active' : ''}" 
                        style="background: ${colourGradient(c)}" 
                        title="${c} — click to view in this colour" 
                        onclick="event.stopPropagation(); changeCardColor(${p.id}, '${c}', '${cImg}', this)">
                  </span>
                `;
              }).join("")}
            </div>
          ` : ''}
          <div class="price">
            ₹${p.price.toLocaleString()}
            ${p.original && p.original > p.price ? `<span class="old">₹${p.original.toLocaleString()}</span><span class="discount-pill">${discount}% OFF</span>` : ''}
          </div>
          <div class="stock-tag ${p.stock > 0 ? 'in' : 'out'}">
            ${p.stock > 0 ? `${p.stock} left in stock` : 'Out of stock'}
          </div>
          <div class="cardactions">
            <button class="secondary" onclick="viewProduct(${p.id})">View Details</button>
            <button class="primary" onclick="addCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// --- Wishlist Management ---
function toggleWishlist(id) {
  const index = wishlist.indexOf(id);
  const p = products.find(x => x.id === id);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed "${p?.name || 'Item'}" from Wishlist`, "info");
  } else {
    wishlist.push(id);
    showToast(`Saved "${p?.name || 'Item'}" to your Wishlist!`, "success");
  }
  localStorage.setItem("as_wishlist", JSON.stringify(wishlist));
  updateWishlistBadge();
  renderProducts();

  // If detail modal is open and shows this product, update detail buttons
  const wishBtnDetail = document.getElementById("detailWishBtn");
  const isNowWish = wishlist.includes(id);
  if (wishBtnDetail) {
    wishBtnDetail.className = `detail-wish-bar ${isNowWish ? 'in-wish' : ''}`;
    wishBtnDetail.innerHTML = `${isNowWish ? '♥ Saved in Your Wishlist (Click to remove)' : '♡ Add to Wishlist'}`;
  }
  const imgWishBtn = document.getElementById("detailImgWishBtn");
  if (imgWishBtn) {
    imgWishBtn.className = `detail-img-wish ${isNowWish ? 'in-wish' : ''}`;
    imgWishBtn.textContent = isNowWish ? '♥' : '♡';
  }

  // If wishlist modal is open, re-render
  if (document.getElementById("wishlistModal")?.classList.contains("open")) {
    renderWishlist();
  }
}

function updateWishlistBadge() {
  const countEl = document.getElementById("wishCount");
  if (countEl) countEl.textContent = wishlist.length;
  const mobCount = document.getElementById("mobileWishCount");
  if (mobCount) mobCount.textContent = wishlist.length;
}

function openWishlist() {
  renderWishlist();
  document.getElementById("wishlistModal").classList.add("open");
}

function closeWishlist() {
  document.getElementById("wishlistModal").classList.remove("open");
}

function renderWishlist() {
  const container = document.getElementById("wishlistItems");
  if (!container) return;

  const savedProducts = products.filter(p => wishlist.includes(p.id));
  if (!savedProducts.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 35px 10px;">
        <span style="font-size: 40px; display: block; margin-bottom: 10px; color: #ccc;">♡</span>
        <h3 style="margin: 0 0 6px;">Your Wishlist is Empty</h3>
        <p style="color: var(--muted); font-size: 14px; margin: 0 0 20px;">Save items you love and move them directly to cart anytime.</p>
        <button class="primary" onclick="closeWishlist()">Explore Collections</button>
      </div>
    `;
    return;
  }

  container.innerHTML = savedProducts.map(p => {
    const thumbImg = p.image || (p.photos && p.photos.length ? p.photos[0] : "");
    return `
      <div class="wish-item">
        <div class="wish-thumb" style="${thumbImg ? `background-image: url('${thumbImg}')` : ''}"></div>
        <div class="wish-details">
          <div class="tag">${p.category}</div>
          <b>${p.name}</b>
          <div class="price" style="font-size: 15px; margin: 4px 0;">₹${p.price.toLocaleString()}</div>
          <div class="small" style="color: ${p.stock > 0 ? 'var(--success)' : 'var(--danger)'}">
            ${p.stock > 0 ? 'In Stock' : 'Currently Unavailable'}
          </div>
        </div>
        <div class="wish-actions">
          <button class="primary" onclick="moveWishToCart(${p.id})">Move to Cart</button>
          <button class="secondary" onclick="toggleWishlist(${p.id})">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

function moveWishToCart(id) {
  addCart(id);
  toggleWishlist(id);
}

// --- Cart & Quantity Controls ---
function addCart(id) {
  const p = products.find(x => x.id === id);
  if (!p || p.stock < 1) {
    alert("Sorry, this item is out of stock.");
    return;
  }
  cart.push(id);
  localStorage.setItem("as_cart", JSON.stringify(cart));
  updateCartBadge();
  showToast(`Added "${p.name}" to cart!`);
}

function updateCartBadge() {
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cart.length;
  const mobCount = document.getElementById("mobileCartCount");
  if (mobCount) mobCount.textContent = cart.length;
}

function showCart() {
  document.getElementById("cartModal").classList.add("open");
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("open");
}

function updateCartQty(id, delta) {
  if (delta > 0) {
    const p = products.find(x => x.id === id);
    const countInCart = cart.filter(x => x === id).length;
    if (p && countInCart >= p.stock) {
      alert(`Only ${p.stock} units available in stock.`);
      return;
    }
    cart.push(id);
  } else {
    const idx = cart.indexOf(id);
    if (idx > -1) cart.splice(idx, 1);
  }
  localStorage.setItem("as_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x !== Number(id));
  localStorage.setItem("as_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCart();
  showToast("Item removed from cart.", "info");
}

function calculateOrderTotals(itemsList) {
  const subtotal = itemsList.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;

  if (appliedCoupon && subtotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.type === "percent") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discount = appliedCoupon.value;
    }
  }

  // Free shipping on orders above ₹1,000, else ₹99
  const delivery = (subtotal - discount) >= 1000 || subtotal === 0 ? 0 : 99;
  const gst = Math.round(((subtotal - discount) * 0.12)); // 12% standard GST inclusive
  const total = Math.max(0, subtotal - discount + delivery);

  return { subtotal, discount, delivery, gst, total };
}

function renderCart() {
  const box = document.getElementById("cartItems");
  if (!box) return;

  const counts = {};
  cart.forEach(id => counts[id] = (counts[id] || 0) + 1);
  const entries = Object.entries(counts);

  if (!entries.length) {
    box.innerHTML = `
      <div style="text-align: center; padding: 40px 10px;">
        <span style="font-size: 40px; display: block; margin-bottom: 10px; color: #ccc;">🛒</span>
        <h3 style="margin: 0 0 6px;">Your Shopping Cart is Empty</h3>
        <p style="color: var(--muted); font-size: 14px; margin: 0 0 20px;">Explore handcrafted sarees and premium menswear today.</p>
        <button class="primary" onclick="closeCart()">Start Shopping</button>
      </div>
    `;
    return;
  }

  const itemsList = entries.map(([id, qty]) => {
    const p = products.find(x => x.id == id);
    return p ? { ...p, qty } : null;
  }).filter(Boolean);

  const { subtotal, discount, delivery, gst, total } = calculateOrderTotals(itemsList);

  box.innerHTML = `
    <div style="max-height: 280px; overflow-y: auto; padding-right: 4px;">
      ${itemsList.map(item => `
        <div class="cart-item">
          <div class="cart-thumb" style="${item.image ? `background-image: url('${item.image}')` : ''}">
            ${item.image ? '' : 'AS'}
          </div>
          <div class="cart-info">
            <b>${item.name}</b>
            <div style="font-size: 13px; color: var(--maroon); font-weight: 700;">₹${item.price.toLocaleString()}</div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
              <span style="font-weight: 700; font-size: 13px; min-width: 20px; text-align: center;">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
              <button class="remove-cart" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Coupon Input -->
    <div class="coupon-section">
      <label>Have a Promo / Gift Coupon?</label>
      <div class="coupon-input-row">
        <input id="cartCouponInput" placeholder="ENTER CODE" value="${appliedCoupon ? appliedCoupon.code : ''}">
        <button onclick="applyCouponCode()">Apply</button>
      </div>
      <div class="coupon-chips">
        <span class="coupon-chip" onclick="quickApplyCoupon('SHYN10')">🏷️ SHYN10 (10% Off)</span>
        <span class="coupon-chip" onclick="quickApplyCoupon('FESTIVE500')">🎉 FESTIVE500 (₹500 Off)</span>
        <span class="coupon-chip" onclick="quickApplyCoupon('WELCOME50')">✨ WELCOME50 (₹150 Off)</span>
      </div>
      ${appliedCoupon ? `
        <div class="applied-coupon-pill">
          ✓ Coupon <b>${appliedCoupon.code}</b> applied (-₹${discount.toLocaleString()})
          <button onclick="removeCoupon()">✕</button>
        </div>
      ` : ''}
    </div>

    <!-- Price Summary -->
    <div class="price-breakdown">
      <div class="price-row"><span>Items Subtotal:</span> <span>₹${subtotal.toLocaleString()}</span></div>
      ${discount > 0 ? `<div class="price-row discount-row"><span>Coupon Discount (${appliedCoupon?.code}):</span> <span>-₹${discount.toLocaleString()}</span></div>` : ''}
      <div class="price-row"><span>Estimated Delivery:</span> <span>${delivery === 0 ? '<b style="color:var(--success)">FREE</b>' : '₹' + delivery}</span></div>
      <div class="price-row" style="font-size: 12px; color: #888;"><span>Taxes (12% GST included):</span> <span>₹${gst.toLocaleString()}</span></div>
      <div class="price-row grand-total"><span>Grand Total:</span> <span>₹${total.toLocaleString()}</span></div>
    </div>

    <button class="primary" style="width: 100%; padding: 14px; margin-top: 16px; font-size: 16px; font-weight: 700;" onclick="proceedToCheckoutFromCart()">
      Proceed to Checkout (₹${total.toLocaleString()}) →
    </button>
  `;
}

// --- Coupon Operations ---
function applyCouponCode() {
  const input = document.getElementById("cartCouponInput") || document.getElementById("checkoutCouponInput");
  const code = (input?.value || "").trim().toUpperCase();
  if (!code) {
    alert("Please enter a coupon code.");
    return;
  }
  const coupon = COUPONS[code];
  if (!coupon) {
    alert(`Invalid coupon code "${code}". Try SHYN10 or FESTIVE500.`);
    return;
  }

  // Get current subtotal
  let currentSubtotal = 0;
  if (activeCheckoutContext) {
    currentSubtotal = activeCheckoutContext.reduce((sum, i) => sum + (i.price * i.qty), 0);
  } else {
    cart.forEach(id => {
      const p = products.find(x => x.id === id);
      if (p) currentSubtotal += p.price;
    });
  }

  if (currentSubtotal < coupon.minOrder) {
    alert(`Coupon "${code}" requires a minimum order of ₹${coupon.minOrder.toLocaleString()}.`);
    return;
  }

  appliedCoupon = { code, ...coupon };
  showToast(`Coupon "${code}" applied successfully!`);
  if (document.getElementById("cartModal")?.classList.contains("open")) renderCart();
  if (document.getElementById("checkoutModal")?.classList.contains("open")) renderCheckoutSummary();
}

function quickApplyCoupon(code) {
  const input = document.getElementById("cartCouponInput");
  if (input) input.value = code;
  applyCouponCode();
}

function removeCoupon() {
  appliedCoupon = null;
  showToast("Coupon removed.", "info");
  if (document.getElementById("cartModal")?.classList.contains("open")) renderCart();
  if (document.getElementById("checkoutModal")?.classList.contains("open")) renderCheckoutSummary();
}

// --- Checkout & Payment Gateway Flow ---
function directBuy(id) {
  const p = products.find(x => x.id === id);
  if (!p || p.stock < 1) {
    alert("This product is currently out of stock.");
    return;
  }
  activeCheckoutContext = [{ ...p, qty: 1 }];
  openCheckoutModal();
}

function proceedToCheckoutFromCart() {
  const counts = {};
  cart.forEach(id => counts[id] = (counts[id] || 0) + 1);
  const items = Object.entries(counts).map(([id, qty]) => {
    const p = products.find(x => x.id == id);
    return p ? { ...p, qty } : null;
  }).filter(Boolean);

  if (!items.length) {
    alert("Your cart is empty.");
    return;
  }

  activeCheckoutContext = items;
  closeCart();
  openCheckoutModal();
}

function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;
  modal.classList.add("open");

  // Pre-fill user data if available
  const nameField = document.getElementById("checkoutName");
  const phoneField = document.getElementById("checkoutPhone");
  if (nameField && !nameField.value) nameField.value = localStorage.getItem("as_name") || "";
  if (phoneField && !phoneField.value) phoneField.value = localStorage.getItem("as_phone") || "";

  renderCheckoutSummary();
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
}

let selectedPaymentMethod = "online"; // 'online' or 'cod'

function setPaymentMethod(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll(".payment-option").forEach(el => {
    el.classList.toggle("active", el.dataset.method === method);
  });
  const payBtn = document.getElementById("checkoutSubmitBtn");
  if (payBtn) {
    payBtn.textContent = method === "cod" ? "Place Order (Cash on Delivery)" : "Pay Now & Confirm Order";
  }
}

function renderCheckoutSummary() {
  const summaryBox = document.getElementById("checkoutOrderSummary");
  if (!summaryBox || !activeCheckoutContext) return;

  const { subtotal, discount, delivery, gst, total } = calculateOrderTotals(activeCheckoutContext);

  summaryBox.innerHTML = `
    <div style="background: #fdfaf6; border: 1px solid #eeded3; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
      <b style="font-size: 13px; color: var(--maroon); text-transform: uppercase;">Order Items (${activeCheckoutContext.reduce((s,i)=>s+i.qty,0)})</b>
      <div style="max-height: 120px; overflow-y: auto; margin-top: 8px;">
        ${activeCheckoutContext.map(i => `
          <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 4px 0;">
            <span>${i.name} × ${i.qty}</span>
            <b>₹${(i.price * i.qty).toLocaleString()}</b>
          </div>
        `).join("")}
      </div>
      <div class="price-breakdown" style="margin-top: 10px; padding-top: 8px;">
        <div class="price-row"><span>Subtotal:</span> <span>₹${subtotal.toLocaleString()}</span></div>
        ${discount > 0 ? `<div class="price-row discount-row"><span>Discount:</span> <span>-₹${discount.toLocaleString()}</span></div>` : ''}
        <div class="price-row"><span>Delivery:</span> <span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span></div>
        <div class="price-row grand-total" style="font-size: 16px;"><span>Total Payable:</span> <span>₹${total.toLocaleString()}</span></div>
      </div>
    </div>
  `;
}

// --- Order Submission Engine (Supports COD + Razorpay / Demo Gateway) ---
async function startPayment() {
  const name = document.getElementById("checkoutName")?.value.trim();
  const phone = document.getElementById("checkoutPhone")?.value.trim();
  const address = document.getElementById("checkoutAddress")?.value.trim();
  const city = document.getElementById("checkoutCity")?.value.trim() || "Local";
  const pincode = document.getElementById("checkoutPincode")?.value.trim() || "110001";

  if (!name || !phone || !address) {
    alert("Please fill in your Full Name, Mobile Number, and Delivery Address.");
    return;
  }

  if (!activeCheckoutContext || !activeCheckoutContext.length) {
    alert("No items in checkout.");
    return;
  }

  const { subtotal, discount, delivery, gst, total } = calculateOrderTotals(activeCheckoutContext);
  const payBtn = document.getElementById("checkoutSubmitBtn");
  if (payBtn) { payBtn.disabled = true; payBtn.textContent = "Processing Order..."; }

  // 1. CASH ON DELIVERY Flow
  if (selectedPaymentMethod === "cod") {
    setTimeout(() => {
      const order = createOrderRecord({
        customer: { name, phone, address, city, pincode },
        items: activeCheckoutContext,
        subtotal, discount, delivery, gst, total,
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending (Pay on Delivery)",
        paymentId: "COD_" + Date.now()
      });
      finalizeOrder(order);
      if (payBtn) { payBtn.disabled = false; payBtn.textContent = "Place Order (Cash on Delivery)"; }
    }, 600);
    return;
  }

  // 2. ONLINE PAYMENT Flow (Razorpay + Seamless Demo Fallback)
  // Check if live backend server is available
  let razorpayServerActive = false;
  if (location.protocol !== "file:") {
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          productId: activeCheckoutContext[0]?.id || 1,
          productName: activeCheckoutContext[0]?.name || "SHYN Apparel",
          name, phone, address
        })
      });
      if (res.ok) {
        const data = await res.json();
        razorpayServerActive = true;
        launchRazorpayModal(data, { name, phone, address, city, pincode, subtotal, discount, delivery, gst, total });
        return;
      }
    } catch (e) {
      // Backend not running, proceed to instant demo simulation
    }
  }

  // If server is not running or on file://, run Simulated Instant Payment Gateway
  simulateOnlinePaymentGateway({ name, phone, address, city, pincode, subtotal, discount, delivery, gst, total });
}

function simulateOnlinePaymentGateway(orderDetails) {
  const payBtn = document.getElementById("checkoutSubmitBtn");
  const modal = document.createElement("div");
  modal.className = "modal open";
  modal.id = "demoGatewayModal";
  modal.innerHTML = `
    <div class="modalbox" style="max-width: 440px; text-align: center;">
      <div class="brand-lockup brand-lockup--center" style="margin-bottom: 12px;">
        <span class="brand-mark"><span>S</span></span>
        <span class="brand-name">SHYN</span>
      </div>
      <h3 style="margin: 0 0 6px;">Secure Payment Gateway</h3>
      <p style="font-size: 13px; color: var(--muted); margin: 0 0 16px;">Test Gateway Simulation for Minor Project Viva Demo</p>
      <div style="background: #f7eee7; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 14px;">
        Amount to Pay: <b style="color: var(--maroon); font-size: 18px;">₹${orderDetails.total.toLocaleString()}</b>
      </div>
      <div style="text-align: left; font-size: 13px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px;">
        <label><input type="radio" name="demoPayMode" checked> 📱 <b>UPI / QR Code</b> (Google Pay, PhonePe, Paytm)</label>
        <label><input type="radio" name="demoPayMode"> 💳 <b>Credit / Debit Card</b> (Visa, Mastercard, RuPay)</label>
        <label><input type="radio" name="demoPayMode"> 🏦 <b>Net Banking</b> (All Indian Banks)</label>
      </div>
      <button class="primary" id="demoPayConfirmBtn" style="width: 100%; padding: 12px; font-weight: 700; margin-bottom: 8px;" onclick="confirmDemoPayment()">
        Complete Payment (₹${orderDetails.total.toLocaleString()})
      </button>
      <button class="secondary" style="width: 100%; padding: 10px;" onclick="document.getElementById('demoGatewayModal').remove()">
        Cancel Payment
      </button>
    </div>
  `;
  document.body.appendChild(modal);

  window.confirmDemoPayment = function() {
    const btn = document.getElementById("demoPayConfirmBtn");
    btn.disabled = true;
    btn.textContent = "Verifying with Bank...";
    setTimeout(() => {
      document.getElementById("demoGatewayModal").remove();
      const order = createOrderRecord({
        customer: {
          name: orderDetails.name,
          phone: orderDetails.phone,
          address: orderDetails.address,
          city: orderDetails.city,
          pincode: orderDetails.pincode
        },
        items: activeCheckoutContext,
        subtotal: orderDetails.subtotal,
        discount: orderDetails.discount,
        delivery: orderDetails.delivery,
        gst: orderDetails.gst,
        total: orderDetails.total,
        paymentMethod: "Online (UPI / Cards)",
        paymentStatus: "Paid",
        paymentId: "PAY_SHYN_" + Math.floor(10000000 + Math.random() * 90000000)
      });
      finalizeOrder(order);
      if (payBtn) { payBtn.disabled = false; payBtn.textContent = "Pay Now & Confirm Order"; }
    }, 900);
  };
}

function launchRazorpayModal(data, orderDetails) {
  const payBtn = document.getElementById("checkoutSubmitBtn");
  const options = {
    key: data.keyId,
    amount: data.amount,
    currency: data.currency || "INR",
    name: "SHYN Store",
    description: "Purchase Order",
    order_id: data.orderId,
    prefill: { name: orderDetails.name, contact: orderDetails.phone },
    notes: { delivery_address: orderDetails.address },
    theme: { color: "#7b1730" },
    handler: async function(payment) {
      try {
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payment,
            amount: data.amount
          })
        });
        const result = await verify.json();
        const order = createOrderRecord({
          customer: {
            name: orderDetails.name,
            phone: orderDetails.phone,
            address: orderDetails.address,
            city: orderDetails.city,
            pincode: orderDetails.pincode
          },
          items: activeCheckoutContext,
          subtotal: orderDetails.subtotal,
          discount: orderDetails.discount,
          delivery: orderDetails.delivery,
          gst: orderDetails.gst,
          total: orderDetails.total,
          paymentMethod: "Razorpay Online",
          paymentStatus: "Paid",
          paymentId: payment.razorpay_payment_id
        });
        finalizeOrder(order);
      } catch (err) {
        alert("Payment verification error: " + err.message);
      }
    },
    modal: {
      ondismiss: function() {
        if (payBtn) { payBtn.disabled = false; payBtn.textContent = "Pay Now & Confirm Order"; }
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.on("payment.failed", function(resp) {
    alert("Payment Failed: " + (resp.error?.description || "Transaction cancelled."));
    if (payBtn) { payBtn.disabled = false; payBtn.textContent = "Pay Now & Confirm Order"; }
  });
  rzp.open();
}

function createOrderRecord(details) {
  const orderId = "SHYN-" + (new Date().getFullYear()) + "-" + Math.floor(10000 + Math.random() * 90000);
  const trackingNumber = "BD" + Math.floor(100000000 + Math.random() * 900000000);

  const order = {
    id: orderId,
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    customer: details.customer,
    items: details.items,
    subtotal: details.subtotal,
    discount: details.discount,
    coupon: appliedCoupon ? appliedCoupon.code : null,
    delivery: details.delivery,
    gst: details.gst,
    total: details.total,
    paymentMethod: details.paymentMethod,
    paymentStatus: details.paymentStatus,
    paymentId: details.paymentId,
    trackingNumber: trackingNumber,
    carrier: "BlueDart Express",
    status: "Order Placed",
    statusStep: 1, // 1 to 5
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
  };

  orders.unshift(order);
  localStorage.setItem("as_orders", JSON.stringify(orders));

  // Deduct stock
  details.items.forEach(item => {
    const prod = products.find(x => x.id === item.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.qty);
    }
  });
  localStorage.setItem("as_products", JSON.stringify(products));

  return order;
}

function finalizeOrder(order) {
  // Clear cart if items came from cart
  if (cart.length && activeCheckoutContext.some(i => cart.includes(i.id))) {
    cart = [];
    localStorage.setItem("as_cart", JSON.stringify(cart));
    updateCartBadge();
  }

  // Clear coupon
  appliedCoupon = null;
  activeCheckoutContext = null;

  closeCheckout();
  renderProducts();
  showToast("Order placed successfully! Invoice generated.", "success");
  fireCelebrationConfetti();
  showInvoice(order.id);
}

// --- Printable Invoice & Order Confirmation Modal ---
function showInvoice(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("invoiceModal");
  const content = document.getElementById("invoiceContent");
  if (!modal || !content) return;

  const currentStep = order.statusStep || 1;
  const stages = [
    { num: 1, label: "Placed" },
    { num: 2, label: "Packed" },
    { num: 3, label: "Shipped" },
    { num: 4, label: "Out for Delivery" },
    { num: 5, label: "Delivered" }
  ];

  const stepperHtml = stages.map(s => {
    let cls = "";
    let icon = s.num;
    if (s.num < currentStep) {
      cls = "done";
      icon = "✓";
    } else if (s.num === currentStep) {
      cls = "active";
      icon = currentStep === 5 ? "✓" : s.num;
    }
    return `
      <div class="tracking-step ${cls}">
        <div class="step-circle">${icon}</div>
        <div class="step-name">${s.label}</div>
      </div>
    `;
  }).join("");

  content.innerHTML = `
    <div class="invoice-container">
      <div class="invoice-header">
        <div>
          <div class="brand-lockup" style="margin-bottom: 6px;">
            <span class="brand-mark"><span>S</span></span>
            <span class="brand-name" style="font-size: 26px;">SHYN</span>
          </div>
          <div style="font-size: 12px; color: var(--muted);">Luxury Ethnic & Modern Sartorial Clothing</div>
          <div style="font-size: 11px; color: #888;">GSTIN: 07AAACS1429B1Z8 | HSN: 5007 / 6205</div>
        </div>
        <div class="invoice-meta">
          <div class="invoice-title">TAX INVOICE</div>
          <div><b>Invoice #:</b> ${order.id}</div>
          <div><b>Date:</b> ${order.date}</div>
          <div><b>Payment:</b> ${order.paymentMethod}</div>
          <span class="invoice-badge">${order.paymentStatus}</span>
        </div>
      </div>

      <div class="invoice-addresses">
        <div>
          <b style="color: var(--maroon);">Billed / Shipped To:</b>
          <div style="font-weight: 700; margin-top: 3px;">${order.customer.name}</div>
          <div>${order.customer.address}</div>
          <div>${order.customer.city || ''} - ${order.customer.pincode || ''}</div>
          <div>📞 ${order.customer.phone}</div>
        </div>
        <div>
          <b style="color: var(--maroon);">Fulfillment & Dispatch:</b>
          <div>SHYN Central Logistics Hub</div>
          <div>Sector 62, Fashion District</div>
          <div>Courier: <b>${order.carrier}</b></div>
          <div>Tracking AWB: <b>${order.trackingNumber}</b></div>
        </div>
      </div>

      <!-- Order Tracking Timeline Bar with Live Stage Simulator -->
      <div style="background: #faf6f2; border: 1px solid #ebdcd0; border-radius: 10px; padding: 14px; margin: 16px 0;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; margin-bottom: 8px;">
          <span>Tracking Status: <span style="color: var(--maroon)">${order.status}</span></span>
          <span>Est. Delivery: <span style="color: var(--success)">${order.estimatedDelivery}</span></span>
        </div>
        <div class="tracking-stepper">
          ${stepperHtml}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #ebdcd0; flex-wrap: wrap; gap: 8px;">
          <span style="font-size: 11.5px; color: var(--muted);">Live Logistics Simulator:</span>
          <button type="button" class="advance-stage-btn" onclick="advanceOrderStage('${order.id}')">
            <span>⚡</span> ${currentStep >= 5 ? '↺ Reset Stage to Placed' : 'Advance Next Stage (Viva Demo)'}
          </button>
        </div>
      </div>

      <!-- Itemized Table -->
      <table class="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Description</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Rate</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map((item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><b>${item.name}</b></td>
              <td>${item.category || 'Apparel'}</td>
              <td>${item.qty}</td>
              <td>₹${item.price.toLocaleString()}</td>
              <td style="text-align: right;">₹${(item.price * item.qty).toLocaleString()}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <!-- Totals Summary -->
      <div class="invoice-summary">
        <div class="row"><span>Subtotal:</span> <span>₹${order.subtotal.toLocaleString()}</span></div>
        ${order.discount > 0 ? `<div class="row" style="color: var(--success); font-weight: 600;"><span>Discount (${order.coupon || 'PROMO'}):</span> <span>-₹${order.discount.toLocaleString()}</span></div>` : ''}
        <div class="row"><span>Shipping Charges:</span> <span>${order.delivery === 0 ? 'FREE' : '₹' + order.delivery}</span></div>
        <div class="row" style="font-size: 11px; color: #888;"><span>Taxes (12% Integrated GST):</span> <span>₹${order.gst?.toLocaleString() || '0'}</span></div>
        <div class="row total"><span>Grand Total:</span> <span>₹${order.total.toLocaleString()}</span></div>
      </div>

      <div class="invoice-footer-note">
        Thank you for shopping with SHYN. All sarees & garments are backed by our 7-day hassle-free exchange guarantee.<br>
        For inquiries or support, contact care@shynfashion.in or call 1800-SHYN-STYLE.
      </div>
    </div>

    <div class="invoice-actions">
      <button class="secondary" onclick="printInvoice()">🖨️ Print / Download PDF</button>
      <button class="primary" onclick="closeInvoice()">Continue Shopping</button>
    </div>
  `;

  modal.classList.add("open");
}

function printInvoice() {
  window.print();
}

function closeInvoice() {
  document.getElementById("invoiceModal").classList.remove("open");
}

// --- Order History Modal ("Your Orders") ---
function openOrdersModal() {
  closeAccountMenu();
  const modal = document.getElementById("ordersModal");
  const container = document.getElementById("ordersList");
  if (!modal || !container) return;

  if (!orders.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px;">
        <span style="font-size: 40px; display: block; margin-bottom: 10px; color: #ccc;">📦</span>
        <h3 style="margin: 0 0 6px;">No Orders Placed Yet</h3>
        <p style="color: var(--muted); font-size: 14px; margin: 0 0 20px;">Your purchase history and order receipts will be stored here.</p>
        <button class="primary" onclick="closeOrdersModal()">Explore Store</button>
      </div>
    `;
  } else {
    container.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-card-head">
          <div>
            <span class="order-card-id">${order.id}</span>
            <div class="order-card-date">Placed on ${order.date}</div>
          </div>
          <span class="invoice-badge">${order.status}</span>
        </div>
        <div class="order-card-items">
          ${order.items.map(i => `<div>• <b>${i.name}</b> (Qty: ${i.qty}) — ₹${(i.price * i.qty).toLocaleString()}</div>`).join("")}
        </div>
        <div class="order-card-foot">
          <div>Total: <b style="color: var(--maroon); font-size: 16px;">₹${order.total.toLocaleString()}</b> <small style="color: #777;">(${order.paymentMethod})</small></div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="secondary" style="padding: 7px 12px; font-size: 13px;" onclick="advanceOrderStage('${order.id}')">⚡ Advance Stage</button>
            <button class="secondary" style="padding: 7px 12px; font-size: 13px;" onclick="showInvoice('${order.id}')">View Invoice</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  modal.classList.add("open");
}

function closeOrdersModal() {
  document.getElementById("ordersModal").classList.remove("open");
}

// --- Product Detail View Modal (Luxury Atelier Redesign) ---
function viewProduct(id, initialColor) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const isWish = wishlist.includes(p.id);
  const modal = document.getElementById("detailModal");
  const content = document.getElementById("detailContent");
  if (!modal || !content) return;

  const allPhotos = (p.photos && p.photos.length) ? p.photos : (p.image ? [p.image] : []);
  const selectedColor = initialColor || (p.colors && p.colors.length ? p.colors[0] : "Classic");
  const selectedIdx = (p.colors || []).findIndex(c => c.toLowerCase().trim() === selectedColor.toLowerCase().trim());
  const activeIdx = selectedIdx >= 0 ? selectedIdx : 0;
  const mainPhoto = getProductColorImage(p, selectedColor, activeIdx) || (allPhotos.length ? allPhotos[0] : "");
  const discount = p.original && p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0;
  const isMen = (p.gender || "Women") === "Men";

  // Dynamic reviews retrieval
  const savedReviews = JSON.parse(localStorage.getItem("as_reviews_" + p.id) || "[]");
  const baseReviews = [
    {
      author: "Pooja Sharma",
      stars: 5,
      date: "14 Sep 2026",
      comment: "The zari sheen and texture are even more gorgeous in real life! Draped so smoothly for my sister's reception, got endless compliments."
    },
    {
      author: "Rohan Verma",
      stars: 5,
      date: "20 Sep 2026",
      comment: "Finishing and fabric quality exceeded my expectations. Prompt delivery and luxury packaging."
    }
  ];
  const allReviewsList = [...savedReviews, ...baseReviews];

  // Dynamic craftsmanship specifications
  let specs = [];
  if (isMen) {
    specs = [
      { icon: "🧵", label: "Fabric Blend", val: p.name.includes("Cotton") ? "100% Long-Staple Supima Cotton" : "Premium Poly-Viscose / Luxury Weave" },
      { icon: "👔", label: "Tailored Fit", val: "Modern Slim-Tailored Profile" },
      { icon: "✨", label: "Finish & Style", val: "Wrinkle-Resistant Silk Touch" },
      { icon: "🧼", label: "Wash & Care", val: "Machine Wash Cold • Warm Iron" }
    ];
  } else {
    specs = [
      { icon: "🧵", label: "Fabric & Drape", val: `Pure ${p.category} with Lustrous Sheen` },
      { icon: "📏", label: "Length & Cut", val: "5.5m Saree + 0.8m Blouse Piece" },
      { icon: "🪡", label: "Zari & Border", val: "Intricate Floral Golden Zari Weave" },
      { icon: "🧼", label: "Wash & Care", val: "Dry Clean Only (Preserves Zari)" }
    ];
  }

  // Size / Blouse fitting block
  let sizeSelectorHtml = "";
  if (isMen) {
    sizeSelectorHtml = `
      <div class="detail-option-block">
        <div class="variant-label-row">
          <span><b>Select Size:</b> <span id="selectedSizeLabel" style="color: var(--maroon);">40 (M)</span></span>
          <a href="javascript:void(0)" onclick="showToast('Size Guide: 38=S (Chest 38\"), 40=M (Chest 40\"), 42=L (Chest 42\"), 44=XL (Chest 44\")')" style="font-size: 11.5px; color: var(--gold); text-decoration: underline;">Size Guide</a>
        </div>
        <div class="detail-size-row">
          <button type="button" class="detail-size-pill" onclick="selectDetailSize(this, '38 (S)')">38 (S)</button>
          <button type="button" class="detail-size-pill selected" onclick="selectDetailSize(this, '40 (M)')">40 (M)</button>
          <button type="button" class="detail-size-pill" onclick="selectDetailSize(this, '42 (L)')">42 (L)</button>
          <button type="button" class="detail-size-pill" onclick="selectDetailSize(this, '44 (XL)')">44 (XL)</button>
        </div>
      </div>
    `;
  } else {
    sizeSelectorHtml = `
      <div class="detail-option-block">
        <div class="variant-label-row">
          <span><b>Blouse &amp; Drape Option:</b></span>
          <span style="font-size: 12px; color: var(--success); font-weight: 600;">✓ Ready to Drape</span>
        </div>
        <div class="detail-blouse-banner">
          <div style="font-size: 13px; font-weight: 600; color: var(--ink);">Included: Matching Unstitched Blouse Piece (0.8m)</div>
          <div style="font-size: 11.5px; color: var(--muted); margin-top: 2px;">Standard 5.5 Meter Length • Finished Fall &amp; Pico Edges</div>
        </div>
      </div>
    `;
  }

  content.innerHTML = `
    <!-- Top Breadcrumb & Status Bar -->
    <div class="detail-top-bar">
      <div class="detail-breadcrumb">
        <a href="javascript:void(0)" onclick="closeDetails()">Home</a>
        <span class="sep">/</span>
        <a href="javascript:void(0)" onclick="setGender('${isMen ? 'Men' : 'Women'}'); closeDetails();">${isMen ? "Men's Collection" : "Women's Heritage"}</a>
        <span class="sep">/</span>
        <span class="sep">${p.category}</span>
        <span class="sep">/</span>
        <span class="current">${p.name}</span>
      </div>
      <div class="detail-top-tags">
        <span class="detail-tag-pill stock-ok">● ${p.stock > 0 ? `In Stock (${p.stock} units)` : 'Sold Out'}</span>
        <span class="detail-tag-pill">✨ Handloom Certified</span>
      </div>
    </div>

    <div class="detail-layout">
      <!-- Left Image Showcase with Zoom -->
      <div class="detail-gallery">
        <div class="detail-main-img-wrap" onmousemove="handleImageZoom(event, this)" onmouseleave="resetImageZoom(this)">
          <div id="mainDetailImage" class="main-product-image" style="${mainPhoto ? `background-image: url('${mainPhoto}')` : ''}">
            ${mainPhoto ? '' : '<span style="font-size: 28px; font-weight: 700; color: var(--gold);">SHYN</span>'}
          </div>
          <span class="detail-img-badge">${p.stock <= 8 ? '🔥 Selling Fast' : '✨ SHYN Exclusive'}</span>
          <button id="detailImgWishBtn" type="button" class="detail-img-wish ${isWish ? 'in-wish' : ''}" onclick="toggleWishlist(${p.id})" title="${isWish ? 'Remove from wishlist' : 'Save to wishlist'}">
            ${isWish ? '♥' : '♡'}
          </button>
          <div class="detail-zoom-hint">
            <span>🔍 Move mouse to zoom fabric &amp; zari weave</span>
          </div>
        </div>

        ${allPhotos.length > 1 ? `
          <div class="thumbs">
            ${allPhotos.map((img, i) => {
              const matchingColor = (p.colors && p.colors[i]) ? p.colors[i] : "";
              const isActive = (img === mainPhoto) || (i === activeIdx);
              return `
                <div class="thumb ${isActive ? 'active' : ''}" 
                     data-img="${img}" 
                     data-colour="${matchingColor}" 
                     style="background-image: url('${img}')" 
                     onclick="changeDetailPhoto('${img}', this)" 
                     title="${matchingColor ? `View ${matchingColor} variant` : `View photo ${i + 1}`}">
                </div>
              `;
            }).join("")}
          </div>
        ` : ''}
      </div>

      <!-- Right Atelier Product Suite -->
      <div class="detail-info">
        <div class="detail-atelier-tag">SHYN ATELIER • HANDCRAFTED HERITAGE</div>
        <h1 class="detail-title">${p.name}</h1>

        <div class="detail-rating-row">
          <div class="detail-stars-badge">
            <span>★</span> ${(p.rating || 4.5).toFixed(1)}
          </div>
          <span style="color: #c9a24a; font-size: 14px;">★★★★☆</span>
          <span class="detail-review-count">| ${(p.reviews || 180).toLocaleString()} Verified Buyers</span>
          <span class="detail-trending-pill">🔥 14 orders in past 24 hrs</span>
        </div>

        <!-- Luxury Pricing Card -->
        <div class="detail-price-card">
          <div class="detail-price-row">
            <span class="detail-main-price">₹${p.price.toLocaleString()}</span>
            ${p.original && p.original > p.price ? `
              <span class="detail-mrp-price">M.R.P.: ₹${p.original.toLocaleString()}</span>
              <span class="detail-save-badge">SAVE ₹${(p.original - p.price).toLocaleString()} (${discount}% OFF)</span>
            ` : ''}
          </div>
          <div class="detail-tax-notice">✓ Inclusive of all taxes • Free express shipping on orders ₹1,000+</div>
          <div class="detail-emi-pill">
            <span>💳</span>
            <span><b>No Cost EMI</b> starting from <b>₹${Math.ceil(p.price / 6).toLocaleString()}/mo</b> on Credit/Debit Cards &amp; UPI.</span>
          </div>
        </div>

        <!-- Craftsmanship & Specs 2x2 Grid -->
        <div class="detail-specs-grid">
          ${specs.map(s => `
            <div class="spec-card">
              <span class="spec-icon">${s.icon}</span>
              <div class="spec-text">
                <b>${s.label}</b>
                <span>${s.val}</span>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Color Variant Selection -->
        <div class="detail-option-block">
          <div class="variant-label-row">
            <span><b>Color Variant:</b> <span id="selectedColour" style="color: var(--maroon); font-weight: 700;">${selectedColor}</span></span>
            <span style="font-size: 12px; color: var(--muted);">${(p.colors || []).length} Options Available</span>
          </div>
          <div class="variant-row">
            ${(p.colors && p.colors.length ? p.colors : ['Classic']).map((c, i) => {
              const cImg = getProductColorImage(p, c, i);
              const isSelected = c.toLowerCase().trim() === selectedColor.toLowerCase().trim();
              return `
                <button type="button" class="variant ${isSelected ? 'selected' : ''}" 
                        onclick="selectVariant(this, '${cImg}')" 
                        data-colour="${c}" 
                        data-img="${cImg}">
                  <span class="swatch" style="background: ${colourGradient(c)}"></span>
                  <small>${c}</small>
                  <b>₹${p.price.toLocaleString()}</b>
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Size or Blouse Fitting -->
        ${sizeSelectorHtml}

        <!-- Pincode Delivery Estimator -->
        <div class="pincode-box">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12.5px; font-weight: 700; color: var(--ink);">📍 Check Delivery &amp; COD Availability</span>
            <span style="font-size: 11px; color: var(--muted);">Pan-India Express</span>
          </div>
          <div class="pincode-input-row">
            <input id="pincodeInput" type="text" maxlength="6" placeholder="Enter 6-digit PIN code (e.g. 110001)" onkeydown="if(event.key==='Enter')checkDeliveryPincode()">
            <button type="button" class="pincode-btn" onclick="checkDeliveryPincode()">Check</button>
          </div>
          <div id="pincodeResult" class="pincode-result"></div>
        </div>

        <!-- Boutique Offers -->
        <div class="detail-offers-block">
          <div style="font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
            ✨ Available Exclusive Offers
          </div>
          <div class="detail-offers-list">
            <div class="detail-offer-card">
              <button type="button" class="offer-copy-btn" onclick="copyDetailCoupon('SHYN10')">COPY</button>
              <div class="offer-tag">CODE: SHYN10</div>
              <div class="offer-desc">10% Instant Off applied on this order at checkout</div>
            </div>
            <div class="detail-offer-card">
              <button type="button" class="offer-copy-btn" onclick="copyDetailCoupon('FESTIVE500')">COPY</button>
              <div class="offer-tag">CODE: FESTIVE500</div>
              <div class="offer-desc">Flat ₹500 Off on orders above ₹2,500</div>
            </div>
            <div class="detail-offer-card">
              <div class="offer-tag" style="color: var(--gold);">BANK OFFER</div>
              <div class="offer-desc">Flat ₹500 instant discount on Axis &amp; HDFC Cards</div>
            </div>
          </div>
        </div>

        <!-- 4-Pillar Trust Strip -->
        <div class="detail-trust-row">
          <div class="trust-item">
            <span class="trust-icon">↩</span>
            <b>7 Days</b>
            <small>Easy Returns</small>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🚚</span>
            <b>Free Delivery</b>
            <small>Orders ₹1000+</small>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🧵</span>
            <b>100% Pure</b>
            <small>Authentic Fabric</small>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🔒</span>
            <b>Secure</b>
            <small>COD &amp; Razorpay</small>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="detail-cta-row">
          <button type="button" class="detail-add-bag-btn" onclick="addCartFromDetail(${p.id})">
            <span>🛍️</span> Add to Bag
          </button>
          <button type="button" class="detail-buy-now-btn" onclick="directBuyFromDetail(${p.id})">
            <span>⚡</span> Buy Now
          </button>
        </div>
        <button id="detailWishBtn" type="button" class="detail-wish-bar ${isWish ? 'in-wish' : ''}" onclick="toggleWishlist(${p.id})">
          ${isWish ? '♥ Saved in Your Wishlist (Click to remove)' : '♡ Add to Wishlist'}
        </button>

        <!-- Collapsible Accordion -->
        <div class="detail-accordion">
          <div class="accordion-item active">
            <div class="accordion-header" onclick="toggleDetailAccordion(this)">
              <span>📖 Weaver's Craftsmanship &amp; Drape Story</span>
              <span class="accordion-icon">▾</span>
            </div>
            <div class="accordion-body">
              <p>${p.desc || 'Finely curated apparel designed for festive joy and modern refinement.'}</p>
              <p style="margin-top: 6px;">Handcrafted by generational artisans. Every weave reflects hours of loom precision, rich texture, and finished borders ensuring effortless elegance.</p>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" onclick="toggleDetailAccordion(this)">
              <span>🧵 Fabric Composition &amp; Care Details</span>
              <span class="accordion-icon">▾</span>
            </div>
            <div class="accordion-body">
              <ul>
                <li><b>Fabric:</b> ${isMen ? "Long-Staple Cotton / Luxury Poly-Blend" : `${p.category} Silk & Handloom Weave`}</li>
                <li><b>Wash Care:</b> ${isMen ? "Gentle Machine Wash in Cold Water" : "Dry Clean Recommended to protect metallic zari sheen"}</li>
                <li><b>Storage:</b> Store wrapped in soft muslin or cotton cloth in a cool, dry wardrobe.</li>
              </ul>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" onclick="toggleDetailAccordion(this)">
              <span>📦 Nationwide Express Shipping &amp; 7-Day Returns</span>
              <span class="accordion-icon">▾</span>
            </div>
            <div class="accordion-body">
              <ul>
                <li><b>Dispatch:</b> Ships within 24–48 hours in luxury tamper-proof gift box.</li>
                <li><b>Doorstep Return:</b> 7-day hassle-free reverse pickup with zero questions asked.</li>
                <li><b>Payment Options:</b> Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), Cards &amp; NetBanking.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Verified Reviews Snippet with Interactive Review Form -->
        <div class="detail-reviews-snippet">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <div>
              <span style="font-size: 13px; font-weight: 700; color: var(--ink);">⭐ Customer Reviews (${allReviewsList.length})</span>
              <span style="font-size: 12px; color: var(--gold); font-weight: 600; margin-left: 8px;">★ ${(p.rating || 4.5).toFixed(1)} / 5.0</span>
            </div>
            <button type="button" class="write-review-btn" onclick="toggleReviewForm(${p.id})">✍️ Write a Review</button>
          </div>

          <!-- Review Form Box -->
          <div id="reviewFormBox_${p.id}" class="review-form-box">
            <div style="font-size: 13px; font-weight: 700; color: var(--maroon); margin-bottom: 6px;">Share Your Review &amp; Rating:</div>
            <div class="star-rating-picker" id="starPicker_${p.id}">
              <span class="star-picker-item active" onclick="setReviewStars(${p.id}, 1)">★</span>
              <span class="star-picker-item active" onclick="setReviewStars(${p.id}, 2)">★</span>
              <span class="star-picker-item active" onclick="setReviewStars(${p.id}, 3)">★</span>
              <span class="star-picker-item active" onclick="setReviewStars(${p.id}, 4)">★</span>
              <span class="star-picker-item active" onclick="setReviewStars(${p.id}, 5)">★</span>
              <input type="hidden" id="selectedStarVal_${p.id}" value="5">
            </div>
            <form class="review-form-inputs" onsubmit="submitCustomerReview(event, ${p.id})">
              <input id="reviewAuthor_${p.id}" placeholder="Your Name (e.g. Aditi Roy)" required>
              <textarea id="reviewComment_${p.id}" rows="2" placeholder="Write about fabric feel, fit, drape, and styling..." required></textarea>
              <button type="submit" class="review-submit-btn">Publish Review</button>
            </form>
          </div>

          <!-- Reviews List -->
          <div class="reviews-list-container" style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${allReviewsList.map(r => `
              <div class="mini-review-card" style="border-bottom: 1px solid #ebdcd0; padding-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                  <b>${r.author} <span class="verified-badge">✓ Verified Buyer</span></b>
                  <span style="color: #f59e0b;">${'★'.repeat(r.stars || 5)}${'☆'.repeat(5 - (r.stars || 5))}</span>
                </div>
                <p style="margin: 3px 0 0; font-size: 12px; color: #555; line-height: 1.4;">
                  "${r.comment}"
                </p>
                <span style="font-size: 10px; color: #999;">${r.date || 'Verified Purchase'}</span>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeDetails() {
  document.getElementById("detailModal")?.classList.remove("open");
}

function changeDetailPhoto(imgUrl, el) {
  const main = document.getElementById("mainDetailImage");
  if (main && imgUrl) {
    main.style.opacity = "0.2";
    setTimeout(() => {
      main.style.backgroundImage = `url('${imgUrl}')`;
      main.style.opacity = "1";
    }, 120);
  }
  document.querySelectorAll(".thumbs .thumb").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");

  // Two-way synchronization: If this photo matches a variant button, select that variant!
  const colorFromThumb = el?.getAttribute("data-colour");
  const allVariantBtns = document.querySelectorAll(".variant-row .variant");
  allVariantBtns.forEach(btn => {
    const bImg = btn.getAttribute("data-img");
    const bCol = btn.getAttribute("data-colour");
    if (bImg === imgUrl || (colorFromThumb && bCol && bCol.toLowerCase().trim() === colorFromThumb.toLowerCase().trim())) {
      btn.classList.add("selected");
      const label = document.getElementById("selectedColour");
      if (label && bCol) label.textContent = bCol;
    } else {
      btn.classList.remove("selected");
    }
  });
}

function handleImageZoom(e, wrapEl) {
  const img = wrapEl.querySelector(".main-product-image");
  if (!img) return;
  const rect = wrapEl.getBoundingClientRect();
  const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
  const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
  img.style.backgroundPosition = `${x}% ${y}%`;
  img.style.backgroundSize = "220%";
}

function resetImageZoom(wrapEl) {
  const img = wrapEl.querySelector(".main-product-image");
  if (!img) return;
  img.style.backgroundPosition = "center center";
  img.style.backgroundSize = "cover";
}

function selectVariant(el, imgUrl) {
  document.querySelectorAll(".variant-row .variant").forEach(v => v.classList.remove("selected"));
  el.classList.add("selected");
  const colorName = el.dataset.colour || "";
  const label = document.getElementById("selectedColour");
  if (label) label.textContent = colorName;

  const targetImg = imgUrl || el.dataset.img;
  if (targetImg) {
    const main = document.getElementById("mainDetailImage");
    if (main) {
      main.style.opacity = "0.2";
      setTimeout(() => {
        main.style.backgroundImage = `url('${targetImg}')`;
        main.style.opacity = "1";
      }, 120);
    }
    // Synchronize thumbnail
    document.querySelectorAll(".thumbs .thumb").forEach(t => {
      const tImg = t.getAttribute("data-img");
      const tCol = t.getAttribute("data-colour");
      if (tImg === targetImg || (tCol && colorName && tCol.toLowerCase().trim() === colorName.toLowerCase().trim())) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });
  }

  if (colorName) {
    showToast(`Showing ${colorName} variant`);
  }
}

function addCartFromDetail(id) {
  const p = products.find(x => x.id === id);
  if (!p || p.stock < 1) {
    alert("Sorry, this item is out of stock.");
    return;
  }
  const col = document.getElementById("selectedColour")?.textContent?.trim() || (p.colors && p.colors[0] ? p.colors[0] : "Classic");
  cart.push(id);
  localStorage.setItem("as_cart", JSON.stringify(cart));
  updateCartBadge();
  showToast(`Added "${p.name} (${col})" to your shopping bag!`, "success");
  closeDetails();
}

function directBuyFromDetail(id) {
  const p = products.find(x => x.id === id);
  if (!p || p.stock < 1) {
    alert("This product is currently out of stock.");
    return;
  }
  const col = document.getElementById("selectedColour")?.textContent?.trim() || (p.colors && p.colors[0] ? p.colors[0] : "Classic");
  const colImg = getProductColorImage(p, col);
  const sizeEl = document.getElementById("selectedSizeLabel");
  const size = sizeEl ? sizeEl.textContent.trim() : "";

  activeCheckoutContext = [{
    ...p,
    qty: 1,
    selectedColor: col,
    selectedSize: size,
    name: `${p.name} (${col}${size ? ' • ' + size : ''})`,
    image: colImg || p.image
  }];
  closeDetails();
  openCheckoutModal();
}

function selectDetailSize(btn, size) {
  document.querySelectorAll(".detail-size-pill").forEach(p => p.classList.remove("selected"));
  btn.classList.add("selected");
  const lbl = document.getElementById("selectedSizeLabel");
  if (lbl) lbl.textContent = size;
}

function checkDeliveryPincode() {
  const input = document.getElementById("pincodeInput");
  const res = document.getElementById("pincodeResult");
  if (!input || !res) return;
  const pin = input.value.trim();
  if (!/^\d{6}$/.test(pin)) {
    res.innerHTML = `<span style="color: var(--danger); font-size: 12px; font-weight: 600;">⚠️ Please enter a valid 6-digit Indian PIN code.</span>`;
    return;
  }
  const d = new Date();
  d.setDate(d.getDate() + 3);
  const dateStr = d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
  res.innerHTML = `
    <div style="margin-top: 6px; padding: 8px 12px; background: #eef8f1; border-radius: 8px; border: 1px solid #c2e6cc;">
      <div style="color: var(--success); font-weight: 700; font-size: 12.5px;">⚡ Express Delivery by ${dateStr} (FREE)</div>
      <div style="color: #444; font-size: 11.5px; margin-top: 2px;">✓ Cash on Delivery (COD) available at PIN <b>${pin}</b> • 7 Days Doorstep Return</div>
    </div>
  `;
}

function copyDetailCoupon(code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  showToast(`Coupon "${code}" copied! Paste at checkout for instant savings.`);
}

function toggleDetailAccordion(headerEl) {
  const item = headerEl.parentElement;
  if (!item) return;
  item.classList.toggle("active");
}

// --- Interactive Customer Reviews Submission Engine ---
function toggleReviewForm(productId) {
  const box = document.getElementById(`reviewFormBox_${productId}`);
  if (box) box.classList.toggle("open");
}

function setReviewStars(productId, rating) {
  const hiddenInput = document.getElementById(`selectedStarVal_${productId}`);
  if (hiddenInput) hiddenInput.value = rating;
  const picker = document.getElementById(`starPicker_${productId}`);
  if (!picker) return;
  const stars = picker.querySelectorAll(".star-picker-item");
  stars.forEach((s, idx) => {
    if (idx < rating) s.classList.add("active");
    else s.classList.remove("active");
  });
}

function submitCustomerReview(e, productId) {
  e.preventDefault();
  const authorInput = document.getElementById(`reviewAuthor_${productId}`);
  const commentInput = document.getElementById(`reviewComment_${productId}`);
  const starInput = document.getElementById(`selectedStarVal_${productId}`);
  if (!authorInput || !commentInput) return;

  const stars = Number(starInput?.value || 5);
  const author = authorInput.value.trim();
  const comment = commentInput.value.trim();

  const savedReviews = JSON.parse(localStorage.getItem(`as_reviews_${productId}`) || "[]");
  savedReviews.unshift({
    author,
    stars,
    comment,
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  });
  localStorage.setItem(`as_reviews_${productId}`, JSON.stringify(savedReviews));

  // Update product review count and average rating
  const p = products.find(x => x.id === productId);
  if (p) {
    p.reviews = (p.reviews || 100) + 1;
    p.rating = Number(((p.rating * (p.reviews - 1) + stars) / p.reviews).toFixed(1));
    localStorage.setItem("as_products", JSON.stringify(products));
    renderProducts();
  }

  showToast(`✓ Thank you ${author}! Your verified review has been published.`, "success");
  fireCelebrationConfetti();
  viewProduct(productId);
}

// --- Real-Time Order Lifecycle Simulator (Viva Examination Feature) ---
function advanceOrderStage(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const stageTitles = {
    1: "Order Placed",
    2: "Packed & Quality Checked",
    3: `Shipped via ${order.carrier || 'Delhivery Express'} (AWB: ${order.trackingNumber})`,
    4: "Out for Delivery with Courier Partner",
    5: "Delivered Successfully"
  };

  if ((order.statusStep || 1) >= 5) {
    order.statusStep = 1;
    order.status = stageTitles[1];
    showToast(`Order #${order.id} tracking reset to "Order Placed"`, "info");
  } else {
    order.statusStep = (order.statusStep || 1) + 1;
    order.status = stageTitles[order.statusStep];
    showToast(`⚡ Order #${order.id} advanced to "${order.status}"!`, "success");
    if (order.statusStep === 5) {
      fireCelebrationConfetti();
    }
  }

  localStorage.setItem("as_orders", JSON.stringify(orders));

  // Re-render invoice if currently open
  const invModal = document.getElementById("invoiceModal");
  if (invModal && invModal.classList.contains("open")) {
    showInvoice(order.id);
  }

  // Re-render orders list if currently open
  const ordModal = document.getElementById("ordersModal");
  if (ordModal && ordModal.classList.contains("open")) {
    openOrdersModal();
  }
}

// --- Celebratory Canvas Confetti & Audio Chime Engine ---
function fireCelebrationConfetti() {
  // Web Audio API synthetic chime
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
    });
  } catch (e) {}

  // Canvas Confetti
  let canvas = document.getElementById("confettiCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  const colors = ["#c9a24a", "#dfba63", "#7b1730", "#9e2342", "#ffffff", "#ffd21a", "#e89eb0"];
  const pieces = [];
  for (let i = 0; i < 110; i++) {
    pieces.push({
      x: Math.random() * width,
      y: Math.random() * (height * 0.35) - 20,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2.5,
      speedX: Math.random() * 4 - 2,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 8 - 4
    });
  }

  const startTime = Date.now();
  function render() {
    ctx.clearRect(0, 0, width, height);
    const elapsed = Date.now() - startTime;
    const opacity = Math.max(0, 1 - elapsed / 3600);

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    if (elapsed < 3600) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      canvas.remove();
    }
  }
  requestAnimationFrame(render);
}

// --- Store Admin Catalog Export & Import Engine ---
function exportCatalogJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
  const dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `shyn_catalog_${new Date().toISOString().slice(0, 10)}.json`);
  dlAnchorElem.click();
  showToast("Store catalog exported as JSON file successfully!", "success");
}

function importCatalogJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported) || !imported.length) {
        throw new Error("Invalid format: Expected a JSON array of products.");
      }
      products = imported;
      localStorage.setItem("as_products", JSON.stringify(products));
      renderFilters();
      renderProducts();
      renderAdmin();
      showToast(`✓ Successfully imported ${products.length} products to store catalog!`, "success");
    } catch (err) {
      alert("Error importing catalog: " + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function colourGradient(name) {
  const map = {
    maroon: "#7b1730",
    gold: "#c9a24a",
    "royal blue": "#1a468c",
    indigo: "#263259",
    "mustard yellow": "#dca218",
    "forest green": "#1a5e3a",
    "crimson red": "#a3122c",
    burgundy: "#541223",
    "emerald green": "#08664b",
    "deep purple": "#521869",
    teal: "#167980",
    "golden mustard": "#c99a2a",
    "powder pink": "#e89eb0",
    lilac: "#b39cd0",
    "sky blue": "#4ca1d9",
    "navy blue": "#0e2340",
    "wine red": "#611227",
    black: "#222222",
    "jet black": "#111111",
    white: "#f5f3ee",
    beige: "#d1bea8",
    "olive green": "#556b2f",
    olive: "#556b2f",
    rust: "#b7410e",
    "charcoal grey": "#383c42",
    "heather grey": "#888c94",
    khaki: "#b8976b"
  };
  const key = (name || "").toLowerCase().trim();
  const color = map[key] || "#7b1730";
  return `linear-gradient(135deg, ${color}, #c9a24a)`;
}

// --- Store Admin Panel (CRUD Operations) ---
function renderAdmin() {
  const tbody = document.getElementById("adminRows");
  if (!tbody) return;

  tbody.innerHTML = products.map(p => `
    <tr>
      <td><b>${p.name}</b></td>
      <td>${p.category}</td>
      <td>${p.gender || "Women"}</td>
      <td>₹${p.price.toLocaleString()}</td>
      <td><span style="font-weight: 700; color: ${p.stock < 5 ? 'var(--danger)' : 'var(--success)'}">${p.stock}</span></td>
      <td>
        <button class="secondary" style="padding: 5px 10px; font-size: 12px;" onclick="openEditor(${p.id})">Edit</button>
        <button class="secondary" style="padding: 5px 10px; font-size: 12px; color: var(--danger);" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}

function openEditor(id) {
  const modal = document.getElementById("modal");
  modal.classList.add("open");

  const catSelect = document.getElementById("pcat");
  const uniqueCats = [...new Set([...products.map(p => p.category), "Silk", "Cotton", "Banarasi", "Formal Shirts", "Formal Pants"])];
  catSelect.innerHTML = uniqueCats.map(c => `<option value="${c}">${c}</option>`).join("");

  const p = products.find(x => x.id === id);
  document.getElementById("modalTitle").textContent = p ? "Edit Product" : "Add Product";
  document.getElementById("pid").value = p?.id || "";
  document.getElementById("pname").value = p?.name || "";
  document.getElementById("pcat").value = p?.category || uniqueCats[0];
  document.getElementById("pgender").value = p?.gender || selectedGender;
  document.getElementById("pprice").value = p?.price || "";
  document.getElementById("poriginal").value = p?.original || "";
  document.getElementById("pstock").value = p?.stock ?? "";
  document.getElementById("pcolors").value = (p?.colors || []).join(", ");
  document.getElementById("pdesc").value = p?.desc || "";

  const photos = (p?.photos && p.photos.length) ? p.photos : (p?.image ? [p.image] : []);
  document.getElementById("pphotos").dataset.existing = JSON.stringify(photos);
  renderPhotoPreview(photos);
}

function closeEditor() {
  document.getElementById("modal").classList.remove("open");
}

function getProductPhotos() {
  try {
    return JSON.parse(document.getElementById("pphotos").dataset.existing || "[]");
  } catch (e) {
    return [];
  }
}

function setProductPhotos(photos) {
  document.getElementById("pphotos").dataset.existing = JSON.stringify(photos);
  renderPhotoPreview(photos);
}

function renderPhotoPreview(photos) {
  const box = document.getElementById("photoPreview");
  if (!box) return;
  box.innerHTML = (photos || []).map((src, i) => `
    <div class="photo-wrap">
      <img src="${src}" onerror="this.style.opacity='.35';">
      <button type="button" class="photo-remove" onclick="removeProductPhoto(${i})">×</button>
    </div>
  `).join("");
}

function removeProductPhoto(index) {
  const photos = getProductPhotos();
  photos.splice(index, 1);
  setProductPhotos(photos);
}

function isValidImageUrl(url) {
  try {
    const u = new URL(url);
    return /^https?:$/.test(u.protocol);
  } catch (e) {
    return false;
  }
}

function previewImageUrl() {
  const url = document.getElementById("pimage").value.trim();
  const error = document.getElementById("photoError");
  if (!isValidImageUrl(url)) {
    error.textContent = "Please paste a direct image URL beginning with http:// or https://";
    error.style.color = "var(--danger)";
    return;
  }
  error.textContent = "Verifying image...";
  error.style.color = "var(--muted)";
  const img = new Image();
  img.onload = () => {
    error.textContent = "✓ Image URL verified! Click Add URL to attach.";
    error.style.color = "var(--success)";
  };
  img.onerror = () => {
    error.textContent = "Could not load image from this URL.";
    error.style.color = "var(--danger)";
  };
  img.src = url;
}

function addImageUrl() {
  const input = document.getElementById("pimage");
  const error = document.getElementById("photoError");
  const url = input.value.trim();
  if (!isValidImageUrl(url)) {
    error.textContent = "Please enter a valid HTTP/HTTPS image URL.";
    error.style.color = "var(--danger)";
    return;
  }
  const photos = getProductPhotos();
  if (!photos.includes(url)) photos.push(url);
  setProductPhotos(photos);
  input.value = "";
  error.textContent = "";
}

// Local File Upload listener (FileReader base64)
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("pphotos");
  if (fileInput) {
    fileInput.addEventListener("change", async function() {
      const files = [...this.files];
      if (!files.length) return;
      const existing = getProductPhotos();
      const newPhotos = [];
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const dataUrl = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
        newPhotos.push(dataUrl);
      }
      setProductPhotos([...existing, ...newPhotos]);
    });
  }

  const prodForm = document.getElementById("productForm");
  if (prodForm) {
    prodForm.onsubmit = function(e) {
      e.preventDefault();
      const id = Number(document.getElementById("pid").value);
      const photos = getProductPhotos();
      const typedUrl = document.getElementById("pimage").value.trim();
      if (typedUrl && isValidImageUrl(typedUrl) && !photos.includes(typedUrl)) {
        photos.unshift(typedUrl);
      }
      const colors = document.getElementById("pcolors").value.split(",").map(x => x.trim()).filter(Boolean);

      const pData = {
        id: id || Date.now(),
        gender: document.getElementById("pgender").value,
        name: document.getElementById("pname").value.trim(),
        category: document.getElementById("pcat").value,
        price: Number(document.getElementById("pprice").value),
        original: Number(document.getElementById("poriginal").value) || Number(document.getElementById("pprice").value),
        stock: Number(document.getElementById("pstock").value),
        colors: colors.length ? colors : ["Navy Blue", "Maroon"],
        image: photos[0] || "",
        photos: photos,
        desc: document.getElementById("pdesc").value.trim()
      };

      if (id) {
        products = products.map(x => x.id === id ? { ...x, ...pData } : x);
        showToast("Product updated successfully!");
      } else {
        products.push(pData);
        showToast("New product added to store!");
      }

      localStorage.setItem("as_products", JSON.stringify(products));
      renderFilters();
      renderProducts();
      renderAdmin();
      closeEditor();
    };
  }
});

function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  products = products.filter(x => x.id !== id);
  localStorage.setItem("as_products", JSON.stringify(products));
  renderFilters();
  renderProducts();
  renderAdmin();
  showToast("Product deleted successfully.");
}

function resetProducts() {
  if (!confirm("Are you sure you want to reset all products to the default catalog? Any custom added products will be reset.")) return;
  products = JSON.parse(JSON.stringify(demo));
  localStorage.setItem("as_products", JSON.stringify(products));
  localStorage.setItem("as_img_version", CATALOG_SYNC_VERSION);
  renderFilters();
  renderProducts();
  renderAdmin();
  showToast("Store catalog reset to default demo products!");
}

// --- AI Stylist & Shopping Assistant Chatbot Engine ---
let chatbotInitialized = false;

function toggleChatbot() {
  const windowEl = document.getElementById("chatbotWindow");
  if (!windowEl) return;
  const isOpen = windowEl.classList.toggle("open");
  if (isOpen && !chatbotInitialized) {
    initChatbot();
    chatbotInitialized = true;
  }
  if (isOpen) {
    setTimeout(() => {
      document.getElementById("chatInput")?.focus();
    }, 250);
  }
}

function initChatbot() {
  const container = document.getElementById("chatMessages");
  if (!container) return;

  container.innerHTML = `
    <div class="chat-bubble bot">
      <b>Namaste! 🙏 Welcome to SHYN.</b><br>
      I am your personal AI Stylist and shopping assistant. How can I help you today?
      <div class="chat-chips-container">
        <button class="chat-chip" onclick="sendQuickPrompt('Customer Assistance Phone & Mail')">📞 Helpline, Mail &amp; Support</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Recommend a Wedding Saree')">👗 Recommend a Wedding Saree</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Show Men Formal Wear')">👔 Men's Formal Shirts &amp; Pants</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Available Discount Coupons')">🏷️ Available Discount Coupons</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Track My Order')">📦 Track My Order Status</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Return &amp; Exchange Policy')">↩ 7-Day Returns &amp; Exchanges</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Size &amp; Draping Guide')">📏 Saree &amp; Size Guide</button>
      </div>
    </div>
  `;
}

function appendUserMessage(text) {
  const container = document.getElementById("chatMessages");
  if (!container) return;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble user";
  bubble.textContent = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function appendBotMessage(htmlContent) {
  const container = document.getElementById("chatMessages");
  if (!container) return;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble bot";
  bubble.innerHTML = htmlContent;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById("chatMessages");
  if (!container) return null;
  const indicator = document.createElement("div");
  indicator.id = "chatTypingIndicator";
  indicator.className = "chat-bubble bot typing-indicator";
  indicator.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
  return indicator;
}

function removeTypingIndicator() {
  const el = document.getElementById("chatTypingIndicator");
  if (el) el.remove();
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById("chatInput");
  if (input) input.value = promptText;
  handleChatSubmit();
}

function sendChatMessage(text) {
  const input = document.getElementById("chatInput");
  if (text && input) input.value = text;
  handleChatSubmit();
}

function handleChatSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("chatInput");
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;

  appendUserMessage(query);
  input.value = "";

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    processBotQuery(query);
  }, 450);
}

function processBotQuery(rawQuery) {
  const q = rawQuery.toLowerCase();

  // 1. GREETINGS & CASUAL INQUIRIES
  if (/^(hi|hello|hey|namaste|good morning|good evening|kaise ho|greetings)/.test(q)) {
    appendBotMessage(`
      Hello! 😊 How can I style you today? You can ask me to:
      <div class="chat-chips-container">
        <button class="chat-chip" onclick="sendQuickPrompt('Customer Assistance Phone & Mail')">📞 Helpline &amp; Mail</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Show me sarees under 3000')">🔍 Sarees under ₹3,000</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Best Men Shirts')">👔 Executive Men's Shirts</button>
        <button class="chat-chip" onclick="sendQuickPrompt('Discount Coupons')">🏷️ Available Coupons</button>
      </div>
    `);
    return;
  }

  // CUSTOMER ASSISTANCE, PHONE, MAIL & CONTACT
  if (q.includes("phone") || q.includes("call") || q.includes("number") || q.includes("mail") || q.includes("email") || q.includes("contact") || q.includes("assistance") || q.includes("help") || q.includes("customer care") || q.includes("support") || q.includes("whatsapp")) {
    appendBotMessage(`
      🎧 <b>SHYN Customer Assistance &amp; Help Desk:</b><br>
      We are here to assist you with sarees, sizing, orders, and styling!
      <div style="margin: 10px 0; background: #fffcf8; border: 1.5px solid #ebdccb; border-radius: 12px; padding: 12px; font-size: 13px;">
        <div style="margin-bottom: 6px;">📞 <b>Toll-Free Helpline:</b> <a href="tel:+9118002027496" style="color: var(--maroon); font-weight: 700;">1800-202-7496</a></div>
        <div style="margin-bottom: 6px;">💬 <b>WhatsApp Concierge:</b> <a href="https://wa.me/917726874080?text=Hi%20SHYN%20Team%2C%20I%20need%20assistance." target="_blank" style="color: #128c7e; font-weight: 700;">+91 77268 74080</a></div>
        <div style="margin-bottom: 6px;">✉️ <b>Email Support:</b> <a href="mailto:samargarg019@gmail.com" style="color: var(--maroon); font-weight: 700;">samargarg019@gmail.com</a></div>
        <div style="font-size: 11px; color: #888; border-top: 1px dashed #ded3c9; padding-top: 6px; margin-top: 6px;">
          🕒 Operational Hours: Mon–Sat, 9:30 AM – 7:30 PM IST (Prompt response)
        </div>
      </div>
      <div class="chat-chips-container">
        <button class="chat-chip" onclick="openAssistanceModal()">🎧 Open Full Customer Assistance Center</button>
        <button class="chat-chip" onclick="openOrdersModal()">📦 Track My Order Status</button>
        <button class="chat-chip" onclick="openReturnsModal()">↩ Schedule 7-Day Doorstep Return</button>
      </div>
    `);
    return;
  }

  // SIZE & DRAPING GUIDE
  if (q.includes("size") || q.includes("length") || q.includes("measurement") || q.includes("fitting") || q.includes("blouse") || q.includes("fall") || q.includes("pico") || q.includes("chart")) {
    appendBotMessage(`
      📏 <b>Saree &amp; Menswear Sizing Guide:</b><br>
      • <b>Saree Drape:</b> Standard 5.5 meters length + 0.8 meter matching unstitched blouse piece.<br>
      • <b>Finished Fall &amp; Pico:</b> Edges are pre-hemmed for ready draping.<br>
      • <b>Menswear:</b> Available in sizes 38 (S), 40 (M), 42 (L), 44 (XL) in modern slim-tailored fit.<br>
      <button class="chat-product-btn" style="margin-top: 8px;" onclick="openSizeGuideModal()">📐 Open Complete Size &amp; Measurement Guide</button>
    `);
    return;
  }

  // 2. COUPONS & DISCOUNTS
  if (q.includes("coupon") || q.includes("discount") || q.includes("offer") || q.includes("promo") || q.includes("code") || q.includes("sale")) {
    appendBotMessage(`
      🎉 <b>Exclusive SHYN Discount Coupons:</b>
      <div style="margin: 8px 0; display: flex; flex-direction: column; gap: 6px;">
        <div>🏷️ <b>SHYN10</b> — 10% Instant Discount on all orders</div>
        <div>🎉 <b>FESTIVE500</b> — Flat ₹500 Off on orders above ₹2,500</div>
        <div>✨ <b>SHYN20</b> — 20% Off on orders above ₹3,000</div>
        <div>🎁 <b>WELCOME50</b> — Flat ₹150 Off for welcome purchase</div>
      </div>
      You can apply any of these promo codes directly in your <b>Cart</b> or during <b>Checkout</b>!
    `);
    return;
  }

  // 3. ORDER TRACKING
  if (q.includes("track") || q.includes("order") || q.includes("where is my") || q.includes("status") || q.includes("shyn-")) {
    if (!orders || !orders.length) {
      appendBotMessage(`
        📦 <b>Order Status:</b><br>
        You haven't placed any orders yet. Once you place an order via <b>Cash on Delivery</b> or <b>Online Payment</b>, you can track it live with BlueDart Express!
        <div class="chat-chips-container">
          <button class="chat-chip" onclick="sendQuickPrompt('Recommend a Wedding Saree')">👗 Explore Saree Collection</button>
        </div>
      `);
    } else {
      const latest = orders[0];
      appendBotMessage(`
        📦 <b>Latest Order: ${latest.id}</b><br>
        • Status: <b style="color: var(--success);">${latest.status}</b><br>
        • Carrier: <b>${latest.carrier}</b> (AWB: ${latest.trackingNumber})<br>
        • Est. Delivery: <b>${latest.estimatedDelivery}</b><br>
        • Amount: <b>₹${latest.total.toLocaleString()}</b> (${latest.paymentMethod})<br>
        <button class="chat-product-btn" style="margin-top: 8px;" onclick="showInvoice('${latest.id}')">📄 View Official Invoice</button>
      `);
    }
    return;
  }

  // 4. RETURN & EXCHANGE POLICIES
  if (q.includes("return") || q.includes("exchange") || q.includes("refund") || q.includes("cancel")) {
    appendBotMessage(`
      ↩ <b>SHYN 7-Day Hassle-Free Returns:</b><br>
      • All sarees and apparel are eligible for <b>7-day easy exchange &amp; return</b> from the delivery date.<br>
      • Items must be unused with tags and original packaging intact.<br>
      • Pickups are scheduled directly from your doorstep across India!
    `);
    return;
  }

  // 5. SHIPPING & DELIVERY CHARGES
  if (q.includes("shipping") || q.includes("delivery") || q.includes("cod") || q.includes("cash on delivery")) {
    appendBotMessage(`
      🚚 <b>Delivery &amp; Payment Information:</b><br>
      • <b>FREE Delivery</b> on all orders above ₹1,000 (Flat ₹99 for smaller orders).<br>
      • Standard express shipping takes <b>3–5 business days</b> across India.<br>
      • We support <b>Cash on Delivery (COD)</b> as well as <b>Razorpay (UPI, Cards, NetBanking)</b>.
    `);
    return;
  }

  // 6. FABRIC CARE & DRAPING TIPS
  if (q.includes("care") || q.includes("wash") || q.includes("clean") || q.includes("drape") || q.includes("iron")) {
    appendBotMessage(`
      🧵 <b>Silk &amp; Handloom Care Guide:</b><br>
      • <b>Pure Silk &amp; Banarasi:</b> Dry clean only to preserve golden zari lustre.<br>
      • <b>Cotton Handloom &amp; Linen:</b> Gentle hand wash in cold water with mild liquid detergent.<br>
      • <b>Storage Tip:</b> Wrap pure silk sarees in soft breathable cotton or muslin cloth.
    `);
    return;
  }

  // 7. PRODUCT SEARCH & RECOMMENDATION ENGINE
  let matchingProds = [...products];
  let searchWord = "";

  // Check gender / collection
  if (q.includes("men") || q.includes("shirt") || q.includes("pant") || q.includes("trouser") || q.includes("jogger") || q.includes("chinos") || q.includes("t-shirt") || q.includes("tshirt")) {
    matchingProds = matchingProds.filter(p => (p.gender || "Women") === "Men");
  } else if (q.includes("women") || q.includes("saree") || q.includes("silk") || q.includes("banarasi") || q.includes("cotton") || q.includes("wedding") || q.includes("organza") || q.includes("bridal")) {
    matchingProds = matchingProds.filter(p => (p.gender || "Women") === "Women");
  }

  // Check specific categories/fabrics
  if (q.includes("banarasi")) matchingProds = matchingProds.filter(p => p.name.toLowerCase().includes("banarasi") || p.category.toLowerCase().includes("banarasi"));
  else if (q.includes("kanjivaram")) matchingProds = matchingProds.filter(p => p.name.toLowerCase().includes("kanjivaram") || p.category.toLowerCase().includes("silk"));
  else if (q.includes("wedding") || q.includes("bridal") || q.includes("shaadi")) matchingProds = matchingProds.filter(p => p.category.toLowerCase().includes("wedding") || p.name.toLowerCase().includes("bridal") || p.name.toLowerCase().includes("wedding"));
  else if (q.includes("cotton")) matchingProds = matchingProds.filter(p => p.category.toLowerCase().includes("cotton") || p.name.toLowerCase().includes("cotton"));
  else if (q.includes("organza")) matchingProds = matchingProds.filter(p => p.category.toLowerCase().includes("organza") || p.name.toLowerCase().includes("organza"));
  else if (q.includes("floral")) matchingProds = matchingProds.filter(p => p.name.toLowerCase().includes("floral") || p.desc.toLowerCase().includes("floral"));
  else if (q.includes("linen")) matchingProds = matchingProds.filter(p => p.name.toLowerCase().includes("linen") || p.category.toLowerCase().includes("cotton"));
  else if (q.includes("shirt")) matchingProds = matchingProds.filter(p => p.category.toLowerCase().includes("shirt") || p.name.toLowerCase().includes("shirt"));
  else if (q.includes("pant") || q.includes("trouser") || q.includes("chinos")) matchingProds = matchingProds.filter(p => p.category.toLowerCase().includes("pant") || p.category.toLowerCase().includes("trouser") || p.name.toLowerCase().includes("trouser"));
  else if (q.includes("jogger")) matchingProds = matchingProds.filter(p => p.category.toLowerCase().includes("jogger") || p.name.toLowerCase().includes("jogger"));
  else if (q.includes("tshirt") || q.includes("t-shirt") || q.includes("tee")) matchingProds = matchingProds.filter(p => p.category.toLowerCase().includes("t-shirt") || p.name.toLowerCase().includes("t-shirt"));

  // Check price filters (e.g. under 3000, under 2000)
  const priceMatch = q.match(/(?:under|below|less than|within)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
  if (priceMatch) {
    const maxP = Number(priceMatch[1]);
    matchingProds = matchingProds.filter(p => p.price <= maxP);
  }

  if (matchingProds.length) {
    const topMatches = matchingProds.slice(0, 3);
    const cardsHtml = topMatches.map(p => `
      <div class="chat-product-card">
        <div class="chat-product-thumb" style="background-image: url('${p.image}');"></div>
        <div class="chat-product-details">
          <div class="chat-product-name">${p.name}</div>
          <div class="chat-product-price">₹${p.price.toLocaleString()}</div>
          <div class="chat-product-actions">
            <button class="chat-product-btn" onclick="viewProduct(${p.id})">View Details</button>
            <button class="chat-product-btn" style="background: var(--gold); color: #111;" onclick="addCart(${p.id})">+ Cart</button>
          </div>
        </div>
      </div>
    `).join("");

    appendBotMessage(`
      ✨ Here are the best curated recommendations for you:
      ${cardsHtml}
    `);
    return;
  }

  // 8. FALLBACK ASSISTANCE
  appendBotMessage(`
    I'd love to help you find the right look! Try asking me:
    <div class="chat-chips-container">
      <button class="chat-chip" onclick="sendQuickPrompt('Banarasi Silk Saree')">✨ Banarasi Silk Zari Saree</button>
      <button class="chat-chip" onclick="sendQuickPrompt('Pure Cotton Handloom Saree')">🧵 Pure Cotton Handloom Saree</button>
      <button class="chat-chip" onclick="sendQuickPrompt('Classic Formal Shirt')">👔 Men's Classic Formal Shirt</button>
      <button class="chat-chip" onclick="sendQuickPrompt('Available Discount Coupons')">🏷️ Active Discount Coupons</button>
    </div>
  `);
}

// --- Customer Assistance & Help Center Engine ---
function openAssistanceModal() {
  document.getElementById("assistanceModal")?.classList.add("open");
}

function closeAssistanceModal() {
  document.getElementById("assistanceModal")?.classList.remove("open");
}

function openReturnsModal() {
  closeAssistanceModal();
  document.getElementById("returnsModal")?.classList.add("open");
}

function closeReturnsModal() {
  document.getElementById("returnsModal")?.classList.remove("open");
}

function openSizeGuideModal() {
  closeAssistanceModal();
  document.getElementById("sizeGuideModal")?.classList.add("open");
}

function closeSizeGuideModal() {
  document.getElementById("sizeGuideModal")?.classList.remove("open");
}

function showSizeTab(tab) {
  const sareeTab = document.getElementById("sizeTabSaree");
  const menTab = document.getElementById("sizeTabMen");
  const sareeBtn = document.getElementById("tabSareeBtn");
  const menBtn = document.getElementById("tabMenBtn");

  if (tab === "saree") {
    if (sareeTab) sareeTab.style.display = "block";
    if (menTab) menTab.style.display = "none";
    if (sareeBtn) sareeBtn.className = "primary";
    if (menBtn) menBtn.className = "secondary";
  } else {
    if (sareeTab) sareeTab.style.display = "none";
    if (menTab) menTab.style.display = "block";
    if (sareeBtn) sareeBtn.className = "secondary";
    if (menBtn) menBtn.className = "primary";
  }
}

function toggleFaq(headerEl) {
  const item = headerEl.closest(".assist-faq-item");
  if (!item) return;
  item.classList.toggle("active");
}

function submitAssistanceTicket(e) {
  e.preventDefault();
  const name = document.getElementById("assistName")?.value.trim();
  const phone = document.getElementById("assistPhone")?.value.trim();
  const email = document.getElementById("assistEmail")?.value.trim();
  const topic = document.getElementById("assistTopic")?.value;
  const message = document.getElementById("assistMessage")?.value.trim();

  if (!name || !phone || !email || !message) {
    alert("Please complete all required fields.");
    return;
  }

  const ticketId = "SHYN-CARE-" + Math.floor(1000 + Math.random() * 9000);
  const tickets = JSON.parse(localStorage.getItem("as_support_tickets") || "[]");
  tickets.unshift({
    id: ticketId,
    name, phone, email, topic, message,
    date: new Date().toLocaleString("en-IN"),
    status: "Open • Assigned to Concierge"
  });
  localStorage.setItem("as_support_tickets", JSON.stringify(tickets));

  e.target.reset();
  showToast(`✓ Ticket #${ticketId} created! Our concierge will contact you within 2 hrs.`, "success");
  fireCelebrationConfetti();
  closeAssistanceModal();
}

function submitReturnRequest(e) {
  e.preventDefault();
  const orderId = document.getElementById("returnOrderId")?.value.trim();
  const actionType = document.getElementById("returnActionType")?.value;
  const reason = document.getElementById("returnReason")?.value;
  const pickupAddress = document.getElementById("returnPickupAddress")?.value.trim();

  if (!orderId || !pickupAddress) {
    alert("Please provide your Order ID and Pickup Address.");
    return;
  }

  const returnReqId = "RET-" + Math.floor(10000 + Math.random() * 90000);
  const returns = JSON.parse(localStorage.getItem("as_return_requests") || "[]");
  returns.unshift({
    id: returnReqId,
    orderId, actionType, reason, pickupAddress,
    date: new Date().toLocaleString("en-IN"),
    status: "Pickup Scheduled with BlueDart"
  });
  localStorage.setItem("as_return_requests", JSON.stringify(returns));

  e.target.reset();
  showToast(`✓ Return Request #${returnReqId} scheduled! BlueDart reverse pickup assigned.`, "success");
  fireCelebrationConfetti();
  closeReturnsModal();
}

// --- App Bootstrapper ---
window.addEventListener("DOMContentLoaded", () => {
  initLoginTheme();
  updateAccountDisplay();
  updateCartBadge();
  updateWishlistBadge();
  renderFilters();
  renderProducts();
  renderAdmin();
  showSiteLoginGate();
});