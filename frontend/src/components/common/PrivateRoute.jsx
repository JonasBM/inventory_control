import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

import Loading from "./Loading";
import { tryLoadUser } from "../../actions/accounts/auth";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAppSelector((state) => state.accounts.auth);
  const dispatch = useDispatch();
  //has token but not authenticated => try login
  //dont has token => login page
  //has token and authenticated => open page

  useEffect(() => {
    if (!auth.isLoading && auth.token != null && auth.isAuthenticated != null) {
      if (!auth.isAuthenticated) {
        dispatch(tryLoadUser());
      }
    }
  }, [auth, dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isLoading && auth.token != null && auth.isAuthenticated) {
          return <Component {...props} />;
        }
        if (!auth.isLoading && auth.token == null) {
          return <Redirect to="/login" />;
        }
        return <Loading />;
      }}
    />
  );
};

export default PrivateRoute;
