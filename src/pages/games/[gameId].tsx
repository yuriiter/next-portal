import { TopBanners } from "@/components/Content/TopBanners";
import { Wrapper } from "@/components/Content/Wrapper";
import { WrapperContainer } from "@/components/Content/WrapperContainer";
import { Grid } from "@/components/Grid/Grid";
import { GridCell } from "@/components/Grid/GridCell";
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
  GetPossibleReviewsDocument,
  GetPossibleReviewsQuery,
  GetPossibleReviewsQueryVariables,
  GetReviewPageDataDocument,
  GetReviewPageDataQuery,
  GetReviewPageDataQueryVariables,
} from "@/generated/graphql";
import { getUrqlClient } from "@/utils/urql";
import { useCommonData } from "@/hooks/useCommonData";
import { CustomHead } from "@/components/Layout/Head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Article } from "@/components/Content/Article/Article";

type ReviewProps = {
  commonData: GetCommonDataQuery;
  reviewPageData: GetReviewPageDataQuery;
};

export default function Review({ commonData, reviewPageData }: ReviewProps) {
  const { t } = useTranslation();

  const isSmallScreen = useMQ(1150, "max");
  const reviewPage = reviewPageData?.games?.data[0];
  const {
    topBanners,
    mainLinks,
    topGames,
    footerLinks,
    stackPosts,
    newsPosts,
  } = useCommonData(commonData);

  const game = reviewPage?.attributes;

  return (
    <Layout
      mainLinks={mainLinks}
      topGames={topGames}
      footerLinks={footerLinks}
      seoData={reviewPage?.attributes?.seo}
    >
      <CustomHead seoData={reviewPage?.attributes?.seo} />
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
                  !!game
                    ? `${t("game-review-of")} ${game?.name}`
                    : t("resource-not-exists")
                }
              >
                <WrapperContainer>
                  <Article game={game} />
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

  const reviewPageDataResponse = await client.query<
    GetPossibleReviewsQuery,
    GetPossibleReviewsQueryVariables
  >(GetPossibleReviewsDocument, {});

  // Extract the necessary data to create paths
  const reviews = reviewPageDataResponse?.data?.games?.data ?? [];

  // Generate paths based on the fetched data
  const paths = reviews.flatMap(({ attributes: { urlSlug } }) => {
    return locales?.map((locale) => ({
      params: { gameId: urlSlug },
      locale,
    }));
  });

  return {
    paths,
    fallback: true, // Adjust the fallback behavior as needed ('blocking', 'true', or 'false')
  };
};

export const getStaticProps: GetStaticProps<ReviewProps> = async ({
  params,
  locale,
}) => {
  const { client } = getUrqlClient();

  const commonDataResponse = await client.query<
    GetCommonDataQuery,
    GetCommonDataQueryVariables
  >(GetCommonDataDocument, { location: locale?.toUpperCase() });

  const reviewPageDataResponse = await client.query<
    GetReviewPageDataQuery,
    GetReviewPageDataQueryVariables
  >(GetReviewPageDataDocument, {
    location: locale?.toUpperCase(),
    urlSlug: params?.gameId as string,
  });

  return {
    props: {
      commonData: commonDataResponse?.data ?? {},
      reviewPageData: reviewPageDataResponse?.data ?? {},
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: false,
  };
};
