import React from 'react';
import { Mail, ShieldCheck, MapPin, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="luxury-footer">
      <div className="app-container">
        <div className="footer-content">
          <div className="footer-credits">
            <div className="footer-logo">
              AUREUM <span style={{ color: 'var(--color-gold)', fontStyle: 'italic', fontWeight: '400' }}>Private Bank</span>
            </div>
            <p className="footer-desc">
              Uncompromising private banking solutions and wealth planning services for high-net-worth individuals, institutions, and families globally.
            </p>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '20px' }}>
              <ShieldCheck size={20} className="gold-accent" />
              <span style={{ fontSize: '13px', color: '#8C867E', letterSpacing: '0.05em' }}>
                SECURED PORTFOLIO CALCULATOR
              </span>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-gold)' }}>
              Advisor Details
            </h4>
            <ul className="footer-contact">
              <li>
                <User size={15} className="gold-accent" />
                <span>Full Name: <strong>Ashish Pathak</strong></span>
              </li>
              <li>
                <Mail size={15} className="gold-accent" />
                <span>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></span>
              </li>
              <li>
                <MapPin size={15} className="gold-accent" />
                <span>HQ: Mumbai, India</span>
              </li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '15px' }}>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px', color: 'var(--color-gold)' }}>
              Partnership
            </h4>
            <p style={{ color: '#8C867E', fontSize: '13px', maxWidth: '280px', marginBottom: '10px' }}>
              Empowering global brands with strategic advisory and elite digital consulting.
            </p>
            <a 
              href="https://digitalheroesco.com" 
              className="footer-brand-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Built for Digital Heroes
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Aureum Wealth. All rights reserved to their respective owners.</span>
          <span>Confidentiality &bull; Terms of Use &bull; Privacy Statement</span>
        </div>
      </div>
    </footer>
  );
}
