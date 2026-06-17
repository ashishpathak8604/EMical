import { jsPDF } from 'jspdf';

// Helper to format currency for PDF (using INR text for safe font compatibility)
const formatPDFCurrency = (val) => {
  if (isNaN(val) || val === null || val === undefined) return '0.00 INR';
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val) + ' INR';
};

export function exportToPDF(calculator) {
  const {
    loanAmount,
    interestRate,
    tenure,
    tenureType,
    emi,
    totalInterest,
    totalRepayment,
    principalPercent,
    interestPercent,
    schedule,
    savings,
    comparison
  } = calculator;

  // 1. Initialize A4 Document (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // 2. Draw Top Brand Accent Bar (Gold)
  doc.setFillColor(184, 154, 103); // Gold #B89A67
  doc.rect(0, 0, 210, 4, 'F');

  // 3. Document Title / Brand Header
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30); // Charcoal #1E1E1E
  doc.text('AUREUM WEALTH ADVISORY', 20, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(110, 110, 110);
  doc.text('CONFIDENTIAL // PRIVATE CLIENT LOAN PLANNER REPORT', 20, 25);
  doc.text('GENERATED ON: ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), 20, 29);

  // Separator Line
  doc.setDrawColor(184, 154, 103); // Gold border
  doc.setLineWidth(0.4);
  doc.line(20, 33, 190, 33);

  // 4. Section 1: Portfolio parameters
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(184, 154, 103);
  doc.text('1. PORTFOLIO PARAMETERS', 20, 40);

  // Parameters Shaded Background Box
  doc.setFillColor(248, 246, 242); // Warm White/Champagne shade
  doc.rect(20, 43, 170, 16, 'F');
  doc.setDrawColor(184, 154, 103, 0.2);
  doc.rect(20, 43, 170, 16, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text('LOAN PRINCIPAL:', 25, 52);
  doc.text('INTEREST RATE:', 85, 52);
  doc.text('TENURE DURATION:', 140, 52);

  doc.setFont('helvetica', 'normal');
  doc.text(formatPDFCurrency(Number(loanAmount)), 54, 52);
  doc.text(`${interestRate}% p.a.`, 113, 52);
  doc.text(`${tenure} ${tenureType === 'years' ? 'Years' : 'Months'}`, 172, 52);

  // 5. Section 2: Debt Service Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(184, 154, 103);
  doc.text('2. DEBT SERVICE SUMMARY', 20, 68);

  // Column Boxes
  const colWidth = 53;
  const colHeight = 22;
  const gap = 5;

  // Monthly EMI Card
  doc.setFillColor(30, 30, 30); // Dark Charcoal
  doc.rect(20, 72, colWidth, colHeight, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text('ESTIMATED MONTHLY EMI', 24, 78);
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(184, 154, 103); // Gold
  doc.text(formatPDFCurrency(emi), 24, 86);

  // Total Interest Card
  doc.setFillColor(248, 246, 242);
  doc.rect(20 + colWidth + gap, 72, colWidth, colHeight, 'F');
  doc.setDrawColor(184, 154, 103, 0.2);
  doc.rect(20 + colWidth + gap, 72, colWidth, colHeight, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('TOTAL INTEREST PAYABLE', 24 + colWidth + gap, 78);
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 30);
  doc.text(formatPDFCurrency(totalInterest), 24 + colWidth + gap, 86);

  // Total Repayment Card
  doc.setFillColor(248, 246, 242);
  doc.rect(20 + (colWidth + gap) * 2, 72, colWidth + 1, colHeight, 'F');
  doc.rect(20 + (colWidth + gap) * 2, 72, colWidth + 1, colHeight, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('TOTAL REPAYMENT AMOUNT', 24 + (colWidth + gap) * 2, 78);
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 30);
  doc.text(formatPDFCurrency(totalRepayment), 24 + (colWidth + gap) * 2, 86);

  // 6. Section 3: Capital Allocation Analysis (Vector Bar Chart)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(184, 154, 103);
  doc.text('3. CAPITAL ALLOCATION ANALYSIS', 20, 102);

  const barY = 106;
  const barHeight = 6;
  const barWidth = 170;
  const principalWidth = (principalPercent / 100) * barWidth;
  const interestWidth = (interestPercent / 100) * barWidth;

  // Principal Segment (Charcoal)
  doc.setFillColor(30, 30, 30);
  doc.rect(20, barY, principalWidth, barHeight, 'F');

  // Interest Segment (Gold)
  doc.setFillColor(184, 154, 103);
  doc.rect(20 + principalWidth, barY, interestWidth, barHeight, 'F');

  // Legend labels
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(`Principal Share: ${principalPercent.toFixed(1)}% (${formatPDFCurrency(Number(loanAmount))})`, 20, barY + 11);
  doc.text(`Interest Share: ${interestPercent.toFixed(1)}% (${formatPDFCurrency(totalInterest)})`, 190, barY + 11, { align: 'right' });

  // 7. Section 4: Dynamic Savings Advisory
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(184, 154, 103);
  doc.text('4. DYNAMIC WEALTH SAVINGS INSIGHTS', 20, 126);

  // Subtitle line
  doc.setLineWidth(0.2);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 128, 190, 128);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text('Prepayment Acceleration Scheme:', 20, 134);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  
  const earlyYrText = savings.earlyPayoffYears > 0 ? `${savings.earlyPayoffYears} Yr ` : '';
  const prepaymentMsg = `By paying an extra ${formatPDFCurrency(savings.extraPayment)} per month (10% surplus), your loan duration is reduced by ${earlyYrText}${savings.earlyPayoffMonths} Months, saving you a net interest expense of ${formatPDFCurrency(savings.interestSaved)}.`;
  
  // Wrap text
  const splitPrepaymentMsg = doc.splitTextToSize(prepaymentMsg, 170);
  doc.text(splitPrepaymentMsg, 20, 138);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text('Refinance Restructuring Scheme:', 20, 148);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);

  const optCost = comparison.savings.totalCostSaved;
  const refinanceMsg = `Refinancing with our premium Private Advisory rate of ${comparison.optimized.rate.toFixed(2)}% (-0.75% discount) and compressing tenure by 20% drops your total cost of debt from ${formatPDFCurrency(comparison.current.totalCost)} down to ${formatPDFCurrency(comparison.optimized.totalCost)}, saving a total of ${formatPDFCurrency(optCost)} over the borrowing journey.`;
  const splitRefinanceMsg = doc.splitTextToSize(refinanceMsg, 170);
  doc.text(splitRefinanceMsg, 20, 152);

  // 8. Section 5: Repayment Journey Milestones
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(184, 154, 103);
  doc.text('5. REPAYMENT JOURNEY MILESTONES', 20, 166);

  // Draw Table Headers
  const tableY = 171;
  doc.setFillColor(30, 30, 30);
  doc.rect(20, tableY, 170, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Milestone', 25, tableY + 4);
  doc.text('Month Index', 50, tableY + 4);
  doc.text('Principal Paid', 80, tableY + 4);
  doc.text('Interest Paid', 115, tableY + 4);
  doc.text('Remaining Debt', 150, tableY + 4);

  // Milestone Rows (Compute 5 milestones dynamically to match screen UI)
  const totalMonths = schedule.length;
  const totalYears = Math.round(totalMonths / 12);
  let years = [];
  if (totalYears >= 15) years = [1, 3, 5, 10, totalYears];
  else if (totalYears >= 8) years = [1, 3, 5, 8, totalYears];
  else if (totalYears >= 5) years = [1, 2, 3, 4, totalYears];
  else years = [1, 2, 3, totalYears]; // fallback

  years = years.filter((yr, index, self) => self.indexOf(yr) === index); // unique

  let curY = tableY + 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);

  years.forEach((yr, idx) => {
    const mIdx = Math.min(totalMonths, yr * 12);
    const mRow = schedule[mIdx - 1] || schedule[schedule.length - 1];
    
    // Accumulate sums
    let cumP = 0;
    let cumI = 0;
    for (let i = 0; i < mIdx; i++) {
      if (schedule[i]) {
        cumP += schedule[i].principalPaid;
        cumI += schedule[i].interestPaid;
      }
    }

    // Shaded rows
    if (idx % 2 === 0) {
      doc.setFillColor(248, 246, 242);
      doc.rect(20, curY, 170, 6.5, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(`Year ${yr}`, 25, curY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Month ${mIdx}`, 50, curY + 4.5);
    doc.text(formatPDFCurrency(cumP), 80, curY + 4.5);
    doc.text(formatPDFCurrency(cumI), 115, curY + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(formatPDFCurrency(mRow.remainingBalance), 150, curY + 4.5);

    curY += 6.5;
  });

  // Brief note
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('* Note: The granular month-by-month accounting ledger has been exported to a separate CSV spreadsheet format.', 20, curY + 6);

  // 9. Document Footer (Attribution Details)
  doc.setDrawColor(184, 154, 103, 0.3);
  doc.setLineWidth(0.3);
  doc.line(20, 270, 190, 270);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 30, 30);
  doc.text('PREPARED BY: Ashish Pathak', 20, 276);
  doc.text('CONTACT EMAIL: your-email@example.com', 90, 276);
  doc.text('PARTNER: Digital Heroes', 155, 276);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(130, 130, 130);
  doc.text('Disclaimer: This planning report provides portfolio projections conforming to basic compound calculations and is designed for planning purposes. Built for Digital Heroes.', 20, 282);
  doc.text('Reference: https://digitalheroesco.com', 20, 286);

  // Bottom Accent bar (Gold)
  doc.setFillColor(184, 154, 103);
  doc.rect(0, 293, 210, 4, 'F');

  // 10. Save PDF File
  doc.save(`Aureum_Private_Wealth_Statement_${loanAmount}.pdf`);
}
