import { Col, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import Inventory from "Components/Inventory";
import { ProductCRUDAction } from "actions/api/product";
import ProductDetails from "Components/Product/Details/productDetails";
import store from "store";
import { useParams } from "react-router-dom";

export const updateDetails = (product_id) => {
  store.dispatch(ProductCRUDAction.retrieve(product_id));
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
        <ProductDetails product_id={id} />
        <Inventory product_id={id} />
      </Col>
    </Row>
  );
};

export default Details;
