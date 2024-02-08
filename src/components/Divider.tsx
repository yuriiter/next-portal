import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import React from "react";

type DividerProps = {
  variant?: "horizontal" | "vertical";
} & PropsWithClassName;

export const Divider = ({
  variant = "horizontal",
  className,
}: DividerProps) => {
  return (
    <div
      className={cn([
        variant === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
        "bg-white bg-opacity-20",
        className,
      ])}
    ></div>
  );
};
