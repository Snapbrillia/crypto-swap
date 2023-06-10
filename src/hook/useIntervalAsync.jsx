import { useRef, useCallback, useEffect } from 'react';

export function useIntervalAsync(fn, ms) {
  const timeout = useRef();
  const mountedRef = useRef(false);
  const removeInterval = () => {
    mountedRef.current = false;
    window.clearTimeout(timeout.current);
  }
  const run = useCallback(async () => {
    await fn();
    if (mountedRef.current) {
      timeout.current = window.setTimeout(run, ms);
    }
  }, [fn, ms]);
  useEffect(() => {
    mountedRef.current = true;
    run();
    return removeInterval;
  }, [run]);
  return [removeInterval];
}
