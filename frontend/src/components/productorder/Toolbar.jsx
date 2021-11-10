import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

import React from "react";
import { handleShow } from "../modals/ModalFormProductOrder";
import { useTranslation } from "react-i18next";

const Toolbar = ({ order_id }) => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col xs="auto">
        <Button
          variant="primary"
          size="sm"
          className="m-2"
          onClick={() => {
            handleShow({
              id: 0,
              product: 0,
              order: order_id,
              unitary_price_sell: 0,
              quantity: 0,
            });
          }}
          title={t("Add product to order")}
        >
          {t("Add Product")} <i className="bi bi-plus-lg ms-1"></i>
        </Button>
      </Col>
      <Col xs="auto"></Col>
    </Row>
  );
};

export default Toolbar;
