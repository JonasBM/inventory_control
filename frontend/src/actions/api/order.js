import { CRUDAction } from "../generics";

export const OrderCRUDAction = new CRUDAction(
  "order",
  process.env.REACT_APP_API_URL + "order/"
);
