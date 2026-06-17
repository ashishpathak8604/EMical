import React, { useState } from 'react';
import { formatCurrency } from './Console';
import { ShieldAlert } from 'lucide-react';

export default function AnalyticsChart({ calculator }) {
  const {
    loanAmount,
    totalInterest,
    principalPercent,
    interestPercent,
    isValid
  } = calculator;

  const [activeSegment, setActiveSegment] = useState(null); // 'principal' | 'interest' | null

  if (!isValid) return null;

  // SVG parameters
  const radius = 70;
  const strokeWidth = 14;
  const circ = 2 * Math.PI * radius; // 439.82
  
  // Luxury spacing: 6 units of gap total (3 units per gap)
  const gap = 3;
  const activeOffset = 3; // Shift active segment outward slightly
  const availableLength = circ - (gap * 2);
  
  const principalLength = (principalPercent / 100) * availableLength;
  const interestLength = (interestPercent / 100) * availableLength;

  // Offsets starting at 12 o'clock (-90deg or 25% of circ = circ/4)
  const pOffset = circ / 4;
  // Interest offset starts after principal + gap
  const iOffset = pOffset - principalLength - gap;

  return (
    <section className="section-wrapper" id="breakdown">
      <div className="app-container">
        <div className="section-header">
          <div className="section-label">Structure breakdown</div>
          <h2 className="section-title editorial-serif">
            Portfolio <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Capital Allocation</span>
          </h2>
          <p className="sans-body" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Visualizing the ratio of your principal loan repayment relative to the compound interest expense.
          </p>
        </div>

        <div className="luxury-card">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            {/* Left Column: Custom SVG Donut Chart */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                position: 'relative', 
                height: '340px' 
              }}
            >
              <svg 
                width="280" 
                height="280" 
                viewBox="0 0 200 200" 
                style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
              >
                {/* Shadow/Glow definition */}
                <defs>
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Principal Segment */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={activeSegment === 'principal' ? 'var(--color-gold)' : 'var(--color-charcoal)'}
                  strokeWidth={activeSegment === 'principal' ? strokeWidth + 2 : strokeWidth}
                  strokeDasharray={`${principalLength} ${circ - principalLength}`}
                  strokeDashoffset={pOffset}
                  strokeLinecap="round"
                  style={{
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    transformOrigin: 'center',
                    transform: activeSegment === 'principal' ? 'scale(1.03)' : 'scale(1)'
                  }}
                  onMouseEnter={() => setActiveSegment('principal')}
                  onMouseLeave={() => setActiveSegment(null)}
                />

                {/* Interest Segment */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={activeSegment === 'interest' ? 'var(--color-charcoal)' : 'var(--color-gold)'}
                  strokeWidth={activeSegment === 'interest' ? strokeWidth + 2 : strokeWidth}
                  strokeDasharray={`${interestLength} ${circ - interestLength}`}
                  strokeDashoffset={iOffset}
                  strokeLinecap="round"
                  style={{
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    transformOrigin: 'center',
                    transform: activeSegment === 'interest' ? 'scale(1.03)' : 'scale(1)'
                  }}
                  onMouseEnter={() => setActiveSegment('interest')}
                  onMouseLeave={() => setActiveSegment(null)}
                />
              </svg>

              {/* Center Metrics (Non-rotated, absolutely centered) */}
              <div 
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                <span className="sans-body" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
                  {activeSegment ? (activeSegment === 'principal' ? 'Principal' : 'Interest') : 'Principal Ratio'}
                </span>
                <span className="editorial-serif font-serif" style={{ fontSize: '38px', fontWeight: '500', margin: '4px 0', color: 'var(--color-charcoal)' }}>
                  {activeSegment ? (
                    activeSegment === 'principal' ? `${principalPercent.toFixed(0)}%` : `${interestPercent.toFixed(0)}%`
                  ) : (
                    `${(Number(loanAmount) / Math.max(1, totalInterest)).toFixed(1)}x`
                  )}
                </span>
                <span className="sans-body" style={{ fontSize: '11px', color: 'var(--color-gold)' }}>
                  {activeSegment ? 'Share of Repayment' : 'Capital-to-Cost ratio'}
                </span>
              </div>
            </div>

            {/* Right Column: Premium Details Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Principal Details Panel */}
              <div 
                className="luxury-card" 
                style={{ 
                  padding: '24px 30px', 
                  borderRadius: 'var(--radius-md)',
                  background: activeSegment === 'principal' ? 'rgba(30, 30, 30, 0.02)' : 'var(--color-card-bg)',
                  borderColor: activeSegment === 'principal' ? 'var(--color-charcoal)' : 'var(--color-border)',
                  transform: activeSegment === 'principal' ? 'translateX(5px)' : 'translateX(0)'
                }}
                onMouseEnter={() => setActiveSegment('principal')}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-charcoal)' }} />
                    <span style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Principal Capital</span>
                  </div>
                  <span className="editorial-serif font-serif" style={{ fontSize: '20px', color: 'var(--color-charcoal)' }}>
                    {principalPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="editorial-serif font-serif" style={{ fontSize: '24px', fontWeight: '500', marginBottom: '6px' }}>
                  {formatCurrency(Number(loanAmount))}
                </div>
                <p className="sans-body" style={{ fontSize: '13px' }}>
                  This represents the net loan amount borrowed, which directly reduces your outstanding balance over time.
                </p>
              </div>

              {/* Interest Details Panel */}
              <div 
                className="luxury-card" 
                style={{ 
                  padding: '24px 30px', 
                  borderRadius: 'var(--radius-md)',
                  background: activeSegment === 'interest' ? 'rgba(184, 154, 103, 0.04)' : 'var(--color-card-bg)',
                  borderColor: activeSegment === 'interest' ? 'var(--color-gold)' : 'var(--color-border)',
                  transform: activeSegment === 'interest' ? 'translateX(5px)' : 'translateX(0)'
                }}
                onMouseEnter={() => setActiveSegment('interest')}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-gold)' }} />
                    <span style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interest Cost</span>
                  </div>
                  <span className="editorial-serif font-serif" style={{ fontSize: '20px', color: 'var(--color-gold)' }}>
                    {interestPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="editorial-serif font-serif" style={{ fontSize: '24px', fontWeight: '500', color: 'var(--color-gold-hover)', marginBottom: '6px' }}>
                  {formatCurrency(totalInterest)}
                </div>
                <p className="sans-body" style={{ fontSize: '13px' }}>
                  This is the cost charged by the lender for the tenure of the loan, representing the premium expense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
