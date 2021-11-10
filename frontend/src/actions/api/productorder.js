import { CRUDAction } from "../generics";

export const ProductOrderCRUDAction = new CRUDAction(
  "productorder",
  process.env.REACT_APP_API_URL + "productorder/"
);
