import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

import Loading from "./Loading";
import NotAutorized from "./NotAutorized";
import { tryLoadUser } from "../../actions/accounts/auth";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
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
          if (auth.user && auth.user.is_staff) {
            return <Component {...props} />;
          } else {
            return <NotAutorized />;
          }
        }
        if (!auth.isLoading && auth.token == null) {
          return <Redirect to="/login" />;
        }
        return <Loading />;
      }}
    />
  );
};

export default AdminRoute;
