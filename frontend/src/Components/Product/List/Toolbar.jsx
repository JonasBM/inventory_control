import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

import React from "react";
import { handleShow } from "Components/Modals/ModalFormProduct";
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
          title={t("New product")}
        >
          {t("Add")} <i className="bi bi-plus-lg ms-1"></i>
        </Button>
      </Col>
      <Col xs="auto">
        <InputGroup className="m-2" size="sm">
          <InputGroup.Text id="filterproduct">{t("Filter")}</InputGroup.Text>
          <FormControl
            placeholder={t("Filter product")}
            aria-label={t("Filter")}
            aria-describedby="filterproduct"
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
