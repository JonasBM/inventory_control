import { HIDE_MODAL, SHOW_MODAL } from "actions/actionTypes";

import { ClientCRUDAction } from "actions/api/client";
import CommonModalFooter from "components/modals/CommonModalFooter";
import { Form } from "react-final-form";
import FormClient from "components/modals/ModalFormClient/FormClient";
import { Modal } from "react-bootstrap";
import React from "react";
import i18next from "i18next";
import store from "store";
import { useAppSelector } from "hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const modalType = "MODAL_CLIENT";

export const handleShow = (_modalProps = { id: 0, name: "" }) => {
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

export const destroyClient = (_client) => {
  if (_client !== undefined && _client.id !== undefined) {
    let newLine = "\r\n";
    let confirm_alert = i18next.t(
      "Are you sure you would like to remove this client?"
    );
    confirm_alert += newLine;
    confirm_alert += _client.name;
    if (window.confirm(confirm_alert)) {
      store.dispatch(ClientCRUDAction.destroy(_client.id));
      return true;
    }
  }
  return false;
};

export default function ModalFormClient() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const client = useAppSelector((state) => state.modal.modalProps);
  const type = useAppSelector((state) => state.modal.modalType);

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(ClientCRUDAction.create(values));
        closeModal = true;
      } else {
        dispatch(ClientCRUDAction.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      handleClose();
    }
  };

  const onDelete = () => {
    if (destroyClient(client)) {
      handleClose();
    }
  };

  return (
    <Modal show={type === modalType ? true : false} onHide={handleClose}>
      <Form
        initialValues={client}
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
            data-testid="teste"
            onSubmit={handleSubmit}
            className={
              "needs-validation" + (submitFailed ? " was-validated" : "")
            }
            noValidate
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {client !== undefined
                  ? client.id !== 0
                    ? t("Edit") + " " + client.name
                    : t("New client")
                  : t("New client")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormClient />
            </Modal.Body>
            <Modal.Footer>
              <CommonModalFooter
                canDelete={
                  client !== undefined
                    ? client.id !== 0
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
