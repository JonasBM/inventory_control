import { Button, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { Form } from "react-final-form";
import FormOrder from "../../modals/ModalFormOrder/FormOrder";
import { OrderCRUDAction } from "../../../actions/api/order";
import { destroyOrder } from "../../modals/ModalFormOrder";
import { useAppSelector } from "../../../hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductDetails = ({ order_id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useAppSelector((state) =>
    state.orders.find((el) => el.id.toString() === order_id)
  );

  const onSubmit = (values) => {
    delete values.image;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(OrderCRUDAction.create(values));
      } else {
        dispatch(OrderCRUDAction.update(values));
      }
    }
  };

  const onDelete = () => {
    if (destroyOrder(order)) {
      history.goBack();
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="10" className="p-3 border border-1 border-dark">
        <Row>
          <Col sm="auto">
            <h5>{order && t("Edit order") + " #" + order.id}</h5>
          </Col>
          <Col>
            <Button
              variant="primary"
              className="font-weight-bold float-end"
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
          initialValues={order}
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
              <FormOrder />
              <div className="text-center">
                <Button variant="warning" className="font-weight-bold me-3">
                  {t("Close order")}
                </Button>

                <Button
                  variant="primary"
                  className="font-weight-bold"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  {t("Save")}
                </Button>

                {form && (
                  <Button
                    variant="secondary"
                    className="font-weight-bold ms-1"
                    onClick={() => {
                      form.reset();
                    }}
                    title={t("Reload data")}
                    disabled={submitting || pristine}
                  >
                    <i className="bi bi-arrow-repeat" />
                  </Button>
                )}
                {form && order && order.id !== 0 ? (
                  <Button
                    variant="danger"
                    className="font-weight-bold ms-5"
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
