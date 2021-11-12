import { Col, Container, Row } from "react-bootstrap";

import { ClientCRUDAction } from "actions/api/client";
import ClientsList from "Components/Client/ClientsList";
import React from "react";
import Toolbar from "Components/Client/Toolbar";
import store from "store";
import { useEffect } from "react";
import { useInput } from "hooks";

export const updateList = (searchParams) => {
  store.dispatch(ClientCRUDAction.list(searchParams));
};

const Client = () => {
  const { value: filter, bind: bindFilter, reset: resetFilter } = useInput("");

  useEffect(() => {
    updateList();
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="10">
          <Toolbar bindFilter={bindFilter} resetFilter={resetFilter} />
          <ClientsList filter={filter} />
        </Col>
      </Row>
    </Container>
  );
};

export default Client;
