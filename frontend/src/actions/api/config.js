import { GET_CONFIG } from "../actionTypes";
import axios from "axios";
import { returnErrors } from "../actionMessages";
import { tokenConfig } from "../actionUtils";

export const getConfig = () => (dispatch, getState) => {
  return axios
    .get(process.env.REACT_APP_API_URL + "config/", tokenConfig(getState()))
    .then((res) => {
      dispatch({
        type: GET_CONFIG,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch(returnErrors(err));
      throw err;
    });
};
