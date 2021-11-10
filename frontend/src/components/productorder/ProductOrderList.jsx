import { Button, Collapse, Fade, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { useAppSelector } from "../../hooks";
import { useTranslation } from "react-i18next";

// import { destroyInventory, handleShow } from "../modals/ModalFormInventory";

const InventoryList = ({ order_id }) => {
  const { t } = useTranslation();
  const productorders = useAppSelector((state) => state.productorders);
  const order = useAppSelector((state) =>
    state.orders.find((el) => el.id.toString() === order_id)
  );
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
      {/* product
    order
    unitary_price_sell
    quantity
    rentability  */}

      <thead>
        <tr>
          <th className="text-center">{t("Product")}</th>
          <th className="text-center">{t("Unitary Price")}</th>
          <th className="text-center">{t("Quantity")}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productorders &&
          productorders.map((productorder, index) => {
            const product = products.find((e) => e.id === productorder.product);
            return (
              <tr key={productorder.id}>
                <td>{product.name}</td>
                <td className="text-end">{productorder.unitary_price_sell}</td>
                <td className="text-end">{productorder.quantity}</td>
                <td style={{ width: "80px" }}>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      // handleShow(inventoryEntry);
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
                      // destroyInventory(inventoryEntry);
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
