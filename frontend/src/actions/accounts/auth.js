import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "actions/actionTypes";
import { createMessage, returnErrors } from "actions/actionMessages";

import axios from "axios";
import { tokenConfig } from "actions/actionUtils";

//CHECK TOKEN & LOAD USER
export const tryLoadUser = () => (dispatch, getState) => {
  // User Loading
  let tokenHeader = tokenConfig(getState());
  if (tokenHeader != null) {
    dispatch({ type: USER_LOADING });
    return axios
      .post(process.env.REACT_APP_API_URL + "auth/login/", null, tokenHeader)
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
        return res.data;
      })
      .catch((err) => {
        dispatch(returnErrors(err));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } else {
    dispatch({ type: AUTH_ERROR });
  }
};
// LOGIN USER
export const authLogin = (values) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Basic ${btoa(values.username + ":" + values.password)}`,
    },
  };
  return axios
    .post(process.env.REACT_APP_API_URL + "auth/login/", null, config)
    .then((res) => {
      dispatch(createMessage({ SUCCESS: "Bem vindo!" }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch(returnErrors(err));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
// LOGOUT USER
export const authLogout = () => (dispatch, getState) => {
  let tokenHeader = tokenConfig(getState());
  if (tokenHeader != null) {
    dispatch({ type: USER_LOADING });
    return axios
      .post(process.env.REACT_APP_API_URL + "auth/logout/", null, tokenHeader)
      .then((res) => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res.data,
        });
        return res;
      })
      .catch((err) => {
        dispatch(returnErrors(err));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } else {
    dispatch({ type: AUTH_ERROR });
  }
};

// LOGOUT USER IN ALL DEVICES
export const authLogoutAll = () => (dispatch, getState) => {
  let tokenHeader = tokenConfig(getState());
  if (tokenHeader != null) {
    dispatch({ type: USER_LOADING });
    return axios
      .post(
        process.env.REACT_APP_API_URL + "auth/logoutall/",
        null,
        tokenHeader
      )
      .then((res) => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res.data,
        });
        return res;
      })
      .catch((err) => {
        dispatch(returnErrors(err));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } else {
    dispatch({ type: AUTH_ERROR });
  }
};
