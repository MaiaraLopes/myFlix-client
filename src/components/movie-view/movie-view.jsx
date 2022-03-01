import React from "react";
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
import "../../index.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="mt-3 mb-5">
        <Col>
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
        </Col>
      </Row>
    );
  }
}
