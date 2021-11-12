import Reducer from "reducers/Reducer";
import accounts from "reducers/accounts";
import { combineReducers } from "redux";
import config from "reducers/config";
import errors from "reducers/errors";
import messages from "reducers/messages";
import modal from "reducers/modal";

export default combineReducers({
  accounts,
  errors,
  messages,
  modal,
  config,
  sellers: new Reducer("user").reducer,
  clients: new Reducer("client").reducer,
  products: new Reducer("product").reducer,
  inventory: new Reducer("inventory").reducer,
  orders: new Reducer("order").reducer,
  productorders: new Reducer("productorder").reducer,
});
