import React, { PropsWithChildren } from "react";
import { WithSidebar } from "./Sidebar";
import { Divider } from "../Divider";
import { Footer } from "./Footer/Footer";
import { FooterData, SidebarData } from "./Sidebar/types";
import { CustomHead, HeadProps } from "./Head";

type LayoutProps = PropsWithChildren & SidebarData & FooterData & HeadProps;

export const Layout = ({
  children,
  mainLinks,
  topGames,
  footerLinks,
  seoData,
}: LayoutProps) => {
  return (
    <>
      <CustomHead seoData={seoData} />
      <WithSidebar mainLinks={mainLinks} topGames={topGames}>
        {children}
        <div className="mt-auto">
          <Divider className="my-8" />
          <Footer footerLinks={footerLinks} />
        </div>
      </WithSidebar>
    </>
  );
};
