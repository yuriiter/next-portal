import { LinkData, PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopBannerProps = PropsWithClassName &
  LinkData & {
    dark?: boolean;
  };

export const TopBanner = ({
  href,
  text,
  img,
  dark = false,
  className,
}: TopBannerProps) => {
  if (href !== undefined) {
    return (
      <Link
        className={cn([
          dark ? "bg-banner-dark" : "bg-banner",
          "flex flex-col overflow-hidden rounded-xl max-h-80 hover:bg-primary transition-all",
          className,
        ])}
        href={`${href}`}
      >
        {img !== undefined && (
          <Image
            width={80}
            height={70}
            src={img}
            className="w-full h-3/4 object-cover"
            alt={text}
          />
        )}
        <div className="grow flex flex-col justify-center">
          <p className="text-center w-full">{text}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <div
        className={cn([
          dark ? "bg-banner-dark" : "bg-banner",
          "flex flex-col overflow-hidden rounded-xl max-h-80 hover:bg-primary transition-all",
          className,
        ])}
      >
        {img !== undefined && (
          <Image
            width={80}
            height={70}
            src={img}
            className="w-full h-3/4 object-cover"
            alt={text}
          />
        )}
        <div className="grow flex flex-col justify-center">
          <p className="text-center w-full">{text}</p>
        </div>
      </div>
    );
  }
};
