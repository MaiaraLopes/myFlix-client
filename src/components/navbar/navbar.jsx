import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function Navbar({ onLoggedOut }) {
  let token = localStorage("token");

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Nav className="me-auto">
          {!token ? <Nav.Link href="#">Sign in</Nav.Link> : null}
          <Nav.Link href="#">Register</Nav.Link>
          {token ? (
            <Button
              onClick={() => {
                onLoggedOut();
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
