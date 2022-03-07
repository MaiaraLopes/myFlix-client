import React, { useState } from "react";
import { Card, CardGroup, Button, Form } from "react-bootstrap";
import axios from "axios";

export function ProfileView({ oldUserData }) {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthdate, setNewBirthdate] = useState("");

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username: </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password: </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email: </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthdate: </Form.Label>{" "}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
