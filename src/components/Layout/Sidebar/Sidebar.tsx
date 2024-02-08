import React, { useState } from "react";
import { SidebarContainer } from "./SidebarContainer";
import { SidebarLogo } from "./SidebarLogo";
import { Divider } from "../../Divider";
import { SidebarNavigation } from "./SidebarNavigation";
import { Fade as Hamburger } from "hamburger-react";
import { cn } from "@/utils/utils";
import { SidebarData } from "./types";
import { useTranslation } from "next-i18next";
import { SidebarLink } from "./SidebarLink";

type SidebarProps = SidebarData & { hideLinks?: boolean };

export const Sidebar = ({ mainLinks, topGames }: SidebarProps) => {
  const { t } = useTranslation();

  const [isOpenOnMobile, setIsOpenOnMobile] = useState(false);

  return (
    <div
      className={cn([
        "sidebar h-screen xl:overflow-y-scroll fixed top-0 left-0 bg-sidebar",
        isOpenOnMobile
          ? "h-screen overflow-y-scroll sidebar--open"
          : "overflow-y-hidden ",
      ])}
    >
      <SidebarContainer>
        <SidebarLogo className="hidden xl:flex" />
        <div className="w-full xl:hidden items-center shrink-0 flex justify-between">
          <SidebarLogo />
          <div>
            <Hamburger
              toggle={setIsOpenOnMobile}
              toggled={isOpenOnMobile}
              size={40}
            />
          </div>
        </div>
      </SidebarContainer>
      <Divider />

      <SidebarContainer
        className={cn(["xl:flex", isOpenOnMobile ? "" : "hidden"])}
      >
        <SidebarLink img={""} href={"/contact"}>
          {t("contact-page-link-text")}
        </SidebarLink>
        <SidebarNavigation links={mainLinks ?? []} />
      </SidebarContainer>

      {topGames.length > 0 && (
        <>
          <Divider />

          <SidebarContainer
            className={cn(["xl:flex", isOpenOnMobile ? "" : "hidden"])}
          >
            <h3 className="font-bold mb-4 text-xl">{t("top-games-title")}</h3>
            <SidebarNavigation links={topGames ?? []} withImage />
          </SidebarContainer>
        </>
      )}
    </div>
  );
};
