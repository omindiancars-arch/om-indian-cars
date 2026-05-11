export const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[^0-9]/g, ""));
};

export const parseKms = (kmsStr: string): number => {
  if (!kmsStr) return 0;
  return parseInt(kmsStr.replace(/[^0-9]/g, ""));
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
