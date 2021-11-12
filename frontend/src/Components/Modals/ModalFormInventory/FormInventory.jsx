import React, { Fragment } from "react";

import { InputForm } from "Components/Common/Forms/Input";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const FormInventory = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Row className="mb-2">
        <InputForm
          type="number"
          step="1"
          min="1"
          name="quantity"
          size="sm"
          classNameLabel="mb-0"
          label={t("Quantity") + ":"}
          placeholder={t("0")}
          required
        />
      </Row>
    </Fragment>
  );
};

export default FormInventory;
