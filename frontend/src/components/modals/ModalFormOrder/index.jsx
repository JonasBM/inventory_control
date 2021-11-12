import { HIDE_MODAL, SHOW_MODAL } from "actions/actionTypes";

import { ClientCRUDAction } from "actions/api/client";
import CommonModalFooter from "components/modals/CommonModalFooter";
import { Form } from "react-final-form";
import FormOrder from "components/modals/ModalFormOrder/FormOrder";
import { Modal } from "react-bootstrap";
import { OrderCRUDAction } from "actions/api/order";
import { ProductCRUDAction } from "actions/api/product";
import React from "react";
import i18next from "i18next";
import store from "store";
import { useAppSelector } from "hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const modalType = "MODAL_ORDER";

export const handleShow = (
  _modalProps = { id: 0, seller: "", client: "", opened: true }
) => {
  store.dispatch({
    type: SHOW_MODAL,
    modalType: modalType,
    modalProps: _modalProps,
  });
  store.dispatch(ClientCRUDAction.list());
  store.dispatch(ProductCRUDAction.list());
};

export const handleClose = () => {
  store.dispatch({
    type: HIDE_MODAL,
    modalType: modalType,
    modalProps: null,
  });
};

export const destroyOrder = (_order) => {
  if (_order !== undefined && _order.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = i18next.t(
      "Are you sure you would like to remove this order?"
    );
    confirm_alert += newLine;
    confirm_alert += "#" + _order.id;
    if (window.confirm(confirm_alert)) {
      store.dispatch(OrderCRUDAction.destroy(_order.id));
      return true;
    }
  }
  return false;
};

export default function ModalFormOrder() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const order = useAppSelector((state) => state.modal.modalProps);
  const type = useAppSelector((state) => state.modal.modalType);

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(OrderCRUDAction.create(values)).then((res) => {
          history.push("/order/" + res.id);
        });
        closeModal = true;
      } else {
        dispatch(OrderCRUDAction.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      handleClose();
    }
  };

  const onDelete = () => {
    if (destroyOrder(order)) {
      handleClose();
    }
  };

  return (
    <Modal show={type === modalType ? true : false} onHide={handleClose}>
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
            <Modal.Header closeButton>
              <Modal.Title>
                {order !== undefined
                  ? order.id !== 0
                    ? t("Edit order") + " " + order.id
                    : t("New order")
                  : t("New order")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormOrder />
            </Modal.Body>
            <Modal.Footer>
              <CommonModalFooter
                canDelete={
                  order !== undefined ? (order.id !== 0 ? true : false) : false
                }
                canCopy={false}
                onDelete={onDelete}
                form={form}
                handleClose={handleClose}
              />
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  );
}
