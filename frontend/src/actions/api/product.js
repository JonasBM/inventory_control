import { CRUDAction } from "../generics";

export const ProductCRUDAction = new CRUDAction(
  "product",
  process.env.REACT_APP_API_URL + "product/",
  { header: { "Content-Type": "multipart/form-data" } }
);
