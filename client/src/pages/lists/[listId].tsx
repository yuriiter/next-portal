import { TopBanners } from "@/components/Content/TopBanners";
import { Wrapper } from "@/components/Content/Wrapper";
import { WrapperContainer } from "@/components/Content/WrapperContainer";
import { Grid } from "@/components/Grid/Grid";
import { GridCell } from "@/components/Grid/GridCell";
import { RichText } from "@/components/Content/RichText";
import { BannersGrid } from "@/components/Content/BannersGrid/BannersGrid";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { BestNews } from "@/components/Content/BestNews/BestNews";
import { PostsStack } from "@/components/Content/PostsStack/PostsStack";
import { WithHeader } from "@/components/Content/WithHeader";
import { Layout } from "@/components/Layout/Layout";
import { useMQ } from "@/hooks/mediaQueries/useMQ";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  GetCommonDataDocument,
  GetCommonDataQuery,
  GetCommonDataQueryVariables,
  GetListPageDataDocument,
  GetListPageDataQuery,
  GetListPageDataQueryVariables,
  GetPossibleListPagesQuery,
  GetPossibleListPagesQueryVariables,
  GetPossibleListPagesDocument,
} from "@/generated/graphql";
import { getUrqlClient } from "@/utils/urql";
import { useCommonData } from "@/hooks/useCommonData";
import { buildMediaUrl } from "@/utils/utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type ListPageProps = {
  commonData: GetCommonDataQuery;
  listPageData: GetListPageDataQuery;
};

export default function ListPage({ commonData, listPageData }: ListPageProps) {
  const { t } = useTranslation();

  const listPage = listPageData?.listPages?.data[0];
  const gridBanners =
    listPage?.attributes?.games?.data.map(
      ({ attributes: { rating, urlSlug, name, img } }) => ({
        rating,
        href: `/games/${urlSlug}`,
        img: buildMediaUrl(img.data.attributes.url),
        text: name,
      })
    ) ?? [];

  const {
    mainLinks,
    topGames,
    footerLinks,
    stackPosts,
    newsPosts,
    topBanners,
  } = useCommonData(commonData);

  const isSmallScreen = useMQ(1150, "max");
  const [showAllGridBanners, setShowAllGridBanners] = useState(
    gridBanners?.length < 6
  );
  const onShowAllGridBanners = () => setShowAllGridBanners(true);

  return (
    <Layout
      mainLinks={mainLinks}
      topGames={topGames}
      footerLinks={footerLinks}
      seoData={listPage?.attributes?.seo}
    >
      <main>
        <Grid
          gap="30px"
          gridTemplateColumns={
            isSmallScreen ? "auto" : "auto 1fr minmax(200px, 25%)"
          }
          gridTemplateRows="auto"
        >
          <GridCell gridColumn={isSmallScreen ? "" : "1 / span 3"}>
            <Wrapper>
              <WrapperContainer>
                <TopBanners
                  title={t("best-gaming-clubs")}
                  button={{
                    img: "",
                    href: "/",
                    text: t("button-show-game-rating"),
                  }}
                  banners={topBanners}
                />
              </WrapperContainer>
            </Wrapper>
          </GridCell>
          <GridCell gridColumn={isSmallScreen ? "" : "1 / span 2"}>
            <Wrapper>
              <WithHeader
                header={
                  !!listPage?.attributes
                    ? listPage?.attributes.title
                    : t("resource-not-exists")
                }
              >
                <WrapperContainer>
                  <BannersGrid
                    banners={gridBanners}
                    showAll={showAllGridBanners}
                  />
                  {!showAllGridBanners && (
                    <Button
                      variant="secondary"
                      className="ml-auto mt-4"
                      onClick={onShowAllGridBanners}
                    >
                      {t("button-show-more")}
                    </Button>
                  )}
                  <RichText>{listPage?.attributes.content ?? ""}</RichText>
                </WrapperContainer>
              </WithHeader>
            </Wrapper>
          </GridCell>
          <GridCell>
            <div className="flex flex-col gap-[30px]">
              <Wrapper>
                <WrapperContainer>
                  <PostsStack
                    title={t("side-posts-header")}
                    posts={stackPosts}
                  />
                </WrapperContainer>
              </Wrapper>
              <Wrapper>
                <WrapperContainer>
                  <BestNews newsPosts={newsPosts} />
                </WrapperContainer>
              </Wrapper>
            </div>
          </GridCell>
        </Grid>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { client } = getUrqlClient();

  const listPageDataResponse = await client.query<
    GetPossibleListPagesQuery,
    GetPossibleListPagesQueryVariables
  >(GetPossibleListPagesDocument, {});

  // Extract the necessary data to create paths
  const lists = listPageDataResponse?.data?.listPages?.data ?? [];

  const paths = lists.flatMap(({ attributes: { urlSlug } }) => {
    return locales?.map((locale) => ({
      params: { listId: urlSlug },
      locale,
    }));
  });

  return {
    paths,
    fallback: true, // Adjust the fallback behavior as needed ('blocking', 'true', or 'false')
  };
};

export const getStaticProps: GetStaticProps<ListPageProps> = async ({
  params,
  locale,
}) => {
  const { client } = getUrqlClient();

  const commonDataResponse = await client.query<
    GetCommonDataQuery,
    GetCommonDataQueryVariables
  >(GetCommonDataDocument, { location: locale.toUpperCase() });

  const listPageDataResponse = await client.query<
    GetListPageDataQuery,
    GetListPageDataQueryVariables
  >(GetListPageDataDocument, {
    location: locale!.toUpperCase(),
    urlSlug: params?.listId as string,
  });

  return {
    props: {
      commonData: commonDataResponse?.data ?? {},
      listPageData: listPageDataResponse?.data ?? {},
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: false,
  };
};
