import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

import React from "react";
import { handleShow } from "../modals/ModalFormInventory";
import { useTranslation } from "react-i18next";

const Toolbar = ({ product_id }) => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col xs="auto">
        <Button
          variant="primary"
          size="sm"
          className="m-2"
          onClick={() => {
            handleShow({ id: 0, quantity: 0, product: product_id });
          }}
          title={t("New inventory entry")}
        >
          {t("Add Inventory")} <i className="bi bi-plus-lg ms-1"></i>
        </Button>
      </Col>
      <Col xs="auto"></Col>
    </Row>
  );
};

export default Toolbar;
