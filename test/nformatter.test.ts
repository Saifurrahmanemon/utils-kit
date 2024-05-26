import { describe, expect, test } from 'vitest';

import { nFormatter } from '../src/utils/nFormatter';

describe('nFormatter', () => {
  test('formats number with suffixes', () => {
    expect(nFormatter(123)).toBe('123');
    expect(nFormatter(1234)).toBe('1.2K');
    expect(nFormatter(1234567)).toBe('1.2M');
    expect(nFormatter(1234567890)).toBe('1.2G');
    expect(nFormatter(1234567890123)).toBe('1.2T');
    expect(nFormatter(1234567890123456)).toBe('1.2P');
    // eslint-disable-next-line no-loss-of-precision
    expect(nFormatter(1234567890123456789)).toBe('1.2E');
  });

  test('formats number with specified digits', () => {
    expect(nFormatter(1234567, { digits: 2 })).toBe('1.23M');
    expect(nFormatter(1234567, { digits: 3 })).toBe('1.235M');
  });

  test('formats number in full format', () => {
    expect(nFormatter(1234567, { full: true })).toBe('1,234,567');
  });

  test('throws error for invalid input', () => {
    expect(() => nFormatter(null as any)).toThrow(
      'The number must be provided.'
    );
    expect(() => nFormatter(undefined as any)).toThrow(
      'The number must be provided.'
    );
    expect(() => nFormatter(NaN)).toThrow('The input must be a valid number.');
    expect(() => nFormatter('123' as any)).toThrow(
      'The input must be a valid number.'
    );
  });

  test('returns "0" for zero input', () => {
    expect(nFormatter(0)).toBe('0');
  });

  test('handles boundary values correctly', () => {
    expect(nFormatter(999)).toBe('999');
    expect(nFormatter(1000)).toBe('1K');
    expect(nFormatter(1000000)).toBe('1M');
  });

  test('handles combinations of options', () => {
    expect(nFormatter(1234567, { digits: 2, full: true })).toBe('1,234,567');
    expect(nFormatter(1234567, { digits: 3, full: true })).toBe('1,234,567');
  });

  test('handles very large numbers correctly', () => {
    expect(nFormatter(1e18)).toBe('1E');
    expect(nFormatter(1e22)).toBe('10000E');
  });

  test('handles numbers with no digits option specified', () => {
    expect(nFormatter(1234567)).toBe('1.2M');
  });

  test('correctly format using different digit counts', () => {
    expect(nFormatter(1234567, { digits: 0 })).toBe('1M');
    expect(nFormatter(1234567, { digits: 1 })).toBe('1.2M');
    expect(nFormatter(1234567, { digits: 5 })).toBe('1.23457M');
  });
});
