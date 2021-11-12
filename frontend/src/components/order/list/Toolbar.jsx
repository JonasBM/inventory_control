import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

import React from "react";
import { handleShow } from "components/modals/ModalFormOrder";
import { useAppSelector } from "hooks";
import { useTranslation } from "react-i18next";

const Toolbar = ({ bindFilter, resetFilter }) => {
  const { t } = useTranslation();
  const authUser = useAppSelector((state) => state.accounts.auth.user);

  return (
    <Row>
      <Col xs="auto">
        <Button
          variant="primary"
          size="sm"
          className="m-2"
          onClick={() => {
            handleShow({
              id: 0,
              seller: authUser?.id ? authUser.id : 0,
              client: 0,
              opened: true,
            });
          }}
          title={t("New order")}
        >
          {t("Add")} <i className="bi bi-plus-lg ms-1"></i>
        </Button>
      </Col>
      <Col xs="auto">
        <InputGroup className="m-2" size="sm">
          <InputGroup.Text id="filterorder">{t("Filter")}</InputGroup.Text>
          <FormControl
            placeholder={t("Filter order")}
            aria-label={t("Filter")}
            aria-describedby="filterorder"
            {...bindFilter}
          />
          <Button
            variant="secondary"
            onClick={resetFilter}
            title={t("Reload data")}
          >
            <i className="bi bi-arrow-repeat" />
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default Toolbar;
