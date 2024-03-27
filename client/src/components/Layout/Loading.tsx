import { useTranslation } from "next-i18next";
import React from "react";

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="animate-fade-in">
        <div className="flex items-center justify-center bg-gray-800 p-8 rounded-full shadow-lg">
          <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="ml-4 text-xl font-semibold">{t("loading")}</p>
        </div>
      </div>
    </div>
  );
};
