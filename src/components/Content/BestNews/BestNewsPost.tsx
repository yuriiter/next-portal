import { PropsWithClassName } from "@/types/types";
import { cn, formatDate } from "@/utils/utils";
import Link from "next/link";
import React from "react";

type BestNewsPostProps = {
  text: string;
  href: string;
  date: Date;
} & PropsWithClassName;

export const BestNewsPost = ({
  text,
  href,
  date,
  className,
}: BestNewsPostProps) => {
  return (
    <Link
      href={`${href}`}
      className={cn([
        "rounded-md bg-banner transition-all p-4 flex flex-col gap-4 hover:bg-primary",
        className,
      ])}
    >
      <h4>{text}</h4>
      <p className="text-xs text-gray-300">{formatDate(date)}</p>
    </Link>
  );
};
