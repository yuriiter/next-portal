import React from "react";
import { RowDataType } from "../TableContent";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/Button/Button";
import { Column } from "../TableContent/GridTable";
import { Divider } from "@/components/Divider";
import { RichText } from "../RichText";
import { buildMediaUrl, isDefined } from "@/utils/utils";
import { useTranslation } from "next-i18next";
import { useOptionalFactory } from "@/hooks/useOptionalFactory";

type GameData = RowDataType & {
  description: string;
  interfaceLanguage: string;
  creationYear: number;
};

type GameArticleProps = {
  game: GameData;
};

export const Article = ({ game: gameData }: GameArticleProps) => {
  const { t } = useTranslation();

  const columns = useOptionalFactory<Column<GameData>[]>([
    {
      name: t("game-address"),
      key: "site",
      renderCell: (params) => (
        <Button variant="secondary" href={params.value} className="low-button">
          {t("button-go-to-game")}
        </Button>
      ),
    },
    { name: t("game-interface-language"), key: "interfaceLanguage" },
    { name: t("game-creation-year"), key: "creationYear" },
    { name: t("game-software"), key: "soft" },
    {
      name: t("game-bonus"),
      key: "bonus",
      renderCell: ({ value }) => value.text,
    },
  ]);
  if (!isDefined(gameData)) return null;

  const { img, description, rating, site } = gameData;
  const imgSrc = img.data?.attributes?.url;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-10">
          <div className="grow flex flex-col gap-7 basis-[max(362px,_33%)]">
            {typeof imgSrc === "string" && (
              <Image
                src={buildMediaUrl(imgSrc)}
                alt={description}
                width={80}
                height={70}
                className="w-full rounded-xl h-[200px] object-cover"
              />
            )}
            <div className="w-full flex justify-between gap-5">
              <Rating value={rating} readOnly style={{ width: "120px" }} />
              <Button href={site}>{t("button-go-to-game")}</Button>
            </div>
          </div>
          <div className="grow basis-[max(362px,_33%)] flex flex-col w-full">
            {columns.map(({ name, key, renderCell }, idx) => (
              <div
                key={key}
                className="flex p-4 gap-3 flex-wrap even:bg-banner"
              >
                <p className="grow basis-[max(190px,33%)] text-sm opacity-50 leading-relaxed">
                  {name}
                </p>
                <p className="grow basis-[max(190px,33%)] text-sm leading-relaxed">
                  {renderCell?.({
                    rowIdx: idx,
                    value: gameData[key as keyof GameData],
                    row: gameData,
                  }) || (gameData[key as keyof GameData] as string)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Divider />
      <RichText>{gameData.description}</RichText>
    </div>
  );
};
