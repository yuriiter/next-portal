import { Wrapper } from "@/components/Content/Wrapper";
import { WrapperContainer } from "@/components/Content/WrapperContainer";
import { Grid } from "@/components/Grid/Grid";
import { GridCell } from "@/components/Grid/GridCell";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/Button/Button";
import { useTranslation } from "next-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Layout
      mainLinks={[]}
      topGames={[]}
      footerLinks={[]}
      seoData={{
        metaTitle: "404 - Not found",
        metaDescription: "Not found page",
        canonicalUrl: "",
      }}
    >
      <main>
        <Grid gap="30px">
          <GridCell>
            <Wrapper>
              <WrapperContainer>
                <h3 className="text-2xl font-bold my-4">
                  {t("not-found-caption")}
                </h3>
                <Button variant="secondary" className="w-64" href="/">
                  {t("button-go-to-main-page")}
                </Button>
              </WrapperContainer>
            </Wrapper>
          </GridCell>
        </Grid>
      </main>
    </Layout>
  );
}
