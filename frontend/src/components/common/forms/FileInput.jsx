import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Error, required as requiredRFF } from "./formUtils";
import React, { useEffect, useRef, useState } from "react";

import { Field } from "react-final-form";
import { useForm } from "react-final-form";
import { useTranslation } from "react-i18next";

const ImagePreview = ({ imagePreview, setImagePreview, name }) => {
  const { t } = useTranslation();
  const form = useForm();
  const imageValue = form.getFieldState(name)?.value;

  useEffect(() => {
    if (typeof imageValue === "string") {
      setImagePreview(imageValue);
    }
  }, [imageValue, setImagePreview]);

  if (imagePreview) {
    return (
      <>
        <Row>
          <Image
            src={imagePreview}
            rounded
            style={{ width: "200px", maxHeight: "200px" }}
            className="m-1"
          />
        </Row>
        <Row>
          <Col>
            <Button
              variant="danger"
              className="fw-bold"
              size="sm"
              onClick={() => {
                form.change(name, "");
              }}
              title={t("Remove image")}
            >
              {t("Remove image")} <i className="bi bi-trash" />
            </Button>
          </Col>
        </Row>
      </>
    );
  } else {
    return <h5>{t("No image to preview")}</h5>;
  }
};

export const InputImagePreview = ({
  className,
  classNameGroup,
  classNameLabel,
  id,
  label,
  name,
  validate,
  required,
  button,
  ...rest
}) => {
  const inputRef = useRef();
  const form = useForm();
  const [imagePreview, setImagePreview] = useState(form.getFieldState(name));

  if (required && !validate) {
    validate = requiredRFF;
  }

  return (
    <Form.Group controlId={id} className={classNameGroup}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
      <Field name={name} validate={validate}>
        {({ input: { value, onChange, ...input } }) => (
          <Form.Control
            {...input}
            {...rest}
            type="file"
            className={className}
            ref={inputRef}
            onChange={({ target }) => {
              if (target.files) {
                onChange(target.files[0]);
                if (target.files[0] !== undefined) {
                  setImagePreview(URL.createObjectURL(target.files[0]));
                } else {
                  setImagePreview("");
                }
              }
            }}
          />
        )}
      </Field>
      <ImagePreview
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        name={name}
      />
      <Error name={name} innerRefs={[inputRef]} />
    </Form.Group>
  );
};
