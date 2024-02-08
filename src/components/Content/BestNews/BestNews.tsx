import React from "react";
import { LinkData, PropsWithClassName } from "@/types/types";
import { BestNewsPost } from "./BestNewsPost";
import { cn } from "@/utils/utils";
import { useTranslation } from "next-i18next";

type BestNewsProps = {
  newsPosts: LinkData<{ date: Date }>[];
} & PropsWithClassName;

export const BestNews = ({ newsPosts, className }: BestNewsProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn([className])}>
      <h3 className="uppercase font-bold text-lg mb-4">
        {t("side-news-header")}
      </h3>
      <div className="flex flex-col gap-3 items-stretch">
        {newsPosts.length > 0 ? (
          newsPosts.map(({ date, href, text }, idx) => (
            <BestNewsPost key={idx} text={text} href={href} date={date} />
          ))
        ) : (
          <p className="text-gray-300">{t("side-news-no-data")}</p>
        )}
      </div>
    </div>
  );
};
