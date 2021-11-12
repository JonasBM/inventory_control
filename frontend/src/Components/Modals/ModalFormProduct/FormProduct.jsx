import React, { Fragment } from "react";

import { CheckboxForm } from "Components/Common/Forms/Checkbox";
import { InputForm } from "Components/Common/Forms/Input";
import { InputImagePreview } from "Components/Common/Forms/FileInput";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const FormProduct = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Row className="mb-2">
        <InputImagePreview
          name="image"
          label={t("Image") + ":"}
          size="sm"
          classNameLabel="mb-0"
        />
      </Row>

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

      <Row className="mb-2">
        <InputForm
          type="number"
          step="0.01"
          min="0.00"
          name="unitary_price"
          size="sm"
          classNameLabel="mb-0"
          label={t("Unitary Price") + ":"}
          placeholder={t("0,00")}
          required
        />
      </Row>

      <Row className="mb-2">
        <InputForm
          type="number"
          step="1"
          min="0"
          name="multiplier"
          size="sm"
          classNameLabel="mb-0"
          label={t("Stack Size") + ":"}
          placeholder={t("0")}
          required
        />
      </Row>

      <Row className="mb-2">
        <CheckboxForm
          name="allow_oversell"
          label={t("Allow Oversell")}
          tooltip={t("Allow Oversell")}
        />
      </Row>
    </Fragment>
  );
};

export default FormProduct;
