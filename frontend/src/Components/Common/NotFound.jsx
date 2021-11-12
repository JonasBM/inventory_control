import { Link } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-4">
      <h1>{t("404 - Page not found!")}</h1>
      <Link to="/">{t("Go to initial page")}</Link>
    </div>
  );
};

export default NotFound;
