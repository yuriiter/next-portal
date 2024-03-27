import { cn } from "@/utils/utils";
import React, { PropsWithChildren } from "react";

type TopNumberProps = {
  highlight?: boolean;
} & PropsWithChildren;

export const TopNumber = ({ children, highlight = false }: TopNumberProps) => {
  return (
    <div
      className={cn([
        "sm:w-full sm:h-[128px] text-center relative font-bold overflow-hidden rounded-xl",
        highlight && "bg-primary",
        !highlight && "bg-banner-dark",
      ])}
    >
      <span
        className={cn([
          "relative sm:-top-[24px]",
          (typeof children === "number" && children > 9) ||
          (typeof children === "string" && children.length > 1)
            ? "sm:text-[90px] sm:top-[16px]"
            : "sm:text-[130px]",
        ])}
      >
        {children}
      </span>
    </div>
  );
};
