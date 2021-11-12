import { Link } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

const NotAutorized = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-4">
      <h1>{t("NotAutorized.403error")}</h1>
      <Link to="/">{t("GoTostart")}</Link>
      <Link to="/logout">{t("LoginWith")}</Link>
    </div>
  );
};

export default NotAutorized;
