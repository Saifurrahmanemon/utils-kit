interface NFormatterOptions {
  digits?: number;
  full?: boolean;
}

/**
 * Formats a number into a human-readable string with optional suffixes (K, M, B, etc.)
 * or in full numeric format.
 *
 * @param {number} num - The number to format.
 * @param {NFormatterOptions} [opts={ digits: 1 }] - The formatting options.
 * @param {number} [opts.digits=1] - The number of digits after the decimal point.
 * @param {boolean} [opts.full=false] - If true, formats the number with comma separators.
 * @returns {string} The formatted number as a string.
 * @throws {Error} If the input number is not a valid number.
 */
export function nFormatter(
  num: number,
  opts: NFormatterOptions = { digits: 1 }
): string {
  if (num === undefined || num === null) {
    throw new Error('The number must be provided.');
  }

  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('The input must be a valid number.');
  }

  if (opts.full) {
    return Intl.NumberFormat('en-US').format(num);
  }

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];

  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/; // removes trailing zeroes

  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);

  if (item) {
    return (
      (num / item.value).toFixed(opts.digits).replace(regex, '$1') + item.symbol
    );
  }

  return '0';
}
