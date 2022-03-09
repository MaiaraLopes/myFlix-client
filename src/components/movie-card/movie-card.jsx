import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "../../index.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieCard extends React.Component {
  addFavorite = () => {
    let token = localStorage.getItem("token");
    const { movie, userData } = this.props;
    axios
      .post(
        `https://myflix-ml.herokuapp.com/users/${userData.Username}/movies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        this.props.updateUser(data);
      });
  };

  deleteFavorite = () => {
    let token = localStorage.getItem("token");
    const { movie, userData } = this.props;
    axios
      .delete(
        `https://myflix-ml.herokuapp.com/users/${userData.Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        {}
      )
      .then((response) => {
        const data = response.data;
        this.props.updateUser(data);
      });
  };

  render() {
    const { movie, userData } = this.props;
    let isFavorite = userData.FavoriteMovies.includes(movie._id);

    return (
      <Card className="card-container">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Link className="text-decoration-none" to={`/movies/${movie._id}`}>
            <Button variant="custom" className="custom-btn">
              Open
            </Button>
          </Link>

          {!isFavorite ? (
            <Button
              variant="custom"
              className="float-right custom-btn-2"
              onClick={() => {
                this.addFavorite();
              }}
            >
              Add
            </Button>
          ) : (
            <Button
              variant="custom"
              className="float-right custom-btn-2"
              onClick={() => {
                this.deleteFavorite();
              }}
            >
              Remove
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  userData: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};
