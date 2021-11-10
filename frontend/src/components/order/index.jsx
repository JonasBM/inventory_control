import { Route, Switch } from "react-router-dom";

import { Container } from "react-bootstrap";
import OrderDetails from "./details";
import OrderList from "./list";
import React from "react";

const Product = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/order/" component={OrderList} />
        <Route exact path="/order/:id" component={OrderDetails} />
      </Switch>
    </Container>
  );
};

export default Product;
