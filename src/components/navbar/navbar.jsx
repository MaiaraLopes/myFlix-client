import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function Navbar({ user, onLoggedOut }) {
  let token = localStorage.getItem("token");

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Nav className="me-auto">
          {!token ? <Button className="custom-btn-2">Sign in</Button> : null}
          <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
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
