import { Col, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import { ClientCRUDAction } from "actions/api/client";
import { OrderCRUDAction } from "actions/api/order";
import OrderDetails from "components/order/details/orderDetails";
import ProductOrder from "components/productorder";
import { UserRetrieveUpdateAction } from "actions/accounts/user";
import store from "store";
import { useParams } from "react-router-dom";

export const updateDetails = (order_id) => {
  store.dispatch(OrderCRUDAction.retrieve(order_id));
  store.dispatch(UserRetrieveUpdateAction.list());
  store.dispatch(ClientCRUDAction.list());
};

const Details = () => {
  let { id } = useParams();

  useEffect(() => {
    if (id > 0) {
      updateDetails(id);
    }
  }, [id]);

  return (
    <Row className="justify-content-md-center mt-1 mt-lg-3">
      <Col xs lg="10">
        <OrderDetails order_id={id} />
        <ProductOrder order_id={id} />
      </Col>
    </Row>
  );
};

export default Details;
