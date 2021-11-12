import React, { Fragment } from "react";

import { Row } from "react-bootstrap";
import { SelectForm } from "components/common/forms/Select";
import { useAppSelector } from "hooks";
import { useTranslation } from "react-i18next";

const FormOrder = () => {
  const { t } = useTranslation();
  const sellers = useAppSelector((state) => state.sellers);
  const clients = useAppSelector((state) => state.clients);

  return (
    <Fragment>
      <Row className="mb-2">
        <SelectForm
          name="seller"
          size="sm"
          classNameLabel="mb-0"
          label={t("Seller") + ":"}
          placeholder={t("Seller")}
          required
        >
          <option value="">---------</option>
          {sellers.map((seller, index) => (
            <option key={seller.id} value={seller.id}>
              {seller.first_name} {seller.last_name}
            </option>
          ))}
        </SelectForm>
      </Row>

      <Row className="mb-2">
        <SelectForm
          name="client"
          size="sm"
          classNameLabel="mb-0"
          label={t("Client") + ":"}
          placeholder={t("Client")}
          required
        >
          <option value="">---------</option>
          {clients.map((client, index) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </SelectForm>
      </Row>
    </Fragment>
  );
};

export default FormOrder;
