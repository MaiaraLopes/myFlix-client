import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "../../index.scss";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

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
            <Button variant="custom" className="float-right custom-btn-2">
              Add
            </Button>
            <Button variant="custom" className="float-right custom-btn-2">
              Remove
            </Button>
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
