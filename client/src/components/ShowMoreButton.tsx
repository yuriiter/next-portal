import React from "react";
import { Button } from "./Button/Button";
import { useTranslation } from "next-i18next";

type ShowMoreButtonProps = {
  showButton: boolean;
  onClick: () => void;
};

export const ShowMoreButton = ({
  showButton,
  onClick,
}: ShowMoreButtonProps) => {
  const { t } = useTranslation();

  if (!showButton) return null;

  return (
    <Button
      variant="secondary"
      className="my-10 px-20 ml-auto"
      onClick={onClick}
    >
      {t("button-see-all")}
    </Button>
  );
};
