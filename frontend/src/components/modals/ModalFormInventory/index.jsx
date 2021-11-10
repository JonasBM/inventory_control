import { HIDE_MODAL, SHOW_MODAL } from "../../../actions/actionTypes";

import CommonModalFooter from "../CommonModalFooter";
import { Form } from "react-final-form";
import FormInventory from "./FormInventory";
import { InventoryCRUDAction } from "../../../actions/api/inventory";
import { Modal } from "react-bootstrap";
import { ProductCRUDAction } from "../../../actions/api/product";
import React from "react";
import i18next from "i18next";
import store from "../../../store";
import { useAppSelector } from "../../../hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const modalType = "MODAL_INVENTORY";

export const handleShow = (
  _modalProps = { id: 0, quantity: 0, product: 0 }
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

export const destroyInventory = (_Inventory) => {
  if (_Inventory !== undefined && _Inventory.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = i18next.t(
      "Are you sure you would like to remove this Inventory entry?"
    );
    confirm_alert += newLine;
    confirm_alert += _Inventory.date + " - " + _Inventory.quantity;
    if (window.confirm(confirm_alert)) {
      store.dispatch(InventoryCRUDAction.destroy(_Inventory.id));
      return true;
    }
  }
  return false;
};

export default function ModalFormInventory() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inventory = useAppSelector((state) => state.modal.modalProps);
  const type = useAppSelector((state) => state.modal.modalType);
  const product = useAppSelector((state) =>
    state.products.find((el) => el.id === inventory.product)
  );

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(InventoryCRUDAction.create(values)).then((res) => {
          dispatch(ProductCRUDAction.retrieve(values.product));
        });
        closeModal = true;
      } else {
        dispatch(InventoryCRUDAction.update(values)).then((res) => {
          dispatch(ProductCRUDAction.retrieve(values.product));
        });
        closeModal = true;
      }
    }
    if (closeModal) {
      handleClose();
    }
  };

  const onDelete = () => {
    if (destroyInventory(inventory)) {
      handleClose();
    }
  };

  return (
    <Modal show={type === modalType ? true : false} onHide={handleClose}>
      <Form
        initialValues={inventory}
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
                {inventory !== undefined
                  ? inventory.id !== 0
                    ? t("Edit") + " " + inventory.date
                    : t("New Inventory entry")
                  : t("New Inventory entry")}
                <br />
                {product && product.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormInventory />
            </Modal.Body>
            <Modal.Footer>
              <CommonModalFooter
                canDelete={
                  inventory !== undefined
                    ? inventory.id !== 0
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
