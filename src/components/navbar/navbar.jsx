import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function Navbar({ user, onLoggedOut }) {
  let token = localStorage.getItem("token");

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Nav className="me-auto">
          {!token ? <Nav.Link href="#">Sign in</Nav.Link> : null}
          <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
          <Nav.Link href="#">Favorites</Nav.Link>
          {token ? (
            <Button
              className="custom-btn-2"
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
