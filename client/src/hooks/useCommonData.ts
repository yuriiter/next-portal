import { GetCommonDataQuery } from "@/generated/graphql";
import { useOptionalFactory } from "./useOptionalFactory";
import { buildMediaUrl } from "@/utils/utils";
import { LinkData } from "@/types/types";

export const useCommonData = (commonData: GetCommonDataQuery) => {
  const topBanners = useOptionalFactory(
    (commonData?.topBanners?.data
      .map((topBannerData) => {
        const img = buildMediaUrl(
          topBannerData.attributes?.img.data?.attributes?.url ?? "",
        );
        const href = `/games/${topBannerData.attributes?.urlSlug}`;

        return {
          img: img as string,
          href,
          text: topBannerData.attributes?.name,
        };
      })
      ?.filter(Boolean) as LinkData[]) ?? [],
    [commonData],
  );

  const stackPosts = useOptionalFactory(
    (commonData?.sideBanners?.data
      .map(({ attributes }) => {
        if (!attributes) return;
        const { rating, urlSlug, img, name } = attributes;
        return {
          rating,
          img: buildMediaUrl(img.data?.attributes?.url),
          text: name,
          href: `/games/${urlSlug}`,
        };
      })
      ?.filter(Boolean) as LinkData<{ rating: number }>[]) ?? [],
    [commonData],
  );

  const newsPosts = useOptionalFactory(
    (commonData?.sideNewsPosts?.data
      .map(({ attributes }) => {
        if (!attributes) return;
        const { title, urlSlug, createdAt } = attributes;
        return {
          text: title,
          href: `/articles/${urlSlug}`,
          date: new Date(createdAt),
          img: "",
        };
      })
      ?.filter(Boolean) as LinkData<{ date: Date }>[]) ?? [],
    [commonData],
  );

  const mainLinks = useOptionalFactory(
    [
      ...(commonData?.sidebarArticles?.data?.map(({ attributes }) => {
        if (!attributes) return;
        const { urlSlug, shortName } = attributes;
        return {
          href: `/articles/${urlSlug}`,
          text: shortName,
          img: "",
        };
      }) ?? []),
      ...(commonData?.sidebarListPages?.data?.map(({ attributes }) => {
        if (!attributes) return;
        const { urlSlug, shortName } = attributes;
        return {
          href: `/lists/${urlSlug}`,
          text: shortName,
          img: "",
        };
      }) ?? []),
    ].filter(Boolean) as LinkData[],
    [commonData],
  );

  const topGames = useOptionalFactory(
    (commonData?.topGamesLinks?.data
      .map(({ attributes }) => {
        if (!attributes) return;
        const { urlSlug, name, img } = attributes;

        return {
          img: buildMediaUrl(img.data?.attributes?.url),
          href: `/games/${urlSlug}`,
          text: name,
        };
      })
      ?.filter(Boolean) as LinkData[]) ?? [],
    [commonData],
  );
  const footerLinks = useOptionalFactory(
    [
      ...(commonData?.footerLinks?.data.map(
        ({ attributes }) => attributes?.link,
      ) ?? []),
      ...(commonData?.articlesLinksForFooter?.data
        .map(({ attributes }) => {
          if (!attributes) return;
          const { urlSlug, shortName } = attributes;
          return {
            href: urlSlug,
            text: shortName,
          };
        })
        ?.filter(Boolean) ?? []),
      ...(commonData?.listPagesLinksForFooter?.data
        .map(({ attributes }) => {
          if (!attributes) return;
          const { urlSlug, shortName } = attributes;

          return {
            href: urlSlug,
            text: shortName,
          };
        })
        ?.filter(Boolean) ?? []),
    ] as LinkData[],
    [commonData],
  );

  return {
    topBanners,
    mainLinks,
    topGames,
    footerLinks,
    stackPosts,
    newsPosts,
  };
};
