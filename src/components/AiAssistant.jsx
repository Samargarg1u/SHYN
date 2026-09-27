import React, { useState, useRef, useEffect } from 'react';
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
  Heart
} from 'lucide-react';

export default function AiAssistant({
  products = [],
  onOpenDetails,
  onAddToCart,
  onOpenOrders,
  onOpenWishlist
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initial welcome message from Shyna (Royal AI Stylist)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Namaste & Welcome to SHYN! ✨ I am **Shyna**, your personal Royal Haute Couture AI Stylist.\n\nI can recommend auspicious wedding sarees, curate sartorial menswear, guide you on zari fabrics, or help you track orders and apply royal coupons.",
      quickSuggestions: [
        "👑 Recommend a Wedding Saree",
        "🧵 How to identify Pure Silk?",
        "👔 Curate Men's Formal Look",
        "🎟️ What discount coupons are active?",
        "📦 Track my order delivery"
      ]
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  // --- Intelligent Couture AI Engine ---
  const generateAiReply = (userQuery) => {
    const q = userQuery.toLowerCase();

    // 1. Wedding / Bridal Saree Recommendations
    if (q.includes('wedding') || q.includes('bridal') || q.includes('shaadi') || q.includes('sangeet') || q.includes('reception')) {
      const weddingSarees = products.filter(p => p.category === 'Wedding' || p.category === 'Banarasi' || p.category === 'Silk');
      return {
        text: "For royal weddings and auspicious celebrations, I recommend our handwoven **Banarasi Pure Katan Silk** and **Heirloom Bridal Silk** sarees. Woven with authentic gold-plated silver zari, these pieces create an unforgettable presence.",
        recommendedProducts: weddingSarees.slice(0, 2),
        quickSuggestions: ["View Kanjivaram Silk", "Under ₹5,000 sarees", "Blouse customization help"]
      };
    }

    // 2. Pure Silk / Fabric Authenticity Guidance
    if (q.includes('silk') || q.includes('fabric') || q.includes('pure') || q.includes('zari') || q.includes('authenticate') || q.includes('mark')) {
      return {
        text: "✨ **How to identify authentic Pure Silk & Zari:**\n\n1. **The Silk Mark Seal:** Every SHYN saree includes an authenticated Silk Mark tag registered with the Central Silk Board.\n2. **Burn Test (Traditional):** Pure silk burns slowly with a singed hair aroma and leaves crushable black ash, whereas synthetic forms a hard bead.\n3. **Real Zari Sheen:** Authentic zari has a warm, supple golden luster without the brassy glare of artificial lurex.\n4. **Temperature Touch:** Authentic mulberry silk warms slightly to the touch within seconds.",
        quickSuggestions: ["Recommend pure Katan silk", "View Organza Sarees", "Silk care guide"]
      };
    }

    // 3. Men's Sartorial / Formal Menswear Look
    if (q.includes('men') || q.includes('shirt') || q.includes('trouser') || q.includes('pant') || q.includes('formal') || q.includes('jogger')) {
      const mensItems = products.filter(p => p.gender === 'Men');
      return {
        text: "For the discerning gentleman, our **Sartorial Collection** combines 100% Egyptian Giza Cotton shirts with wrinkle-resistant wool-touch tailored trousers. Perfect for boardrooms, black-tie receptions, and festive evenings.",
        recommendedProducts: mensItems.slice(0, 2),
        quickSuggestions: ["Everyday Straight Chinos", "Supima Cotton Tees", "Switch to Women's Sarees"]
      };
    }

    // 4. Budget / Price queries (e.g. under 3000, under 5000, cheap, affordable)
    if (q.includes('under') || q.includes('budget') || q.includes('price') || q.includes('cheap') || q.includes('affordable') || q.includes('₹') || q.includes('rupees')) {
      let maxPrice = 3500;
      if (q.includes('2000') || q.includes('2,000')) maxPrice = 2000;
      else if (q.includes('5000') || q.includes('5,000')) maxPrice = 5000;
      else if (q.includes('3000') || q.includes('3,000')) maxPrice = 3000;

      const budgetItems = products.filter(p => p.price <= maxPrice);
      return {
        text: `Here are our finest handcrafted master-pieces curated for your budget under **₹${maxPrice.toLocaleString('en-IN')}** without compromising on fabric authenticity:`,
        recommendedProducts: budgetItems.slice(0, 2),
        quickSuggestions: ["Show active discount coupons", "View Wedding Sarees"]
      };
    }

    // 5. Active Discount Coupons
    if (q.includes('coupon') || q.includes('discount') || q.includes('offer') || q.includes('promo') || q.includes('code') || q.includes('sale')) {
      return {
        text: "👑 **Exclusive Haute Couture Privileges for you:**\n\n• **SHYN10** — 10% Instant discount on any order (Min order ₹500)\n• **SHYN20** — 20% Privilege discount for purchases above ₹3,000\n• **FESTIVE500** — Flat ₹500 Royal Off on orders above ₹2,500\n• **WELCOME50** — Flat ₹150 off on first purchase above ₹999\n\n*You can enter these codes directly in your slide-over shopping bag!*",
        quickSuggestions: ["Apply coupon in bag", "Recommend top sarees", "Free shipping criteria"]
      };
    }

    // 6. Order Tracking & Delivery
    if (q.includes('track') || q.includes('order') || q.includes('delivery') || q.includes('shipping') || q.includes('courier') || q.includes('where is my')) {
      return {
        text: "📦 **Order Tracking & Express Logistics:**\n\nAll SHYN orders are dispatched within 24 hours via air express (BlueDart / Delhivery) wrapped in insured moisture-proof luxury muslin boxes. Delivery typically takes **2-4 business days**.",
        actionButton: {
          label: "Launch Live Order Tracker",
          action: () => onOpenOrders()
        },
        quickSuggestions: ["Check PIN code speed", "Returns policy", "Customer assistance phone"]
      };
    }

    // 7. Saree Draping & Styling Tips
    if (q.includes('drape') || q.includes('style') || q.includes('pallu') || q.includes('blouse') || q.includes('jewellery') || q.includes('color')) {
      return {
        text: "🥻 **Royal Saree Drapery Advice:**\n\n• **For Heavy Banarasi:** Go with classic 5-6 crisp pleats and let the regal zari pallu drape over the left shoulder pinned at the crest.\n• **Jewellery Pairing:** Pair rich gold-woven sarees with antique temple jewellery or uncut polki diamonds.\n• **Organza Sarees:** Minimalist pearl chokers and an unpleated floating pallu complement sheer fabrics best.",
        quickSuggestions: ["View Banarasi Sarees", "Party wear organza", "Contact styling desk"]
      };
    }

    // 8. Returns & Customer Assistance
    if (q.includes('return') || q.includes('refund') || q.includes('exchange') || q.includes('contact') || q.includes('help') || q.includes('phone') || q.includes('call')) {
      return {
        text: "🛡️ **Our Patron Promise:**\n\nWe provide a **7-Day Effortless Doorstep Return & Exchange** guarantee. For personalized assistance, you can call our styling desk at **+91 77268 74080** (9 AM - 9 PM) or email **samargarg019@gmail.com**.",
        quickSuggestions: ["Open Customer Assistance", "Track my order"]
      };
    }

    // Default intelligent conversational response
    const featured = products.slice(0, 2);
    return {
      text: `I'd be honored to assist you with "${userQuery}"! SHYN is renowned for certified pure mulberry silks, authentic Kadhwa zari weaves, and bespoke tailoring. Here are some of our most celebrated creations:`,
      recommendedProducts: featured,
      quickSuggestions: [
        "👑 Recommend a Wedding Saree",
        "🧵 How to identify Pure Silk?",
        "👔 Curate Men's Formal Look",
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
        quickSuggestions: replyData.quickSuggestions || null,
        actionButton: replyData.actionButton || null
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: "Greetings! I am **Shyna**, your Royal AI Stylist. How may I assist your wardrobe selection today?",
        quickSuggestions: [
          "👑 Recommend a Wedding Saree",
          "🧵 How to identify Pure Silk?",
          "👔 Curate Men's Formal Look",
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
            <span className="ai-title">Royal AI Stylist</span>
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
                <h3>Shyna • Royal AI Stylist</h3>
                <span className="ai-header-status">Haute Couture Intelligence</span>
              </div>
            </div>

            <div className="ai-header-controls">
              <button
                type="button"
                className="ai-header-btn"
                onClick={handleResetChat}
                title="Restart Chat Conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                className="ai-header-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand Chat" : "Minimize Chat"}
              >
                {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>
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
                                  <span className="ai-prod-cat">{prod.category}</span>
                                  <div className="ai-prod-price">₹{prod.price.toLocaleString('en-IN')}</div>

                                  <div className="ai-prod-actions">
                                    <button
                                      type="button"
                                      className="ai-view-btn"
                                      onClick={() => onOpenDetails(prod)}
                                    >
                                      <Eye size={12} />
                                      <span>View</span>
                                    </button>
                                    <button
                                      type="button"
                                      className="ai-bag-btn"
                                      onClick={() => onAddToCart(prod)}
                                    >
                                      <ShoppingBag size={12} />
                                      <span>Add</span>
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
                              onClick={() => handleSendMessage(sug)}
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
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask Shyna about sarees, silk purity, styling..."
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
