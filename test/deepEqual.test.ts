import { describe, expect, test } from 'vitest';

import deepEqual from '../src/utils/deepEqual';

describe('deepEqual', () => {
  test('returns true for equal primitives', () => {
    expect(deepEqual(5, 5)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  test('returns false for unequal primitives', () => {
    expect(deepEqual(5, 10)).toBe(false);
    expect(deepEqual('hello', 'world')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
  });

  test('returns true for equal objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { b: { c: 2 }, a: 1 };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('returns false for unequal objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { b: { c: 3 }, a: 1 };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  test('returns true for equal arrays', () => {
    const arr1 = [1, 2, [3, 4]];
    const arr2 = [1, 2, [3, 4]];
    expect(deepEqual(arr1, arr2)).toBe(true);
  });

  test('returns false for unequal arrays', () => {
    const arr1 = [1, 2, [3, 4]];
    const arr2 = [1, 2, [4, 3]];
    expect(deepEqual(arr1, arr2)).toBe(false);
  });

  test('returns true for deeply nested objects and arrays', () => {
    const obj1 = { a: { b: { c: [1, 2, { d: 3 }] } } };
    const obj2 = { a: { b: { c: [1, 2, { d: 3 }] } } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('returns false for objects with same properties but different types', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: '1' };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  test('returns true for arrays with same objects', () => {
    const obj = { a: 1 };
    const arr1 = [obj];
    const arr2 = [obj];
    expect(deepEqual(arr1, arr2)).toBe(true);
  });

  test('returns false for arrays with different objects', () => {
    const arr1 = [{ a: 1 }];
    const arr2 = [{ b: 1 }];
    expect(deepEqual(arr1, arr2)).toBe(false);
  });

  test('returns false for different types of inputs', () => {
    expect(deepEqual({ a: 1 }, [1])).toBe(false);
    expect(deepEqual({ a: 1 }, null)).toBe(false);
    expect(deepEqual([1], null)).toBe(false);
  });

  test('returns true for deeply nested equal objects with arrays', () => {
    const obj1 = { a: [{ b: { c: [1, 2, 3] } }] };
    const obj2 = { a: [{ b: { c: [1, 2, 3] } }] };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('returns false for deeply nested unequal objects with arrays', () => {
    const obj1 = { a: [{ b: { c: [1, 2, 3] } }] };
    const obj2 = { a: [{ b: { c: [3, 2, 1] } }] };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  test('returns true for same NaN values', () => {
    expect(deepEqual(NaN, NaN)).toBe(true);
  });

  test('returns false for NaN and other number', () => {
    expect(deepEqual(NaN, 1)).toBe(false);
  });

  test('returns false for null and undefined', () => {
    expect(deepEqual(null, undefined)).toBe(false);
  });
});
