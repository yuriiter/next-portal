import { LinkData, PropsWithClassName } from "@/types/types";
import React from "react";
import { Banner } from "./Banner";
import { cn } from "@/utils/utils";

type BannersGridProps = {
  banners: LinkData<{ rating: number }>[];
  showAll?: boolean;
} & PropsWithClassName;

export const BannersGrid = ({ banners, showAll = true }: BannersGridProps) => {
  if (banners.length === 0) return null;

  return (
    <div
      className={cn([
        "flex flex-wrap gap-5 relative overflow-hidden",
        !showAll ? "max-h-[400px] fading-content-bottom to-wrapper" : "",
      ])}
    >
      {banners.map((bannerData, idx) => (
        <Banner
          key={idx}
          banner={bannerData}
          className="grow basis-[max(200px,_25%)]"
        />
      ))}
    </div>
  );
};
