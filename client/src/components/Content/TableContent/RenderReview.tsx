import { Button } from "@/components/Button/Button";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import { useTranslation } from "next-i18next";

type RenderReviewProps = {
  href: string;
  rating: number;
};

export const RenderReview = ({ href, rating }: RenderReviewProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Button variant="secondary" href={href}>
        {t("button-review")}
      </Button>
      <Rating readOnly className="mt-5" value={rating} />
    </div>
  );
};
