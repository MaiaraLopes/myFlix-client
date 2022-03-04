import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function Navbar({ user }) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#">Sign in</Nav.Link>
          <Nav.Link href="#">Register</Nav.Link>
          <Button>Sign out</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
