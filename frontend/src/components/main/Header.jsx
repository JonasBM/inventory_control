import {
  Button,
  ButtonGroup,
  Container,
  Nav,
  Navbar,
  ToggleButton,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { UserRetrieveUpdateAction } from "../../actions/accounts/user";
import i18next from "i18next";
import moment from "moment";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const changeLanguage = (lng) => {
  moment.locale(lng);
  i18next.changeLanguage(lng);
};

const LoginButton = () => {
  const { t } = useTranslation();
  return (
    <Link to="/order" className="btn btn-success mx-2">
      {t("Login")}
    </Link>
  );
};

const LogoutButton = () => {
  const { t } = useTranslation();
  return (
    <Link to="/logout" className="btn btn-danger mx-2">
      {t("Logout")}
    </Link>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const auth = useAppSelector((state) => state.accounts.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserRetrieveUpdateAction.list());
  }, [dispatch]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="py-1"
    >
      <Navbar.Brand
        as={Link}
        to="/"
        className="d-inline-flex align-items-center mx-lg-5 ms-2"
      >
        {t("Inventory Control")}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Container fluid>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/client">
              {t("Clients")}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/product">
              {t("Products")}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/order">
              {t("Orders")}
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/admin">
              {t("Administration")}
            </Nav.Link> */}
          </Nav>
          <ButtonGroup size="sm">
            <ToggleButton
              type="radio"
              variant="outline-info"
              name="radio"
              checked={i18next.language === "en"}
              onClick={(e) => {
                changeLanguage("en");
              }}
            >
              EN
            </ToggleButton>
            <ToggleButton
              type="radio"
              variant="outline-info"
              name="radio"
              checked={i18next.language === "pt-BR"}
              onClick={() => {
                changeLanguage("pt-BR");
              }}
            >
              BR
            </ToggleButton>
          </ButtonGroup>
          {auth.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
