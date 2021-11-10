import { Error, required as requiredRFF } from "./formUtils";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import React, { useRef } from "react";

import { Field } from "react-final-form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const FormControlAdapter = ({ refRelay, input, meta, ...rest }) => {
  return <Form.Control {...input} {...rest} ref={refRelay} />;
};

const FormControlGroupAdapter = ({ refRelay, input, meta, ...rest }) => {
  return <FormControl {...input} {...rest} ref={refRelay} />;
};

export const InputGroupForm = ({
  PrefixComponent = () => null,
  SufixComponent = () => null,
  className,
  classNameGroup,
  id,
  label,
  name,
  validate,
  required,
  button,
  ...rest
}) => {
  const inputRef = useRef();
  if (required && !validate) {
    validate = requiredRFF;
  }
  return (
    <InputGroup className={classNameGroup}>
      <PrefixComponent />
      <Field
        component={FormControlGroupAdapter}
        type="text"
        {...rest}
        className={className}
        name={name}
        refRelay={inputRef}
        validate={validate}
      />
      <SufixComponent />
      <Error name={name} innerRefs={[inputRef]} />
    </InputGroup>
  );
};

export const InputForm = ({
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
  if (required && !validate) {
    validate = requiredRFF;
  }
  return (
    <Form.Group controlId={id} className={classNameGroup}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
      <Field
        component={FormControlAdapter}
        type="text"
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

export const InputFormFloat = ({
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
    <FloatingLabel controlId={id} label={label} className={classNameGroup}>
      <Field
        component={FormControlAdapter}
        type="text"
        {...rest}
        className={className}
        name={name}
        refRelay={inputRef}
        validate={validate}
      />
      <Error name={name} innerRefs={[inputRef]} />
    </FloatingLabel>
  );
};
