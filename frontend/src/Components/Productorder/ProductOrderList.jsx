import { Button, Image, Table } from "react-bootstrap";
import {
  destroyProductOrder,
  handleShow,
} from "Components/Modals/ModalFormProductOrder";

import React from "react";
import { formatCurrency } from "utils";
import { useAppSelector } from "hooks";
import { useTranslation } from "react-i18next";

const InventoryList = ({ order_id }) => {
  const { t } = useTranslation();
  const productorders = useAppSelector((state) => state.productorders);
  const products = useAppSelector((state) => state.products);
  return (
    <Table striped bordered hover size="sm" className="px-lg-5">
      <caption
        className={
          "bg-secondary text-center text-uppercase fs-4 fw-bold text-light p-0"
        }
      >
        {t("Products in Order")}
      </caption>
      <thead>
        <tr>
          <th className="text-center d-none d-lg-table-cell"></th>
          <th className="text-center">{t("Product")}</th>
          <th className="text-center">
            {t("Unitary Price") + " (" + t("$") + ")"}
          </th>
          <th className="text-center">{t("Quantity")}</th>
          <th className="text-center d-none d-lg-table-cell">
            {t("Total") + " (" + t("$") + ")"}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productorders &&
          productorders.map((productorder, index) => {
            const product = products.find((e) => e.id === productorder.product);
            return (
              <tr key={productorder.id}>
                <td className="text-center d-none d-lg-table-cell">
                  <Image
                    src={product?.image}
                    rounded
                    style={{ width: "50px", maxHeight: "50px" }}
                    className="m-1"
                  />
                </td>
                <td>{product?.name}</td>
                <td
                  className={
                    "text-end " +
                    (productorder.rentability < 1
                      ? "text-warning"
                      : "text-success")
                  }
                >
                  {formatCurrency(productorder.unitary_price_sell)}
                </td>
                <td className="text-end">{productorder.quantity}</td>
                <td className="text-end d-none d-lg-table-cell">
                  {formatCurrency(
                    productorder.quantity * productorder.unitary_price_sell
                  )}
                </td>
                <td style={{ width: "80px" }}>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      handleShow(productorder);
                    }}
                    title={t("Edit inventory entry")}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    type="button"
                    variant="outline-danger"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      destroyProductOrder(productorder);
                    }}
                    title={t("Remove inventory entry")}
                  >
                    <i className="bi bi-x-square"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default InventoryList;
