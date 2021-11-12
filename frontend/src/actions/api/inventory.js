import { CRUDAction } from "actions/generics";

export const InventoryCRUDAction = new CRUDAction(
  "inventory",
  process.env.REACT_APP_API_URL + "inventory/"
);
