import { HIDE_MODAL, SHOW_MODAL } from "../../../actions/actionTypes";

import CommonModalFooter from "../CommonModalFooter";
import { Form } from "react-final-form";
import FormProductOrder from "./FormProductOrder";
import { Modal } from "react-bootstrap";
import { ProductCRUDAction } from "../../../actions/api/product";
import { ProductOrderCRUDAction } from "../../../actions/api/productorder";
import React from "react";
import i18next from "i18next";
import store from "../../../store";
import { useAppSelector } from "../../../hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const modalType = "MODAL_PRODUCTORDER";

export const handleShow = (
  _modalProps = {
    id: 0,
    product: 0,
    order: 0,
    unitary_price_sell: 0,
    quantity: 0,
  }
) => {
  store.dispatch({
    type: SHOW_MODAL,
    modalType: modalType,
    modalProps: _modalProps,
  });
  store.dispatch(ProductCRUDAction.list());
};

export const handleClose = () => {
  store.dispatch({
    type: HIDE_MODAL,
    modalType: modalType,
    modalProps: null,
  });
};

export const destroyProductOrder = (_productorder) => {
  if (_productorder !== undefined && _productorder.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = i18next.t(
      "Are you sure you would like to remove this product from the order?"
    );
    confirm_alert += newLine;
    confirm_alert += "#" + _productorder.id;
    if (window.confirm(confirm_alert)) {
      store
        .dispatch(ProductOrderCRUDAction.destroy(_productorder.id))
        .then(() => {
          store.dispatch(ProductCRUDAction.retrieve(_productorder.order));
        });
      return true;
    }
  }
  return false;
};

export default function ModalFormProductOrder() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const productorder = useAppSelector((state) => state.modal.modalProps);
  const type = useAppSelector((state) => state.modal.modalType);

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(ProductOrderCRUDAction.create(values));
        closeModal = true;
      } else {
        dispatch(ProductOrderCRUDAction.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      handleClose();
    }
  };

  const onDelete = () => {
    if (destroyProductOrder(productorder)) {
      handleClose();
    }
  };

  return (
    <Modal show={type === modalType ? true : false} onHide={handleClose}>
      <Form
        initialValues={productorder}
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
                {productorder !== undefined
                  ? productorder.id !== 0
                    ? t("Edit product in order") + " #" + productorder.id
                    : t("New product in order")
                  : t("New product in order")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormProductOrder />
            </Modal.Body>
            <Modal.Footer>
              <CommonModalFooter
                canDelete={
                  productorder !== undefined
                    ? productorder.id !== 0
                      ? true
                      : false
                    : false
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
