import { Col, Row } from "react-bootstrap";

import { ProductCRUDAction } from "actions/api/product";
import ProductsList from "components/product/list/ProductsList";
import React from "react";
import Toolbar from "components/product/list/Toolbar";
import store from "store";
import { useEffect } from "react";
import { useInput } from "hooks";

export const updateList = (searchParams) => {
  store.dispatch(ProductCRUDAction.list(searchParams));
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
        <ProductsList filter={filter} />
      </Col>
    </Row>
  );
};

export default List;
