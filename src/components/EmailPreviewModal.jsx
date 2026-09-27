import React from 'react';
import { X, Mail, CheckCircle2, ExternalLink, Printer, Send } from 'lucide-react';

export default function EmailPreviewModal({ isOpen, onClose, emailData }) {
  if (!isOpen || !emailData) return null;

  const handleOpenGmail = () => {
    window.open(`https://mail.google.com/mail/u/0/#search/${encodeURIComponent(emailData.subject || 'SHYN')}`, '_blank');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(emailData.html || '');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  return (
    <div className="modal-backdrop-overlay email-modal-backdrop" onClick={onClose}>
      <div className="email-preview-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Email Client Header */}
        <div className="email-client-topbar">
          <div className="email-client-brand">
            <div className="email-envelope-icon">
              <Mail size={18} className="text-gold" />
            </div>
            <div>
              <h3>Automated Email Dispatcher • Outbox Receipt</h3>
              <p className="email-subtext">Real-time digital confirmation transmitted to patron's inbox</p>
            </div>
          </div>

          <div className="email-top-actions">
            <button
              type="button"
              className="email-action-btn print-btn"
              onClick={handlePrint}
              title="Print / Save Email"
            >
              <Printer size={15} />
              <span>Print Email</span>
            </button>

            <button
              type="button"
              className="email-action-btn gmail-btn"
              onClick={handleOpenGmail}
              title="Search and view in Gmail"
            >
              <ExternalLink size={15} />
              <span>Open in Gmail</span>
            </button>

            <button
              type="button"
              className="modal-close-icon-btn"
              onClick={onClose}
              aria-label="Close Email Preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Email Metadata Header Bar */}
        <div className="email-meta-header-box">
          <div className="email-meta-row">
            <span className="meta-label">From:</span>
            <span className="meta-val"><strong>SHYN Haute Couture &amp; Heritage Atelier</strong> &lt;samargarg019@gmail.com&gt;</span>
          </div>
          <div className="email-meta-row">
            <span className="meta-label">To:</span>
            <span className="meta-val email-recipient-pill">
              <strong>{emailData.recipientName || 'Valued Patron'}</strong> &lt;{emailData.to}&gt;
            </span>
          </div>
          <div className="email-meta-row">
            <span className="meta-label">Subject:</span>
            <span className="meta-val font-semibold">{emailData.subject}</span>
          </div>
          <div className="email-meta-row">
            <span className="meta-label">Status:</span>
            <span className="meta-val">
              <span className="email-status-badge">
                <CheckCircle2 size={13} className="text-green inline mr-1" />
                <span>Pushed &amp; Delivered ({new Date(emailData.sentAt || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })})</span>
              </span>
            </span>
          </div>
        </div>

        {/* Email HTML Body Iframe / Sandbox */}
        <div className="email-body-viewport">
          <iframe
            title="Automated Email Content"
            srcDoc={emailData.html}
            className="email-rendered-iframe"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
