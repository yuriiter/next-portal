import { CamelCase } from "@/types/utils";
import { CSSProperties, ReactNode } from "react";
import {
  gridCSSPropertiesAsBooleanKeys,
  gridCSSPropertiesAsNonBooleanKeys,
  gridCellCSSPropertiesAsBooleanKeys,
  gridCellCSSPropertiesAsNonBooleanKeys,
} from "./constants";

type GridCSSPropertiesAsBooleanKeys =
  (typeof gridCSSPropertiesAsBooleanKeys)[number];

type GridCSSPropertiesAsNonBooleanKeys =
  (typeof gridCSSPropertiesAsNonBooleanKeys)[number];

type GridCSSPropertiesAsBoolean = Omit<
  {
    [K in Extract<
      CamelCase<Extract<CSSProperties[GridCSSPropertiesAsBooleanKeys], string>>,
      string
    >]?: boolean;
  },
  "unset" | "initial" | "inherit" | "revert" | "MozInitial" | "normal"
>;

type GridCSSProperties = {
  [K in GridCSSPropertiesAsNonBooleanKeys]?: CSSProperties[K];
} & GridCSSPropertiesAsBoolean;

export type GridProps = GridCSSProperties & {
  children?: ReactNode;
  className?: string;
};

type GridCellCSSPropertiesAsBooleanKeys =
  (typeof gridCellCSSPropertiesAsBooleanKeys)[number];

type GridCellCSSPropertiesAsNonBooleanKeys =
  (typeof gridCellCSSPropertiesAsNonBooleanKeys)[number];

type GridCellCSSPropertiesAsBoolean = Omit<
  {
    [K in Extract<
      CamelCase<
        Extract<CSSProperties[GridCellCSSPropertiesAsBooleanKeys], string>
      >,
      string
    >]?: boolean;
  },
  "unset" | "initial" | "inherit" | "revert" | "MozInitial" | "normal"
>;

type GridCellCSSProperties = {
  [K in GridCellCSSPropertiesAsNonBooleanKeys]?: CSSProperties[K];
} & GridCellCSSPropertiesAsBoolean;

export type GridCellProps = GridCellCSSProperties & {
  children?: ReactNode;
  className?: string;
};
