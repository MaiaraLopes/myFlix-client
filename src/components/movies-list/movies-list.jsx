import React from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";

import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, userData, updateUser } = props;
  //I don't know how to pass the updateUser props here
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movie.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }
  if (!movies) return <div className="main-view" />;

  return filteredMovies.map((m) => (
    <Col md={3} key={m._id}>
      <MovieCard
        movie={m}
        userData={userData}
        updateUser={(newUserData) => this.updateUser(newUserData)}
      />
    </Col>
  ));
}

export default connect(mapStateToProps)(MoviesList);
