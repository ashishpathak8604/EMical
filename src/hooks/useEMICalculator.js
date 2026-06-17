import { useState, useMemo } from 'react';

export function useEMICalculator(initialPrincipal = 5000000, initialRate = 8.5, initialTenure = 20) {
  const [principalInput, setPrincipalInput] = useState(initialPrincipal.toString());
  const [rateInput, setRateInput] = useState(initialRate.toString());
  const [tenureInput, setTenureInput] = useState(initialTenure.toString());

  // Parsed and validated values
  const principal = parseFloat(principalInput) || 0;
  const rate = parseFloat(rateInput) || 0;
  const tenure = parseFloat(tenureInput) || 0;

  // Validation errors
  const errors = useMemo(() => {
    const errs = {};
    if (principalInput !== '' && (isNaN(principal) || principal <= 0)) {
      errs.principal = 'Principal amount must be greater than zero.';
    } else if (principal > 1000000000) { // 100 Crores
      errs.principal = 'Maximum principal limit is ₹100 Crores.';
    }

    if (rateInput !== '' && (isNaN(rate) || rate < 0 || rate > 100)) {
      errs.rate = 'Interest rate must be between 0% and 100%.';
    }

    if (tenureInput !== '' && (isNaN(tenure) || tenure <= 0 || !Number.isInteger(tenure))) {
      errs.tenure = 'Tenure must be a positive whole number of years.';
    } else if (tenure > 40) {
      errs.tenure = 'Maximum tenure is 40 years.';
    }

    return errs;
  }, [principal, rate, tenure, principalInput, rateInput, tenureInput]);

  const isValid = Object.keys(errors).length === 0 && principal > 0 && rate >= 0 && tenure > 0;

  // Standard loan calculations
  const results = useMemo(() => {
    if (!isValid) {
      return {
        emi: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalPercentage: 0,
        interestPercentage: 0,
        amortizationSchedule: [],
        milestones: [],
      };
    }

    const n = tenure * 12;
    const r = rate / (12 * 100);

    let emi = 0;
    if (rate === 0) {
      emi = principal / n;
    } else {
      emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    const principalPercentage = Math.round((principal / totalPayment) * 100);
    const interestPercentage = 100 - principalPercentage;

    // Generate Amortization Schedule
    const amortizationSchedule = [];
    let balance = principal;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;

    for (let month = 1; month <= n; month++) {
      const openingBalance = balance;
      let interestPaid = openingBalance * r;
      if (rate === 0) interestPaid = 0;

      let principalPaid = emi - interestPaid;

      if (month === n || balance - principalPaid < 0.01) {
        principalPaid = balance;
        interestPaid = Math.max(0, emi - principalPaid);
        balance = 0;
      } else {
        balance -= principalPaid;
      }

      cumulativeInterest += interestPaid;
      cumulativePrincipal += principalPaid;

      amortizationSchedule.push({
        month,
        openingBalance,
        emi,
        principalPaid,
        interestPaid,
        closingBalance: balance,
        cumulativeInterest,
        cumulativePrincipal,
      });
    }

    // Extract Yearly Milestones for Timeline (e.g. Years 1, 3, 5, 10, 15, 20... up to max)
    const milestones = [];
    const milestoneYears = [1, 3, 5, 10, 15, 20, 25, 30, 35, 40].filter(y => y <= tenure);
    
    // Always include the final year if it's not already in the list
    if (milestoneYears.length === 0 || milestoneYears[milestoneYears.length - 1] !== tenure) {
      milestoneYears.push(tenure);
    }

    milestoneYears.forEach(year => {
      const monthIdx = (year * 12) - 1;
      const record = amortizationSchedule[monthIdx] || amortizationSchedule[amortizationSchedule.length - 1];
      if (record) {
        milestones.push({
          year,
          month: record.month,
          remainingBalance: record.closingBalance,
          principalPaidPaidSoFar: record.cumulativePrincipal,
          interestPaidSoFar: record.cumulativeInterest,
          principalRatio: Math.round((record.cumulativePrincipal / (record.cumulativePrincipal + record.cumulativeInterest)) * 100),
          interestRatio: Math.round((record.cumulativeInterest / (record.cumulativePrincipal + record.cumulativeInterest)) * 100),
        });
      }
    });

    return {
      emi,
      totalInterest,
      totalPayment,
      principalPercentage,
      interestPercentage,
      amortizationSchedule,
      milestones,
    };
  }, [isValid, principal, rate, tenure]);

  // Savings and comparison simulations
  const savings = useMemo(() => {
    if (!isValid) return null;

    const n = tenure * 12;
    const r = rate / (12 * 100);
    const standardEmi = results.emi;
    const standardTotalInterest = results.totalInterest;

    // 1. EMI Incremental Benefit: Increase EMI by 10%
    const extraEmi = standardEmi * 0.10;
    const newMonthlyPayment = standardEmi + extraEmi;
    
    let balance = principal;
    let monthsToPayOff = 0;
    let acceleratedTotalInterest = 0;

    if (rate > 0) {
      while (balance > 0.01 && monthsToPayOff < 600) {
        monthsToPayOff++;
        const interestForMonth = balance * r;
        let principalForMonth = newMonthlyPayment - interestForMonth;

        if (balance - principalForMonth <= 0) {
          acceleratedTotalInterest += interestForMonth;
          balance = 0;
        } else {
          acceleratedTotalInterest += interestForMonth;
          balance -= principalForMonth;
        }
      }
    } else {
      monthsToPayOff = Math.ceil(principal / newMonthlyPayment);
      acceleratedTotalInterest = 0;
    }

    const monthsSaved = Math.max(0, n - monthsToPayOff);
    const yearsSaved = (monthsSaved / 12).toFixed(1);
    const interestSavedFromExtraEmi = Math.max(0, standardTotalInterest - acceleratedTotalInterest);

    // 2. Tenure Optimization: Tenure reduced by 2 years
    let tenureReduction = 2;
    if (tenure <= 2) {
      tenureReduction = tenure > 1 ? 0.5 : 0; // handle short loans
    }
    const optimizedTenure = tenure - tenureReduction;
    const optimizedMonths = optimizedTenure * 12;
    
    let optimizedEmi = 0;
    let optimizedTotalInterest = 0;
    
    if (optimizedTenure > 0) {
      if (rate === 0) {
        optimizedEmi = principal / optimizedMonths;
        optimizedTotalInterest = 0;
      } else {
        optimizedEmi = (principal * r * Math.pow(1 + r, optimizedMonths)) / (Math.pow(1 + r, optimizedMonths) - 1);
        optimizedTotalInterest = (optimizedEmi * optimizedMonths) - principal;
      }
    }

    const interestSavedFromTenureReduction = Math.max(0, standardTotalInterest - optimizedTotalInterest);
    const emiDifference = Math.max(0, optimizedEmi - standardEmi);

    // 3. Refinance option: Interest rate reduced by 0.75%
    const refinanceRate = Math.max(0, rate - 0.75);
    const refinanceR = refinanceRate / (12 * 100);
    let refinanceEmi = 0;
    let refinanceTotalInterest = 0;

    if (refinanceRate === 0) {
      refinanceEmi = principal / n;
      refinanceTotalInterest = 0;
    } else {
      refinanceEmi = (principal * refinanceR * Math.pow(1 + refinanceR, n)) / (Math.pow(1 + refinanceR, n) - 1);
      refinanceTotalInterest = (refinanceEmi * n) - principal;
    }

    const refinanceInterestSaved = Math.max(0, standardTotalInterest - refinanceTotalInterest);

    return {
      accelerated: {
        newEmi: newMonthlyPayment,
        newMonths: monthsToPayOff,
        monthsSaved,
        yearsSaved,
        totalInterest: acceleratedTotalInterest,
        interestSaved: interestSavedFromExtraEmi,
        totalPayment: principal + acceleratedTotalInterest,
      },
      tenureReduction: {
        reductionYears: tenureReduction,
        newTenureYears: optimizedTenure,
        newEmi: optimizedEmi,
        interestSaved: interestSavedFromTenureReduction,
        emiDifference,
      },
      refinance: {
        newRate: refinanceRate,
        emi: refinanceEmi,
        totalInterest: refinanceTotalInterest,
        interestSaved: refinanceInterestSaved,
        totalPayment: principal + refinanceTotalInterest,
      }
    };
  }, [isValid, principal, rate, tenure, results]);

  return {
    inputs: {
      principal,
      rate,
      tenure,
      principalInput,
      rateInput,
      tenureInput
    },
    setPrincipalInput,
    setRateInput,
    setTenureInput,
    calculations: results,
    savings,
    isValid,
    errors
  };
}
