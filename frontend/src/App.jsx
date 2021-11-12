import "loadInterceptor";
import "moment/locale/pt-br";

import * as moment from "moment";

import { Provider as AlertProvider, positions } from "react-alert";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import AdminRoute from "Components/Common/AdminRoute";
import AlertTemplate from "Components/Common/Alerts/AlertTemplate";
import Alerts from "Components/Common/Alerts/Alerts";
import Client from "Components/Client";
import Footer from "Components/Main/Footer";
import Header from "Components/Main/Header";
import Loading from "Components/Common/Loading";
import Login from "Components/Accounts/Login";
import Logout from "Components/Accounts/Logout";
import ModalFormClient from "Components/Modals/ModalFormClient";
import ModalFormInventory from "Components/Modals/ModalFormInventory";
import ModalFormOrder from "Components/Modals/ModalFormOrder";
import ModalFormProduct from "Components/Modals/ModalFormProduct";
import ModalFormProductOrder from "Components/Modals/ModalFormProductOrder";
import NotAutorized from "Components/Common/NotAutorized";
import NotFound from "Components/Common/NotFound";
import Order from "Components/Order";
import PrivateRoute from "Components/Common/PrivateRoute";
import Product from "Components/Product";
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
