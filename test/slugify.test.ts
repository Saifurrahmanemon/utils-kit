// src/slugify.test.ts
import { describe, expect, test } from 'vitest';

import slugify from '../src/utils/slugify';

describe('slugify', () => {
  test('converts text to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  test('removes diacritics', () => {
    expect(slugify('Café')).toBe('cafe');
  });

  test('replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  test('replaces multiple non-alphanumeric characters with a single hyphen', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  test('trims leading and trailing hyphens', () => {
    expect(slugify('---Hello World---')).toBe('hello-world');
  });

  test('handles an empty string', () => {
    expect(slugify('')).toBe('');
  });

  test('throws an error for non-string input', () => {
    const nonStringInputs = [
      null,
      undefined,
      0,
      987654321,
      Buffer.from('buffer'),
      {}
    ];

    nonStringInputs.forEach((input) => {
      expect(() => slugify(input as any)).toThrow('Please provide a string');
    });
  });

  test('handles strings with only spaces', () => {
    expect(slugify('   ')).toBe('');
  });

  test('handles strings with mixed alphanumeric and special characters', () => {
    expect(slugify('hello@world.com')).toBe('hello-world-com');
  });

  test('handles strings with underscores', () => {
    expect(slugify('hello_world')).toBe('hello-world');
  });

  test('handles strings with multiple consecutive spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  test('handles strings with leading and trailing spaces', () => {
    expect(slugify('   hello world   ')).toBe('hello-world');
  });

  test('handles strings with multiple hyphens', () => {
    expect(slugify('hello---world')).toBe('hello-world');
  });

  test('handles strings with special characters and spaces', () => {
    expect(slugify('!@#$%^&*()_+=[]{}|;:",.<>?/')).toBe('');
  });

  test('handles long strings', () => {
    const longString = 'a'.repeat(1000);
    expect(slugify(longString)).toBe('a'.repeat(1000));
  });

  test('handles strings with emoji', () => {
    expect(slugify('hello🌍world')).toBe('hello-world');
  });

  test('handles strings with accented characters', () => {
    expect(slugify('àéîöú')).toBe('aeiou');
  });

  test('handles strings with mixed case characters', () => {
    expect(slugify('HeLLo WoRLd')).toBe('hello-world');
  });

  test('handles strings with newline characters', () => {
    expect(slugify('hello\nworld')).toBe('hello-world');
  });

  test('handles strings with tab characters', () => {
    expect(slugify('hello\tworld')).toBe('hello-world');
  });

  test('handles strings with non-Latin characters', () => {
    expect(slugify('你好，世界')).toBe('');
  });
});
