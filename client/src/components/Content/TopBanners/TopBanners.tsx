import { LinkData, PropsWithClassName } from "@/types/types";
import React from "react";
import { Button } from "../../Button/Button";
import { TopBanner } from "./TopBanner";
import { useTranslation } from "next-i18next";

type TopBannersProps = {
  title: string;
  button: LinkData;
  banners: LinkData[];
} & PropsWithClassName;

export const TopBanners = ({ title, button, banners }: TopBannersProps) => {
  const { t } = useTranslation();

  console.log("bp1", banners);

  return (
    <div className="w-full flex flex-wrap gap-10 items-center">
      <div className="grow flex basis-[300px] gap-7 flex-col">
        <h4 className="text-2xl font-bold">{title}</h4>
        <Button
          variant="primary"
          className="self-start grow-0"
          href={button.href}
        >
          {button.text}
        </Button>
      </div>
      <div className="flex gap-4 grow basis-[600px] flex-wrap">
        {banners.length > 0 ? (
          banners.map((bannerProps, idx) => (
            <TopBanner
              className="grow basis-[140px]"
              key={idx}
              {...bannerProps}
            />
          ))
        ) : (
          <p className="text-gray-300">{t("no-data")}</p>
        )}
      </div>
    </div>
  );
};
