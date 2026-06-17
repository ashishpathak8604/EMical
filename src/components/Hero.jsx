import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Calculate normalized movement from -1 to 1
    const x = (clientX - width / 2) / (width / 2);
    const y = (clientY - height / 2) / (height / 2);
    setCoords({ x, y });
  };

  return (
    <section className="hero-section" onMouseMove={handleMouseMove}>
      <div className="grid-2" style={{ alignItems: 'center', width: '100%' }}>
        {/* Left Side: Copywriting & CTAs */}
        <div className="hero-text-container">
          <div className="section-label">Aureum Wealth Advisory</div>
          <h1 className="hero-headline editorial-serif">
            Plan Every Loan <br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>With Confidence</span>
          </h1>
          <p className="hero-subtext sans-body">
            Make smarter financial decisions with instant EMI calculations, repayment insights, and intelligent loan planning tailored for executive portfolios.
          </p>
          
          <div className="hero-ctas">
            <button 
              className="btn-primary"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Start Planning</span>
              <ArrowRight size={16} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Explore Calculator</span>
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Luxury SVG Sculpture with Parallax */}
        <div className="hero-visual-container">
          <div 
            style={{
              position: 'relative',
              width: '380px',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: `translate(${coords.x * 20}px, ${coords.y * 20}px) rotateX(${coords.y * -10}deg) rotateY(${coords.x * 10}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Soft background glow */}
            <div 
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(239, 227, 210, 0.4) 0%, rgba(246, 236, 231, 0.1) 70%)',
                filter: 'blur(30px)',
                zIndex: -1,
                transform: 'translateZ(-40px)',
              }}
              className="animate-glow"
            />

            {/* Custom SVG Gyroscopic rings */}
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B89A67" />
                  <stop offset="50%" stopColor="#EFE3D2" />
                  <stop offset="100%" stopColor="#B89A67" />
                </linearGradient>
                <linearGradient id="peachGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F6ECE7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#EDE4DB" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="darkGoldGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A38656" />
                  <stop offset="100%" stopColor="#EFE3D2" />
                </linearGradient>
                <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#B89A67" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Outer Ring */}
              <circle 
                cx="200" 
                cy="200" 
                r="160" 
                stroke="url(#goldGrad)" 
                strokeWidth="1.5" 
                strokeDasharray="4 8"
                className="animate-orbit-1"
                filter="url(#shadowGlow)"
              />

              {/* Mid-sized slanted Solid Ring */}
              <ellipse 
                cx="200" 
                cy="200" 
                rx="140" 
                ry="70" 
                stroke="url(#darkGoldGrad)" 
                strokeWidth="2.5" 
                transform="rotate(-25, 200, 200)"
                style={{
                  transformOrigin: '200px 200px',
                  animation: 'float 10s ease-in-out infinite alternate'
                }}
              />

              {/* Intersecting vertical Ring */}
              <ellipse 
                cx="200" 
                cy="200" 
                rx="50" 
                ry="130" 
                stroke="url(#goldGrad)" 
                strokeWidth="1.5" 
                transform="rotate(35, 200, 200)"
                style={{
                  transformOrigin: '200px 200px',
                  animation: 'float 12s ease-in-out infinite alternate-reverse'
                }}
              />

              {/* Central Solid Spherical Orb representing Wealth and Balance */}
              <circle 
                cx="200" 
                cy="200" 
                r="45" 
                fill="url(#goldGrad)" 
                filter="url(#shadowGlow)"
                style={{
                  animation: 'float 6s ease-in-out infinite'
                }}
              />

              {/* Orbiting particle indicators */}
              <circle cx="200" cy="40" r="4" fill="#B89A67" className="animate-orbit-1" style={{ transformOrigin: '200px 200px' }} />
              <circle cx="200" cy="360" r="5" fill="#EFE3D2" className="animate-orbit-2" style={{ transformOrigin: '200px 200px' }} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
