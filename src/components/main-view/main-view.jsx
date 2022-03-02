import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "../../index.scss";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

class MainView extends React.Component {
  constructor() {
    super();
    //Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      openRegistrationView: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://myflix-ml.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://myflix-ml.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleRegistrationView = (value) => {
    this.setState({
      openRegistrationView: value,
    });
  };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, openRegistrationView } = this.state;

    if (openRegistrationView)
      return (
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <RegistrationView
              toggleRegistrationView={this.toggleRegistrationView}
            />
          </Col>
        </Row>
      );

    if (!user)
      return (
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <LoginView
              onLoggedIn={(user) => this.onLoggedIn(user)}
              toggleRegistrationView={this.toggleRegistrationView}
            />
          </Col>
        </Row>
      );

    if (movies.length === 0) return <div className="main-view" />;

    <button
      onClick={() => {
        this.onLoggedOut();
      }}
    >
      Logout
    </button>;

    return (
      <Row className="main-view justify-content-md-center mt-4 mb-4">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col className="card-col" lg={3} md={4} sm={6} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}

export default MainView;
