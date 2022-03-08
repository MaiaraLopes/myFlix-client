import React, { useState } from "react";
import { Card, CardGroup, Button, Form } from "react-bootstrap";
import axios from "axios";

export function ProfileView({
  oldUserData,
  onBackClick,
  updateUser,
  onLoggedOut,
}) {
  const [newUsername, setNewUsername] = useState(oldUserData.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(oldUserData.Email);
  const [newBirthdate, setNewBirthdate] = useState(
    oldUserData.Birthdate.substring(0, 10)
  );

  let token = localStorage.getItem("token");

  const handleUpdateBtn = () => {
    axios
      .put(
        `https://myflix-ml.herokuapp.com/users/${oldUserData.Username}`,
        {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthdate: newBirthdate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        updateUser(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error updating user");
      });
  };

  const handleDeleteBtn = () => {
    axios
      .delete(
        `https://myflix-ml.herokuapp.com/users/${oldUserData.Username}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        onLoggedOut(data);
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error deleting user");
      });
  };

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label className="mt-2">Username: </Form.Label>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Password: </Form.Label>
              <Form.Control
                type="text"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Email: </Form.Label>
              <Form.Control
                type="text"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Birthdate: </Form.Label>
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

            <Button
              className="mt-3 ml-2 custom-btn"
              variant="custom"
              onClick={() => {
                handleUpdateBtn();
              }}
            >
              Update
            </Button>

            <Button
              className="mt-3 ml-2 custom-btn-2"
              variant="custom"
              onClick={() => {
                handleDeleteBtn();
              }}
            >
              Delete
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
