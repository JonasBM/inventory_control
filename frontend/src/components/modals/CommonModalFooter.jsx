import React, { Fragment } from "react";

import { Button } from "react-bootstrap";
import { CheckboxForm } from "../common/forms/Checkbox";
import { useTranslation } from "react-i18next";

const CommonModalFooter = ({
  isDisabled = false,
  canDelete = false,
  canCopy = false,
  onDelete,
  form,
  handleClose,
}) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {canDelete && (
        <Button
          variant="danger"
          className="me-auto fw-bold"
          onClick={onDelete}
          disabled={isDisabled}
        >
          {t("Remove")}
        </Button>
      )}
      {form && (
        <Button
          variant="secondary"
          className="fw-bold"
          onClick={() => {
            form.reset();
          }}
          title={t("Reload data")}
          disabled={isDisabled}
        >
          <i className="bi bi-arrow-repeat" />
        </Button>
      )}

      <Button
        variant="secondary"
        className="fw-bold"
        onClick={() => {
          handleClose();
        }}
      >
        {t("Close")}
      </Button>

      <Button
        variant="primary"
        className="fw-bold"
        disabled={isDisabled}
        type="submit"
      >
        {t("Save")}
      </Button>

      {canCopy && (
        <CheckboxForm
          name="createnew"
          label={t("Create new")}
          tooltip={t("Save as new")}
          disabled={isDisabled}
        />
      )}
    </Fragment>
  );
};

export default CommonModalFooter;
