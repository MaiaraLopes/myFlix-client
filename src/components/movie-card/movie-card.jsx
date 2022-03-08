import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "../../index.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieCard extends React.Component {
  render() {
    const { movie, userData, updateUser } = this.props;

    let isFavorite = userData.FavoriteMovies.includes(movie._id);
    let token = localStorage.getItem("token");

    addFavorite = () => {
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
            {isFavorite ? (
              <Button
                variant="custom"
                className="float-right custom-btn-2"
                onClick={() => {
                  addFavorite();
                }}
              >
                Add
              </Button>
            ) : (
              <Button
                variant="custom"
                className="float-right custom-btn-2"
                onClick={() => {
                  deleteFavorite();
                }}
              >
                Remove
              </Button>
            )}
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func,
};
