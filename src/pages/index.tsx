import { TopBanners } from "@/components/Content/TopBanners";
import { TableContent } from "@/components/Content/TableContent";
import { Wrapper } from "@/components/Content/Wrapper";
import { WrapperContainer } from "@/components/Content/WrapperContainer";
import { Grid } from "@/components/Grid/Grid";
import { GridCell } from "@/components/Grid/GridCell";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { RichText } from "@/components/Content/RichText";
import { WithHeader } from "@/components/Content/WithHeader";
import { Layout } from "@/components/Layout/Layout";
import { GetStaticProps } from "next";
import { getUrqlClient } from "@/utils/urql";
import {
  GetCommonDataDocument,
  GetCommonDataQuery,
  GetCommonDataQueryVariables,
  GetHomePageDataDocument,
  GetHomePageDataQuery,
  GetHomePageDataQueryVariables,
  GetTableBannersDocument,
  GetTableBannersQuery,
  GetTableBannersQueryVariables,
} from "@/generated/graphql";
import { useOptionalFactory } from "@/hooks/useOptionalFactory";
import { ShowMoreButton } from "@/components/ShowMoreButton";
import { useCommonData } from "@/hooks/useCommonData";
import { useTranslation, withTranslation } from "next-i18next";

type HomeProps = {
  commonData: GetCommonDataQuery;
  tableBannersData: GetTableBannersQuery;
  homePageData: GetHomePageDataQuery;
};

function Home({ commonData, tableBannersData, homePageData, t }: HomeProps) {
  // const { t } = useTranslation();

  const homePage = homePageData.indexPages?.data?.[0];
  const tableData = useOptionalFactory(
    tableBannersData?.tableBanners?.data.map((bannersData) => ({
      ...bannersData.attributes,
    })),
    [tableBannersData]
  );

  const pageContent = homePage?.attributes?.content;
  const [showAll, setShowAll] = useState(
    tableData?.length ? tableData.length < 6 : true
  );

  const onShowAllButtonClick = () => setShowAll(true);

  const { topBanners, mainLinks, topGames, footerLinks } =
    useCommonData(commonData);

  return (
    <Layout
      mainLinks={mainLinks}
      topGames={topGames}
      footerLinks={footerLinks}
      seoData={homePage?.attributes?.seo ?? { metaTitle: "Home" }}
    >
      <main>
        <Grid gap="30px">
          <GridCell>
            <Wrapper>
              <WrapperContainer>
                <TopBanners
                  title={t("best-gaming-clubs")}
                  button={{
                    img: "",
                    href: "/",
                    text: t("button-show-game-rating"),
                  }}
                  banners={topBanners ?? []}
                />
              </WrapperContainer>
            </Wrapper>
          </GridCell>
          <GridCell>
            <Wrapper>
              <WithHeader header={t("top-games-table-header")}>
                <TableContent data={tableData} showAll={showAll} />
              </WithHeader>
            </Wrapper>
            <ShowMoreButton
              showButton={!showAll}
              onClick={onShowAllButtonClick}
            />
          </GridCell>
          <GridCell>
            <RichText>{pageContent || ""}</RichText>
          </GridCell>
        </Grid>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const { client } = getUrqlClient();

  const commonDataResponse = await client.query<
    GetCommonDataQuery,
    GetCommonDataQueryVariables
  >(GetCommonDataDocument, { location: locale?.toUpperCase() });

  const tableBannersDataResponse = await client.query<
    GetTableBannersQuery,
    GetTableBannersQueryVariables
  >(GetTableBannersDocument, { location: locale?.toUpperCase() });

  const homePageDataResponse = await client.query<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >(GetHomePageDataDocument, { location: locale?.toUpperCase() });

  return {
    props: {
      commonData: commonDataResponse?.data ?? {},
      tableBannersData: tableBannersDataResponse?.data ?? {},
      homePageData: homePageDataResponse?.data ?? {},
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: false,
  };
};

export default withTranslation("common")(Home);
