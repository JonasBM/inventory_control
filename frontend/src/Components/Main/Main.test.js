import Footer from "Components/Main/Footer";
import Header from "Components/Main/Header";
import React from "react";
import { renderWithReduxRouter } from "test-utils";
import { screen } from "@testing-library/react";

test("Header should render", () => {
  renderWithReduxRouter(<Header />);
  expect(screen.getByText(/Inventory Control/i)).toBeInTheDocument();
});

test("Footer should render", () => {
  renderWithReduxRouter(<Footer />);
  expect(screen.getByText(/2021 Copyright:/i)).toBeInTheDocument();
});
