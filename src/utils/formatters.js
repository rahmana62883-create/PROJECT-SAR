/**
 * FlashCompare India Localization & Formatting Utilities
 * Standardizes Indian Rupee (₹) pricing, lakhs/crores formatting, and delta math.
 */

export const formatPrice = (amount, currency = '₹') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0`;
  }
  const num = Math.round(Number(amount));
  return `${currency}${num.toLocaleString('en-IN')}`;
};

export const formatPriceFull = (amount, currency = '₹') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0.00`;
  }
  const num = Number(amount);
  return `${currency}${num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatSavings = (savings, currency = '₹') => {
  if (!savings || isNaN(savings) || savings <= 0) return null;
  return `Save ${currency}${Math.round(Number(savings)).toLocaleString('en-IN')}`;
};

export const formatCashback = (price, rate = 0.01, currency = '₹') => {
  const amount = Math.max(1, Math.round(Number(price) * rate));
  return `+${currency}${amount.toLocaleString('en-IN')} (1%)`;
};
