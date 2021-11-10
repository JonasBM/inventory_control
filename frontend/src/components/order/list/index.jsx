import { Col, Row } from "react-bootstrap";

import { ClientCRUDAction } from "../../../actions/api/client";
import { OrderCRUDAction } from "../../../actions/api/order";
import OrdersList from "./OrdersList";
import React from "react";
import Toolbar from "./Toolbar";
import { UserRetrieveUpdateAction } from "../../../actions/accounts/user";
import store from "../../../store";
import { useEffect } from "react";
import { useInput } from "../../../hooks";

export const updateList = (searchParams) => {
  store.dispatch(OrderCRUDAction.list(searchParams));
  store.dispatch(UserRetrieveUpdateAction.list());
  store.dispatch(ClientCRUDAction.list());
};

const List = () => {
  const { value: filter, bind: bindFilter, reset: resetFilter } = useInput("");

  useEffect(() => {
    updateList();
  }, []);

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="10">
        <Toolbar bindFilter={bindFilter} resetFilter={resetFilter} />
        <OrdersList filter={filter} openOrders={true} />
        <OrdersList filter={filter} openOrders={false} />
      </Col>
    </Row>
  );
};

export default List;
