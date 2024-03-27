import { useMemo } from "react";

type FactoryFunction<T> = () => T;

export const useOptionalFactory = <T>(
  factory: FactoryFunction<T> | T,
  args?: any[],
): T => {
  const value: T = useMemo(
    () => {
      if (factory instanceof Function) {
        return factory();
      }
      return factory;
    },
    Array.isArray(args) ? args : [],
  );

  return value;
};
