import {
  ClientCRUDAction,
  ClientCRUDActionReducer,
} from "../actions/api/client.js";

import Reducer from "./Reducer";
import accounts from "./accounts/index.js";
import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import modal from "./modal";

export default combineReducers({
  accounts,
  errors,
  messages,
  modal,
  sellers: new Reducer("user").reducer,
  clients: new Reducer("client").reducer,
  products: new Reducer("product").reducer,
  inventory: new Reducer("inventory").reducer,
  orders: new Reducer("order").reducer,
  productorders: new Reducer("productorder").reducer,
});