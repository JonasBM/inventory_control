import {
  Error,
  required as requiredRFF,
} from "components/common/forms/formUtils";
import React, { useRef } from "react";

import { Field } from "react-final-form";
import { Form } from "react-bootstrap";

const FormCheckboxAdapter = ({ refRelay, input, meta, ...rest }) => {
  return <Form.Check {...input} {...rest} ref={refRelay} />;
};

export const CheckboxForm = ({
  className,
  classNameGroup,
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
      <Field
        component={FormCheckboxAdapter}
        type="checkbox"
        label={label}
        {...rest}
        className={className}
        name={name}
        refRelay={inputRef}
        validate={validate}
      />
      <Error name={name} innerRefs={[inputRef]} />
    </Form.Group>
  );
};
