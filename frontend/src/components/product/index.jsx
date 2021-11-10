import { Route, Switch } from "react-router-dom";

import { Container } from "react-bootstrap";
import ProductDetails from "./details";
import ProductList from "./list";
import React from "react";

const Product = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/product/" component={ProductList} />
        <Route exact path="/product/:id" component={ProductDetails} />
      </Switch>
    </Container>
  );
};

export default Product;
