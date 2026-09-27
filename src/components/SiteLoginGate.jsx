import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, User, ArrowRight, Eye, EyeOff, UserPlus } from 'lucide-react';

const SAPPHIRE_PALETTE = ['#d4af37', '#8bb4f8', '#c2e0ff', '#f5d77f', '#ffffff'];

export default function SiteLoginGate({ onLogin, onGuestEnter }) {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);

  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

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

  // Populate credentials from saved customer on load
  useEffect(() => {
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
  }, []);

  // Floating zari particles & click sparks animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = Math.min(65, Math.floor((width * height) / 18000));
    const particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.45 + 0.2),
        radius: Math.random() * 2.2 + 1.0,
        color: SAPPHIRE_PALETTE[Math.floor(Math.random() * SAPPHIRE_PALETTE.length)],
        alpha: Math.random() * 0.65 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const sparks = [];
    const spawnSparks = (x, y, count = 22) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.8 + 1.2,
          color: SAPPHIRE_PALETTE[Math.floor(Math.random() * SAPPHIRE_PALETTE.length)],
          life: 1.0,
          decay: Math.random() * 0.025 + 0.02
        });
      }
    };

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${mouseX}px`;
        spotlightRef.current.style.top = `${mouseY}px`;
      }
    };

    const handleClick = (e) => {
      if (cardRef.current && cardRef.current.contains(e.target)) return;
      spawnSparks(e.clientX, e.clientY, 26);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles with delicate zari thread lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / 115) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw and animate particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const dynamicAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulsePhase) * 0.25);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw and decay click sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.96;
        sp.vy *= 0.96;
        sp.life -= sp.decay;
        if (sp.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.life;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3D Parallax Tilt Effect on Login Card
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    cardRef.current.style.transform = `perspective(1100px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) translateY(-2px)`;
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const handleQuickFill = (role) => {
    if (role === 'customer') {
      if (savedCustomer) {
        setEmail(savedCustomer.email || '');
        setPassword(savedCustomer.password || '');
        if (isRegister) {
          setFullName(savedCustomer.name || '');
        }
      } else {
        setIsRegister(true);
        setFullName('');
        setEmail('');
        setPassword('');
      }
      setErrorMsg('');
    } else if (role === 'admin') {
      setEmail('admin@shyn.atelier');
      setPassword('admin@shyn2026');
      if (isRegister) {
        setFullName('Store Administrator');
      }
      setErrorMsg('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (isRegister && !fullName.trim()) {
      setErrorMsg('Please enter your full name to create an account.');
      return;
    }

    const isAdmin = email.toLowerCase().includes('admin');
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const displayName = isRegister
      ? fullName.trim()
      : (isAdmin
          ? 'Store Administrator'
          : (savedCustomer && trimmedEmail.toLowerCase() === (savedCustomer.email || '').toLowerCase()
              ? savedCustomer.name
              : trimmedEmail.split('@')[0]));

    // Store newly registered or active customer in localStorage so the chip reflects it!
    if (!isAdmin) {
      const custData = {
        name: displayName,
        email: trimmedEmail,
        password: trimmedPassword
      };
      setSavedCustomer(custData);
      try {
        localStorage.setItem('shyn_registered_customer', JSON.stringify(custData));
      } catch (err) {
        console.warn('Could not save registered customer:', err);
      }
    }

    onLogin({
      email: trimmedEmail,
      name: displayName,
      isAdmin,
      role: isAdmin ? 'admin' : 'customer'
    });
  };

  return (
    <div id="siteLoginGate" className="site-login-gate theme-midnight">
      {/* Interactive Background Canvas */}
      <canvas ref={canvasRef} className="gate-interactive-canvas" />

      {/* Dynamic Cursor Spotlight Flashlight */}
      <div ref={spotlightRef} className="gate-cursor-spotlight" aria-hidden="true" />

      {/* Ambient Floating Aura Orbs */}
      <div className="gate-ambient-glow glow-1" aria-hidden="true" />
      <div className="gate-ambient-glow glow-2" aria-hidden="true" />
      <div className="gate-pattern-overlay" aria-hidden="true" />

      <div
        ref={cardRef}
        className="site-login-card"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
      >
        {/* Interactive Background Hint */}
        <div className="gate-interactive-hint">
          <Sparkles size={12} className="inline-block" />
          <span>Move cursor &amp; click background to weave golden zari embers</span>
        </div>

        {/* Luxury Crest Header */}
        <div className="gate-royal-crest" aria-hidden="true">
          <span className="crest-line" />
          <span className="crest-gem">✦ ❖ ✦</span>
          <span className="crest-line" />
        </div>

        <div className="site-login-logo brand-lockup brand-lockup--center" aria-label="SHYN">
          <span className="brand-mark" aria-hidden="true"><span>S</span></span>
          <span className="brand-name">SHYN</span>
        </div>
        <div className="site-login-eyebrow">HAUTE COUTURE &amp; HERITAGE ATELIER</div>
        <h1>{isRegister ? 'Create Member Account' : 'Sign in to enter the store'}</h1>
        <p>
          {isRegister
            ? 'Join SHYN to unlock bespoke weaves, bridal consultations, and personalized doorstep concierge.'
            : 'Explore royal Banarasi sarees, curated menswear, track your deliveries and enjoy exclusive member offers.'}
        </p>

        {/* Tab switch between Sign In and Create Account */}
        <div className="gate-auth-tabs">
          <button
            type="button"
            className={`gate-auth-tab ${!isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(false);
              setErrorMsg('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`gate-auth-tab ${isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(true);
              setErrorMsg('');
              if (!fullName && savedCustomer?.name) {
                setFullName(savedCustomer.name);
              }
            }}
          >
            <UserPlus size={13} className="inline mr-1" /> Create Account
          </button>
        </div>

        {/* 1-Click Quick Login Chips */}
        <div className="demo-login-chips">
          <span className="demo-chips-label">⚡ 1-Click Quick Login:</span>
          <div className="demo-chips-row">
            <button
              type="button"
              className={`demo-chip-btn ${savedCustomer?.name ? 'active-custom-customer' : ''}`}
              onClick={() => handleQuickFill('customer')}
              title={savedCustomer?.name ? `Quick fill as ${savedCustomer.name}` : 'Customer Sign In'}
            >
              <User size={13} className="inline mr-1 text-gold" />
              <span>Customer{savedCustomer?.name ? ` (${savedCustomer.name.split(' ')[0]})` : ''}</span>
            </button>
            <button
              type="button"
              className="demo-chip-btn"
              onClick={() => handleQuickFill('admin')}
              title="Quick fill Store Administrator"
            >
              <Shield size={13} className="inline mr-1 text-gold" />
              <span>Store Admin</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="login-error-banner" role="alert">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form className="site-login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <label htmlFor="gateName">Full Name *</label>
              <input
                id="gateName"
                type="text"
                placeholder="e.g. Priya Sharma or Rahul Verma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoFocus
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="gateEmail">Email address *</label>
            <input
              id="gateEmail"
              type="email"
              placeholder={isRegister ? "e.g. priya@heritage.in" : "e.g. customer@heritage.in"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="password-header-row">
              <label htmlFor="gatePassword">{isRegister ? "Create Password *" : "Password *"}</label>
              <button
                type="button"
                className="show-pwd-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={13} className="inline mr-1" /> : <Eye size={13} className="inline mr-1" />}
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="gatePassword"
              type={showPassword ? 'text' : 'password'}
              placeholder={isRegister ? "Minimum 6 characters" : "Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-form-options">
            <label className="checkbox-label" htmlFor="gateRemember">
              <input
                type="checkbox"
                id="gateRemember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember this session</span>
            </label>
          </div>

          <button type="submit" className="login-primary-btn">
            <span>{isRegister ? 'Create Account & Enter Atelier' : 'Enter Heritage Atelier'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="gate-mode-switch">
          <span>{isRegister ? 'Already registered with SHYN?' : 'New customer to SHYN?'} </span>
          <button
            type="button"
            className="switch-mode-btn"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg('');
            }}
          >
            {isRegister ? 'Sign In here' : 'Create an Account'}
          </button>
        </div>

        <div className="site-login-guest">
          <span>Just browsing? </span>
          <button type="button" className="guest-btn" onClick={onGuestEnter}>
            Explore as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
