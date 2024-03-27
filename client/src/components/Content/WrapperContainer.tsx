import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import React, { PropsWithChildren } from "react";

export const WrapperContainer = ({
  children,
  className,
}: PropsWithChildren & PropsWithClassName) => {
  return <div className={cn(["px-6 my-6 w-full", className])}>{children}</div>;
};
