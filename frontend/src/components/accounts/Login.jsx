import { Button, Col, Container, Form as FormBS, Row } from "react-bootstrap";

import { Form } from "react-final-form";
import { InputFormFloat } from "../common/forms/Input";
import React from "react";
import { authLogin } from "../../actions/accounts/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const onSubmit = (values) => {
    dispatch(authLogin(values)).then((res) => {
      if (res && res.user?.is_active) {
        history.push("/order/");
      }
    });
  };
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="m-auto pb-5">
          <Row>
            <Col lg="3" xl="3" className="text-center mx-auto">
              <Form
                initialValues={{ username: "", password: "" }}
                onSubmit={onSubmit}
                render={({ handleSubmit, submitFailed }) => (
                  <FormBS
                    onSubmit={handleSubmit}
                    className={
                      "needs-validation" + (submitFailed && " was-validated")
                    }
                    noValidate
                  >
                    <h4 className="font-weight-normal">
                      {t("Restricted access")}
                    </h4>
                    <InputFormFloat
                      name="username"
                      label={t("Username") + ":"}
                      placeholder={t("Username")}
                      type="text"
                      className="m-1"
                      classNameGroup="mx-1"
                      required
                      minLength="3"
                      autoFocus
                    />
                    <InputFormFloat
                      name="password"
                      label={t("Password") + ":"}
                      placeholder={t("Password")}
                      type="password"
                      className="m-1"
                      classNameGroup="mx-1"
                      required
                    />
                    <Button variant="dark" className="m-1" type="submit">
                      {t("Login")}
                    </Button>
                  </FormBS>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
