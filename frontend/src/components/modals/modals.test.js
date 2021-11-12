import { fireEvent, screen } from "@testing-library/react";

import ModalFormClient from "components/modals/ModalFormClient";
import ModalFormInventory from "components/modals/ModalFormInventory";
import ModalFormOrder from "components/modals/ModalFormOrder";
import ModalFormProduct from "components/modals/ModalFormProduct";
import ModalFormProductOrder from "components/modals/ModalFormProductOrder";
import React from "react";
import { renderWithReduxRouter } from "test-utils";
import store from "store";

test("ModalFormClient should render", () => {
  renderWithReduxRouter(<ModalFormClient />);
  store.dispatch({
    type: "SHOW_MODAL",
    modalType: "MODAL_CLIENT",
    modalProps: { id: 0, name: "" },
  });
  expect(screen.getByText(/New client/i)).toBeInTheDocument();
  expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});

test("ModalFormInventory should render", () => {
  renderWithReduxRouter(<ModalFormInventory />);
  store.dispatch({
    type: "SHOW_MODAL",
    modalType: "MODAL_INVENTORY",
    modalProps: { id: 0, quantity: 0, product: 0 },
  });
  expect(screen.getByText(/New Inventory entry/i)).toBeInTheDocument();
  expect(screen.getByText(/Quantity:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});

test("ModalFormOrder should render", () => {
  renderWithReduxRouter(<ModalFormOrder />);
  store.dispatch({
    type: "SHOW_MODAL",
    modalType: "MODAL_ORDER",
    modalProps: { id: 0, seller: "", client: "", opened: true },
  });
  expect(screen.getByText(/New order/i)).toBeInTheDocument();
  expect(screen.getByText(/Seller:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});

test("ModalFormProduct should render", () => {
  renderWithReduxRouter(<ModalFormProduct />);
  store.dispatch({
    type: "SHOW_MODAL",
    modalType: "MODAL_PRODUCT",
    modalProps: { id: 0, name: "", multiplier: 1 },
  });
  expect(screen.getByText(/New product/i)).toBeInTheDocument();
  expect(screen.getByText(/Image:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});

test("ModalFormProductOrder should render", () => {
  renderWithReduxRouter(<ModalFormProductOrder />);
  store.dispatch({
    type: "SHOW_MODAL",
    modalType: "MODAL_PRODUCTORDER",
    modalProps: {
      id: 0,
      product: 0,
      order: 0,
      unitary_price_sell: 0,
      quantity: 0,
    },
  });
  expect(screen.getByText(/New product in order/i)).toBeInTheDocument();
  expect(screen.getByText(/Product:/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});
