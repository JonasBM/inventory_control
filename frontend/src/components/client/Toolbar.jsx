import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

import React from "react";
import { handleShow } from "components/modals/ModalFormClient";
import { useTranslation } from "react-i18next";

const Toolbar = ({ bindFilter, resetFilter }) => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col xs="auto">
        <Button
          variant="primary"
          size="sm"
          className="m-2"
          onClick={() => {
            handleShow();
          }}
          title={t("New client")}
        >
          {t("Add")} <i className="bi bi-plus-lg ms-1"></i>
        </Button>
      </Col>
      <Col xs="auto">
        <InputGroup className="m-2" size="sm">
          <InputGroup.Text id="filterclient">{t("Filter")}</InputGroup.Text>
          <FormControl
            placeholder={t("Filter client")}
            aria-label={t("Filter")}
            aria-describedby="filterclient"
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
