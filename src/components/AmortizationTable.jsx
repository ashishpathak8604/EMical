import React, { useState, useMemo, useEffect } from 'react';
import { formatCurrency } from './Console';
import { Search, Download, ChevronLeft, ChevronRight, Info } from 'lucide-react';

export default function AmortizationTable({ calculator }) {
  const { schedule, loanAmount, isValid } = calculator;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12; // Exactly 1 year of payments per page

  // Reset page when inputs change
  useEffect(() => {
    setCurrentPage(1);
  }, [schedule]);

  const filteredSchedule = useMemo(() => {
    if (!isValid) return [];
    if (!searchTerm.trim()) return schedule;
    
    return schedule.filter(row => 
      row.month.toString() === searchTerm.trim() ||
      `month ${row.month}`.includes(searchTerm.toLowerCase())
    );
  }, [schedule, searchTerm, isValid]);

  const totalPages = Math.max(1, Math.ceil(filteredSchedule.length / rowsPerPage));
  
  // Get current page slice
  const paginatedSchedule = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredSchedule.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredSchedule, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  // Robust CSV Exporter using ObjectURLs
  const handleExportCSV = () => {
    if (!schedule || schedule.length === 0) return;

    const csvRows = [
      ['Payment Month', 'EMI Repayment (INR)', 'Principal Portion (INR)', 'Interest Portion (INR)', 'Outstanding Balance (INR)'],
      ...schedule.map(row => [
        row.month,
        row.emi.toFixed(2),
        row.principalPaid.toFixed(2),
        row.interestPaid.toFixed(2),
        row.remainingBalance.toFixed(2)
      ])
    ];

    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Aureum_Wealth_Repayment_Schedule_${loanAmount}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isValid) return null;

  return (
    <section className="section-wrapper" id="schedule">
      <div className="app-container">
        <div className="section-header">
          <div className="section-label">Ledger Audit</div>
          <h2 className="section-title editorial-serif">
            Amortization <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Schedule</span>
          </h2>
          <p className="sans-body" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            A granular month-by-month accounting of your capital amortization and debt service charges.
          </p>
        </div>

        <div className="luxury-card" style={{ padding: '40px 30px' }}>
          {/* Search and Export Bar */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            {/* Search Input Box */}
            <div style={{ position: 'relative', width: '280px' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold)', display: 'flex' }}>
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search Month (e.g. 24)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="luxury-input"
                style={{ 
                  paddingLeft: '42px', 
                  paddingTop: '10px', 
                  paddingBottom: '10px', 
                  fontSize: '14px', 
                  borderRadius: '30px' 
                }}
              />
            </div>

            {/* CSV Download Trigger */}
            <button 
              className="btn-secondary"
              onClick={handleExportCSV}
              style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '30px' }}
            >
              <Download size={14} />
              <span>Export CSV Ledger</span>
            </button>
          </div>

          {/* Table Container */}
          {filteredSchedule.length > 0 ? (
            <div className="table-container">
              <table className="luxury-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Monthly EMI</th>
                    <th>Principal Repaid</th>
                    <th>Interest Paid</th>
                    <th>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSchedule.map((row) => (
                    <tr key={row.month}>
                      <td style={{ fontWeight: '600', color: 'var(--color-charcoal)' }}>Month {row.month}</td>
                      <td>{formatCurrency(row.emi)}</td>
                      <td style={{ color: 'var(--color-charcoal)' }}>{formatCurrency(row.principalPaid)}</td>
                      <td style={{ color: 'var(--color-gold-hover)' }}>{formatCurrency(row.interestPaid)}</td>
                      <td style={{ fontWeight: '600' }}>{formatCurrency(row.remainingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="pagination-container">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <span className="pagination-info">
                  Showing Fiscal Year {currentPage} of {totalPages} ({filteredSchedule.length} payments)
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div 
              style={{ 
                textAlign: 'center', 
                padding: '40px', 
                background: '#FAF8F5', 
                border: '1px dashed var(--color-border)', 
                borderRadius: 'var(--radius-md)' 
              }}
            >
              <Info size={30} style={{ color: 'var(--color-gold)', marginBottom: '12px' }} />
              <p className="sans-body" style={{ fontSize: '14px' }}>
                No repayment month matched query "<strong>{searchTerm}</strong>".
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
