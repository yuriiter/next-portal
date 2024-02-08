import React, { useEffect, useMemo, useState } from "react";
import { TopNumber } from "./TopNumber";
import { TopBanner } from "../TopBanners/TopBanner";
import { RenderBonus } from "./RenderBonus";
import { RenderReview } from "./RenderReview";
import { Button } from "@/components/Button/Button";
import { Column, GridTable } from "./GridTable";
import { useMQ } from "@/hooks/mediaQueries/useMQ";
import { GetTableBannersQuery } from "@/generated/graphql";
import { buildMediaUrl } from "@/utils/utils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type TableContentProps = {
  data: RowDataType[];
  showAll?: boolean;
};

export type RowDataType = NonNullable<
  NonNullable<
    NonNullable<GetTableBannersQuery["tableBanners"]>["data"]
  >[0]["attributes"]
>;

export const TableContent = ({ data, showAll = true }: TableContentProps) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const isSmallScreen = useMQ(1100, "max");
  const isVerySmallScreen = useMQ(780, "max");

  const [adjustedColumns, setAdjustedColumns] = useState<Column<RowDataType>[]>(
    [],
  );

  useEffect(() => {
    const columns: Column<RowDataType>[] = [
      {
        name: t("table-place"),
        key: "top",
        width: "110px",
        renderCell: (params) => (
          <TopNumber highlight={params.rowIdx < 3}>
            {params.rowIdx + 1}
          </TopNumber>
        ),
      },
      {
        name: t("table-game"),
        key: "game",
        width: "107px",
        renderCell: (params) => {
          return (
            <TopBanner
              dark
              href={`/games/${params.row.urlSlug}`}
              text={params.row.name}
              img={buildMediaUrl(params.row.img.data?.attributes?.url ?? "")}
            />
          );
        },
      },
      {
        name: t("table-bonus"),
        key: "bonus",
        width: "110px",
        renderCell: (params) => (
          <RenderBonus
            href={`/games/${params.row.urlSlug}`}
            text={params.value}
            img=""
          />
        ),
      },
      { name: t("table-soft"), key: "soft" },
      {
        name: t("table-review"),
        key: "review",
        width: "80px",
        renderCell: (params) => (
          <RenderReview
            href={`/games/${params.row.urlSlug}`}
            rating={params.row.rating}
          />
        ),
      },
      {
        name: t("table-website"),
        key: "website",
        width: "80px",
        renderCell: (params) => (
          <Button href={params.row.site}>{t("button-play")}</Button>
        ),
      },
    ];
    let adjustedColumns: Column<RowDataType>[] = [];

    if (isVerySmallScreen) {
      adjustedColumns = columns.filter(
        ({ key }) => !["soft", "bonus", "top"].includes(key),
      );
    }
    if (isSmallScreen)
      adjustedColumns = columns.filter(
        ({ key }) => !["soft", "bonus"].includes(key),
      );
    adjustedColumns = columns;

    setAdjustedColumns(adjustedColumns);
  }, [isSmallScreen, isVerySmallScreen, locale]);

  return (
    <div>
      <GridTable columns={adjustedColumns} rows={data} showAll={showAll} />
    </div>
  );
};
