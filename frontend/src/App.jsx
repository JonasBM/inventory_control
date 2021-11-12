import "loadInterceptor";
import "moment/locale/pt-br";

import * as moment from "moment";

import { Provider as AlertProvider, positions } from "react-alert";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import AdminRoute from "components/common/AdminRoute";
import AlertTemplate from "components/common/alerts/AlertTemplate";
import Alerts from "components/common/alerts/Alerts";
import Client from "components/client";
import Footer from "components/main/Footer";
import Header from "components/main/Header";
import Loading from "components/common/Loading";
import Login from "components/accounts/Login";
import Logout from "components/accounts/Logout";
import ModalFormClient from "components/modals/ModalFormClient";
import ModalFormInventory from "components/modals/ModalFormInventory";
import ModalFormOrder from "components/modals/ModalFormOrder";
import ModalFormProduct from "components/modals/ModalFormProduct";
import ModalFormProductOrder from "components/modals/ModalFormProductOrder";
import NotAutorized from "components/common/NotAutorized";
import NotFound from "components/common/NotFound";
import Order from "components/order";
import PrivateRoute from "components/common/PrivateRoute";
import Product from "components/product";
import { Provider } from "react-redux";
import React from "react";
import { createBrowserHistory } from "history";
import i18next from "i18next";
import store from "store";

//moment.locale("pt-br");
moment.locale(i18next.language);

function App() {
  const history = createBrowserHistory();

  const alertOptions = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    containerStyle: {
      zIndex: 1070,
    },
  };

  return (
    <Provider store={store}>
      <React.Suspense fallback={<Loading />}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router history={history}>
            <Alerts />
            <ModalFormClient />
            <ModalFormProduct />
            <ModalFormInventory />
            <ModalFormOrder />
            <ModalFormProductOrder />
            <Header />
            <main role="main">
              <Switch>
                <Redirect exact path="/" to="/product" />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/logout" component={Logout} />
                <PrivateRoute exact path="/profile" component={Loading} />
                <PrivateRoute exact path="/client" component={Client} />
                <AdminRoute path="/product" component={Product} />
                <PrivateRoute path="/order" component={Order} />
                <AdminRoute exact path="/admin" component={Loading} />
                <Route exact path="/loading" component={Loading} />
                <Route exact path="/NotAutorized" component={NotAutorized} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </Router>
        </AlertProvider>
      </React.Suspense>
    </Provider>
  );
}

export default App;
