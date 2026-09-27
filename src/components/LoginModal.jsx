import React, { useState } from 'react';
import { X, User, Shield, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Persistent registered customer from localStorage
  const [savedCustomer, setSavedCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem('shyn_registered_customer');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // Re-read latest customer whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('shyn_registered_customer');
        if (saved) {
          const parsed = JSON.parse(saved);
          setSavedCustomer(parsed);
          setEmail(parsed.email || '');
          setPassword(parsed.password || '');
        }
      } catch {
        // fallback
      }
    }
  }, [isOpen]);

  const handleQuick = (role) => {
    if (role === 'customer') {
      if (savedCustomer) {
        onLogin({
          email: savedCustomer.email,
          name: savedCustomer.name,
          isAdmin: false,
          role: 'customer'
        });
        onClose();
      } else {
        setIsRegister(true);
      }
    } else {
      onLogin({
        email: 'admin@shyn.atelier',
        name: 'Store Administrator',
        isAdmin: true,
        role: 'admin'
      });
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const isAdmin = email.toLowerCase().includes('admin');
    const trimmedEmail = email.trim();
    const displayName = isRegister
      ? name.trim() || 'Valued Customer'
      : (isAdmin
          ? 'Store Administrator'
          : (savedCustomer && trimmedEmail.toLowerCase() === (savedCustomer.email || '').toLowerCase()
              ? savedCustomer.name
              : trimmedEmail.split('@')[0]));

    // Store registered customer
    if (!isAdmin) {
      const custData = {
        name: displayName,
        email: trimmedEmail,
        password: password.trim()
      };
      setSavedCustomer(custData);
      try {
        localStorage.setItem('shyn_registered_customer', JSON.stringify(custData));
      } catch (err) {
        console.warn('Could not store customer in localStorage:', err);
      }
    }

    onLogin({
      email: trimmedEmail,
      name: displayName,
      isAdmin,
      role: isAdmin ? 'admin' : 'customer'
    });
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="header-title-box">
            <User size={22} className="text-gold" />
            <h2>{isRegister ? 'Create Member Account' : 'Welcome Back'}</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 1-Click Quick Login */}
        <div className="demo-login-chips mb-4">
          <span className="demo-chips-label">⚡ 1-Click Quick Login:</span>
          <div className="demo-chips-row">
            <button
              type="button"
              className={`demo-chip-btn ${savedCustomer?.name ? 'active-custom-customer' : ''}`}
              onClick={() => handleQuick('customer')}
              title={savedCustomer?.name ? `Sign in as ${savedCustomer.name}` : 'Customer Sign In'}
            >
              <User size={13} className="inline mr-1 text-gold" />
              <span>Customer{savedCustomer?.name ? ` (${savedCustomer.name.split(' ')[0]})` : ''}</span>
            </button>
            <button
              type="button"
              className="demo-chip-btn"
              onClick={() => handleQuick('admin')}
              title="Sign in as Store Admin"
            >
              <Shield size={13} className="inline mr-1 text-gold" />
              <span>Store Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-body">
          {isRegister && (
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="e.g. customer@heritage.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="checkout-primary-btn w-full">
            <span>{isRegister ? 'Register Account' : 'Sign In to Store'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-switch-prompt">
          <span>{isRegister ? 'Already have an account?' : "Don't have an account yet?"} </span>
          <button
            type="button"
            className="auth-link-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Sign In here' : 'Register now'}
          </button>
        </div>
      </div>
    </div>
  );
}
