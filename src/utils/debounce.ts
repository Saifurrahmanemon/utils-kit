// eslint-disable-next-line no-unused-vars
interface DebouncedFunction extends Function {
  cancel: () => void;
  flush: () => void;
}

/**
 * Debounces a function, delaying its execution until after a specified wait time has elapsed
 * since the last invocation.
 *
 * @param func - The function to debounce.
 * @param wait - The wait time in milliseconds.
 * @returns A debounced function with `cancel` and `flush` methods.
 * @throws {Error} If `func` is not a function or `wait` is not a positive number.
 */
// eslint-disable-next-line no-unused-vars
export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): DebouncedFunction {
  if (typeof func !== 'function') {
    throw new Error(
      `The provided argument "func"(${typeof func}) must be a function.`
    );
  }

  if (typeof wait !== 'number' || isNaN(wait) || wait < 0) {
    throw new Error(
      `The provided argument "wait"(${typeof wait}) must be a positive number.`
    );
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T>;
  let lastThis: ThisParameterType<T>;

  const clearTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  };

  const invoke = () => {
    if (!timeoutId) return;
    clearTimer();
    func.apply(lastThis, lastArgs);
  };

  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>) {
    lastThis = this;
    lastArgs = args;
    clearTimer();
    timeoutId = setTimeout(invoke, wait);
  }

  debounced.cancel = clearTimer;
  debounced.flush = invoke;

  return debounced as DebouncedFunction;
}
