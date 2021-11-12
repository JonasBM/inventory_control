import { fireEvent, renderWithReduxRouter } from "test-utils";

import Client from "components/client";
import ModalFormClient from "components/modals/ModalFormClient";
import React from "react";
import { screen } from "@testing-library/react";
import store from "store";

test("Client should render", () => {
  renderWithReduxRouter(<Client />);
  expect(screen.getByText(/Add/i)).toBeInTheDocument();
  expect(screen.getByText(/Clients List/i)).toBeInTheDocument();
});

test("Add client button", () => {
  renderWithReduxRouter(<ModalFormClient />);
  renderWithReduxRouter(<Client />);
  const addbutton = screen.getByText(/Add/i);
  fireEvent.click(addbutton);
  expect(screen.getByText(/New client/i)).toBeInTheDocument();
  expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});
