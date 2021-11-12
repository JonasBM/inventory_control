import { Button, Table } from "react-bootstrap";
import { destroyOrder, handleShow } from "components/modals/ModalFormOrder";
import { formatCurrency, removeAccents } from "utils";

import React from "react";
import moment from "moment";
import { useAppSelector } from "hooks";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrdersList = ({ filter, openOrders }) => {
  const { t } = useTranslation();
  const orders = useAppSelector((state) => state.orders);
  const sellers = useAppSelector((state) => state.sellers);
  const clients = useAppSelector((state) => state.clients);
  const cleanFilter = filter.toString();
  const cleanerFilter = removeAccents(cleanFilter.toLowerCase());
  const history = useHistory();

  let title = t("Orders List");
  let filterOrders = () => true;
  if (openOrders === true) {
    title = t("Open Orders List");
    filterOrders = (el) => el.opened;
  } else if (openOrders === false) {
    title = t("Closed Orders List");
    filterOrders = (el) => !el.opened;
  }

  return (
    <Table striped bordered hover size="sm" className="px-lg-5">
      <caption className="bg-secondary text-center text-uppercase fs-4 fw-bold text-light p-0">
        {title}
      </caption>
      <thead>
        <tr>
          <th className="text-center"></th>
          <th className="text-center">{t("Order")}</th>
          <th className="text-center">{t("Seller")}</th>
          <th className="text-center">{t("Client")}</th>
          <th className="text-center">{t("Date")}</th>
          <th className="text-center">{t("Total")}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders
            .filter(filterOrders)
            .filter((order) => {
              const seller = sellers.find((e) => e.id === order.seller);
              const client = clients.find((e) => e.id === order.client);
              return (
                order.id.toString().includes(cleanFilter) |
                removeAccents(seller.first_name.toLowerCase()).includes(
                  cleanerFilter
                ) |
                removeAccents(seller.last_name.toLowerCase()).includes(
                  cleanerFilter
                ) |
                removeAccents(client.name.toLowerCase()).includes(cleanerFilter)
              );
            })
            .map((order, index) => {
              const seller = sellers.find((e) => e.id === order.seller);
              const client = clients.find((e) => e.id === order.client);
              return (
                <tr key={order.id}>
                  <td style={{ width: "35px" }}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        history.push("/order/" + order.id);
                      }}
                      title={t("See details")}
                    >
                      <i className="bi bi-three-dots"></i>
                    </Button>
                  </td>
                  <td className="text-end">#{order.id}</td>
                  <td>
                    {seller && seller.first_name + " " + seller.last_name}
                  </td>
                  <td>{client && client.name}</td>
                  <td className="text-end d-none d-lg-table-cell">
                    {order &&
                      moment(order.date).format("L") +
                        " " +
                        t("at") +
                        " " +
                        moment(order.date).format("HH:MM")}
                  </td>
                  <td className="text-end">{formatCurrency(order.total)}</td>
                  <td style={{ width: "80px" }}>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="border-0"
                      onClick={() => {
                        handleShow(order);
                      }}
                      title={t("Edit order")}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      type="button"
                      variant="outline-danger"
                      size="sm"
                      className="border-0"
                      onClick={() => {
                        destroyOrder(order);
                      }}
                      title={t("Remove order")}
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

export default OrdersList;
