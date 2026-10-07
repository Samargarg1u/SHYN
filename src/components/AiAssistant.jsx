import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ShoppingBag, 
  Eye, 
  Tag, 
  RotateCcw, 
  ChevronDown,
  Minimize2, 
  Maximize2, 
  Check, 
  Package, 
  Heart,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  CheckCircle2,
  Printer,
  ArrowRight,
  SlidersHorizontal,
  Compass,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { printTaxInvoice } from '../utils/invoiceGenerator';
import { COUPONS } from '../data/coupons';

export default function AiAssistant({
  products = [],
  orders = [],
  onOpenDetails,
  onAddToCart,
  onOpenOrders,
  onOpenWishlist
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Advanced Voice & Audio States
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Interactive Style Wizard (Royal Look Finder)
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardSelections, setWizardSelections] = useState({
    occasion: '',
    fabric: '',
    palette: ''
  });

  // Track recently added item for temporary UI feedback
  const [addedItemIds, setAddedItemIds] = useState({});
  const [copiedCoupon, setCopiedCoupon] = useState('');

  // Initial welcome message from Shyna (Royal AI Stylist 2.0)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Namaste & Welcome to SHYN! 👑 I am **Shyna**, your Advanced Royal AI Stylist & Couture Concierge.\n\nI can curate auspicious bridal trousseaus, match heirloom gold zari weaves, find sartorial menswear, look up your live orders, or launch our interactive **Royal Look Advisor**.",
      quickSuggestions: [
        "✨ Launch Royal Look Advisor",
        "👑 Best Wedding Sarees under ₹5,000",
        "🧵 How to identify Pure Silk?",
        "👔 Curate Men's Reception Look",
        "🎟️ What discount coupons are active?",
        "📦 Track my order delivery"
      ]
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Soft Royal Bell Chime using Web Audio API (Offline & lightweight)
  const playChime = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5 note
      osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.15); // E6 note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(440, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    } catch {
      // AudioContext fallback
    }
  }, [isSoundMuted]);

  // Voice Read-Out (Text-to-Speech)
  const speakText = useCallback((text) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#•]/g, '').slice(0, 280);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
      if (indianVoice) utterance.voice = indianVoice;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback
    }
  }, [isVoiceEnabled]);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Setup Web Speech API for Voice Input
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript || '';
        if (transcript.trim()) {
          setInputMessage(transcript);
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition start error:', err);
      }
    }
  };

  // Copy Coupon Code Handler
  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(''), 2200);
  };

  // 1-Click Add To Bag with Instant Feedback
  const handleQuickAdd = (product) => {
    onAddToCart(product);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // --- Advanced Intelligent Couture NLP Engine ---
  const generateAiReply = (userQuery) => {
    const q = userQuery.toLowerCase().trim();
    const isHindi = /(kya|kaise|saree|shaadi|chahiye|dikhao|batao|kitna|pehna|achha|achhi|karo|bhejo|mujhe)/i.test(userQuery);

    // 1. Royal Look Advisor Trigger
    if (q.includes('advisor') || q.includes('wizard') || q.includes('look finder') || q.includes('curate my look') || q.includes('style quiz')) {
      setShowWizard(true);
      setWizardStep(1);
      return {
        text: isHindi
          ? "Bilkul! Maine aapke liye **Royal Look Advisor** khol diya hai. Bas 3 aasan steps me apna Occasion, Fabric aur Color chuniye — main aapko best luxury creations recommend karungi! ✨"
          : "Certainly! I have launched our interactive **Royal Look Advisor** above. Simply select your occasion, preferred weave, and color palette — I will generate your personalized royal curation!",
        quickSuggestions: ["Wedding Sarees", "Men's Formal", "Silk authenticity guide"]
      };
    }

    // 2. Real-Time Order Tracking & Live Lookup
    const orderMatch = q.match(/shyn-\d{5,8}/i) || (q.includes('track') || q.includes('status') || q.includes('where is my order') || q.includes('order kahan hai') || q.includes('delivery status'));
    if (orderMatch) {
      let matchedOrder = null;
      if (typeof orderMatch === 'object' && orderMatch[0]) {
        const searchedId = orderMatch[0].toUpperCase();
        matchedOrder = orders.find(o => String(o?.id || '').toUpperCase().includes(searchedId));
      } else if (orders.length > 0) {
        matchedOrder = orders[0]; // Most recent order
      }

      if (matchedOrder) {
        const custName = matchedOrder.shippingAddress?.name || matchedOrder.customer?.name || 'Valued Patron';
        const city = matchedOrder.shippingAddress?.city || 'Your Doorstep';
        const orderItems = Array.isArray(matchedOrder.items) ? matchedOrder.items : [];
        const grandTotal = Number(matchedOrder.grandTotal || matchedOrder.total || 0);

        return {
          text: isHindi
            ? `📦 **Order Found: ${matchedOrder.id}**\n\nPranaam ${custName}! Aapka order currently **${matchedOrder.status || 'Dispatched via BlueDart Express'}** state me hai. Ye **${city}** deliver hone ke liye transit me hai.`
            : `📦 **Live Order Tracking: ${matchedOrder.id}**\n\nNamaste ${custName}! Your royal shipment is currently **${matchedOrder.status || 'Dispatched via BlueDart Express'}** in express air-transit to **${city}** with insured tamper-proof packaging.`,
          trackedOrder: matchedOrder,
          actionButton: {
            label: "Open Full Live Tracking",
            action: () => onOpenOrders()
          },
          quickSuggestions: ["Download Tax Invoice", "Returns policy", "Active coupons"]
        };
      } else {
        return {
          text: isHindi
            ? "📦 **Live Order Tracking:**\n\nAap apna Order ID (jaise `SHYN-882194`) yahan type kar sakte hain, ya niche diye gaye button par click karke apne sabhi live orders aur BlueDart tracking dekh sakte hain."
            : "📦 **Live Order Tracking:**\n\nYou can provide your specific Order ID (e.g., `SHYN-882194`) to look it up instantly, or launch our live tracker below to review all your placed orders and BlueDart dispatches.",
          actionButton: {
            label: "View All Orders & Invoices",
            action: () => onOpenOrders()
          },
          quickSuggestions: ["Check pincode delivery time", "Help with my order", "Return & exchange policy"]
        };
      }
    }

    // 3. Discount Coupons & Special Privileges
    if (q.includes('coupon') || q.includes('discount') || q.includes('offer') || q.includes('promo') || q.includes('code') || q.includes('sale') || q.includes('off') || q.includes('chhoot')) {
      return {
        text: isHindi
          ? "👑 **SHYN Royal Exclusive Coupons & Discounts:**\n\nAap inme se koi bhi code shopping bag me apply kar sakte hain. Code copy karne ke liye **Copy Code** par click karein:"
          : "👑 **SHYN Haute Couture Privileges & Active Coupons:**\n\nHere are our currently authenticated promotional codes. Click **Copy Code** on any card to copy it directly for your shopping bag:",
        couponsList: Object.values(COUPONS),
        quickSuggestions: ["Apply in Shopping Bag", "Recommend Wedding Sarees", "Free shipping terms"]
      };
    }

    // 4. Fabric Authenticity & Silk Mark Guidance
    if (q.includes('silk mark') || q.includes('pure silk') || q.includes('authenticate') || q.includes('burn test') || q.includes('asli') || q.includes('nakli') || q.includes('pehchan') || (q.includes('zari') && q.includes('real'))) {
      return {
        text: isHindi
          ? "✨ **Asli Pure Silk & Gold Zari Ki Pehchan (Authentication Guide):**\n\n1. **Official Silk Mark:** SHYN ki har ek saree Central Silk Board dwara certified Silk Mark tag ke sath aati hai.\n2. **Touch & Temperature:** Pure mulberry silk ko chhoone par wo 2-3 seconds me warm feel deta hai, synthetic thanda rehta hai.\n3. **Traditional Burn Test:** Pure silk jalne par baalon jaisi khushboo aur powder jaisi black ash chhodta hai, polyester plastic ki tarah melt hota hai.\n4. **Royal Zari Lustre:** Real gold/silver zari me warm royal chamak hoti hai, artificial lurex ki tarah brassy glare nahi hoti."
          : "✨ **How to Authenticate Pure Heritage Silk & Zari:**\n\n1. **The Silk Mark Seal:** Every SHYN creation bears the official Silk Mark authentication certified by the Central Silk Board of India.\n2. **Thermal Touch:** Genuine mulberry silk warms immediately to body touch within seconds, whereas synthetic rayon remains cold.\n3. **Burn Test Heritage:** Pure silk filament burns with a singed organic scent and leaves crushable velvet ash, while polyester forms a hard bead.\n4. **Antique Zari Luster:** Authentic gold and silver dipped zari has a deep royal sheen rather than the brassy glare of artificial plastic lurex.",
        quickSuggestions: ["Recommend Banarasi Silk", "View Kanjivaram Sarees", "How to care for silk sarees"]
      };
    }

    // 5. Wedding / Bridal Saree Curation
    if (q.includes('wedding') || q.includes('bridal') || q.includes('shaadi') || q.includes('sangeet') || q.includes('reception') || q.includes('dulhan') || q.includes('trousseau') || q.includes('haldi')) {
      const weddingSarees = products.filter(p => 
        p.gender === 'Women' && (p.category === 'Wedding' || p.category === 'Banarasi' || p.name.toLowerCase().includes('wedding') || p.name.toLowerCase().includes('bridal'))
      );

      return {
        text: isHindi
          ? "👑 **Shaadi & Royal Bridal Collection:**\n\nDulhan aur royal wedding attendees ke liye humari **Heirloom Bridal Silk** aur **Kanjivaram Pure Gold Dipped Zari** sarees sabse shubh aur grand hain. Ye generational master weavers dwara pure Kadhwa weave me bani hain."
          : "👑 **Curated Royal Wedding & Bridal Trousseau:**\n\nFor royal nuptials and auspicious festivities, nothing commands reverence like our **Heirloom Heavy Bridal Silk** and **Pure Gold Dipped Kanjivaram** sarees. Handwoven in Varanasi and Kanchipuram using centuries-old pit-loom techniques.",
        recommendedProducts: weddingSarees.slice(0, 3),
        quickSuggestions: ["Show matching jewellery ideas", "Under ₹6,000 sarees", "View Red & Maroon sarees"]
      };
    }

    // 6. Sartorial Menswear & Groom / Formal Curation
    if (q.includes('men') || q.includes('shirt') || q.includes('trouser') || q.includes('pant') || q.includes('formal') || q.includes('kurta') || q.includes('sherwani') || q.includes('groom') || q.includes('ladka') || q.includes('dulha')) {
      const mensItems = products.filter(p => p.gender === 'Men');
      return {
        text: isHindi
          ? "👔 **Sartorial Menswear & Royal Groom Attire:**\n\nGentlemen ke liye humari collection me **100% Giza Long-Staple Egyptian Cotton** formal shirts aur tailored trousers shaandar fit aur luxury comfort dete hain. Festive occasions ke liye silk sherwani aur kurta sets perfect hain."
          : "👔 **The Sartorial Gentlemen's Collection:**\n\nTailored with 100% Giza Egyptian Cotton, wrinkle-resistant luxury twills, and Italian cut craftsmanship. From high-power boardrooms to black-tie evening receptions and wedding occasions.",
        recommendedProducts: mensItems.slice(0, 3),
        quickSuggestions: ["Classic Formal Shirts", "Wrinkle-resistant Trousers", "Switch to Women's Sarees"]
      };
    }

    // 7. Budget / Price Filtering ("under 3000", "under 5000", etc.)
    const priceNum = q.match(/under\s*(\d+)/) || q.match(/below\s*(\d+)/) || q.match(/(\d+)\s*(k|hazar|rupaye|rs|inr)/);
    if (priceNum || q.includes('budget') || q.includes('cheap') || q.includes('affordable') || q.includes('kam daam') || q.includes('sasti')) {
      let limit = 3500;
      if (priceNum) {
        const val = parseInt(priceNum[1], 10);
        limit = val < 100 ? val * 1000 : val;
      } else if (q.includes('2000') || q.includes('2k')) limit = 2000;
      else if (q.includes('5000') || q.includes('5k')) limit = 5000;
      else if (q.includes('3000') || q.includes('3k')) limit = 3000;

      const budgetProducts = products.filter(p => Number(p.price || 0) <= limit);
      return {
        text: isHindi
          ? `Aapke **₹${limit.toLocaleString('en-IN')}** ke budget me ye humare sabse best rated luxury creations hain, jisme pure fabric aur authentic craftsmanship dono milte hain:`
          : `Here are our finest handcrafted creations curated for your budget **under ₹${limit.toLocaleString('en-IN')}** without compromising on silk mark authenticity:`,
        recommendedProducts: budgetProducts.slice(0, 3),
        quickSuggestions: ["Active discount coupons", "View Wedding Sarees", "Check Free Delivery limit"]
      };
    }

    // 8. Color-Specific Queries
    const colorNames = ['maroon', 'red', 'gold', 'blue', 'indigo', 'yellow', 'green', 'mint', 'pink', 'ivory', 'beige', 'olive', 'black'];
    const matchedColor = colorNames.find(c => q.includes(c));
    if (matchedColor) {
      const colorProducts = products.filter(p => {
        const pColors = Array.isArray(p.colors) ? p.colors.join(' ').toLowerCase() : '';
        const pName = (p.name || '').toLowerCase();
        return pColors.includes(matchedColor) || pName.includes(matchedColor);
      });

      if (colorProducts.length > 0) {
        const capColor = matchedColor.charAt(0).toUpperCase() + matchedColor.slice(1);
        return {
          text: isHindi
            ? `Ye lijiye humari exquisite **${capColor}** color creations. Har weave ka color natural organic dye aur shimmering zari ke sath taiyaar kiya gaya hai:`
            : `Here are our exquisite creations in **${capColor}**. Dyed with natural herbal pigments and accented with gold dipped zari work:`,
          recommendedProducts: colorProducts.slice(0, 3),
          quickSuggestions: ["Show matching blouse ideas", "Under ₹4,000 creations", "Active coupons"]
        };
      }
    }

    // 9. Saree Draping & Styling Tips
    if (q.includes('drape') || q.includes('style') || q.includes('pallu') || q.includes('blouse') || q.includes('jewellery') || q.includes('pleats')) {
      return {
        text: isHindi
          ? "🥻 **Royal Styling & Draping Secrets:**\n\n• **Banarasi Silk:** 5-6 crisp front pleats banayein aur pallu ko seedha left shoulder par pinned rakhein taaki heavy zari brocade clearly dikhe.\n• **Jewellery Coordination:** Gold zari sarees ke sath antique temple jewellery ya uncut polki necklaces royal look dete hain.\n• **Lightweight Organza / Chanderi:** Floating open pallu aur minimalist pearl chokers sabse elegant lagte hain."
          : "🥻 **Haute Couture Draping & Styling Secrets:**\n\n• **Banarasi & Kanjivaram:** Fold 5 to 6 crisp, wide pleats and drape the ornate zari pallu gracefully over the left shoulder pinned at the crest.\n• **Jewellery Pairing:** Gold brocades harmonize best with antique temple matte gold or uncut polki diamonds.\n• **Organza / Cotton Weaves:** Keep an unpleated floating pallu with minimalist pearl chokers for effortless summer sophistication.",
        quickSuggestions: ["Recommend Banarasi Sarees", "View Wedding Collection", "Contact personal stylist"]
      };
    }

    // 10. Dynamic Fallback Semantic Search across Live Products
    const words = q.split(/\s+/).filter(w => w.length > 2);
    const scoredProducts = products.map(p => {
      let score = 0;
      const haystack = `${p.name} ${p.category} ${p.fabric} ${p.gender} ${p.desc} ${(p.colors || []).join(' ')}`.toLowerCase();
      words.forEach(w => {
        if (haystack.includes(w)) score += 1;
      });
      return { product: p, score };
    }).filter(sp => sp.score > 0).sort((a, b) => b.score - a.score);

    const matches = scoredProducts.slice(0, 3).map(sp => sp.product);
    const fallbackProducts = matches.length > 0 ? matches : products.slice(0, 2);

    return {
      text: isHindi
        ? `Main aapko "${userQuery}" me assist karne ke liye taiyaar hoon! SHYN certified pure mulberry silk aur bespoke tailoring ke liye mashhoor hai. Ye humare top recommendations dekhiye:`
        : `I would be delighted to assist you with "${userQuery}"! SHYN is renowned for certified pure mulberry silks, authentic Kadhwa zari weaves, and bespoke tailoring. Here are handpicked recommendations for you:`,
      recommendedProducts: fallbackProducts,
      quickSuggestions: [
        "✨ Launch Royal Look Advisor",
        "👑 Wedding Sarees under ₹5,000",
        "🧵 Silk Mark Authenticity Guide",
        "🎟️ What discount coupons are active?"
      ]
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const replyData = generateAiReply(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyData.text,
        recommendedProducts: replyData.recommendedProducts || null,
        couponsList: replyData.couponsList || null,
        trackedOrder: replyData.trackedOrder || null,
        quickSuggestions: replyData.quickSuggestions || null,
        actionButton: replyData.actionButton || null
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      playChime();
      speakText(replyData.text);
    }, 600);
  };

  // Complete Style Wizard selections and query
  const handleCompleteWizard = (selectedLook) => {
    setShowWizard(false);
    const summaryQuery = `Curate a ${selectedLook.occasion} look with ${selectedLook.fabric} in ${selectedLook.palette} palette`;
    handleSendMessage(summaryQuery);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: "Namaste! ✨ I am **Shyna**, your Royal AI Stylist. How may I assist your wardrobe selection or orders today?",
        quickSuggestions: [
          "✨ Launch Royal Look Advisor",
          "👑 Wedding Sarees under ₹5,000",
          "🧵 How to identify Pure Silk?",
          "🎟️ Active Coupons"
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Sparkle Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          className="ai-floating-trigger"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          aria-label="Open Royal AI Stylist"
        >
          <div className="ai-trigger-pulse" />
          <div className="ai-trigger-icon-box">
            <Sparkles size={22} className="ai-star-icon" />
          </div>
          <div className="ai-trigger-label">
            <span className="ai-title">Royal AI Stylist 2.0</span>
            <span className="ai-subtitle">Online • Ask Shyna</span>
          </div>
        </button>
      )}

      {/* Main AI Chat Widget Window */}
      {isOpen && (
        <div className={`ai-assistant-modal ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="ai-modal-header">
            <div className="ai-header-left">
              <div className="ai-avatar-circle">
                <Sparkles size={18} className="text-gold" />
                <span className="online-green-dot" />
              </div>
              <div className="ai-header-text">
                <h3>Shyna • Royal AI Stylist 2.0</h3>
                <span className="ai-header-status">Haute Couture Intelligence</span>
              </div>
            </div>

            <div className="ai-header-controls">
              {/* Voice Read-Out Toggle */}
              <button
                type="button"
                className={`ai-header-btn ${isVoiceEnabled ? 'active' : ''}`}
                onClick={() => {
                  const next = !isVoiceEnabled;
                  setIsVoiceEnabled(next);
                  if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                }}
                title={isVoiceEnabled ? "Voice Output Active (Click to Mute)" : "Enable Voice Read-Out"}
              >
                {isVoiceEnabled ? <Volume2 size={15} className="text-gold" /> : <VolumeX size={15} />}
              </button>

              {/* Sound Chime Toggle */}
              <button
                type="button"
                className="ai-header-btn"
                onClick={() => setIsSoundMuted(!isSoundMuted)}
                title={isSoundMuted ? "Unmute Chimes" : "Mute Sound Effects"}
              >
                <Tag size={13} style={{ opacity: isSoundMuted ? 0.4 : 1 }} />
              </button>

              {/* Reset Conversation */}
              <button
                type="button"
                className="ai-header-btn"
                onClick={handleResetChat}
                title="Restart Chat Conversation"
              >
                <RotateCcw size={15} />
              </button>

              {/* Minimize / Maximize */}
              <button
                type="button"
                className="ai-header-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand Chat" : "Minimize Chat"}
              >
                {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>

              {/* Close Window */}
              <button
                type="button"
                className="ai-header-btn close-btn"
                onClick={() => setIsOpen(false)}
                title="Close AI Stylist"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Interactive Royal Look Advisor Banner / Wizard */}
              {showWizard ? (
                <div className="ai-wizard-panel">
                  <div className="ai-wizard-header">
                    <div className="wizard-title-row">
                      <Compass size={16} className="text-gold" />
                      <h4>Royal Look Advisor (Step {wizardStep}/3)</h4>
                    </div>
                    <button
                      type="button"
                      className="wizard-close-btn"
                      onClick={() => setShowWizard(false)}
                    >
                      ✕
                    </button>
                  </div>

                  {wizardStep === 1 && (
                    <div className="wizard-step-body">
                      <p className="wizard-prompt">Select Your Auspicious Occasion:</p>
                      <div className="wizard-options-grid">
                        {[
                          { id: 'Wedding', icon: '👑', label: 'Royal Wedding / Bridal' },
                          { id: 'Reception', icon: '✨', label: 'Cocktail & Evening Reception' },
                          { id: 'Festive', icon: '🪔', label: 'Festive Puja & Diwali' },
                          { id: 'Menswear', icon: '👔', label: 'Sartorial Men\'s Look' },
                          { id: 'Everyday', icon: '🌿', label: 'Daily Office & Handloom Cotton' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            type="button"
                            className={`wizard-opt-btn ${wizardSelections.occasion === opt.id ? 'active' : ''}`}
                            onClick={() => {
                              setWizardSelections(prev => ({ ...prev, occasion: opt.id }));
                              setWizardStep(2);
                            }}
                          >
                            <span className="wizard-opt-icon">{opt.icon}</span>
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div className="wizard-step-body">
                      <p className="wizard-prompt">Select Preferred Heritage Weave:</p>
                      <div className="wizard-options-grid">
                        {[
                          { id: 'Pure Banarasi Katan Silk', label: '🧵 Pure Katan Brocade Silk' },
                          { id: 'Pure Kanjivaram Gold Zari', label: '👑 Gold Dipped Kanjivaram' },
                          { id: 'Handloom Organic Cotton', label: '🌿 100% Organic Handspun Cotton' },
                          { id: 'Giza Egyptian Cotton', label: '👔 Egyptian Supima Cotton (Men)' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            type="button"
                            className={`wizard-opt-btn ${wizardSelections.fabric === opt.id ? 'active' : ''}`}
                            onClick={() => {
                              setWizardSelections(prev => ({ ...prev, fabric: opt.id }));
                              setWizardStep(3);
                            }}
                          >
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="wizard-back-btn"
                        onClick={() => setWizardStep(1)}
                      >
                        ← Back to Occasions
                      </button>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div className="wizard-step-body">
                      <p className="wizard-prompt">Select Your Color Aura:</p>
                      <div className="wizard-options-grid">
                        {[
                          { id: 'Imperial Maroon & Red', dot: '#800000', label: 'Imperial Maroon & Sindoor Red' },
                          { id: 'Temple Gold & Yellow', dot: '#d4af37', label: 'Auspicious Gold & Haldi Yellow' },
                          { id: 'Peacock Royal Blue', dot: '#1a237e', label: 'Peacock & Royal Blue' },
                          { id: 'Emerald & Mint Green', dot: '#1b5e20', label: 'Emerald & Mint Green' },
                          { id: 'Classic Ivory & Black', dot: '#222222', label: 'Classic Ivory & Charcoal' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            type="button"
                            className="wizard-opt-btn"
                            onClick={() => {
                              const finalLook = {
                                ...wizardSelections,
                                palette: opt.id
                              };
                              handleCompleteWizard(finalLook);
                            }}
                          >
                            <span className="color-swatch-mini" style={{ backgroundColor: opt.dot }} />
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="wizard-back-btn"
                        onClick={() => setWizardStep(2)}
                      >
                        ← Back to Fabrics
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Messages Body */}
              <div className="ai-modal-body">
                {messages.map((m) => (
                  <div key={m.id} className={`ai-message-row ${m.sender === 'user' ? 'user-side' : 'ai-side'}`}>
                    <div className="ai-message-avatar">
                      {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div className="ai-message-bubble">
                      <div className="ai-message-text">
                        {m.text.split('\n').map((line, lIdx) => (
                          <p key={lIdx}>
                            {line.split('**').map((part, pIdx) =>
                              pIdx % 2 === 1 ? <strong key={pIdx}>{part}</strong> : part
                            )}
                          </p>
                        ))}
                      </div>

                      {/* Interactive Live Tracked Order Card */}
                      {m.trackedOrder && (
                        <div className="ai-order-status-card">
                          <div className="order-status-header">
                            <div className="status-badge-live">
                              <span className="pulse-dot" />
                              <span>{m.trackedOrder.status || 'Dispatched via BlueDart Express'}</span>
                            </div>
                            <span className="order-id-label">{m.trackedOrder.id}</span>
                          </div>

                          <div className="order-meta-row">
                            <div className="meta-col">
                              <span className="meta-title">Delivery To:</span>
                              <strong>{m.trackedOrder.shippingAddress?.name || 'Patron'} ({m.trackedOrder.shippingAddress?.city || 'India'})</strong>
                            </div>
                            <div className="meta-col text-right">
                              <span className="meta-title">Grand Total:</span>
                              <strong className="text-gold">₹{Number(m.trackedOrder.grandTotal || m.trackedOrder.total || 0).toLocaleString('en-IN')}</strong>
                            </div>
                          </div>

                          <div className="order-items-preview">
                            {(m.trackedOrder.items || []).slice(0, 2).map((it, idx) => (
                              <div key={idx} className="order-item-micro">
                                <img src={it.selectedImage || it.image} alt={it.name} className="micro-thumb" />
                                <div className="micro-info">
                                  <span className="micro-name">{it.name}</span>
                                  <span className="micro-price">Qty: {it.quantity || 1} • ₹{Number(it.price || 0).toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="order-actions-row">
                            <button
                              type="button"
                              className="order-invoice-btn"
                              onClick={() => printTaxInvoice(m.trackedOrder)}
                              title="Download Official Tax Invoice PDF"
                            >
                              <Printer size={13} className="text-gold" />
                              <span>Download Invoice (PDF)</span>
                            </button>
                            <button
                              type="button"
                              className="order-track-btn"
                              onClick={() => onOpenOrders()}
                            >
                              <span>View BlueDart Tracking</span>
                              <ExternalLink size={12} />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Interactive Active Coupons Grid */}
                      {m.couponsList && (
                        <div className="ai-coupons-grid">
                          {m.couponsList.map((cpn) => (
                            <div key={cpn.code} className="ai-coupon-card">
                              <div className="coupon-card-header">
                                <strong className="coupon-code-badge">{cpn.code}</strong>
                                <span className="coupon-type-badge">
                                  {cpn.type === 'percent' ? `${cpn.value}% Off` : `₹${cpn.value} Off`}
                                </span>
                              </div>
                              <p className="coupon-desc-text">{cpn.desc}</p>
                              <div className="coupon-card-footer">
                                <span className="min-order-note">Min Order: ₹{cpn.minOrder}</span>
                                <button
                                  type="button"
                                  className={`copy-coupon-btn ${copiedCoupon === cpn.code ? 'copied' : ''}`}
                                  onClick={() => handleCopyCoupon(cpn.code)}
                                >
                                  {copiedCoupon === cpn.code ? (
                                    <>
                                      <CheckCircle2 size={12} className="text-green" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      <span>Copy Code</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Interactive Product Recommendation Cards Embedded in Chat */}
                      {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                        <div className="ai-product-suggestions">
                          <span className="suggestions-headline">Curated Recommendations for You:</span>
                          <div className="ai-products-grid">
                            {m.recommendedProducts.map((prod) => (
                              <div key={prod.id} className="ai-product-card">
                                <img src={prod.image} alt={prod.name} className="ai-prod-thumb" />
                                <div className="ai-prod-details">
                                  <h4 className="ai-prod-name">{prod.name}</h4>
                                  <span className="ai-prod-cat">{prod.category} • {prod.fabric || 'Pure Handloom Silk'}</span>
                                  
                                  <div className="ai-price-row">
                                    <span className="ai-prod-price">₹{prod.price.toLocaleString('en-IN')}</span>
                                    {prod.original && prod.original > prod.price && (
                                      <span className="ai-prod-orig">₹{prod.original.toLocaleString('en-IN')}</span>
                                    )}
                                  </div>

                                  <div className="ai-prod-actions">
                                    <button
                                      type="button"
                                      className="ai-view-btn"
                                      onClick={() => onOpenDetails(prod)}
                                      title="Inspect Product Gallery & Details"
                                    >
                                      <Eye size={12} />
                                      <span>View</span>
                                    </button>
                                    <button
                                      type="button"
                                      className={`ai-bag-btn ${addedItemIds[prod.id] ? 'added' : ''}`}
                                      onClick={() => handleQuickAdd(prod)}
                                      title="Add directly to Shopping Bag"
                                    >
                                      {addedItemIds[prod.id] ? (
                                        <>
                                          <Check size={12} />
                                          <span>Added ✓</span>
                                        </>
                                      ) : (
                                        <>
                                          <ShoppingBag size={12} />
                                          <span>Add to Bag</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Direct Interactive Action Button */}
                      {m.actionButton && (
                        <button
                          type="button"
                          className="ai-action-cta"
                          onClick={m.actionButton.action}
                        >
                          <Package size={14} />
                          <span>{m.actionButton.label}</span>
                          <ArrowRight size={13} />
                        </button>
                      )}

                      {/* Quick Follow-up Suggestion Chips */}
                      {m.quickSuggestions && (
                        <div className="ai-quick-chips">
                          {m.quickSuggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              className="ai-suggestion-chip"
                              onClick={() => {
                                if (sug.includes('Advisor')) {
                                  setShowWizard(true);
                                  setWizardStep(1);
                                } else {
                                  handleSendMessage(sug);
                                }
                              }}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* AI Typing Indicator */}
                {isTyping && (
                  <div className="ai-message-row ai-side">
                    <div className="ai-message-avatar">
                      <Bot size={14} />
                    </div>
                    <div className="ai-typing-bubble">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="ai-modal-footer"
              >
                {/* Voice Input Microphone Button */}
                <button
                  type="button"
                  className={`ai-mic-btn ${isListening ? 'listening' : ''}`}
                  onClick={toggleVoiceInput}
                  title={isListening ? "Listening... Speak your query" : "Speak to Shyna (Voice Input)"}
                >
                  {isListening ? <MicOff size={16} className="text-red animate-pulse" /> : <Mic size={16} />}
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isListening ? "Listening... Speak your query now" : "Ask Shyna about sarees, silk purity, orders..."}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="ai-input-field"
                />

                <button
                  type="submit"
                  className="ai-send-btn"
                  disabled={!inputMessage.trim()}
                  aria-label="Send query to AI Stylist"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
