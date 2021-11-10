import { Col, Row } from "react-bootstrap";

import { ProductOrderCRUDAction } from "../../actions/api/productorder";
import ProductOrderList from "./ProductOrderList";
import React from "react";
import Toolbar from "./Toolbar";
import store from "../../store";
import { useEffect } from "react";

export const updateList = (order_id) => {
  store.dispatch(ProductOrderCRUDAction.list({ order_id: order_id }));
};

const List = ({ order_id }) => {
  useEffect(() => {
    if (order_id > 0) {
      updateList(order_id);
    }
  }, [order_id]);

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="10">
        <Toolbar order_id={order_id} />
        <ProductOrderList order_id={order_id} />
      </Col>
    </Row>
  );
};

export default List;
