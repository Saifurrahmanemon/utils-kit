type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

interface ThrottledFunction extends Function {
  cancel: () => void;
  flush: () => void;
}

/**
 * Creates a throttled function that limits the rate at which it can be called.
 *
 * @param {Function} func - The function to be throttled.
 * @param {number} [wait=0] - The number of milliseconds to wait between each invocation of the function.
 * @param {ThrottleOptions} [options={}] - The options for the throttling behavior.
 * @param {boolean} [options.leading=true] -Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]  - Specify invoking on the trailing edge of the timeout.
 * @return {ThrottledFunction} - The throttled function with `cancel` and `flush` methods.
 */
// eslint-disable-next-line no-unused-vars
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 0,
  options: ThrottleOptions = {}
): ThrottledFunction {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any = null;
  let lastContext: any = null;
  let lastInvokeTime = 0;
  const { leading = true, trailing = true } = options;

  function invokeFunc(time: number) {
    lastInvokeTime = time;
    func.apply(lastContext, lastArgs);
    lastContext = null;
    lastArgs = null;
  }

  function trailingEdge() {
    if (trailing && lastArgs) {
      invokeFunc(Date.now());
    }
    timeout = null;
  }

  function timerExpired() {
    const time = Date.now();
    if (time - lastInvokeTime >= wait) {
      trailingEdge();
    } else {
      timeout = setTimeout(timerExpired, wait - (time - lastInvokeTime));
    }
  }

  function throttled(this: any, ...args: Parameters<T>) {
    const time = Date.now();
    if (!lastInvokeTime && !leading) {
      lastInvokeTime = time;
    }

    const remaining = wait - (time - lastInvokeTime);
    lastArgs = args;
    lastContext = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      invokeFunc(time);
    } else if (!timeout && trailing) {
      timeout = setTimeout(timerExpired, remaining);
    }
  }

  function cancel() {
    if (timeout) {
      clearTimeout(timeout);
    }
    lastInvokeTime = 0;
    lastArgs = null;
    lastContext = null;
    timeout = null;
  }

  function flush() {
    if (timeout) {
      invokeFunc(Date.now());
      clearTimeout(timeout);
      timeout = null;
    }
  }

  throttled.cancel = cancel;

  throttled.flush = flush;

  return throttled;
}

export default throttle;
