import { fireEvent, screen } from "@testing-library/react";

import ModalFormOrder from "Components/Modals/ModalFormOrder";
import OrderDetails from "Components/Order/Details";
import OrderList from "Components/Order/List";
import React from "react";
import { renderWithReduxRouter } from "test-utils";

test("OrderList should render", () => {
  renderWithReduxRouter(<OrderList />);
  expect(screen.getByText(/Add/i)).toBeInTheDocument();
  expect(screen.getByText(/Open Orders List/i)).toBeInTheDocument();
  expect(screen.getByText(/Closed Orders List/i)).toBeInTheDocument();
});

test("OrderDetails should render", () => {
  renderWithReduxRouter(<OrderDetails order_id={0} />);
  expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
  expect(screen.getByText(/Seller/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
  expect(screen.getByText(/Products in Order/i)).toBeInTheDocument();
});

test("Add Order button", () => {
  renderWithReduxRouter(<ModalFormOrder />);
  renderWithReduxRouter(<OrderList />);
  const addbutton = screen.getByText(/Add/i);
  fireEvent.click(addbutton);
  expect(screen.getByText(/New order/i)).toBeInTheDocument();
  expect(screen.getByText(/Seller:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});
