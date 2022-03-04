import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function Navbar({ user }) {
  const onLoggedOut = () => {
    return localStorage.clear();
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">myFlix</Navbar.Brand>
        <Nav className="me-auto">
          {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
          {isAuth() && (
            <Button
              variant="link"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Button>
          )}
          {!isAuth() && <Nav.Link href="/">Sing in</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sing up</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}
