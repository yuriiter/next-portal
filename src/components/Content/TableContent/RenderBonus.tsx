import { Button } from "@/components/Button/Button";
import { LinkData } from "@/types/types";
import { useTranslation } from "next-i18next";
import React from "react";

export const RenderBonus = ({ href, text }: LinkData) => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{text}</p>
      {href !== undefined && (
        <Button className="mt-5" variant="secondary" href={href}>
          {t("button-more-details")}
        </Button>
      )}
    </div>
  );
};
