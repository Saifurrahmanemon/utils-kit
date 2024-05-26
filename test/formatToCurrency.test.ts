import { describe, expect, test } from 'vitest';

import formatToCurrency from '../src/utils/formatToCurrency';

describe('formatToCurrency', () => {
  test('formats numbers to currency with default options (USD)', () => {
    expect(formatToCurrency(1234.56)).toBe('$1,234.56');
    expect(formatToCurrency(0)).toBe('$0.00');
    expect(formatToCurrency(-500.25)).toBe('-$500.25');
  });

  test('formats numbers to currency with specific locale and currency', () => {
    expect(
      formatToCurrency(1234.56, { locale: 'de-DE', currency: 'EUR' })
    ).toBe('1.234,56 €');
    expect(
      formatToCurrency(98765.43, { locale: 'ja-JP', currency: 'JPY' })
    ).toBe('￥98,765');
    expect(formatToCurrency(1000, { locale: 'en-IN', currency: 'INR' })).toBe(
      '₹1,000.00'
    );
  });

  test('handles different fraction digits', () => {
    expect(formatToCurrency(1234.5678, { minimumFractionDigits: 4 })).toBe(
      '$1,234.5678'
    );
    expect(formatToCurrency(1234.5678, { maximumFractionDigits: 1 })).toBe(
      '$1,234.6'
    );
  });

  test('handles grouping options', () => {
    expect(formatToCurrency(1234567.89, { useGrouping: false })).toBe(
      '$1234567.89'
    );
    expect(formatToCurrency(1234567.89, { useGrouping: true })).toBe(
      '$1,234,567.89'
    );
  });

  test('throws an error for non-numeric input', () => {
    expect(() => formatToCurrency('not a number' as any)).toThrow(
      'Amount must be a number'
    );
    expect(() => formatToCurrency(NaN)).toThrow('Amount must be a number');
  });
});
