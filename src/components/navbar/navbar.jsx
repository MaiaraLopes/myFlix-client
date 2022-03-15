import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export function Navbar({ user, onLoggedOut }) {
  let token = localStorage.getItem("token");

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Nav className="me-auto">
          {!token ? <Nav.Link href="/">Sign in</Nav.Link> : null}
          {!token ? <Nav.Link href={"/register"}>Register</Nav.Link> : null}
          {!token ? null : <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
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
    </Navbar>
  );
}

Navbar.propTypes = {
  user: PropTypes.string,
  onLoggedOut: PropTypes.func,
};
