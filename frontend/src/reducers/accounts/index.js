import Reducer from "../Reducer";
import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";

export default combineReducers({
  auth: reducerAuth,
  profiles: new Reducer("userprofile").reducer,
});
