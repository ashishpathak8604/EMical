import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Percent, Info, RotateCcw } from 'lucide-react';

// Formatter for Indian Currency (Lakhs/Crores)
export const formatCurrency = (val) => {
  if (isNaN(val) || val === null || val === undefined) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val);
};

// Animated Number Component for Live Transitions
export function AnimatedNumberValue({ value, formatFn = formatCurrency }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp = null;
    const startVal = displayValue;
    const endVal = value;
    const duration = 600; // Fast and responsive 600ms transitions

    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cosine ease-out for a more luxury/fluid deceleration
      const ease = 1 - Math.cos((progress * Math.PI) / 2);
      const current = startVal + (endVal - startVal) * ease;
      setDisplayValue(current);
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{formatFn(displayValue)}</span>;
}

export default function Console({ calculator }) {
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    tenure,
    setTenure,
    tenureType,
    setTenureType,
    errors,
    isValid,
    emi,
    totalInterest,
    totalRepayment,
    handleReset
  } = calculator;

  return (
    <section className="section-wrapper" id="calculator" style={{ scrollMarginTop: '20px' }}>
      <div className="app-container">
        <div className="section-header">
          <div className="section-label">Wealth-Planning Interface</div>
          <h2 className="section-title editorial-serif">
            Smart EMI <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Planning Console</span>
          </h2>
          <p className="sans-body" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Adjust the sliders below to calibrate your mortgage or loan structure. Calculations compile instantaneously.
          </p>
        </div>

        <div className="grid-2">
          {/* Section 3: EMI Calculator Form */}
          <div className="luxury-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  Loan Parameters
                </span>
                <button 
                  onClick={handleReset}
                  className="pagination-btn"
                  style={{ padding: '6px 12px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  title="Reset calculator to defaults"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Input 1: Loan Amount */}
              <div className="input-group">
                <div className="input-label-container">
                  <label htmlFor="amount-input" className="input-label">Loan Principal</label>
                  <span className="input-val-display font-serif" style={{ color: 'var(--color-gold-hover)' }}>
                    {isValid ? formatCurrency(Number(loanAmount)) : '—'}
                  </span>
                </div>
                <div className="luxury-input-wrapper">
                  <span className="luxury-input-prefix">₹</span>
                  <input
                    id="amount-input"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className={`luxury-input ${errors.loanAmount ? 'input-invalid' : ''}`}
                    style={{ paddingLeft: '40px' }}
                    placeholder="Enter loan amount"
                  />
                </div>
                {errors.loanAmount ? (
                  <span className="error-msg"><Info size={13} /> {errors.loanAmount}</span>
                ) : (
                  <div className="luxury-slider-container">
                    <input
                      type="range"
                      min="100000"
                      max="100000000"
                      step="50000"
                      value={isValid ? loanAmount : '100000'}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="luxury-slider"
                    />
                  </div>
                )}
              </div>

              {/* Input 2: Interest Rate */}
              <div className="input-group">
                <div className="input-label-container">
                  <label htmlFor="rate-input" className="input-label">Annual Interest Rate</label>
                  <span className="input-val-display font-serif">{interestRate}%</span>
                </div>
                <div className="luxury-input-wrapper">
                  <input
                    id="rate-input"
                    type="number"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className={`luxury-input ${errors.interestRate ? 'input-invalid' : ''}`}
                    placeholder="Enter annual interest rate"
                  />
                  <span className="luxury-input-suffix">% p.a.</span>
                </div>
                {errors.interestRate ? (
                  <span className="error-msg"><Info size={13} /> {errors.interestRate}</span>
                ) : (
                  <div className="luxury-slider-container">
                    <input
                      type="range"
                      min="1"
                      max="25"
                      step="0.05"
                      value={isValid ? interestRate : '1'}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="luxury-slider"
                    />
                  </div>
                )}
              </div>

              {/* Input 3: Tenure */}
              <div className="input-group" style={{ marginBottom: '10px' }}>
                <div className="input-label-container">
                  <label htmlFor="tenure-input" className="input-label">Loan Duration</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (tenureType === 'months') {
                          setTenureType('years');
                          setTenure(Math.max(1, Math.round(Number(tenure) / 12)).toString());
                        }
                      }}
                      className="pagination-btn"
                      style={{ 
                        padding: '3px 10px', 
                        fontSize: '11px', 
                        borderRadius: '10px',
                        background: tenureType === 'years' ? 'var(--color-charcoal)' : 'transparent',
                        color: tenureType === 'years' ? '#FFFFFF' : 'var(--color-charcoal)',
                        borderColor: tenureType === 'years' ? 'var(--color-charcoal)' : 'rgba(30, 30, 30, 0.1)'
                      }}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (tenureType === 'years') {
                          setTenureType('months');
                          setTenure((Number(tenure) * 12).toString());
                        }
                      }}
                      className="pagination-btn"
                      style={{ 
                        padding: '3px 10px', 
                        fontSize: '11px', 
                        borderRadius: '10px',
                        background: tenureType === 'months' ? 'var(--color-charcoal)' : 'transparent',
                        color: tenureType === 'months' ? '#FFFFFF' : 'var(--color-charcoal)',
                        borderColor: tenureType === 'months' ? 'var(--color-charcoal)' : 'rgba(30, 30, 30, 0.1)'
                      }}
                    >
                      Months
                    </button>
                  </div>
                </div>
                <div className="luxury-input-wrapper">
                  <input
                    id="tenure-input"
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className={`luxury-input ${errors.tenure ? 'input-invalid' : ''}`}
                    placeholder="Enter loan duration"
                  />
                  <span className="luxury-input-suffix">{tenureType === 'years' ? 'Years' : 'Months'}</span>
                </div>
                {errors.tenure ? (
                  <span className="error-msg"><Info size={13} /> {errors.tenure}</span>
                ) : (
                  <div className="luxury-slider-container">
                    <input
                      type="range"
                      min="1"
                      max={tenureType === 'years' ? '40' : '480'}
                      step="1"
                      value={isValid ? tenure : '1'}
                      onChange={(e) => setTenure(e.target.value)}
                      className="luxury-slider"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Financial Insights Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'space-between' }}>
            {isValid ? (
              <>
                {/* Monthly EMI Card */}
                <div className="luxury-card insight-card" style={{ flexGrow: 1, padding: '30px' }}>
                  <div className="insight-label">Estimated Monthly EMI</div>
                  <div className="insight-value editorial-serif" style={{ fontSize: '38px', color: 'var(--color-gold-hover)' }}>
                    <AnimatedNumberValue value={emi} />
                  </div>
                  <p className="sans-body" style={{ fontSize: '13px', marginTop: '10px' }}>
                    Calculated for standard monthly repayment frequencies due at the start of each cycle.
                  </p>
                </div>

                {/* Total Interest Card */}
                <div className="luxury-card insight-card" style={{ flexGrow: 1, padding: '30px' }}>
                  <div className="insight-label">Total Interest Payable</div>
                  <div className="insight-value editorial-serif" style={{ fontSize: '38px' }}>
                    <AnimatedNumberValue value={totalInterest} />
                  </div>
                  <p className="sans-body" style={{ fontSize: '13px', marginTop: '10px' }}>
                    The total cost of borrowing over the entire duration of the loan agreement.
                  </p>
                </div>

                {/* Total Repayment Card */}
                <div className="luxury-card insight-card" style={{ flexGrow: 1, padding: '30px' }}>
                  <div className="insight-label">Total Repayment Amount</div>
                  <div className="insight-value editorial-serif" style={{ fontSize: '38px' }}>
                    <AnimatedNumberValue value={totalRepayment} />
                  </div>
                  <p className="sans-body" style={{ fontSize: '13px', marginTop: '10px' }}>
                    Cumulative payment amount (Principal + Interest) paid by the end of tenure.
                  </p>
                </div>
              </>
            ) : (
              <div 
                className="luxury-card" 
                style={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '40px',
                  backgroundColor: 'rgba(197, 91, 75, 0.02)',
                  borderColor: '#C55B4B'
                }}
              >
                <Info size={40} style={{ color: '#C55B4B', marginBottom: '20px' }} />
                <h3 className="editorial-serif" style={{ fontSize: '22px', marginBottom: '12px' }}>Awaiting Valid Parameters</h3>
                <p className="sans-body" style={{ fontSize: '14px', maxWidth: '380px' }}>
                  Please resolve the highlighted validation errors in the planning console to compute interest details and amortization schedules.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
