import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("SHYN Atelier Caught Exception:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d1b2a',
          color: '#fdfbf7',
          padding: '24px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '16px',
            padding: '36px 30px',
            maxWidth: '520px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              color: '#d4af37'
            }}>
              <AlertTriangle size={32} />
            </div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '22px',
              letterSpacing: '1px',
              color: '#d4af37',
              marginBottom: '10px'
            }}>
              SHYN HAUTE ATELIER
            </h2>
            <p style={{ fontSize: '14px', color: '#c7b299', lineHeight: 1.6, marginBottom: '22px' }}>
              We encountered a temporary rendering issue while displaying this view. Please reload to restore full functionality.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #aa8010 100%)',
                color: '#2a0808',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 26px',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={16} />
              <span>Reload Atelier</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
