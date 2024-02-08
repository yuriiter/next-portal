import { useEffect, useState } from "react";
import { BreakpointUnion } from "./types";
import { BREAKPOINTS } from "./constants";

const isBreakpoint = (value: unknown): value is BreakpointUnion =>
  typeof value === "string" && Object.keys(BREAKPOINTS).includes(value);

export function useMQ(query: string): boolean;
export function useMQ(breakpoint: number, maxOrMin: "max" | "min"): boolean;
export function useMQ(
  breakpoint: BreakpointUnion,
  maxOrMin: "max" | "min",
): boolean;
export function useMQ(
  queryOrBreakpoint: BreakpointUnion | string | number,
  maxOrMin: "max" | "min" = "max",
): boolean {
  const query =
    typeof queryOrBreakpoint === "string"
      ? isBreakpoint(queryOrBreakpoint)
        ? `(${maxOrMin}-width: ${BREAKPOINTS[queryOrBreakpoint]}px)`
        : queryOrBreakpoint
      : `(${maxOrMin}-width: ${queryOrBreakpoint}px)`;

  const [isSSR, setIsSSR] = useState(true);
  const [matches, setMatches] = useState(
    !isSSR ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}
