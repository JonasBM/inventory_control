import Reducer from "reducers/Reducer";
import { combineReducers } from "redux";
import reducerAuth from "reducers/accounts/reducerAuth";

export default combineReducers({
  auth: reducerAuth,
  profiles: new Reducer("userprofile").reducer,
});
