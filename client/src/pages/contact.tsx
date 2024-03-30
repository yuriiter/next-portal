import { TopBanners } from "@/components/Content/TopBanners";
import { RowDataType, TableContent } from "@/components/Content/TableContent";
import { Wrapper } from "@/components/Content/Wrapper";
import { WrapperContainer } from "@/components/Content/WrapperContainer";
import { Grid } from "@/components/Grid/Grid";
import { GridCell } from "@/components/Grid/GridCell";
import { useState } from "react";
import { RichText } from "@/components/Content/RichText";
import { WithHeader } from "@/components/Content/WithHeader";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { Layout } from "@/components/Layout/Layout";
import { ShowMoreButton } from "@/components/ShowMoreButton";
import {
  GetCommonDataDocument,
  GetCommonDataQuery,
  GetCommonDataQueryVariables,
  GetContactPageDataDocument,
  GetContactPageDataQuery,
  GetContactPageDataQueryVariables,
  GetTableBannersDocument,
  GetTableBannersQuery,
  GetTableBannersQueryVariables,
} from "@/generated/graphql";
import { getUrqlClient } from "@/utils/urql";
import { GetStaticProps } from "next";
import { useCommonData } from "@/hooks/useCommonData";
import { useOptionalFactory } from "@/hooks/useOptionalFactory";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type ContactProps = {
  commonData: GetCommonDataQuery;
  tableBannersData: GetTableBannersQuery;
  contactPageData: GetContactPageDataQuery;
};

export default function Contact({
  commonData,
  tableBannersData,
  contactPageData,
}: ContactProps) {
  const { t } = useTranslation();
  const contactPage = contactPageData.contactPages?.data?.[0];

  const tableData = useOptionalFactory(
    tableBannersData?.tableBanners?.data
      .map((bannersData) => ({
        ...bannersData.attributes,
      }))
      ?.filter(Boolean) as RowDataType[],
    [tableBannersData],
  );
  const { topBanners, mainLinks, topGames, footerLinks } =
    useCommonData(commonData);
  const [showAll, setShowAll] = useState(
    tableData?.length ? tableData.length < 6 : true,
  );

  const onShowAllButtonClick = () => setShowAll(true);

  return (
    <Layout
      mainLinks={mainLinks}
      topGames={topGames}
      footerLinks={footerLinks}
      seoData={
        contactPage?.attributes?.seo ?? {
          metaTitle: "Contact",
          metaDescription: "",
          canonicalUrl: "",
        }
      }
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
            <RichText>{contactPage?.attributes?.content ?? ""}</RichText>
            <ContactForm />
          </GridCell>
        </Grid>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ContactProps> = async ({
  locale,
}) => {
  const { client } = getUrqlClient();

  const commonDataResponse = await client.query<
    GetCommonDataQuery,
    GetCommonDataQueryVariables
  >(GetCommonDataDocument, { location: locale?.toUpperCase() });

  const tableBannersDataResponse = await client.query<
    GetTableBannersQuery,
    GetTableBannersQueryVariables
  >(GetTableBannersDocument, { location: locale?.toUpperCase() });

  const contactPageDataResponse = await client.query<
    GetContactPageDataQuery,
    GetContactPageDataQueryVariables
  >(GetContactPageDataDocument, { location: locale?.toUpperCase() });

  return {
    props: {
      commonData: commonDataResponse?.data ?? {},
      tableBannersData: tableBannersDataResponse?.data ?? {},
      contactPageData: contactPageDataResponse?.data ?? {},
      ...(await serverSideTranslations(locale ?? "en")),
    },
    revalidate: 60,
  };
};
