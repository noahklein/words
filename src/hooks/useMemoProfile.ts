import { DependencyList, useMemo } from 'react';

export function useMemoProfile<T>(
  label: string,
  fn: () => T,
  deps: DependencyList | undefined,
) {
  return useMemo<T>(() => {
    console.time(label);
    const out = fn();
    console.timeEnd(label);
    return out;
  }, deps);
}
