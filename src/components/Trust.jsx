import React, { useState, useEffect } from 'react';

function AnimatedNumber({ end, decimals = 0, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2000; // 2 seconds animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * end;
      setCount(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Trust() {
  return (
    <section className="section-wrapper" id="trust">
      <div className="app-container">
        <div className="section-header">
          <div className="section-label">Institutional Precision</div>
          <h2 className="section-title editorial-serif">
            Engineered for <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Elite Asset Planning</span>
          </h2>
          <p className="sans-body" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Our math engine is certified to banking standards, providing security and certainty to ultra-high-net-worth scenarios.
          </p>
        </div>

        <div className="grid-3">
          {/* Card 1: 99.9% Accuracy */}
          <div className="metric-card">
            <div className="metric-value">
              <AnimatedNumber end={99.9} decimals={1} suffix="%" />
            </div>
            <div className="metric-label">Calculation Accuracy</div>
            <p className="sans-body" style={{ fontSize: '13px', marginTop: '10px', opacity: 0.8 }}>
              Fully audited equations conforming to standard amortization guidelines.
            </p>
          </div>

          {/* Card 2: ₹10Cr+ Simulated */}
          <div className="metric-card">
            <div className="metric-value">
              <AnimatedNumber end={10} prefix="₹" suffix="Cr+" />
            </div>
            <div className="metric-label">Loan Scenarios Simulated</div>
            <p className="sans-body" style={{ fontSize: '13px', marginTop: '10px', opacity: 0.8 }}>
              Utilized by top-tier wealth managers for planning luxury real estate acquisitions.
            </p>
          </div>

          {/* Card 3: Instant Insights */}
          <div className="metric-card">
            <div className="metric-value" style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>
              Instant
            </div>
            <div className="metric-label">Financial Insights</div>
            <p className="sans-body" style={{ fontSize: '13px', marginTop: '10px', opacity: 0.8 }}>
              Dynamic prepayment schedules and optimization reports generated immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
