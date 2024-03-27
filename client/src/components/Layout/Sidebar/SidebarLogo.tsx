import React from "react";
import { CompassIcon } from "../../svg/icons";
import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export const SidebarLogo = ({ className }: PropsWithClassName) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn([
        "bg-white bg-opacity-5 rounded-xl flex max-w-[280px] xl:max-w-[220px] items-center",
        className,
      ])}
    >
      <Link href="/">
        <span className="inline-flex bg-primary py-4 px-4 xl:py-2.5 xl:px-2 rounded-xl items-center gap-2">
          <CompassIcon className="xl:w-5 xl:h-5 size-8" />
          <span className="uppercase font-bold text-lg xl:text-xs">
            accent
          </span>
        </span>
      </Link>
      <span className="text-opacity-50 px-3 text-white text-lg xl:text-xs grow text-center">
        {t("caption-near-logo")}
      </span>
    </div>
  );
};
