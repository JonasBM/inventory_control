import { CREATE_MESSAGE } from "actions/actionTypes";

const initialState = {};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
