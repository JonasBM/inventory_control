import { render, screen } from "@testing-library/react";

import App from "App";
import React from "react";

test("App should render", () => {
  render(<App />);
  expect(screen.getByText(/Inventory Control/i)).toBeInTheDocument();
});

test("Render header and footer", () => {
  render(<App />);
  expect(screen.getByText(/Inventory Control/i)).toBeInTheDocument();
  expect(screen.getByText(/2021 Copyright/i)).toBeInTheDocument();
});
