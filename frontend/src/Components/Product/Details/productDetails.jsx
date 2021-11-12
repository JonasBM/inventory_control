import { Button, Col, Row } from "react-bootstrap";

import { Form } from "react-final-form";
import FormProduct from "Components/Modals/ModalFormProduct/FormProduct";
import { ProductCRUDAction } from "actions/api/product";
import React from "react";
import { destroyProduct } from "Components/Modals/ModalFormProduct";
import { useAppSelector } from "hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductDetails = ({ product_id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useAppSelector((state) =>
    state.products.find((el) => el.id.toString() === product_id)
  );

  const onSubmit = (values) => {
    if (typeof values.image === "string" && values.image !== "") {
      delete values.image;
    }
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(ProductCRUDAction.create(values));
      } else {
        dispatch(ProductCRUDAction.update(values));
      }
    }
  };

  const onDelete = () => {
    if (destroyProduct(product)) {
      history.goBack();
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="10" className="p-3 border border-1 border-dark">
        <Row>
          <Col sm="auto">
            <h5>
              {product &&
                t("Edit") +
                  " " +
                  product.name +
                  " (" +
                  t("Remain") +
                  "=" +
                  product.remain +
                  ")"}{" "}
            </h5>
          </Col>
          <Col>
            <Button
              variant="primary"
              className="fw-bold float-end"
              size="sm"
              onClick={() => {
                history.goBack();
              }}
              title={t("Go Back")}
            >
              <i className="bi bi-arrow-left me-1"></i> {t("Go Back")}
            </Button>
          </Col>
        </Row>

        <Form
          initialValues={product}
          onSubmit={onSubmit}
          validate={() => {
            return {};
          }}
          render={({
            handleSubmit,
            submitFailed,
            form,
            submitting,
            pristine,
          }) => (
            <form
              onSubmit={handleSubmit}
              className={
                "needs-validation" + (submitFailed ? " was-validated" : "")
              }
              noValidate
            >
              <FormProduct />
              <div className="text-center">
                <Button
                  variant="primary"
                  className="fw-bold"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  {t("Save")}
                </Button>

                {form && (
                  <Button
                    variant="secondary"
                    className="fw-bold ms-1"
                    onClick={() => {
                      form.reset();
                    }}
                    title={t("Reload data")}
                    disabled={submitting || pristine}
                  >
                    <i className="bi bi-arrow-repeat" />
                  </Button>
                )}
                {form && product && product.id !== 0 ? (
                  <Button
                    variant="danger"
                    className="fw-bold ms-5"
                    onClick={onDelete}
                  >
                    {t("Remove")}
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </form>
          )}
        />
      </Col>
    </Row>
  );
};

export default ProductDetails;
