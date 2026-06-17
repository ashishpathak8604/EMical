import { useState } from 'react';
import { useEMICalculator } from './hooks/useEMICalculator';
import { exportToPDF } from './utils/pdfExporter';
import heroVideo from './assets/vdieo.mp4';
import { 
  Calculator, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  Zap, 
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

// Format helper for Indian Rupee
const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

// Format input with commas for user friendly text input
const formatInputWithCommas = (value) => {
  if (!value) return '';
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join('.');
};

export default function App() {
  // Initialize calculations with 50 Lakhs, 8.5% interest, 20 years tenure
  const {
    inputs,
    setPrincipalInput,
    setRateInput,
    setTenureInput,
    calculations,
    savings,
    isValid,
    errors
  } = useEMICalculator(5000000, 8.5, 20);

  // States for interactive components
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState(null);

  const { emi, totalInterest, totalPayment, principalPercentage, interestPercentage, amortizationSchedule, milestones } = calculations;

  // Pagination calculations
  const rowsPerPage = 10;
  const filteredSchedule = amortizationSchedule.filter(row => 
    row.month.toString().includes(tableSearch)
  );
  
  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSchedule = filteredSchedule.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (!isValid) return;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Month,Opening Balance (INR),Monthly EMI (INR),Principal Paid (INR),Interest Paid (INR),Closing Balance (INR),Cumulative Principal (INR),Cumulative Interest (INR)\n";

    amortizationSchedule.forEach(row => {
      csvContent += `${row.month},${row.openingBalance.toFixed(2)},${row.emi.toFixed(2)},${row.principalPaid.toFixed(2)},${row.interestPaid.toFixed(2)},${row.closingBalance.toFixed(2)},${row.cumulativePrincipal.toFixed(2)},${row.cumulativeInterest.toFixed(2)}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Amortization_Schedule_${inputs.principal}_${inputs.tenure}Y.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export trigger
  const handleExportPDF = () => {
    if (!isValid) return;
    exportToPDF({ inputs, calculations, savings });
  };

  // Handle formatted text changes for sliders & fields
  const handlePrincipalChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '');
    setPrincipalInput(rawVal);
    setCurrentPage(1); // Reset page on input change
  };

  const handleRateChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '');
    setRateInput(rawVal);
    setCurrentPage(1);
  };

  const handleTenureChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '');
    setTenureInput(rawVal);
    setCurrentPage(1);
  };

  // Dynamic values for timeline progress
  const activeMilestone = milestones[activeMilestoneIndex] || milestones[0];
  const timelineProgressPercent = milestones.length > 0 
    ? ((activeMilestoneIndex) / (milestones.length - 1)) * 100 
    : 0;

  // Donut SVG Math
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.82
  const interestStrokeOffset = circumference * (1 - (interestPercentage / 100));

  return (
    <>
      {/* HEADER */}
      <header className="luxury-header">
        <div className="app-container header-content">
          <a href="#" className="logo">
            <div className="logo-icon">
              <Calculator size={18} />
            </div>
            <span className="logo-text">AURELIA</span>
          </a>
          <ul className="nav-links">
            <li><a href="#planning-console" className="nav-link">Console</a></li>
            <li><a href="#visual-breakdown" className="nav-link">Breakdown</a></li>
            <li><a href="#savings-advisory" className="nav-link">Savings</a></li>
            <li><a href="#repayment-journey" className="nav-link">Journey</a></li>
            <li><a href="#amortization-details" className="nav-link">Amortization</a></li>
          </ul>
        </div>
      </header>
       
       

            {/* Custom interlocking SVG rings sculpture with continuous float and orbit animations */}
      
         
       
       

      <div className="app-container">
        {/* SECTION 1: HERO */}
         <section className="hero-section">
  <div className="hero-content">

    <span className="hero-label">
      Wealth Management Portal
    </span>

    <h1 className="hero-title">
      Plan Every Loan With
      <span className="gold-accent"> Confidence.</span>
    </h1>

    <p className="hero-description">
      Welcome to Aurelia, an executive-grade financial suite designed to
      evaluate long-term credit structures and repayment strategies.
    </p>

    <div className="hero-buttons">
      <a href="#planning-console" className="btn-primary">
        Open Console
      </a>

      <a href="#amortization-details" className="btn-secondary">
        View Schedule
      </a>
    </div>

  </div>
</section>

        {/* SECTION 2: TRUST & IMPACT */}
        <section className="section-wrapper">
          <div className="grid-3">
            <div className="metric-card">
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Precision Audited Accuracy</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">₹10Cr+</div>
              <div className="metric-label">Credit Value Modelled</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">Instant</div>
              <div className="metric-label">Executive-grade Advisory</div>
            </div>
          </div>
        </section>

        {/* SECTION 3: EMI CALCULATOR PLANNING CONSOLE */}
        <section className="section-wrapper" id="planning-console">
          <div className="section-header">
            <span className="section-label">Wealth Planning Console</span>
            <h2 className="editorial-serif section-title">Set Your Loan Configuration</h2>
            <p className="sans-body">Adjust details dynamically using range sliders or enter values manually. Aurelia computes details instantly.</p>
          </div>

          <div className="grid-2">
            <div className="luxury-card">
              {/* Input 1: Principal */}
              <div className="input-group">
                <div className="input-label-container">
                  <span className="input-label">Loan Amount</span>
                  <span className="input-val-display gold-accent">
                    {inputs.principal ? formatINR(inputs.principal) : '₹0'}
                  </span>
                </div>
                <div className="luxury-input-wrapper">
                  <span className="luxury-input-prefix">₹</span>
                  <input 
                    type="text" 
                    className={`luxury-input ${errors.principal ? 'input-invalid' : ''}`}
                    value={formatInputWithCommas(inputs.principalInput)}
                    onChange={handlePrincipalChange}
                    placeholder="Enter amount"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
                {errors.principal && (
                  <div className="error-msg">
                    <Info size={14} /> {errors.principal}
                  </div>
                )}
                <div className="luxury-slider-container">
                  <input 
                    type="range" 
                    min="100000" 
                    max="150000000" 
                    step="100000"
                    className="luxury-slider"
                    value={inputs.principal || 100000}
                    onChange={(e) => {
                      setPrincipalInput(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Input 2: Interest Rate */}
              <div className="input-group">
                <div className="input-label-container">
                  <span className="input-label">Interest Rate</span>
                  <span className="input-val-display gold-accent">{inputs.rate || 0}%</span>
                </div>
                <div className="luxury-input-wrapper">
                  <input 
                    type="text" 
                    className={`luxury-input ${errors.rate ? 'input-invalid' : ''}`}
                    value={inputs.rateInput}
                    onChange={handleRateChange}
                    placeholder="Enter annual rate"
                    style={{ paddingRight: '40px' }}
                  />
                  <span className="luxury-input-suffix">%</span>
                </div>
                {errors.rate && (
                  <div className="error-msg">
                    <Info size={14} /> {errors.rate}
                  </div>
                )}
                <div className="luxury-slider-container">
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    step="0.05"
                    className="luxury-slider"
                    value={inputs.rate || 1}
                    onChange={(e) => {
                      setRateInput(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Input 3: Tenure */}
              <div className="input-group">
                <div className="input-label-container">
                  <span className="input-label">Loan Duration</span>
                  <span className="input-val-display gold-accent">{inputs.tenure || 0} Years</span>
                </div>
                <div className="luxury-input-wrapper">
                  <input 
                    type="text" 
                    className={`luxury-input ${errors.tenure ? 'input-invalid' : ''}`}
                    value={inputs.tenureInput}
                    onChange={handleTenureChange}
                    placeholder="Enter tenure in years"
                    style={{ paddingRight: '60px' }}
                  />
                  <span className="luxury-input-suffix">Years</span>
                </div>
                {errors.tenure && (
                  <div className="error-msg">
                    <Info size={14} /> {errors.tenure}
                  </div>
                )}
                <div className="luxury-slider-container">
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    className="luxury-slider"
                    value={inputs.tenure || 1}
                    onChange={(e) => {
                      setTenureInput(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: FINANCIAL INSIGHTS CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="luxury-card insight-card">
                <div className="insight-label">Estimated Monthly Payment (EMI)</div>
                <div className="editorial-serif insight-value gold-accent">
                  {isValid ? formatINR(emi) : '₹0'}
                </div>
                <div className="sans-body" style={{ fontSize: '13px', marginTop: '8px', color: '#8C867E' }}>
                  Debt service charges computed on reducing balance basis.
                </div>
              </div>

              <div className="luxury-card insight-card" style={{ borderLeft: '4px solid var(--color-gold)' }}>
                <div className="insight-label">Total Interest Liability</div>
                <div className="editorial-serif insight-value">
                  {isValid ? formatINR(totalInterest) : '₹0'}
                </div>
                <div className="sans-body" style={{ fontSize: '13px', marginTop: '8px', color: '#8C867E' }}>
                  Total cost of borrowing above the original principal.
                </div>
              </div>

              <div className="luxury-card insight-card" style={{ borderLeft: '4px solid var(--color-charcoal)' }}>
                <div className="insight-label">Cumulative Repayment (Principal + Interest)</div>
                <div className="editorial-serif insight-value">
                  {isValid ? formatINR(totalPayment) : '₹0'}
                </div>
                <div className="sans-body" style={{ fontSize: '13px', marginTop: '8px', color: '#8C867E' }}>
                  Total liquidity required to discharge this loan term fully.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: VISUAL BREAKDOWN (DONUT CHART) */}
        <section className="section-wrapper" id="visual-breakdown">
          <div className="section-header">
            <span className="section-label">Composition Visualisation</span>
            <h2 className="editorial-serif section-title">Principal vs Interest Breakdown</h2>
            <p className="sans-body">Hover over the slices to inspect detailed ratios of your aggregate payment structure.</p>
          </div>

          <div className="luxury-card grid-2" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <svg width="240" height="240" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                <circle 
                  cx="100" 
                  cy="100" 
                  r={radius} 
                  fill="transparent" 
                  stroke="#1E1E1E" 
                  strokeWidth={hoveredDonutSegment === 'principal' ? 24 : 18}
                  style={{ transition: 'stroke-width 0.3s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDonutSegment('principal')}
                  onMouseLeave={() => setHoveredDonutSegment(null)}
                />
                <circle 
                  cx="100" 
                  cy="100" 
                  r={radius} 
                  fill="transparent" 
                  stroke="#B89A67" 
                  strokeWidth={hoveredDonutSegment === 'interest' ? 24 : 18}
                  strokeDasharray={circumference}
                  strokeDashoffset={isValid ? interestStrokeOffset : circumference}
                  style={{ transition: 'stroke-width 0.3s ease, stroke-dashoffset 0.8s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDonutSegment('interest')}
                  onMouseLeave={() => setHoveredDonutSegment(null)}
                />
              </svg>

              {/* Text indicator in center */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none'
              }}>
                <span className="editorial-serif" style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  {hoveredDonutSegment === 'interest' ? `${interestPercentage}%` : hoveredDonutSegment === 'principal' ? `${principalPercentage}%` : `${principalPercentage}%`}
                </span>
                <div className="sans-body" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                  {hoveredDonutSegment === 'interest' ? 'Interest' : hoveredDonutSegment === 'principal' ? 'Principal' : 'Principal Ratio'}
                </div>
              </div>
            </div>

            {/* Legend Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div 
                className="luxury-card" 
                style={{ 
                  padding: '20px', 
                  borderRadius: '16px',
                  backgroundColor: hoveredDonutSegment === 'principal' ? '#FAF8F5' : 'rgba(255,255,255,0.8)',
                  borderColor: hoveredDonutSegment === 'principal' ? 'var(--color-charcoal)' : 'var(--color-border)'
                }}
                onMouseEnter={() => setHoveredDonutSegment('principal')}
                onMouseLeave={() => setHoveredDonutSegment(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#1E1E1E' }}></div>
                  <div>
                    <div className="input-label" style={{ fontSize: '11px' }}>Principal Component</div>
                    <div className="editorial-serif" style={{ fontSize: '20px', fontWeight: '600' }}>
                      {isValid ? formatINR(inputs.principal) : '₹0'} ({principalPercentage}%)
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="luxury-card" 
                style={{ 
                  padding: '20px', 
                  borderRadius: '16px',
                  backgroundColor: hoveredDonutSegment === 'interest' ? '#FAF8F5' : 'rgba(255,255,255,0.8)',
                  borderColor: hoveredDonutSegment === 'interest' ? 'var(--color-gold)' : 'var(--color-border)'
                }}
                onMouseEnter={() => setHoveredDonutSegment('interest')}
                onMouseLeave={() => setHoveredDonutSegment(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#B89A67' }}></div>
                  <div>
                    <div className="input-label" style={{ fontSize: '11px' }}>Interest Component</div>
                    <div className="editorial-serif" style={{ fontSize: '20px', fontWeight: '600' }}>
                      {isValid ? formatINR(totalInterest) : '₹0'} ({interestPercentage}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SMART SAVINGS ADVISORY */}
        <section className="section-wrapper" id="savings-advisory">
          <div className="section-header">
            <span className="section-label">Tailored Financial Advisory</span>
            <h2 className="editorial-serif section-title">Optimize Interest & Term Outlays</h2>
            <p className="sans-body">Discover minor modifications that generate substantial long-term interest reductions.</p>
          </div>

          <div className="grid-2">
            {/* Card 1: EMI Incremental Benefit */}
            <div className="luxury-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--color-gold)' }}>
              <div>
                <div className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Zap size={16} className="gold-accent" /> Accelerated Repayment Model
                </div>
                <h3 className="editorial-serif" style={{ fontSize: '24px', marginBottom: '14px' }}>Increase Monthly Payment by 10%</h3>
                <p className="sans-body" style={{ fontSize: '14px', marginBottom: '24px' }}>
                  Adding 10% more to your scheduled monthly EMI pays down the principal balance rapidly, saving massive interest compound effects.
                </p>
              </div>

              {isValid && savings ? (
                <div style={{ background: '#FAF8F5', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="sans-body" style={{ fontSize: '13px' }}>Interest Saved:</span>
                    <span className="gold-accent" style={{ fontWeight: '700' }}>{formatINR(savings.accelerated.interestSaved)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="sans-body" style={{ fontSize: '13px' }}>Tenure Reduced:</span>
                    <span style={{ fontWeight: '700', color: 'var(--color-charcoal)' }}>{savings.accelerated.yearsSaved} Years ({savings.accelerated.monthsSaved} Months)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '10px', marginTop: '10px', color: '#8C867E' }}>
                    <span>Proposed EMI:</span>
                    <span>{formatINR(savings.accelerated.newEmi)} / mo</span>
                  </div>
                </div>
              ) : (
                <p className="sans-body" style={{ fontStyle: 'italic' }}>Please enter valid numbers to simulate savings.</p>
              )}
            </div>

            {/* Card 2: Tenure Optimization */}
            <div className="luxury-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--color-charcoal)' }}>
              <div>
                <div className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Layers size={16} /> Tenure Compression Model
                </div>
                <h3 className="editorial-serif" style={{ fontSize: '24px', marginBottom: '14px' }}>Reduce Term Duration by {isValid && savings ? savings.tenureReduction.reductionYears : '2'} Years</h3>
                <p className="sans-body" style={{ fontSize: '14px', marginBottom: '24px' }}>
                  By squeezing your planned term, you minimize the period over which interest accumulates, though your monthly cash commitment rises.
                </p>
              </div>

              {isValid && savings && savings.tenureReduction.reductionYears > 0 ? (
                <div style={{ background: '#FAF8F5', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="sans-body" style={{ fontSize: '13px' }}>Interest Saved:</span>
                    <span className="gold-accent" style={{ fontWeight: '700' }}>{formatINR(savings.tenureReduction.interestSaved)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="sans-body" style={{ fontSize: '13px' }}>EMI Increase:</span>
                    <span style={{ fontWeight: '700', color: 'var(--color-charcoal)' }}>+ {formatINR(savings.tenureReduction.emiDifference)} / mo</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '10px', marginTop: '10px', color: '#8C867E' }}>
                    <span>Optimized EMI:</span>
                    <span>{formatINR(savings.tenureReduction.newEmi)} / mo</span>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#FAF8F5', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                  <span className="sans-body" style={{ fontSize: '13px', fontStyle: 'italic' }}>Tenure compression not applicable for terms less than 2 years.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 7: LOAN COMPARISON (SIDE-BY-SIDE) */}
        <section className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Refinance & Strategy Comparison</span>
            <h2 className="editorial-serif section-title">Side-by-Side Comparison Console</h2>
            <p className="sans-body">Evaluate your standard configuration alongside automated refinance and acceleration programs.</p>
          </div>

          <div className="grid-3">
            {/* Column 1: Current Loan */}
            <div className="luxury-card" style={{ padding: '30px', borderTop: '4px solid var(--color-muted)' }}>
              <span className="input-label" style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Baseline</span>
              <h3 className="editorial-serif" style={{ fontSize: '22px', margin: '8px 0 20px 0' }}>Current Plan</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Monthly EMI</span>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{isValid ? formatINR(emi) : '₹0'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Interest Charged</span>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{isValid ? formatINR(totalInterest) : '₹0'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Total Outlay</span>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{isValid ? formatINR(totalPayment) : '₹0'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Duration</span>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{inputs.tenure} Years</div>
                </div>
              </div>
            </div>

            {/* Column 2: Refinance Option */}
            <div className="luxury-card" style={{ padding: '30px', borderTop: '4px solid var(--color-gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="input-label" style={{ fontSize: '11px', color: 'var(--color-gold)' }}>Refinance Option</span>
                <span style={{ fontSize: '10px', background: 'rgba(184, 154, 103, 0.15)', color: 'var(--color-gold-hover)', padding: '3px 8px', borderRadius: '10px', fontWeight: '700' }}>-0.75% Rate</span>
              </div>
              <h3 className="editorial-serif" style={{ fontSize: '22px', margin: '8px 0 20px 0' }}>Refinanced Plan</h3>
              
              {isValid && savings ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Monthly EMI</span>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{formatINR(savings.refinance.emi)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Interest Charged</span>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{formatINR(savings.refinance.totalInterest)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Total Outlay</span>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{formatINR(savings.refinance.totalPayment)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Refinance Savings</span>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#B89A67' }}>
                      Save {formatINR(savings.refinance.interestSaved)}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="sans-body" style={{ fontStyle: 'italic' }}>Calculating...</p>
              )}
            </div>

            {/* Column 3: Accelerated Option */}
            <div className="luxury-card" style={{ padding: '30px', borderTop: '4px solid var(--color-charcoal)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="input-label" style={{ fontSize: '11px', color: 'var(--color-charcoal)' }}>Payoff Strategy</span>
                <span style={{ fontSize: '10px', background: 'rgba(30, 30, 30, 0.08)', color: 'var(--color-charcoal)', padding: '3px 8px', borderRadius: '10px', fontWeight: '700' }}>+10% EMI</span>
              </div>
              <h3 className="editorial-serif" style={{ fontSize: '22px', margin: '8px 0 20px 0' }}>Accelerated Plan</h3>
              
              {isValid && savings ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Monthly EMI</span>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{formatINR(savings.accelerated.newEmi)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Interest Charged</span>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{formatINR(savings.accelerated.totalInterest)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Total Outlay</span>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{formatINR(savings.accelerated.totalPayment)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8C867E' }}>Accelerated Savings</span>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-gold)' }}>
                      Save {formatINR(savings.accelerated.interestSaved)}
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#8C867E', fontWeight: '500' }}>
                      ({savings.accelerated.yearsSaved} yrs saved)
                    </span>
                  </div>
                </div>
              ) : (
                <p className="sans-body" style={{ fontStyle: 'italic' }}>Calculating...</p>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 8: REPAYMENT JOURNEY (TIMELINE) */}
        <section className="section-wrapper" id="repayment-journey">
          <div className="section-header">
            <span className="section-label">Amortization Milestones</span>
            <h2 className="editorial-serif section-title">Repayment Journey Timeline</h2>
            <p className="sans-body">Hover or select milestones along the timeline track to observe principal payoff velocities.</p>
          </div>

          <div className="luxury-card" style={{ padding: '30px 40px' }}>
            {isValid && milestones.length > 0 ? (
              <>
                <div className="timeline-track-container">
                  <div className="timeline-line"></div>
                  <div className="timeline-progress" style={{ width: `${timelineProgressPercent}%` }}></div>
                  <div className="timeline-nodes">
                    {milestones.map((milestone, idx) => (
                      <div 
                        key={idx} 
                        className={`timeline-node-container ${idx === activeMilestoneIndex ? 'active' : ''}`}
                        onClick={() => setActiveMilestoneIndex(idx)}
                      >
                        <div className="timeline-dot"></div>
                        <span className="timeline-year-label">Yr {milestone.year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Detail Card */}
                <div className="luxury-card" style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', padding: '24px', marginTop: '20px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <span className="input-label" style={{ fontSize: '11px' }}>Repayment Milestone Status</span>
                      <h4 className="editorial-serif" style={{ fontSize: '24px', margin: '4px 0 0 0' }}>Year {activeMilestone.year} Balance Report</h4>
                    </div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#8C867E' }}>Remaining Principal Balance</span>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-charcoal)' }}>
                          {formatINR(activeMilestone.remainingBalance)}
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#8C867E' }}>Payment Ratio (Paid vs Interest)</span>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-gold)' }}>
                          {activeMilestone.principalRatio}% / {activeMilestone.interestRatio}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual progress bar within the details card */}
                  <div style={{ marginTop: '20px', background: '#EDE4DB', height: '6px', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ background: '#1E1E1E', width: `${activeMilestone.principalRatio}%`, height: '100%' }}></div>
                    <div style={{ background: '#B89A67', width: `${activeMilestone.interestRatio}%`, height: '100%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8C867E', marginTop: '8px' }}>
                    <span>Cumulative Principal Paid: {formatINR(activeMilestone.principalPaidPaidSoFar)}</span>
                    <span>Cumulative Interest Paid: {formatINR(activeMilestone.interestPaidSoFar)}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="sans-body" style={{ fontStyle: 'italic', textAlign: 'center' }}>Please configure a valid loan layout to review timeline milestones.</p>
            )}
          </div>
        </section>

        {/* SECTION 9: PAGINATED AMORTIZATION TABLE */}
        <section className="section-wrapper" id="amortization-details">
          <div className="section-header">
            <span className="section-label">General Ledger Details</span>
            <h2 className="editorial-serif section-title">Payment Schedule Amortization</h2>
            <p className="sans-body">Review the granular, month-by-month repayment ledger. Search by month number and export data sets.</p>
          </div>

          <div className="luxury-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span className="input-label" style={{ fontSize: '12px', margin: '0' }}>Search Month</span>
                <input 
                  type="text" 
                  className="luxury-input" 
                  value={tableSearch}
                  onChange={(e) => {
                    setTableSearch(e.target.value.replace(/[^0-9]/g, ''));
                    setCurrentPage(1);
                  }}
                  placeholder="e.g. 12"
                  style={{ width: '100px', padding: '10px 14px', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <button 
                  onClick={handleExportCSV} 
                  disabled={!isValid || amortizationSchedule.length === 0}
                  className="btn-secondary" 
                  style={{ padding: '12px 24px', fontSize: '13px' }}
                >
                  <Download size={14} /> Export CSV
                </button>
                <button 
                  onClick={handleExportPDF} 
                  disabled={!isValid || amortizationSchedule.length === 0}
                  className="btn-gold" 
                  style={{ padding: '12px 24px', fontSize: '13px' }}
                >
                  <FileText size={14} /> Export PDF Report
                </button>
              </div>
            </div>

            {isValid && paginatedSchedule.length > 0 ? (
              <>
                <div className="table-container">
                  <table className="luxury-table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Opening Balance</th>
                        <th>Interest Paid</th>
                        <th>Principal Paid</th>
                        <th>Closing Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedSchedule.map((row) => (
                        <tr key={row.month}>
                          <td><strong>M {row.month}</strong></td>
                          <td>{formatINR(row.openingBalance)}</td>
                          <td style={{ color: 'var(--color-gold)' }}>{formatINR(row.interestPaid)}</td>
                          <td style={{ color: 'var(--color-charcoal)' }}>{formatINR(row.principalPaid)}</td>
                          <td>{formatINR(row.closingBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Actions */}
                  <div className="pagination-container">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      <ChevronLeft size={14} /> Prev
                    </button>
                    <span className="pagination-info">
                      Page {currentPage} of {totalPages || 1}
                    </span>
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="pagination-btn"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: '#FAF8F5', borderRadius: '12px', border: '1px dashed var(--color-border)' }}>
                <p className="sans-body" style={{ fontStyle: 'italic', margin: '0' }}>
                  {tableSearch ? 'No months match the search criteria.' : 'Please configure a valid loan layout.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* SECTION 10: FOOTER */}
      <footer className="luxury-footer">
        <div className="app-container">
          <div className="footer-content">
            <div className="footer-credits">
              <div className="footer-logo">AURELIA</div>
              <p className="footer-desc">
                An ultra-luxury executive financial planning application built to model debt, refinance scenarios, and tenure configurations.
              </p>
              <ul className="footer-contact">
                <li><span>Developer:</span> Ashish Pathak</li>
                <li><span>Email:</span> <a href="mailto:ashishpathak8604@gmail.com">ashishpathak8604@gmail.com</a></li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-label" style={{ color: '#8C867E', fontSize: '11px' }}>Credentials Portfolio</div>
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-brand-button"
              >
                Built for Digital Heroes <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Aurelia Financial Suite. All rights reserved.</span>
            <span>Design: Premium Wealth Portal Architecture</span>
          </div>
        </div>
      </footer>
    </>
  );
}
