import { LinkData, PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";

type SidebarLinkProps = { isActive?: boolean } & Omit<LinkData, "text"> &
  PropsWithClassName &
  PropsWithChildren;

const sidebarLinkHoverClasses =
  "hover:text-opacity-100 hover:bg-primary hover:bg-opacity-100";
const sidebarBaseClasses =
  "w-full transition-all rounded-md text-white bg-opacity-5 bg-white flex gap-3 items-center";

export const SidebarLinkWithImage = ({
  href,
  img,
  className,
  children,
}: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn([sidebarBaseClasses, sidebarLinkHoverClasses, className])}
    >
      {img !== undefined && (
        <Image
          src={img}
          width={80}
          height={70}
          alt={typeof children === "string" ? children : "Accent - лучшие игры"}
          className="w-10 min-h-10 h-full rounded-md"
        />
      )}
      {children}
    </Link>
  );
};
