import { BrowserRouter, Router } from "react-router-dom";

import { Provider } from "react-redux";
import React from "react";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import store from "store";

export const renderWithReduxRouter = (
  ui,
  { initialState, mystore = store, route = "/" } = {}
) => {
  const history = createMemoryHistory();
  return render(
    <Provider store={mystore}>
      <Router history={history}>{ui}</Router>
    </Provider>
  );
};

export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

// re-export everything
export * from "@testing-library/react";
