import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";
import "../../index.scss";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, userData, updateUser } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }
  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      <Row>
        {filteredMovies.map((m) => (
          <Col className="card-col" md={3} key={m._id}>
            <MovieCard
              movie={m}
              userData={userData}
              updateUser={(newUserData) => updateUser(newUserData)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
