import React, { Fragment } from "react";

import { InputForm } from "Components/Common/Forms/Input";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const FormClient = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Row className="mb-2">
        <InputForm
          name="name"
          size="sm"
          classNameLabel="mb-0"
          label={t("Name") + ":"}
          placeholder={t("Name")}
          required
        />
      </Row>
    </Fragment>
  );
};

export default FormClient;
