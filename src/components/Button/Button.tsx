import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import Link from "next/link";
import React, { MouseEvent, PropsWithChildren } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
} & PropsWithChildren &
  PropsWithClassName &
  ({ href: string } | { onClick: (e: MouseEvent) => void });

export const Button = ({
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) => {
  const primaryClassNames = "bg-primary border-transparent";
  const secondaryClassNames = "border-white";

  const classNames = cn([
    "border-2 text-sm rounded-md flex items-center justify-center text-center px-2 py-3 font-bold transition-all hover:bg-white hover:text-black",
    variant === "primary" && primaryClassNames,
    variant === "secondary" && secondaryClassNames,
    className,
  ]);

  return (
    <>
      {"onClick" in rest ? (
        <button className={classNames} onClick={rest.onClick}>
          {children}
        </button>
      ) : (
        <Link className={classNames} href={`${rest.href}`}>
          {children}
        </Link>
      )}
    </>
  );
};
