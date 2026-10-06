import React, { useState } from 'react';
import { X, User, ArrowRight, ShoppingBag } from 'lucide-react';
import { authenticateUser, registerUser } from '../services/authService';

export default function LoginModal({ isOpen, onClose, onLogin, promptMessage }) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Clear errors when modal opens or toggles
  React.useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
    }
  }, [isOpen, isRegister]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegister) {
      const res = registerUser(name, email, password);
      if (!res.success) {
        setErrorMsg(res.error);
        return;
      }
      onLogin(res.user);
      onClose();
    } else {
      const res = authenticateUser(email, password);
      if (!res.success) {
        setErrorMsg(res.error);
        return;
      }
      onLogin(res.user);
      onClose();
    }
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

        {promptMessage && (
          <div className="login-checkout-prompt-banner">
            <ShoppingBag size={15} className="inline mr-2 text-gold flex-shrink-0" />
            <span>{promptMessage}</span>
          </div>
        )}

        {errorMsg && (
          <div className="login-error-banner" role="alert">
            {errorMsg}
          </div>
        )}

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
              placeholder={isRegister ? "e.g. priya.sharma@gmail.com" : "Enter registered email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              placeholder={isRegister ? "At least 12 chars & 1 uppercase" : "Enter password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegister && (
              <div className="pwd-requirement-hints">
                <span className={`pwd-hint-item ${password.length >= 12 ? 'hint-valid' : ''}`}>
                  {password.length >= 12 ? '✓' : '○'} At least 12 characters
                </span>
                <span className={`pwd-hint-item ${/[A-Z]/.test(password) ? 'hint-valid' : ''}`}>
                  {/[A-Z]/.test(password) ? '✓' : '○'} At least 1 uppercase letter (A-Z)
                </span>
              </div>
            )}
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
