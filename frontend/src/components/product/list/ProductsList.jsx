import { Button, Image, Table } from "react-bootstrap";
import { destroyProduct, handleShow } from "../../modals/ModalFormProduct";
import { formatCurrency, removeAccents } from "../../../utils";

import React from "react";
import { handleShow as handleShowInventory } from "../../modals/ModalFormInventory";
import { useAppSelector } from "../../../hooks";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductsList = ({ filter }) => {
  const { t } = useTranslation();
  const products = useAppSelector((state) => state.products);
  const cleanFilter = removeAccents(filter.toLowerCase());
  const history = useHistory();

  return (
    <Table striped bordered hover size="sm" className="px-lg-5">
      <caption className="bg-secondary text-center text-uppercase fs-4 fw-bold text-light p-0">
        {t("Products List")}
      </caption>
      <thead>
        <tr>
          <th className="text-center"></th>
          <th className="text-center d-none d-lg-table-cell"></th>
          <th className="text-center">{t("Name")}</th>
          <th className="text-center">{t("Unitary Price (" + t("$") + ")")}</th>
          <th className="text-center d-none d-lg-table-cell">
            {t("Stack Size")}
          </th>
          <th className="text-center d-none d-lg-table-cell">
            {t("Inventory")}
          </th>
          <th className="text-center"></th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products
            .filter((product) => {
              return removeAccents(product.name.toLowerCase()).includes(
                cleanFilter
              );
            })
            .map((product, index) => (
              <tr key={product.id}>
                <td style={{ width: "35px" }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      history.push("/product/" + product.id);
                    }}
                    title={t("See details")}
                  >
                    <i className="bi bi-three-dots"></i>
                  </Button>
                </td>
                <td className="text-center d-none d-lg-table-cell">
                  <Image
                    src={product.image}
                    rounded
                    style={{ width: "50px", maxHeight: "50px" }}
                    className="m-1"
                  />
                </td>
                <td>{product.name}</td>
                <td className="text-end">
                  {formatCurrency(product.unitary_price)}
                </td>
                <td className="text-end d-none d-lg-table-cell">
                  {product.multiplier}
                </td>
                <td className="text-end d-none d-lg-table-cell">
                  {product.remain}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="ms-1 border-0"
                    onClick={() => {
                      handleShowInventory({
                        id: 0,
                        quantity: 0,
                        product: product.id,
                      });
                    }}
                    title={t("Add inventory")}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </Button>
                </td>
                <td style={{ width: "80px" }}>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      handleShow(product);
                    }}
                    title={t("Edit product")}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    type="button"
                    variant="outline-danger"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      destroyProduct(product);
                    }}
                    title={t("Remove product")}
                  >
                    <i className="bi bi-x-square"></i>
                  </Button>
                </td>
              </tr>
            ))}
      </tbody>
    </Table>
  );
};

export default ProductsList;
