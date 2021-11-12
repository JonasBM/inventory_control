import ProductOrder from "components/productorder";
import React from "react";
import { renderWithReduxRouter } from "test-utils";
import { screen } from "@testing-library/react";

test("ProductOrder should render", () => {
  renderWithReduxRouter(<ProductOrder />);
  expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
  expect(screen.getByText(/Products in Order/i)).toBeInTheDocument();
});
