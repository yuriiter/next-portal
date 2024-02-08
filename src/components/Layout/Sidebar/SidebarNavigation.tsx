import React from "react";
import { SidebarLink } from "./SidebarLink";
import { SidebarLinkWithImage } from "./SidebarLinkWithImage";
import { LinkData } from "@/types/types";
import { cn } from "@/utils/utils";

type SidebarNavigationProps = {
  links: LinkData[];
  withImage?: boolean;
};

export const SidebarNavigation = ({
  links,
  withImage = false,
}: SidebarNavigationProps) => {
  return (
    <div className={cn(["flex flex-col", withImage ? "gap-y-4" : "gap-y-2"])}>
      {withImage
        ? links.map(({ text, ...rest }, idx) => (
            <SidebarLinkWithImage key={idx} {...rest}>
              {text}
            </SidebarLinkWithImage>
          ))
        : links.map(({ href, text }, idx) => (
            <SidebarLink img="" href={href} key={idx}>
              {text}
            </SidebarLink>
          ))}
    </div>
  );
};
