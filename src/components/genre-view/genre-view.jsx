import React from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import "../../index.scss";

export class GenreView extends React.Component {
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
              <div className="movie-genre">
                <span className="label">Name: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Genre.Description}</span>
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
