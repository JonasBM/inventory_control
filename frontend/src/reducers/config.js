import { GET_CONFIG } from "../actions/actionTypes";

const initialState = {};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case GET_CONFIG:
      return action.payload;
    default:
      return state;
  }
}
