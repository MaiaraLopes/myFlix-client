import React, { useState } from "react";
import { Form, Button, Card, CardGroup } from "react-bootstrap";
import "../../index.scss";

export function RegistrationView(props) {
  const [newUsername, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleRegistrationBtn = (e) => {
    e.preventDefault();
    props.toggleRegistrationView(false);
  };

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Card.Title>Please register here</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                value={newUsername}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Password: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Email: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a valid email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Birthdate: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              className="mt-3 custom-btn"
              variant="custom"
              type="submit"
              onClick={handleRegistrationBtn}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
