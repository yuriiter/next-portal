import { useMemo } from "react";

type FactoryFunction<T> = () => T | undefined;

export const useOptionalFactory = <T>(
  factory: FactoryFunction<T> | T,
  args?: any[],
): T => {
  const value: T = useMemo(
    () => {
      if (typeof factory === "function") {
        return factory();
      }
      return factory;
    },
    Array.isArray(args) ? args : [],
  );

  return value;
};
