import Inventory from "Components/Inventory";
import React from "react";
import { renderWithReduxRouter } from "test-utils";
import { screen } from "@testing-library/react";

test("Inventory should render", () => {
  renderWithReduxRouter(<Inventory />);
  expect(screen.getByText(/Add Inventory/i)).toBeInTheDocument();
  expect(screen.getByText(/Inventory List/i)).toBeInTheDocument();
});
