import { indexOf } from "lodash";
import React, { useState } from "react";
import { Form, Button, Card, CardGroup } from "react-bootstrap";
import "../../index.scss";
import axios from "axios";

export function RegistrationView() {
  const [newUsername, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdateErr, setBirthdateErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!newUsername) {
      setUsernameErr("Username required");
      isReq = false;
    } else if (newUsername.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email required");
      isReq = false;
    } else if (!indexOf("@" === -1)) {
      setEmailErr("Enter a valid email");
      isReq = false;
    }
    if (!birthdate) {
      setBirthdateErr("Birthdate required");
      isReq = false;
    }
    if (isReq) {
      setUsernameErr("");
      setPasswordErr("");
      setEmailErr("");
      setBirthdateErr("");
    }
    return isReq;
  };

  const handleRegistrationBtn = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      let token = localStorage.getItem("token");
      axios
        .post(
          "https://myflix-ml.herokuapp.com/users",
          {
            Username: newUsername,
            Password: password,
            Email: email,
            Birthdate: birthdate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log("Error registering user");
        });
    }
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
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Password: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordErr && <p>{passwordErr}</p>}
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
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Birthdate: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your birthdate (dd/mm/yyyy)"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              {birthdateErr && <p>{birthdateErr}</p>}
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
