import { Col, Row } from "react-bootstrap";

import { InventoryCRUDAction } from "actions/api/inventory";
import InventoryList from "components/inventory/InventoryList";
import React from "react";
import Toolbar from "components/inventory/Toolbar";
import store from "store";
import { useEffect } from "react";

export const updateList = (product_id) => {
  store.dispatch(InventoryCRUDAction.list({ product_id: product_id }));
};

const List = ({ product_id }) => {
  useEffect(() => {
    if (product_id > 0) {
      updateList(product_id);
    }
  }, [product_id]);

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="10">
        <Toolbar product_id={product_id} />
        <InventoryList product_id={product_id} />
      </Col>
    </Row>
  );
};

export default List;
