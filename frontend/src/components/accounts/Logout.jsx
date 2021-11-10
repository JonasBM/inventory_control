import React from "react";
import { authLogout } from "../../actions/accounts/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authLogout());
  }, [dispatch]);

  return <h1>Logout (This text should not appear!)</h1>;
};

export default Logout;
