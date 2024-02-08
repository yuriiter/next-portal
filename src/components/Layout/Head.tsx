import { SeoDataFragment } from "@/generated/graphql";
import { buildMediaUrl, isDefined } from "@/utils/utils";
import Head from "next/head";

type SocialMetaTagsProps = {
  imageUrl: string | undefined;
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
};

const SocialMetaTags = ({
  imageUrl,
  title,
  description,
  url,
}: SocialMetaTagsProps) => {
  return (
    <>
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta property="twitter:card" content="summary_large_image" />

      <meta property="twitter:site" content="@unknown_yet" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </>
  );
};

export type HeadProps = {
  seoData: SeoDataFragment | undefined | null;
};

export const CustomHead: React.FC<HeadProps> = ({ seoData }) => {
  if (!seoData) return null;

  const {
    metaTitle,
    metaDescription,
    keywords,
    metaRobots,
    metaViewport,
    metaImage,
    structuredData,
    canonicalUrl,
  } = seoData;

  const metaImageUrl = buildMediaUrl(metaImage?.data?.attributes?.url ?? "");

  return (
    <Head>
      <title>{metaTitle} | Accent</title>
      {isDefined(canonicalUrl) && <link rel="canonical" href={canonicalUrl} />}
      {isDefined(keywords) && <meta name="keywords" content={keywords} />}
      {isDefined(metaRobots) && <meta name="robots" content={metaRobots} />}
      {isDefined(metaViewport) && (
        <meta name="viewport" content={metaViewport} />
      )}
      {isDefined(structuredData) && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <SocialMetaTags
        imageUrl={metaImageUrl}
        title={metaTitle}
        description={metaDescription}
        url={canonicalUrl}
      />
      <meta
        name="google-site-verification"
        content="GwG6an-4xiUWt-81oNgfAagh8SdqlA9a419FgBFlmfg"
      />
    </Head>
  );
};
