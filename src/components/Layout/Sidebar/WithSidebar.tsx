import React, { PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";
import { SidebarData } from "./types";

type WithSidebarProps = PropsWithChildren & SidebarData;

export const WithSidebar = ({
  mainLinks,
  topGames,
  children,
}: WithSidebarProps) => {
  return (
    <div className="flex flex-col xl:flex-row min-h-screen">
      <Sidebar mainLinks={mainLinks} topGames={topGames} />
      <div className="sidebar__content grow px-3 md:px-8 bg-content flex flex-col">
        {children}
      </div>
    </div>
  );
};
