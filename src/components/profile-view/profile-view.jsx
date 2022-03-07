import React, { useState } from "react";
import { Card, CardGroup, Button, Form } from "react-bootstrap";

export function ProfileView({ oldUserData, onBackClick }) {
  const [newUsername, setNewUsername] = useState(oldUserData.Username);
  const [newPassword, setNewPassword] = useState(oldUserData.Password);
  const [newEmail, setNewEmail] = useState(oldUserData.Email);
  const [newBirthdate, setNewBirthdate] = useState(oldUserData.Birthdate);

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="text"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="text"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthdate: </Form.Label>
              <Form.Control
                type="text"
                value={newBirthdate}
                onChange={(e) => {
                  setNewBirthdate(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              className="mt-3 custom-btn-2"
              variant="custom"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
