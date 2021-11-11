import { Image, Row } from "react-bootstrap";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useForm, useFormState } from "react-final-form";

import { InputForm } from "../../common/forms/Input";
import { SelectForm } from "../../common/forms/Select";
import { formatCurrency } from "../../../utils";
import i18next from "i18next";
import { useAppSelector } from "../../../hooks";
import { useTranslation } from "react-i18next";

const ImagePreview = ({ imagePreview }) => {
  const { t } = useTranslation();
  if (imagePreview) {
    return (
      <>
        <Image
          src={imagePreview}
          rounded
          style={{ width: "200px", maxHeight: "200px" }}
          className="m-1"
        />
      </>
    );
  } else {
    return <h5>{t("No image to preview")}</h5>;
  }
};

const RentabilitySpan = ({ rentability }) => {
  const { t } = useTranslation();
  const config = useAppSelector((state) => state.config);
  const rentabilityStyle = ["text-danger", "text-warning", "text-success"];
  const rentabilityDescription = [t("Bad"), t("Good"), t("Excelent")];

  let rentabilityPosition = 0;
  if (rentability > 100) {
    rentabilityPosition = 2;
  } else if (rentability >= config.price_threshold * 100) {
    rentabilityPosition = 1;
  }

  if (rentability) {
    return (
      <span
        className={"d-inline-block " + rentabilityStyle[rentabilityPosition]}
      >
        {t("Rentability") +
          " (" +
          rentabilityDescription[rentabilityPosition] +
          ") = " +
          rentability.toFixed(2) +
          "%"}
      </span>
    );
  } else {
    return (
      <span>
        {t("Missing product and price to calculate rentability") + "."}
      </span>
    );
  }
};

const ProductStockSpan = ({ allow_oversell, remain, multiplier }) => {
  const { t } = useTranslation();
  if (remain !== undefined) {
    return (
      <>
        <Row>
          <span className={"fw-bold " + (remain < 0 && "text-danger")}>
            {t("Inventory") + " = " + remain}
          </span>
        </Row>
        {!allow_oversell && (
          <Row>
            <span className="fw-light">
              Obs.: {t("This product cannot be over sell")}.
            </span>
          </Row>
        )}
        {!allow_oversell && remain < multiplier && (
          <Row>
            <span className="text-danger fw-bold">
              {t("There is no inventory to sell")}.
            </span>
          </Row>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

const FormProductOrder = () => {
  const { t } = useTranslation();
  const formState = useFormState();
  const config = useAppSelector((state) => state.config);
  const order = useAppSelector((state) =>
    state.orders.find(
      (e) => e.id.toString() === formState.values.order?.toString()
    )
  );
  const selectedProduct = useAppSelector((state) =>
    state.products.find(
      (e) => e.id.toString() === formState.values.product?.toString()
    )
  );
  const initialSelectedProduct = useAppSelector((state) =>
    state.products.find(
      (e) => e.id.toString() === formState.initialValues.product?.toString()
    )
  );

  const products = useAppSelector((state) =>
    state.products.filter((_product) => {
      if (_product === initialSelectedProduct) {
        return true;
      }
      if (order?.products.indexOf(_product.id) > -1) {
        return false;
      }
      return true;
    })
  );

  const rentability =
    (formState.values.unitary_price_sell / selectedProduct?.unitary_price) *
    100;

  return (
    <Fragment>
      <Row className="mb-2">
        <ImagePreview imagePreview={selectedProduct?.image} />
      </Row>
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
        <ProductStockSpan
          allow_oversell={selectedProduct?.allow_oversell}
          remain={selectedProduct?.remain}
          multiplier={selectedProduct?.multiplier}
        />
      </Row>
      {selectedProduct && (
        <Row className="mb-2">
          <span>
            {t("Suggested price") +
              ": " +
              t("$") +
              formatCurrency(selectedProduct.unitary_price)}
          </span>
        </Row>
      )}
      <Row>
        <InputForm
          type="number"
          step="0.01"
          min={
            selectedProduct?.unitary_price
              ? (
                  selectedProduct?.unitary_price * config.price_threshold
                ).toFixed(2)
              : "0.01"
          }
          name="unitary_price_sell"
          size="sm"
          classNameLabel="mb-0"
          label={
            t("Unitary Price") +
            " (" +
            t("minimum value") +
            " = " +
            t("$") +
            (selectedProduct?.unitary_price
              ? formatCurrency(
                  selectedProduct?.unitary_price * config.price_threshold
                )
              : "0.01") +
            "):"
          }
          placeholder={t("0.00")}
        />
      </Row>
      <Row className="mb-2">
        <RentabilitySpan rentability={rentability} />
      </Row>
      <Row className="mb-2">
        <InputForm
          type="number"
          step={selectedProduct?.multiplier ? selectedProduct?.multiplier : 1}
          min={selectedProduct?.multiplier}
          max={!selectedProduct?.allow_oversell ? selectedProduct?.remain : ""}
          name="quantity"
          size="sm"
          classNameLabel="mb-0"
          label={
            t("Quantity") +
            " (" +
            t("stack") +
            " = " +
            (selectedProduct?.multiplier ? selectedProduct?.multiplier : "1") +
            "):"
          }
          placeholder={t("0")}
        />
      </Row>
      <Row className="mb-2">
        <h5>
          {t("Total") +
            "= " +
            t("$") +
            formatCurrency(
              formState.values.quantity * formState.values.unitary_price_sell
            )}
        </h5>
      </Row>
    </Fragment>
  );
};

export default FormProductOrder;
