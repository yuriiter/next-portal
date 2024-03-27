import { CSSProperties } from "react";
import { cn } from "@/utils/utils";
import { GridCellProps } from "./types";
import { gridCellCSSPropertiesAsNonBooleanKeys } from "./constants";

export const GridCell = ({
  children,
  className,
  ...otherProps
}: GridCellProps) => {
  const booleanModifiers = Object.keys(otherProps)
    .filter(
      (prop) => !gridCellCSSPropertiesAsNonBooleanKeys.includes(prop as any)
    )
    .map((prop) => `grid__cell--${prop}`);

  const classNamesList = ["grid__cell", ...booleanModifiers, className];

  const filteredProps = Object.fromEntries(
    Object.entries(otherProps).filter(([key]) =>
      gridCellCSSPropertiesAsNonBooleanKeys.includes(key as any)
    )
  );

  return (
    <div className={cn(classNamesList)} style={filteredProps as CSSProperties}>
      {children}
    </div>
  );
};
