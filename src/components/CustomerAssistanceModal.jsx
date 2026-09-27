import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function CustomerAssistanceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeFaq, setActiveFaq] = useState(null);
  const [topic, setTopic] = useState('Order & Delivery');
  const [userMsg, setUserMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How do I verify the authenticity of the silk and zari?',
      a: 'Every saree at SHYN comes with an official Silk Mark Organization of India tag and a certificate of zari purity detailing the thread composition (pure silver dipped in 24k gold).'
    },
    {
      q: 'Can I get the blouse stitched or customized before delivery?',
      a: 'Yes! Our haute atelier concierge provides bespoke blouse tailoring, fall-pico attachment, and customized tassels. Contact our styling desk immediately after placing your order.'
    },
    {
      q: 'What is your doorstep return and exchange timeline?',
      a: 'We offer a 7-day complimentary doorstep exchange or full refund policy on all non-customized pieces in unworn condition with original security tags intact.'
    },
    {
      q: 'How should I preserve and care for my heirloom sarees?',
      a: 'Wrap your pure silk saree in unbleached cotton or muslin cloth. Avoid plastic covers. Air it periodically in mild shade, and dry clean only when necessary.'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userMsg.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setUserMsg('');
      setSubmitted(false);
      alert('Thank you! Your inquiry has been routed to our Senior Saree Concierge. We will get back to you within 2 hours.');
    }, 1200);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="assistance-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-row">
          <div className="header-title-box">
            <Sparkles size={22} className="text-gold" />
            <div>
              <h2>Royal Customer Assistance &amp; Concierge</h2>
              <p className="modal-subtitle">Dedicated 24/7 personal styling and order support</p>
            </div>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="assistance-modal-body">
          {/* Quick Contact Cards Grid */}
          <div className="contact-cards-grid">
            {/* Phone Support */}
            <a href="tel:+917726874080" className="contact-card-box">
              <div className="contact-icon-circle">
                <Phone size={20} className="text-gold" />
              </div>
              <div className="contact-text-wrap">
                <span className="contact-type">Telephone Helpline</span>
                <strong className="contact-val">+91 77268 74080</strong>
                <span className="contact-sub">Toll-free • Mon-Sun, 9 AM - 9 PM IST</span>
              </div>
            </a>

            {/* Email Support */}
            <a href="mailto:samargarg019@gmail.com" className="contact-card-box">
              <div className="contact-icon-circle">
                <Mail size={20} className="text-gold" />
              </div>
              <div className="contact-text-wrap">
                <span className="contact-type">Email Concierge</span>
                <strong className="contact-val">samargarg019@gmail.com</strong>
                <span className="contact-sub">Average response under 2 hours</span>
              </div>
            </a>

            {/* WhatsApp Chat */}
            <a 
              href="https://wa.me/917726874080?text=Hello%20SHYN%20Concierge,%20I%20need%20assistance%20with%20my%20order."
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-card-box whatsapp-box"
            >
              <div className="contact-icon-circle whatsapp-circle">
                <MessageSquare size={20} />
              </div>
              <div className="contact-text-wrap">
                <span className="contact-type">WhatsApp Concierge Desk</span>
                <strong className="contact-val">+91 77268 74080</strong>
                <span className="contact-sub">Instant live chat with saree stylists</span>
              </div>
            </a>

            {/* Physical Atelier */}
            <div className="contact-card-box">
              <div className="contact-icon-circle">
                <MapPin size={20} className="text-gold" />
              </div>
              <div className="contact-text-wrap">
                <span className="contact-type">Flagship Atelier</span>
                <strong className="contact-val">Heritage Galleria, Indiranagar</strong>
                <span className="contact-sub">Bengaluru, Karnataka 560038</span>
              </div>
            </div>
          </div>

          {/* Send a Concierge Message Form */}
          <div className="concierge-form-section">
            <h3>Send an Instant Message to our Styling Desk</h3>
            <form onSubmit={handleSendMessage} className="concierge-message-form">
              <div className="form-group">
                <label>Reason for Inquiry:</label>
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <option value="Order & Delivery">Order &amp; Delivery Tracking</option>
                  <option value="Bespoke Saree Consultation">Bespoke Saree &amp; Zari Consultation</option>
                  <option value="Blouse Stitching & Drapery">Blouse Tailoring &amp; Fall-Pico</option>
                  <option value="Returns & Exchange">Returns, Exchange &amp; Refunds</option>
                  <option value="Corporate & Bridal Bulk">Bridal Trousseau &amp; Bulk Gifting</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message / Specific Instructions:</label>
                <textarea
                  rows={3}
                  placeholder="How can our bespoke drapery advisors assist you today?"
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="concierge-send-btn" disabled={submitted}>
                {submitted ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Inquiry to Concierge</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Frequently Asked Questions Accordion */}
          <div className="faq-accordion-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
              {faqs.map((f, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                    >
                      <HelpCircle size={16} className="text-gold" />
                      <span>{f.q}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && <div className="faq-answer-pane"><p>{f.a}</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
