import { TopBanners } from "@/components/Content/TopBanners";
import { Wrapper } from "@/components/Content/Wrapper";
import { WrapperContainer } from "@/components/Content/WrapperContainer";
import { Grid } from "@/components/Grid/Grid";
import { GridCell } from "@/components/Grid/GridCell";
import { RichText } from "@/components/Content/RichText";
import { BestNews } from "@/components/Content/BestNews/BestNews";
import { PostsStack } from "@/components/Content/PostsStack/PostsStack";
import { WithHeader } from "@/components/Content/WithHeader";
import { Layout } from "@/components/Layout/Layout";
import { useMQ } from "@/hooks/mediaQueries/useMQ";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { getUrqlClient } from "@/utils/urql";
import {
  GetArticlePageDataDocument,
  GetArticlePageDataQuery,
  GetArticlePageDataQueryVariables,
  GetCommonDataDocument,
  GetCommonDataQuery,
  GetCommonDataQueryVariables,
  GetPossibleArticlePagesQuery,
  GetPossibleArticlePagesQueryVariables,
  GetPossibleArticlePagesDocument,
} from "@/generated/graphql";
import { useCommonData } from "@/hooks/useCommonData";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type ArticleProps = {
  commonData: GetCommonDataQuery;
  articlePageData: GetArticlePageDataQuery;
};

export default function Article({ commonData, articlePageData }: ArticleProps) {
  const { t } = useTranslation();

  const isSmallScreen = useMQ(1150, "max");
  const articlePage = articlePageData?.articlePages?.data[0];
  const {
    topBanners,
    mainLinks,
    topGames,
    footerLinks,
    stackPosts,
    newsPosts,
  } = useCommonData(commonData);

  return (
    <Layout
      mainLinks={mainLinks}
      topGames={topGames}
      footerLinks={footerLinks}
      seoData={articlePage?.attributes?.seo}
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
                  banners={topBanners ?? []}
                />
              </WrapperContainer>
            </Wrapper>
          </GridCell>
          <GridCell gridColumn={isSmallScreen ? "" : "1 / span 2"}>
            <Wrapper>
              <WithHeader
                header={
                  !!articlePage?.attributes
                    ? articlePage?.attributes?.title
                    : t("resource-not-exists")
                }
              >
                <WrapperContainer>
                  <RichText>{articlePage?.attributes?.content ?? ""}</RichText>
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

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const { client } = getUrqlClient();

  const articlesResponse = await client.query<
    GetPossibleArticlePagesQuery,
    GetPossibleArticlePagesQueryVariables
  >(GetPossibleArticlePagesDocument, {});

  // Extract the necessary data to create paths
  const articles = articlesResponse?.data?.articlePages?.data ?? [];

  // Generate paths based on the fetched data
  const paths = articles
    .flatMap(({ attributes }) => {
      if (!attributes) return;
      const { urlSlug } = attributes;

      return locales?.map((locale) => ({
        params: { articleId: urlSlug },
        locale,
      }));
    })
    ?.filter(Boolean);

  return {
    paths,
    fallback: true, // Adjust the fallback behavior as needed ('blocking', 'true', or 'false')
  };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
  locale,
}) => {
  const { client } = getUrqlClient();

  const commonDataResponse = await client.query<
    GetCommonDataQuery,
    GetCommonDataQueryVariables
  >(GetCommonDataDocument, { location: locale?.toUpperCase() });

  const articlePageDataResponse = await client.query<
    GetArticlePageDataQuery,
    GetArticlePageDataQueryVariables
  >(GetArticlePageDataDocument, {
    location: locale?.toUpperCase(),
    urlSlug: params?.articleId as string,
  });

  return {
    props: {
      commonData: commonDataResponse?.data ?? {},
      articlePageData: articlePageDataResponse?.data ?? {},
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: 60,
  };
};
