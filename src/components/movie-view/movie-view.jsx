import React from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import "../../index.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <CardGroup>
        <Card>
          <Card.Body>
            <div className="movie-view">
              <div className="movie-poster">
                <img
                  className="mx-auto d-block movie-image"
                  src={movie.ImagePath}
                />
              </div>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <Link to={`/movies/Director/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>
              <Link to={`/movies/Genre/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>
              <Button
                className="mt-3 custom-btn-2"
                variant="custom"
                onClick={() => {
                  onBackClick(null);
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

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
