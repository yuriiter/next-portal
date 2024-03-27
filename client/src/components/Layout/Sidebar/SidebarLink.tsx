import { LinkData, PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";

type SidebarLinkProps = { isActive?: boolean } & Omit<LinkData, "text"> &
  PropsWithClassName &
  PropsWithChildren;

const sidebarLinkHoverClasses =
  "hover:text-opacity-100 hover:bg-white hover:bg-opacity-5 hover:font-bold hover:pl-4";
const sidebarActiveLinkClasses = sidebarLinkHoverClasses.replaceAll(
  "hover:",
  "",
);

const sidebarBaseClasses = "w-full py-2 transition-all rounded-md text-white";

export const SidebarLink = ({
  isActive = false,
  href,
  className,
  children,
}: SidebarLinkProps) => {
  return (
    <Link
      href={`${href}`}
      className={cn([
        sidebarBaseClasses,
        !isActive && "text-opacity-25",
        sidebarLinkHoverClasses,
        isActive && sidebarActiveLinkClasses,
        className,
      ])}
    >
      {children}
    </Link>
  );
};
