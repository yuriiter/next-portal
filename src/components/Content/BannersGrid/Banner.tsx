import { Button } from "@/components/Button/Button";
import { LinkData, PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import { Rating } from "@smastrom/react-rating";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type BannerProps = {
  banner: LinkData<{ rating: number }>;
} & PropsWithClassName;

export const Banner = ({ banner, className }: BannerProps) => {
  const { t } = useTranslation();
  return (
    <Link
      href={`${banner.href}`}
      className={cn([
        "bg-banner-dark max-w-90 min-h-[240px] max-h-[320px] rounded-xl overflow-hidden flex flex-col hover:bg-primary",
        className,
      ])}
    >
      <Image
        src={banner.img}
        alt={banner.text}
        width={80}
        height={70}
        className="w-full h-3/5 object-cover grow"
      />
      <div className="flex justify-between flex-wrap px-4 py-2 gap-3 h-auto grow">
        <div className="grow min-w-[112px]">
          <p>{banner.text}</p>
          <Rating value={banner.rating} style={{ width: "100px" }} readOnly />
        </div>
        <div className="grow">
          <Button variant="secondary" className="w-full" onClick={() => null}>
            {t("button-read")}
          </Button>
        </div>
      </div>
    </Link>
  );
};
