import React from "react";
import { Card, CardGroup, Button } from "react-bootstrap";
import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Brithdate: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .Axiosget(`https://myflix-ml.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Brithdate: response.data.Brithdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { user, onBackClick } = this.props;

    return (
      <CardGroup>
        <Card>
          <Card.Body>
            <div className="profile-view">
              <div>
                <span className="label">Username: </span>
                <span className="value">{user.Username}</span>
              </div>
              <div>
                <span className="label">Password: </span>
                <span className="value">{user.Password}</span>
              </div>
              <div>
                <span className="label">Email: </span>
                <span className="value">{user.Email}</span>
              </div>
              <div>
                <span className="label">Birthdate: </span>
                <span className="value">{user.Birthdate}</span>
              </div>
              <div>
                <span className="label">Favorites: </span>
                <span className="value">{user.FavoriteMovies}</span>
              </div>
              <Button
                className="mt-3 custom-btn-2"
                variant="custom"
                onClick={() => {
                  onBackClick();
                }}
              >
                Back
              </Button>
            </div>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
}
