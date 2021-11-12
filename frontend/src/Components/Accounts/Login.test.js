import Login from "Components/Accounts/Login";
import React from "react";
import { renderWithReduxRouter } from "test-utils";
import { screen } from "@testing-library/react";

test("Login should render", () => {
  renderWithReduxRouter(<Login />);
  expect(screen.getByText(/Restricted access/i)).toBeInTheDocument();
});
