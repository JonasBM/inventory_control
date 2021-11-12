import { Button, Fade, Table } from "react-bootstrap";
import React, { useState } from "react";
import {
  destroyInventory,
  handleShow,
} from "Components/Modals/ModalFormInventory";

import moment from "moment";
import { useAppSelector } from "hooks";
import { useTranslation } from "react-i18next";

const InventoryList = ({ product_id }) => {
  const { t } = useTranslation();
  const inventory = useAppSelector((state) => state.inventory);
  const [open, setOpen] = useState(true);
  return (
    <Table striped bordered hover size="sm" className="px-lg-5">
      <caption
        className={
          "bg-secondary text-center text-uppercase fs-4 fw-bold text-light p-0" +
          (open ? " " : " border-bottom border-2 border-dark")
        }
        role="button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {t("Inventory List")} (total=
        {inventory &&
          inventory.reduce((a, b) => ({ quantity: a.quantity + b.quantity }), {
            quantity: 0,
          }).quantity}
        )
        <i
          className={
            "float-end me-2" + (open ? " bi bi-caret-up" : " bi bi-caret-down")
          }
        ></i>
      </caption>
      <Fade in={open}>
        <thead className={open ? "" : "d-none"}>
          <tr>
            <th className="text-center">{t("Date")}</th>
            <th className="text-center">{t("Quantity")}</th>
            <th></th>
          </tr>
        </thead>
      </Fade>
      <Fade in={open}>
        <tbody className={open ? "" : "d-none"}>
          {inventory &&
            inventory.map((inventoryEntry, index) => (
              <tr key={inventoryEntry.id}>
                <td>
                  {inventoryEntry &&
                    moment(inventoryEntry.date).format("L") +
                      " " +
                      t("at") +
                      " " +
                      moment(inventoryEntry.date).format("HH:MM")}
                </td>
                <td className="text-end">{inventoryEntry.quantity}</td>
                <td style={{ width: "80px" }}>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="border-0"
                    onClick={() => {
                      handleShow(inventoryEntry);
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
                      destroyInventory(inventoryEntry);
                    }}
                    title={t("Remove inventory entry")}
                  >
                    <i className="bi bi-x-square"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Fade>
    </Table>
  );
};

export default InventoryList;
