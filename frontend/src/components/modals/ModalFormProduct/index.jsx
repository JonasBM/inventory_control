import { HIDE_MODAL, SHOW_MODAL } from "actions/actionTypes";

import CommonModalFooter from "components/modals/CommonModalFooter";
import { Form } from "react-final-form";
import FormProduct from "components/modals/ModalFormProduct/FormProduct";
import { Modal } from "react-bootstrap";
import { ProductCRUDAction } from "actions/api/product";
import React from "react";
import i18next from "i18next";
import store from "store";
import { useAppSelector } from "hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const modalType = "MODAL_PRODUCT";

export const handleShow = (
  _modalProps = { id: 0, name: "", multiplier: 1 }
) => {
  store.dispatch({
    type: SHOW_MODAL,
    modalType: modalType,
    modalProps: _modalProps,
  });
};

export const handleClose = () => {
  store.dispatch({
    type: HIDE_MODAL,
    modalType: modalType,
    modalProps: null,
  });
};

export const destroyProduct = (_product) => {
  if (_product !== undefined && _product.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = i18next.t(
      "Are you sure you would like to remove this product?"
    );
    confirm_alert += newLine;
    confirm_alert += _product.name;
    if (window.confirm(confirm_alert)) {
      store.dispatch(ProductCRUDAction.destroy(_product.id));
      return true;
    }
  }
  return false;
};

export default function ModalFormProduct() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const product = useAppSelector((state) => state.modal.modalProps);
  const type = useAppSelector((state) => state.modal.modalType);

  const onSubmit = (values) => {
    let closeModal = false;
    if (typeof values.image === "string" && values.image !== "") {
      delete values.image;
    }
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(ProductCRUDAction.create(values));
        closeModal = true;
      } else {
        dispatch(ProductCRUDAction.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      handleClose();
    }
  };

  const onDelete = () => {
    if (destroyProduct(product)) {
      handleClose();
    }
  };

  return (
    <Modal show={type === modalType ? true : false} onHide={handleClose}>
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
            <Modal.Header closeButton>
              <Modal.Title>
                {product !== undefined
                  ? product.id !== 0
                    ? t("Edit") + " " + product.name
                    : t("New product")
                  : t("New product")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormProduct />
            </Modal.Body>
            <Modal.Footer>
              <CommonModalFooter
                canDelete={
                  product !== undefined
                    ? product.id !== 0
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
