import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import debounce from '../src/utils/debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('returns a debounced function', () => {
    const func = () => {};
    const debounced = debounce(func, 50);
    expect(typeof debounced).toBe('function');
  });

  test('delays execution until after the wait time', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('cancels pending execution with .cancel()', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn.cancel();

    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
  });

  test('immediately execute with .flush()', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn.flush();

    expect(fn).toHaveBeenCalledOnce();
  });

  test('resets the timeout with each call', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    vi.advanceTimersByTime(50);
    debouncedFn();

    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('passes arguments to the original function', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn(1, 2, 3);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith(1, 2, 3);
  });
  test('uses the arguments of the latest invocation when flush() is called', () => {
    let result = 0;
    const calculate = debounce((val: number) => {
      result += val;
    }, 30);

    expect(result).toBe(0);
    calculate(3);
    calculate(5);
    expect(result).toBe(0);

    vi.advanceTimersByTime(10);
    expect(result).toBe(0);

    calculate.flush();
    expect(result).toBe(5);

    vi.advanceTimersByTime(100);
    expect(result).toBe(5);
  });

  test('maintains the correct {`this`} context', () => {
    const obj = {
      value: 0,
      // eslint-disable-next-line no-unused-vars
      increment: debounce(function (this: any) {
        this.value++;
      }, 100)
    };

    obj.increment();
    vi.advanceTimersByTime(100);
    expect(obj.value).toBe(1);
  });

  test('throws an error when passed a non-function', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => debounce('not a function', 100)).toThrowError(
      'The provided argument "func"(string) must be a function.'
    );
  });

  test('throws an error when passed an invalid wait time', () => {
    const fn = () => {};

    expect(() => debounce(fn, -100)).toThrowError(
      'The provided argument "wait"(number) must be a positive number.'
    );
  });
});
