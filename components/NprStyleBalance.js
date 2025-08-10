function FormatCurrencyNPR(amount) {
  if (amount == null || isNaN(Number(amount))) return '';
  return Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default FormatCurrencyNPR;