import React from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import "../../index.scss";

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
              <div className="movie-director">
                <span className="label">Name: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="director-bio">
                <span className="label">Bio:</span>
                <span className="value">{movie.Director.Bio}</span>
              </div>
              <Button
                className="custom-btn-2"
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
