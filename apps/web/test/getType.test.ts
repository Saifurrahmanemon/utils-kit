import { describe, expect, test } from 'vitest';

import getType from '../src/utils/getType';

describe('getType', () => {
  test('returns "string" for a string input', () => {
    expect(getType('hello')).toBe('string');
  });

  test('returns "number" for a number input', () => {
    expect(getType(42)).toBe('number');
  });

  test('returns "boolean" for a boolean input', () => {
    expect(getType(true)).toBe('boolean');
  });

  test('returns "undefined" for an undefined input', () => {
    expect(getType(undefined)).toBe('undefined');
  });

  test('returns "null" for a null input', () => {
    expect(getType(null)).toBe('null');
  });

  test('returns "object" for a plain object input', () => {
    expect(getType({})).toBe('object');
  });

  test('returns "array" for an array input', () => {
    expect(getType([1, 2, 3])).toBe('array');
  });

  test('returns "date" for a Date object input', () => {
    expect(getType(new Date())).toBe('date');
  });

  test('returns "regExp" for a RegExp object input', () => {
    expect(getType(/abc/)).toBe('regExp');
  });

  test('returns "function" for a function input', () => {
    expect(getType(() => {})).toBe('function');
  });

  test('returns "symbol" for a symbol input', () => {
    expect(getType(Symbol('symbol'))).toBe('symbol');
  });

  test('returns "bigint" for a bigint input', () => {
    expect(getType(BigInt(123))).toBe('bigint');
  });

  test('returns "map" for a Map object input', () => {
    expect(getType(new Map())).toBe('map');
  });

  test('returns "set" for a Set object input', () => {
    expect(getType(new Set())).toBe('set');
  });

  test('returns "weakMap" for a WeakMap object input', () => {
    expect(getType(new WeakMap())).toBe('weakMap');
  });

  test('returns "weakSet" for a WeakSet object input', () => {
    expect(getType(new WeakSet())).toBe('weakSet');
  });

  test('returns "error" for an Error object input', () => {
    expect(getType(new Error('error'))).toBe('error');
  });

  test('returns "promise" for a Promise object input', () => {
    expect(getType(Promise.resolve())).toBe('promise');
  });

  test('returns "int8Array" for an Int8Array input', () => {
    expect(getType(new Int8Array())).toBe('int8Array');
  });

  test('returns "uint8Array" for an Uint8Array input', () => {
    expect(getType(new Uint8Array())).toBe('uint8Array');
  });

  test('returns "uint8ClampedArray" for an Uint8ClampedArray input', () => {
    expect(getType(new Uint8ClampedArray())).toBe('uint8ClampedArray');
  });

  test('returns "int16Array" for an Int16Array input', () => {
    expect(getType(new Int16Array())).toBe('int16Array');
  });

  test('returns "uint16Array" for an Uint16Array input', () => {
    expect(getType(new Uint16Array())).toBe('uint16Array');
  });

  test('returns "int32Array" for an Int32Array input', () => {
    expect(getType(new Int32Array())).toBe('int32Array');
  });

  test('returns "uint32Array" for an Uint32Array input', () => {
    expect(getType(new Uint32Array())).toBe('uint32Array');
  });

  test('returns "float32Array" for a Float32Array input', () => {
    expect(getType(new Float32Array())).toBe('float32Array');
  });

  test('returns "float64Array" for a Float64Array input', () => {
    expect(getType(new Float64Array())).toBe('float64Array');
  });

  test('returns "bigInt64Array" for a BigInt64Array input', () => {
    expect(getType(new BigInt64Array())).toBe('bigInt64Array');
  });

  test('returns "bigUint64Array" for a BigUint64Array input', () => {
    expect(getType(new BigUint64Array())).toBe('bigUint64Array');
  });

  test('returns "arrayBuffer" for an ArrayBuffer input', () => {
    expect(getType(new ArrayBuffer(10))).toBe('arrayBuffer');
  });

  test('returns "dataView" for a DataView input', () => {
    expect(getType(new DataView(new ArrayBuffer(10)))).toBe('dataView');
  });
});
