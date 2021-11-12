import {
  Error,
  required as requiredRFF,
} from "Components/Common/Forms/formUtils";
import React, { useRef } from "react";

import { Field } from "react-final-form";
import { Form } from "react-bootstrap";

const FormSelectAdapter = ({ refRelay, input, meta, ...rest }) => {
  return <Form.Select {...input} {...rest} ref={refRelay} />;
};

export const SelectForm = ({
  className,
  classNameGroup,
  classNameLabel,
  id,
  label,
  name,
  validate,
  required,
  ...rest
}) => {
  const inputRef = useRef();
  if (required && !validate) {
    validate = requiredRFF;
  }
  return (
    <Form.Group controlId={id} className={classNameGroup}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
      <Field
        component={FormSelectAdapter}
        {...rest}
        type="select"
        className={className}
        name={name}
        refRelay={inputRef}
        validate={validate}
      />
      <Error name={name} innerRefs={[inputRef]} />
    </Form.Group>
  );
};
