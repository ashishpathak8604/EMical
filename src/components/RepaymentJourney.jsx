import React, { useState, useEffect } from 'react';
import { formatCurrency } from './Console';
import { Sparkles, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

export default function RepaymentJourney({ calculator }) {
  const { schedule, tenureType, tenure, isValid } = calculator;
  const [activeMilestone, setActiveMilestone] = useState(null);

  // Determine standard milestone years based on tenure length
  const totalMonths = schedule.length;
  const totalYears = Math.round(totalMonths / 12);

  // Compute 5 dynamic milestones based on total years
  const milestones = React.useMemo(() => {
    if (!isValid || totalMonths === 0) return [];
    
    let yearsList = [];
    if (totalYears >= 15) {
      yearsList = [1, 3, 5, 10, 15];
    } else if (totalYears >= 8) {
      yearsList = [1, 3, 5, 8, totalYears];
    } else if (totalYears >= 5) {
      yearsList = [1, 2, 3, 4, totalYears];
    } else {
      // Very short loan: divide months evenly
      const step = Math.max(1, Math.floor(totalMonths / 5));
      const list = [];
      for (let i = 1; i <= 4; i++) {
        const m = Math.min(totalMonths - 1, i * step);
        list.push({ label: `Month ${m}`, monthIndex: m });
      }
      list.push({ label: `End (Month ${totalMonths})`, monthIndex: totalMonths });
      return list;
    }

    return yearsList.map(yr => {
      const mIdx = Math.min(totalMonths, yr * 12);
      return {
        label: `Year ${yr}`,
        monthIndex: mIdx,
        yearNum: yr
      };
    });
  }, [totalMonths, totalYears, isValid]);

  // Set default active milestone on load/change
  useEffect(() => {
    if (milestones.length > 0) {
      setActiveMilestone(milestones[0]);
    }
  }, [milestones]);

  if (!isValid || totalMonths === 0 || milestones.length === 0 || !activeMilestone) {
    return null;
  }

  // Calculate cumulative stats up to the selected milestone index
  const mIndex = activeMilestone.monthIndex - 1; // 0-indexed in schedule
  const targetRow = schedule[mIndex] || schedule[schedule.length - 1];
  
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;
  for (let i = 0; i <= mIndex; i++) {
    if (schedule[i]) {
      cumulativePrincipal += schedule[i].principalPaid;
      cumulativeInterest += schedule[i].interestPaid;
    }
  }

  const initialPrincipal = schedule[0]?.principalPaid + schedule[0]?.remainingBalance || 0;
  const principalPaidPct = (cumulativePrincipal / Math.max(1, initialPrincipal)) * 100;
  const balanceRemainingPct = (targetRow.remainingBalance / Math.max(1, initialPrincipal)) * 100;

  // Active index for timeline progress width
  const activeIdx = milestones.findIndex(m => m.monthIndex === activeMilestone.monthIndex);
  const progressPct = (activeIdx / (milestones.length - 1)) * 90 + 5; // offset slightly for styling

  return (
    <section className="section-wrapper" id="timeline">
      <div className="app-container">
        <div className="section-header">
          <div className="section-label">Amortization Narrative</div>
          <h2 className="section-title editorial-serif">
            The Repayment <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Journey</span>
          </h2>
          <p className="sans-body" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Click through the timeline to visualize how your principal balance dissolves and track interest accumulation.
          </p>
        </div>

        <div className="luxury-card" style={{ padding: '50px 40px' }}>
          {/* Interactive Timeline Rail */}
          <div className="timeline-track-container">
            <div className="timeline-line" />
            <div className="timeline-progress" style={{ width: `${progressPct}%` }} />
            
            <div className="timeline-nodes">
              {milestones.map((milestone, idx) => {
                const isActive = milestone.monthIndex === activeMilestone.monthIndex;
                return (
                  <div 
                    key={milestone.label}
                    className={`timeline-node-container ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveMilestone(milestone)}
                  >
                    <div className="timeline-dot" />
                    <span className="timeline-year-label">{milestone.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Storytelling Details Panel */}
          <div 
            style={{ 
              marginTop: '40px', 
              background: '#FAF8F5', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '35px',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            {/* Left Story Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Sparkles size={16} className="gold-accent" />
                <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold-hover)' }}>
                  Narrative Audit: {activeMilestone.label}
                </span>
              </div>
              
              <h3 className="editorial-serif font-serif" style={{ fontSize: '26px', marginBottom: '14px', lineHeight: '1.3' }}>
                Outstanding Debt is Reduced to <span className="gold-accent">{formatCurrency(targetRow.remainingBalance)}</span>
              </h3>
              
              <p className="sans-body" style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--color-muted)' }}>
                By the conclusion of <strong style={{ color: 'var(--color-charcoal)' }}>{activeMilestone.label}</strong>, 
                you have completed {activeMilestone.monthIndex} monthly repayments. 
                Your cumulative contributions will total <strong style={{ color: 'var(--color-charcoal)' }}>{formatCurrency(cumulativePrincipal + cumulativeInterest)}</strong>. 
                Of this amount, <strong style={{ color: 'var(--color-charcoal)' }}>{formatCurrency(cumulativePrincipal)}</strong> has gone directly to clear your principal debt (covering {principalPaidPct.toFixed(1)}% of the original loan), 
                while <strong style={{ color: 'var(--color-gold-hover)' }}>{formatCurrency(cumulativeInterest)}</strong> was allocated to compound interest fees.
              </p>
            </div>

            {/* Right Progress Ring/Comparison Visualization */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Progress 1: Principal Paid */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                  <span className="sans-body">Cumulative Principal Repaid</span>
                  <span style={{ color: 'var(--color-charcoal)' }}>{principalPaidPct.toFixed(1)}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--color-nude)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--color-charcoal)', width: `${principalPaidPct}%`, borderRadius: '4px', transition: 'width 0.8s ease' }} />
                </div>
              </div>

              {/* Progress 2: Remaining Debt */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                  <span className="sans-body">Outstanding Principal Balance</span>
                  <span style={{ color: 'var(--color-gold-hover)' }}>{balanceRemainingPct.toFixed(1)}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--color-nude)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--color-gold)', width: `${balanceRemainingPct}%`, borderRadius: '4px', transition: 'width 0.8s ease' }} />
                </div>
              </div>

              {/* Instant stat block */}
              <div 
                style={{ 
                  marginTop: '10px', 
                  borderTop: '1px dashed var(--color-border)', 
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-muted)' }}>EMI Paid</span>
                  <div style={{ fontSize: '15px', fontWeight: '700' }}>{formatCurrency(targetRow.emi)} /mo</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Interest Share</span>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-gold-hover)' }}>
                    {((targetRow.interestPaid / targetRow.emi) * 100).toFixed(0)}% of EMI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
