import { GetCommonDataQuery } from "@/generated/graphql";
import { useOptionalFactory } from "./useOptionalFactory";
import { buildMediaUrl } from "@/utils/utils";

export const useCommonData = (commonData: GetCommonDataQuery) => {
  const topBanners = useOptionalFactory(
    commonData?.topBanners?.data
      .map((topBannerData) => {
        const img = buildMediaUrl(
          topBannerData.attributes?.img.data?.attributes?.url ?? "",
        );
        const href = `/games/${topBannerData.attributes?.urlSlug}`;
        const imgAlt =
          topBannerData.attributes?.img.data?.attributes?.alternativeText;

        return {
          img: img as string,
          href,
          text: imgAlt as string,
        };
      })
      .filter((data) => !Object.values(data).some((val) => !val)) ?? [],
    [commonData],
  );

  const stackPosts = useOptionalFactory(
    commonData?.sideBanners?.data.map(({ attributes }) => {
      if (!attributes) return;
      const { rating, urlSlug, img, name } = attributes;
      return {
        rating,
        img: buildMediaUrl(img.data?.attributes?.url),
        text: name,
        href: `/games/${urlSlug}`,
      };
    }) ?? [],
    [commonData],
  );

  const newsPosts = useOptionalFactory(
    commonData?.sideNewsPosts?.data.map(({ attributes }) => {
      if (!attributes) return;
      const { title, urlSlug, createdAt } = attributes;
      return {
        text: title,
        href: `/articles/${urlSlug}`,
        date: new Date(createdAt),
        img: "",
      };
    }) ?? [],
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
    ],
    [commonData],
  );

  const topGames = useOptionalFactory(
    commonData?.topGamesLinks?.data.map(({ attributes }) => {
      if (!attributes) return;
      const { urlSlug, name, img } = attributes;

      return {
        img: buildMediaUrl(img.data?.attributes?.url),
        href: `/games/${urlSlug}`,
        text: name,
      };
    }) ?? [],
    [commonData],
  );

  const footerLinks = useOptionalFactory(
    commonData?.footerLinks?.data.map(({ attributes }) => attributes?.link) ??
      [],
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
