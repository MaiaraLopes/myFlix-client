import React from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "../../index.scss";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Navbar } from "../navbar/navbar";
import { ProfileView } from "../profile-view/profile-view";

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

  onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  };

  render() {
    const { movies, user, openRegistrationView } = this.state;

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

    return (
      <Router>
        <Navbar user={user} onLoggedOut={this.onLoggedOut} />

        <Row className="main-view justify-content-md-center mt-4 mb-4">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col md={6}>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map((m) => (
                <Col md={3} key={m._id} className="card-col">
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${user}`}
            render={() => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:MovieID"
            render={({ match, history }) => {
              if (!user) return;
              <Col md={6}>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.MovieID)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="movies/Director/:Name"
            render={({ match, history }) => {
              if (!user) return;
              <Col md={6}>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.Name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genre/:name"
            render={({ match }) => {
              if (!user) return;
              <Col md={6}>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/${user}`}
            render={({ match, history }) => {
              if (!user) return;
              <Col md={6}>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>;
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

export default MainView;
