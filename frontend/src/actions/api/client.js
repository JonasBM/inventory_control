import { CRUDAction } from "actions/generics";

export const ClientCRUDAction = new CRUDAction(
  "client",
  process.env.REACT_APP_API_URL + "client/"
);
