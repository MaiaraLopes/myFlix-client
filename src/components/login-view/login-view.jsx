import React, { useState } from "react";
import { Form, Button, Card, CardGroup } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import "../../index.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    //Send a request to the server for authentication
    axios
      .post(
        `https://myflix-ml.herokuapp.com/login?Username=${username}&Password=${password}`,
        {}
      )
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label className="mt-2">Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="mt-2">Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="mt-3 mr-2 custom-btn"
              variant="custom"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
