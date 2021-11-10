import { CRUDAction } from "../generics";

export const ClientCRUDAction = new CRUDAction(
  "client",
  process.env.REACT_APP_API_URL + "client/"
);
