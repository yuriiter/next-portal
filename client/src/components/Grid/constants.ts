export const gridCSSPropertiesAsBooleanKeys = [
  "justifyContent",
  // "alignContent",
  // "justifyItems",
  // "alignItems",
] as const;

export const gridCSSPropertiesAsNonBooleanKeys = [
  "gap",
  "rowGap",
  "columnGap",
  "gridTemplateRows",
  "gridTemplateColumns",
] as const;

export const gridCellCSSPropertiesAsBooleanKeys = [
  "justifySelf",
  // | "alignSelf"
  // | "placeSelf";
] as const;

export const gridCellCSSPropertiesAsNonBooleanKeys = [
  "gridRowStart",
  "gridRowEnd",
  "gridColumnStart",
  "gridColumnEnd",
  "gridRow",
  "gridColumn",
] as const;
