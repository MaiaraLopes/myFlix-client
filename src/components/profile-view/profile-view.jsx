import React, { useState } from "react";
import { Card, CardGroup, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { indexOf } from "lodash";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";

export function ProfileView({
  oldUserData,
  onBackClick,
  updateUser,
  onLoggedOut,
  favMovies,
}) {
  const [newUsername, setNewUsername] = useState(oldUserData.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(oldUserData.Email);
  const [newBirthdate, setNewBirthdate] = useState(
    oldUserData.Birthdate.substring(0, 10)
  );

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
    if (!newPassword) {
      setPasswordErr("Password required");
      isReq = false;
    } else if (newPassword.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    if (!newEmail) {
      setEmailErr("Email required");
    } else if (!indexOf("@ === -1")) {
      setEmailErr("Enter a valid email");
      isReq = false;
    }
    if (!newBirthdate) {
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

  let token = localStorage.getItem("token");

  const handleUpdateBtn = () => {
    const isReq = validate();
    if (isReq) {
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
    }
  };

  const handleDeleteBtn = () => {
    axios
      .delete(
        `https://myflix-ml.herokuapp.com/users/${oldUserData.Username}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        onLoggedOut();
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
              {usernameErr && <p>{usernameErr}</p>}
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
              {passwordErr && <p>{passwordErr}</p>}
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
              {emailErr && <p>{emailErr}</p>}
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
              {birthdateErr && <p>{birthdateErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Favorite Movies</Form.Label>
              <Row>
                {favMovies.map((m) => (
                  <Col key={m._id} md={3}>
                    <MovieCard
                      movie={m}
                      userData={oldUserData}
                      updateUser={updateUser}
                    />
                  </Col>
                ))}
              </Row>
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

ProfileView.propTypes = {
  oldUserData: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    favMovies: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};
