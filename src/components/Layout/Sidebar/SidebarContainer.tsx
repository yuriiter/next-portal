import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import React, { PropsWithChildren } from "react";

export const SidebarContainer = ({
  children,
  className,
}: PropsWithChildren & PropsWithClassName) => {
  return (
    <div
      className={cn([
        "mx-2 xl:mx-4 my-5 flex flex-col sidebar-container",
        className,
      ])}
    >
      {children}
    </div>
  );
};
