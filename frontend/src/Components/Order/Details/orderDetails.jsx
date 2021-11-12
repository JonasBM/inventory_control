import { Button, Col, Row } from "react-bootstrap";

import { Form } from "react-final-form";
import FormOrder from "Components/Modals/ModalFormOrder/FormOrder";
import { OrderCRUDAction } from "actions/api/order";
import React from "react";
import { destroyOrder } from "Components/Modals/ModalFormOrder";
import { formatCurrency } from "utils";
import { useAppSelector } from "hooks";
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

  const closeOrder = () => {
    if (order !== undefined && order.id !== undefined) {
      if (order.opened) {
        let newLine = "\r\n";
        let confirm_alert = t(
          "Are you sure you would like to close this order?"
        );
        confirm_alert += newLine;
        confirm_alert += t("Only the administrator can reopen orders");
        confirm_alert += newLine;
        confirm_alert += "#" + order.id;
        if (window.confirm(confirm_alert)) {
          dispatch(
            OrderCRUDAction.update({ ...order, opened: !order.opened })
          ).then(() => {
            history.push("/order/");
          });
          return true;
        }
      } else {
        let newLine = "\r\n";
        let confirm_alert = t(
          "Are you sure you would like to reopen this order?"
        );
        confirm_alert += newLine;
        confirm_alert += "#" + order.id;
        if (window.confirm(confirm_alert)) {
          dispatch(OrderCRUDAction.update({ ...order, opened: !order.opened }));
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="10" className="p-3 border border-1 border-dark">
        <Row>
          <Col sm="auto">
            <h5>
              {order &&
                t("Edit order") +
                  " #" +
                  order.id +
                  " (" +
                  t("Total") +
                  " = " +
                  t("$") +
                  formatCurrency(order.total) +
                  ")"}
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
                {form && order && order.id !== 0 ? (
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

                <Button
                  variant={order?.opened ? "warning" : "success"}
                  className="fw-bold ms-5"
                  size="sm"
                  onClick={() => {
                    closeOrder();
                  }}
                >
                  {order?.opened ? t("Close order") : t("Reopen order")}
                </Button>
              </div>
            </form>
          )}
        />
      </Col>
    </Row>
  );
};

export default ProductDetails;
