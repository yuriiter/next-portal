import { Grid } from "@/components/Grid/Grid";
import { GridCell } from "@/components/Grid/GridCell";
import { GridCellProps, GridProps } from "@/components/Grid/types";
import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import { useTranslation } from "next-i18next";
import React, { ReactNode, useMemo } from "react";

type Row = Record<string, any>;

type RenderCellParams<
  DataType extends Row = any,
  Key extends keyof DataType = any,
> = {
  rowIdx: number;
  row: DataType;
  value: DataType[Key];
};

export type Column<DataType extends Row = any> = {
  name: string;
  key: string;
  width?: string;
  renderCell?: (params: RenderCellParams<DataType>) => ReactNode;
};

type GridTableProps = {
  columns: Column[];
  rows: Row[];
  cellProps?: GridCellProps;
  rowProps?: GridProps;
  headerProps?: GridProps;
  tableProps?: GridProps;
  columnGap?: string;
  showAll?: boolean;
} & PropsWithClassName;

export const GridTable = ({
  columns,
  rows,
  cellProps,
  rowProps,
  headerProps,
  tableProps,
  columnGap = "30px",
  showAll = true,
}: GridTableProps) => {
  const { t } = useTranslation();

  const gridTemplateColumns = useMemo(
    () =>
      columns
        .filter(Boolean)
        .map(({ width }) => width || "1fr")
        .join(" "),
    [columns],
  );

  return (
    <div
      className={cn([
        "flex relative flex-col gap-7 overflow-hidden max-w-full overflow-x-hidden",
        !showAll ? "max-h-[700px] fading-content-bottom" : "",
      ])}
    >
      <Grid
        gridTemplateColumns={gridTemplateColumns}
        columnGap={columnGap}
        {...headerProps}
        className={cn(["justify-items-center px-5", headerProps?.className])}
      >
        {columns.map(({ name }, idx) => (
          <GridCell key={idx} className="font-bold text-sm uppercase">
            {name}
          </GridCell>
        ))}
      </Grid>
      <Grid {...tableProps} gap="10px">
        {!!rows?.length && rows.length > 0 ? (
          rows.map((row, idx) => {
            return (
              <Grid
                key={idx}
                gridTemplateColumns={gridTemplateColumns}
                columnGap={columnGap}
                className={cn(["odd:bg-banner py-5 px-5"])}
                {...rowProps}
              >
                {columns.map(({ key, renderCell }) => {
                  return (
                    <GridCell
                      key={key}
                      className={cn(["overflow-hidden break-all"])}
                      {...cellProps}
                    >
                      {renderCell?.({ rowIdx: idx, row, value: row[key] }) ||
                        row[key]}
                    </GridCell>
                  );
                })}
              </Grid>
            );
          })
        ) : (
          <p className="text-gray-300 text-center mb-3">{t("no-data")}</p>
        )}
      </Grid>
    </div>
  );
};
