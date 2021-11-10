import { Button, Table } from "react-bootstrap";
import { destroyClient, handleShow } from "../modals/ModalFormClient";

import React from "react";
import { removeAccents } from "../../utils";
import { useAppSelector } from "../../hooks";
import { useTranslation } from "react-i18next";

const ClientsList = ({ filter }) => {
  const { t } = useTranslation();
  const clients = useAppSelector((state) => state.clients);
  const cleanFilter = removeAccents(filter.toLowerCase());

  return (
    <Table striped bordered hover size="sm" className="px-lg-5">
      <caption className="bg-secondary text-center text-uppercase fs-4 fw-bold text-light p-0">
        {t("Clients List")}
      </caption>
      <thead>
        <tr>
          <th className="text-center">{t("Client Name")}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clients &&
          clients
            .filter((client) => {
              return removeAccents(client.name.toLowerCase()).includes(
                cleanFilter
              );
            })
            .map((client, index) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td style={{ width: "80px" }}>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      handleShow(client);
                    }}
                    title={t("Edit client")}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    type="button"
                    variant="outline-danger"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      destroyClient(client);
                    }}
                    title={t("Remove client")}
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

export default ClientsList;
