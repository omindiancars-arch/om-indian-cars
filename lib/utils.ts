/**
 * Calculate estimated monthly installment (EMI)
 * Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
 * 
 * @param priceStr - Price string like "₹12,50,000"
 * @param annualRate - Annual interest rate (default 8.5%)
 * @param months - Tenure in months (default 60)
 * @returns Formatted EMI string or "N/A"
 */
export function calculateEMI(priceStr: string, annualRate: number = 8.5, months: number = 60): string {
  try {
    // Extract numbers from price string (e.g., "₹12,50,000" -> 1250000)
    const principal = parseInt(priceStr.replace(/[^\d]/g, ""));
    
    if (isNaN(principal) || principal <= 0) return "N/A";

    // Monthly interest rate
    const r = (annualRate / 12) / 100;
    
    // EMI Calculation
    const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(emi);
  } catch (e) {
    return "N/A";
  }
}
