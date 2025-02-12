/**
 * Formats a number as a currency string using the specified locale and currency.
 * @param {number} amount - The amount to format
 * @param {string} locale - The locale to use for formatting (defaults to 'en-US')
 * @param {string} currency - The currency code to use (defaults to 'USD')
 * @returns {string} The formatted currency string
 */
export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
