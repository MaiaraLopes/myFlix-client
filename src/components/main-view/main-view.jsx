import React from 'react';
import avios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import axios from 'axios';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        }
    }
    
    componentDidMount() {
        axios.get('https://myflix-ml.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data.
            });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    
    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
            this.setSelectedMovie(newSelectedMovie);
        }}/>;

        if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;

        return (
            <div className='main-view'>
                {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
            </div>
        );
    }
}

export default MainView;