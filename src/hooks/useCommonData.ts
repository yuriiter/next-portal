import { GetCommonDataQuery } from "@/generated/graphql";
import { useOptionalFactory } from "./useOptionalFactory";
import { buildMediaUrl } from "@/utils/utils";

export const useCommonData = (commonData: GetCommonDataQuery) => {
  const topBanners = useOptionalFactory(
    commonData?.topBanners?.data
      .map((topBannerData) => {
        const img = buildMediaUrl(
          topBannerData.attributes?.img.data?.attributes?.url ?? ""
        );
        const href = `/games/${topBannerData.attributes?.urlSlug}`;
        // const name = topBannerData.attributes?.name;
        const imgAlt =
          topBannerData.attributes?.img.data?.attributes?.alternativeText;

        return {
          img: img as string,
          href,
          text: imgAlt as string,
        };
      })
      .filter((data) => !Object.values(data).some((val) => !val)) ?? [],
    [commonData]
  );

  const stackPosts = useOptionalFactory(
    commonData?.sideBanners?.data.map(
      ({ attributes: { rating, urlSlug, img, name } }) => ({
        rating,
        img: buildMediaUrl(img.data.attributes.url),
        text: name,
        href: `/games/${urlSlug}`,
      })
    ) ?? [],
    [commonData]
  );

  const newsPosts = useOptionalFactory(
    commonData?.sideNewsPosts?.data.map(
      ({ attributes: { title, urlSlug, createdAt } }) => ({
        text: title,
        href: `/articles/${urlSlug}`,
        date: new Date(createdAt),
        img: "",
      })
    ) ?? [],
    [commonData]
  );

  const mainLinks = useOptionalFactory(
    [
      ...(commonData?.sidebarArticles?.data?.map(
        ({ attributes: { urlSlug, shortName } }) => ({
          href: `/articles/${urlSlug}`,
          text: shortName,
          img: "",
        })
      ) ?? []),
      ...(commonData?.sidebarListPages?.data?.map(
        ({ attributes: { urlSlug, shortName } }) => ({
          href: `/lists/${urlSlug}`,
          text: shortName,
          img: "",
        })
      ) ?? []),
    ],
    [commonData]
  );

  const topGames = useOptionalFactory(
    commonData?.topGamesLinks?.data.map(
      ({ attributes: { urlSlug, name, img } }) => ({
        img: buildMediaUrl(img.data.attributes.url),
        href: `/games/${urlSlug}`,
        text: name,
      })
    ) ?? [],
    [commonData]
  );

  const footerLinks = useOptionalFactory(
    commonData?.footerLinks?.data.map(({ attributes: { link } }) => link) ?? [],
    [commonData]
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
