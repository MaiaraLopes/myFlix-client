import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function MyNavBar({ user, onLoggedOut }) {
  let token = localStorage.getItem("token");

  return (
    <MyNavBar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Nav className="me-auto">
          {!token ? <Link to="/">Sign in</Link> : null}
          {!token ? <Link to={"/register"}>Register</Link> : null}
          {!token ? null : <Link to={`/users/${user}`}>{user}</Link>}
          {token ? (
            <Button
              className="custom-btn-2"
              onClick={() => {
                onLoggedOut();
                window.open("/", "_self");
              }}
            >
              Sign out
            </Button>
          ) : null}
        </Nav>
      </Container>
    </MyNavBar>
  );
}

Navbar.propTypes = {
  user: PropTypes.string,
  onLoggedOut: PropTypes.func,
};
