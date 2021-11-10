import React, { Fragment } from "react";

import { InputForm } from "../../common/forms/Input";
import { Row } from "react-bootstrap";
import { SelectForm } from "../../common/forms/Select";
import { useAppSelector } from "../../../hooks";
import { useTranslation } from "react-i18next";

const FormProductOrder = () => {
  const { t } = useTranslation();
  const products = useAppSelector((state) => state.products);

  // product
  // order
  // unitary_price_sell
  // quantity
  // rentability

  return (
    <Fragment>
      <Row className="mb-2">
        <SelectForm
          name="product"
          size="sm"
          classNameLabel="mb-0"
          label={t("Product") + ":"}
          placeholder={t("Product")}
        >
          <option value="">---------</option>
          {products.map((product, index) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </SelectForm>
      </Row>
      <Row className="mb-2">
        <InputForm
          type="number"
          step="0.01"
          min="0.00"
          name="unitary_price_sell"
          size="sm"
          classNameLabel="mb-0"
          label={t("Unitary Price") + ":"}
          placeholder={t("0.00")}
        />
      </Row>
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
        />
      </Row>
    </Fragment>
  );
};

export default FormProductOrder;
