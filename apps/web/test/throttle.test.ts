import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import throttle from '../src/utils/throttle';

describe('throttle', () => {
  let clock: ReturnType<typeof vi.useFakeTimers>;

  beforeEach(() => {
    clock = vi.useFakeTimers();
  });

  afterEach(() => {
    clock.clearAllTimers();
    vi.resetAllMocks();
  });

  test('calls the function at most once per wait time', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 1000);

    throttledFunc();
    throttledFunc();
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    clock.advanceTimersByTime(1000);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });

  test('calls the function immediately if leading is true', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 1000, { leading: true });

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    clock.advanceTimersByTime(500);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    clock.advanceTimersByTime(500);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });

  test('calls the function after the wait time if leading is false', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 1000, { leading: false });

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(0);

    clock.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('calls the function on the trailing edge', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 1000, { trailing: true });

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    clock.advanceTimersByTime(500);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    clock.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(2);
  });

  test('should not call the function on the trailing edge if trailing is false', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 1000, { trailing: false });

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    clock.advanceTimersByTime(500);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    clock.advanceTimersByTime(500);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });

  test('cancels delayed invocations', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 1000);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    throttledFunc.cancel();
    clock.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('flushes delayed invocations', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 1000);

    throttledFunc();
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    throttledFunc.flush();
    expect(func).toHaveBeenCalledTimes(2);
  });
});
