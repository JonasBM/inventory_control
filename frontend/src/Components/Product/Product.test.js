import { fireEvent, screen } from "@testing-library/react";

import ModalFormProduct from "Components/Modals/ModalFormProduct";
import ProductDetails from "Components/Product/Details";
import ProductList from "Components/Product/List";
import React from "react";
import { renderWithReduxRouter } from "test-utils";

test("OrderList should render", () => {
  renderWithReduxRouter(<ProductList />);
  expect(screen.getByText(/Add/i)).toBeInTheDocument();
  expect(screen.getByText(/Products List/i)).toBeInTheDocument();
});

test("OrderDetails should render", () => {
  renderWithReduxRouter(<ProductDetails product_id={0} />);
  expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
  expect(screen.getByText(/Image:/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Inventory/i)).toBeInTheDocument();
  expect(screen.getByText(/Inventory List/i)).toBeInTheDocument();
});

test("Add Product button", () => {
  renderWithReduxRouter(<ModalFormProduct />);
  renderWithReduxRouter(<ProductList />);
  const addbutton = screen.getByText(/Add/i);
  fireEvent.click(addbutton);
  expect(screen.getByText(/New product/i)).toBeInTheDocument();
  expect(screen.getByText(/Image:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});
