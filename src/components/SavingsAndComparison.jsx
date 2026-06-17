import React from 'react';
import { formatCurrency } from './Console';
import { TrendingDown, ArrowRight, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export default function SavingsAndComparison({ calculator }) {
  const { isValid, savings, comparison } = calculator;

  if (!isValid || !savings || !comparison) return null;

  const { current, optimized, savings: diffs } = comparison;

  return (
    <div id="savings" style={{ scrollMarginTop: '20px' }}>
      {/* Section 6: Smart Savings Insights */}
      <section className="section-wrapper">
        <div className="app-container">
          <div className="section-header">
            <div className="section-label">Optimization Advisory</div>
            <h2 className="section-title editorial-serif">
              Smart Savings <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Insights</span>
            </h2>
            <p className="sans-body" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              Tailored optimization scenarios calculated by our wealth advisory engine based on your current inputs.
            </p>
          </div>

          <div className="grid-2">
            {/* Recommendation 1: Incremental Prepayment */}
            <div className="luxury-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div 
                style={{ 
                  backgroundColor: 'rgba(184, 154, 103, 0.15)', 
                  color: 'var(--color-gold-hover)', 
                  padding: '12px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <TrendingDown size={24} />
              </div>
              <div>
                <h3 className="editorial-serif" style={{ fontSize: '20px', marginBottom: '10px' }}>
                  Incremental Prepayment Benefit
                </h3>
                <p className="sans-body" style={{ fontSize: '14px', marginBottom: '16px' }}>
                  If you increase your monthly payment by just <strong style={{ color: 'var(--color-charcoal)' }}>{formatCurrency(savings.extraPayment)}</strong> (approx. 10% extra), you will optimize your amortization path significantly:
                </p>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '12px 18px', borderRadius: '15px' }}>
                    <span style={{ fontSize: '11px', display: 'block', color: 'var(--color-muted)' }}>Interest Saved</span>
                    <strong className="editorial-serif font-serif" style={{ fontSize: '18px', color: 'var(--color-gold-hover)' }}>
                      {formatCurrency(savings.interestSaved)}
                    </strong>
                  </div>
                  <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '12px 18px', borderRadius: '15px' }}>
                    <span style={{ fontSize: '11px', display: 'block', color: 'var(--color-muted)' }}>Payoff Accelerated By</span>
                    <strong className="editorial-serif font-serif" style={{ fontSize: '18px', color: 'var(--color-charcoal)' }}>
                      {savings.earlyPayoffYears > 0 ? `${savings.earlyPayoffYears} Yr ` : ''}
                      {savings.earlyPayoffMonths} Mos
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation 2: Tenure Compression */}
            <div className="luxury-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div 
                style={{ 
                  backgroundColor: 'rgba(30, 30, 30, 0.05)', 
                  color: 'var(--color-charcoal)', 
                  padding: '12px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Award size={24} />
              </div>
              <div>
                <h3 className="editorial-serif" style={{ fontSize: '20px', marginBottom: '10px' }}>
                  Tenure Compression Strategy
                </h3>
                <p className="sans-body" style={{ fontSize: '14px', marginBottom: '16px' }}>
                  If you compress your loan term by exactly <strong style={{ color: 'var(--color-charcoal)' }}>2 Years</strong> (24 months), you will drastically minimize compound interest costs:
                </p>
                {savings.tenureNewEmiVal > 0 ? (
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '12px 18px', borderRadius: '15px' }}>
                      <span style={{ fontSize: '11px', display: 'block', color: 'var(--color-muted)' }}>Interest Saved</span>
                      <strong className="editorial-serif font-serif" style={{ fontSize: '18px', color: 'var(--color-gold-hover)' }}>
                        {formatCurrency(savings.tenureSavingsVal)}
                      </strong>
                    </div>
                    <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '12px 18px', borderRadius: '15px' }}>
                      <span style={{ fontSize: '11px', display: 'block', color: 'var(--color-muted)' }}>EMI Adjusts To</span>
                      <strong className="editorial-serif font-serif" style={{ fontSize: '18px', color: 'var(--color-charcoal)' }}>
                        {formatCurrency(savings.tenureNewEmiVal)}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <p className="sans-body" style={{ fontSize: '13px', color: 'var(--color-gold)', fontStyle: 'italic' }}>
                    Requires a loan duration of longer than 2 years to compute tenure compression.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Loan Comparison */}
      <section className="section-wrapper" id="comparison">
        <div className="app-container">
          <div className="section-header">
            <div className="section-label">Portfolio Restructuring</div>
            <h2 className="section-title editorial-serif">
              Private Wealth <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Loan Comparison</span>
            </h2>
            <p className="sans-body" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              Review a side-by-side audit of your current structure against a customized Refinance Prepayment path.
            </p>
          </div>

          <div className="luxury-card" style={{ padding: '50px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
              <div>
                <span className="editorial-serif font-serif" style={{ fontSize: '24px', fontWeight: '500' }}>Refinance Audit Summary</span>
                <p className="sans-body" style={{ fontSize: '13px', marginTop: '4px' }}>Refinance projection simulating a -0.75% rate cut and 20% tenure compression.</p>
              </div>
              <div 
                style={{ 
                  background: 'rgba(184, 154, 103, 0.1)', 
                  border: '1px solid var(--color-gold)', 
                  color: 'var(--color-gold-hover)', 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={14} />
                <span>EXECUTIVE RECOMMENDATION</span>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '30px' }}>
              {/* Left Column: Current Loan */}
              <div style={{ borderRight: '1px solid rgba(184, 154, 103, 0.15)', paddingRight: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 className="editorial-serif font-serif" style={{ fontSize: '20px', color: 'var(--color-muted)' }}>Current Loan Structure</h4>
                  <span style={{ fontSize: '12px', background: 'rgba(30,30,30,0.05)', padding: '4px 10px', borderRadius: '10px', fontWeight: '600' }}>
                    {current.rate.toFixed(2)}% p.a.
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(184,154,103,0.1)', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Monthly Repayment</span>
                    <strong style={{ fontSize: '16px' }}>{formatCurrency(current.emi)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(184,154,103,0.1)', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Total Interest Cost</span>
                    <strong style={{ fontSize: '16px' }}>{formatCurrency(current.interest)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(184,154,103,0.1)', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Cumulative Cost</span>
                    <strong style={{ fontSize: '16px' }}>{formatCurrency(current.totalCost)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Duration</span>
                    <strong style={{ fontSize: '16px' }}>{current.duration} Months</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Optimized Refinance */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 className="editorial-serif font-serif" style={{ fontSize: '20px', color: 'var(--color-gold-hover)' }}>Optimized Private Offer</h4>
                  <span style={{ fontSize: '12px', background: 'rgba(184, 154, 103, 0.15)', color: 'var(--color-gold-hover)', padding: '4px 10px', borderRadius: '10px', fontWeight: '700' }}>
                    {optimized.rate.toFixed(2)}% p.a. (-0.75%)
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(184,154,103,0.1)', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Monthly Repayment</span>
                    <strong style={{ fontSize: '16px', color: 'var(--color-gold-hover)' }}>
                      {formatCurrency(optimized.emi)}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(184,154,103,0.1)', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Total Interest Cost</span>
                    <strong style={{ fontSize: '16px' }}>{formatCurrency(optimized.interest)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(184,154,103,0.1)', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Cumulative Cost</span>
                    <strong style={{ fontSize: '16px' }}>{formatCurrency(optimized.totalCost)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                    <span className="sans-body" style={{ fontSize: '14px' }}>Duration</span>
                    <strong style={{ fontSize: '16px' }}>{optimized.duration} Months ({diffs.monthsSaved} Months Saved)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Differentiators / Savings Banner */}
            <div 
              style={{ 
                marginTop: '36px', 
                background: 'var(--color-charcoal)', 
                color: '#FFFFFF', 
                padding: '24px 30px', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8C867E', display: 'block', marginBottom: '4px' }}>
                  Total Optimization Savings
                </span>
                <strong className="editorial-serif font-serif" style={{ fontSize: '28px', color: 'var(--color-gold)' }}>
                  {formatCurrency(diffs.totalCostSaved)} Saved
                </strong>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '13px', color: '#C2BBB2', display: 'block' }}>Refinanced Repayment Duration</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>
                    {(optimized.duration / 12).toFixed(1)} Years vs {(current.duration / 12).toFixed(1)} Years
                  </span>
                </div>
                <div style={{ height: '30px', width: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                <div 
                  style={{ 
                    backgroundColor: 'rgba(184,154,103,0.2)', 
                    color: 'var(--color-gold)', 
                    padding: '10px 18px', 
                    borderRadius: '30px',
                    fontSize: '12px',
                    fontWeight: '700',
                    letterSpacing: '0.05em'
                  }}
                >
                  {diffs.monthsSaved} MONTHS FASTER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
