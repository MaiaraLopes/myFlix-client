import React from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import "../../index.scss";
import PropTypes from "prop-types";

export class DirectorView extends React.Component {
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
              <div className="director-name">
                <span className="label">Name: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="director-bio">
                <span className="label">Bio: </span>
                <span className="value">{movie.Director.Bio}</span>
              </div>
              <Button
                className="custom-btn-2 mt-2"
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

DirectorView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
