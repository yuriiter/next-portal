import { CSSProperties } from "react";
import { gridCSSPropertiesAsNonBooleanKeys } from "./constants";
import { GridProps } from "./types";
import { cn } from "@/utils/utils";

export const Grid = ({ children, className, ...otherProps }: GridProps) => {
  const booleanModifiers = Object.keys(otherProps)
    .filter((prop) => !gridCSSPropertiesAsNonBooleanKeys.includes(prop as any))
    .map((prop) => `grid--${prop}`);

  const classNamesList = ["grid", ...booleanModifiers, className];

  const filteredProps = Object.fromEntries(
    Object.entries(otherProps).filter(([key]) =>
      gridCSSPropertiesAsNonBooleanKeys.includes(key as any),
    ),
  );

  return (
    <div className={cn(classNamesList)} style={filteredProps as CSSProperties}>
      {children}
    </div>
  );
};
