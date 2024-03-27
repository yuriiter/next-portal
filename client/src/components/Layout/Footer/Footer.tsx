import React from "react";
import Link from "next/link";

import Image from "next/image";
import { SidebarLogo } from "../Sidebar/SidebarLogo";
import { FooterData } from "../Sidebar/types";
import { alphas2List } from "@/../locales";
import { localesToImgs } from "@/constants/localesMap";
import { useTranslation } from "next-i18next";

export const Footer = ({ footerLinks }: FooterData) => {
  const { t } = useTranslation();

  return (
    <div className="my-10 flex flex-col items-center grow">
      <div className="flex items-center px-5 gap-8 xl:gap-5 w-full flex-wrap justify-between">
        <SidebarLogo className="shrink-0 grow mx-auto xl:mx-0" />
        <div className="flex grow flex-wrap justify-center xl:justify-normal xl:basis-[300px] w-full xl:w-auto gap-x-8 text-xs gap-y-4">
          <Link
            className="transition-all text-gray-400 hover:text-white"
            href="/sitemap.xml"
            locale=""
          >
            {t("sitemap")}
          </Link>

          {footerLinks?.map(
            ({ href, text }, idx) =>
              href && (
                <Link
                  key={idx}
                  className="transition-all text-gray-400 hover:text-white"
                  href={`${href}`}
                >
                  {text}
                </Link>
              ),
          ) ?? []}
        </div>
        <p className="text-sm text-gray-300 shrink-0 w-full text-center xl:w-[280px] xl:text-left">
          {t("footer-caption")} ©{new Date().getUTCFullYear()} Accent
        </p>
      </div>
      <div className="flex justify-center gap-y-5 gap-x-10 items-center flex-wrap w-3/4 mt-7">
        {alphas2List?.length > 1 &&
          alphas2List?.map((countryCode) => (
            <Link
              key={countryCode}
              className="flex gap-3 items-center transition-all text-gray-400 hover:text-white"
              href={`/${countryCode}`}
              locale={countryCode}
            >
              <Image
                src={localesToImgs[countryCode as keyof typeof localesToImgs]}
                alt={`${countryCode.toUpperCase()} version of site`}
                width={10}
                height={10}
                className="size-5 object-cover"
              />
              {countryCode.toUpperCase()}
            </Link>
          ))}
      </div>
    </div>
  );
};
