interface CurrencyFormatOptions extends Intl.NumberFormatOptions {
  locale?: string;
}

/**
 * Formats a number to a currency string based on the specified options.
 *
 * @param {number} amount - The number to be formatted.
 * @param {CurrencyFormatOptions} [options={}] - The options for formatting the currency.
 * @return {string | Error} - The formatted currency string or an Error if the amount is not a number.
 */
export default function formatToCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
): string | Error {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new Error('Amount must be a number');
  }

  const { currency = 'USD', locale = 'en-US' } = options;

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    ...options
  });

  return formatter.format(amount);
}
