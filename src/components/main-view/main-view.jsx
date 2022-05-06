import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "../../index.scss";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MyNavBar } from "../navbar/navbar";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { setMovies, setUser, setUserData } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.props.setUser(localStorage.getItem("user"));
      this.props.setUserData(JSON.parse(localStorage.getItem("userData")));
    }
    console.log(this.props.user, "componentDidMount");
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
    this.props.setUserData(authData.user);

    console.log(this.props.user);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    localStorage.setItem("userData", JSON.stringify(authData.user));

    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://myflix-ml.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser(null);
  };

  updateUser(newUserData) {
    localStorage.setItem("user", newUserData.Username);
    localStorage.setItem("userData", JSON.stringify(newUserData));
    this.props.setUser(newUserData.Username);
    this.props.setUserData(newUserData);
  }

  render() {
    const { movies, userData } = this.props;
    const user = localStorage.getItem("user");

    if (movies.length === 0 && user) return <div className="main-view" />;

    return (
      <Router>
        <MyNavBar user={user} onLoggedOut={this.onLoggedOut} />

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
              return (
                <Col className="card-col">
                  <MoviesList
                    movies={movies}
                    userData={userData}
                    updateUser={(newUserData) => this.updateUser(newUserData)}
                  />
                </Col>
              );
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
                  <ProfileView
                    oldUserData={userData}
                    updateUser={(newUserData) => this.updateUser(newUserData)}
                    onBackClick={() => {
                      window.open("/", "_self");
                    }}
                    onLoggedOut={this.onLoggedOut}
                    favMovies={movies.filter((movie) =>
                      userData.FavoriteMovies.includes(movie._id)
                    )}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/movies/:MovieID"
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
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
            path="/movies/Director/:Name"
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col md={8}>
                  <DirectorView
                    movie={movies.find(
                      (m) => m.Director.Name === match.params.Name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/Genre/:Name"
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col md={8}>
                  <GenreView
                    movie={movies.find(
                      (m) => m.Genre.Name === match.params.Name
                    )}
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

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user, userData: state.userData };
};

export default connect(mapStateToProps, { setMovies, setUser, setUserData })(
  MainView
);
