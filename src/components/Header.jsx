import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="luxury-header">
      <div className="header-content">
        <a href="#" className="logo">
          <div className="logo-icon">
            <Shield size={18} />
          </div>
          <span className="logo-text">
            AUREUM <span style={{ color: 'var(--color-gold)', fontStyle: 'italic', fontWeight: '400' }}>Wealth</span>
          </span>
        </a>
        
        <nav>
          <ul className="nav-links">
            <li><a href="#calculator" className="nav-link">Calculator</a></li>
            <li><a href="#breakdown" className="nav-link">Analytics</a></li>
            <li><a href="#savings" className="nav-link">Insights</a></li>
            <li><a href="#comparison" className="nav-link">Comparison</a></li>
            <li><a href="#timeline" className="nav-link">Timeline</a></li>
            <li><a href="#schedule" className="nav-link">Schedule</a></li>
          </ul>
        </nav>
        
        <button 
          className="btn-primary" 
          style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '24px' }}
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Sparkles size={14} />
          <span>Consult Wealth Advisor</span>
        </button>
      </div>
    </header>
  );
}
