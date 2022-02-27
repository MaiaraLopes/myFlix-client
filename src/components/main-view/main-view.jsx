import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {

    constructor() {
        super();
//Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            openRegistrationView: null
        }
    }
    
    componentDidMount() {
        axios.get('https://myflix-ml.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
            });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    toggleRegistrationView = (value) => {
        this.setState({
            openRegistrationView: value
        });
    }

    render() {
        const { movies, selectedMovie, user, openRegistrationView } = this.state;

        if (openRegistrationView) return <RegistrationView toggleRegistrationView={this.toggleRegistrationView}/>;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegistrationView={this.toggleRegistrationView}/>;

        if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
            this.setSelectedMovie(newSelectedMovie);
        }} />;
        
        if (movies.length === 0) return <div className='main-view' />;

        return (
            <div className='main-view'>
                {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />)}
            </div>
        );
    }
}

export default MainView;