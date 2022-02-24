import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Toy Story 3', Description: 'Andy Davis, now 17, is leaving for college. Woody, Buzz Lightyear, and the other toys are accidentally donated to a daycare center by Andy\'s mother, and the toys must decide where their loyalties lie.', ImagePath: 'https://upload.wikimedia.org/wikipedia/pt/7/7e/Toy_Story_3.jpg'},
                { _id: 2, Title: 'The Shining', Description: 'The film\'s central character is Jack Torrance (Nicholson), an aspiring writer and recovering alcoholic who accepts a position as the off-season caretaker of the isolated historic Overlook Hotel in the Colorado Rockies, with his wife, Wendy Torrance (Duvall), and young son, Danny Torrance (Lloyd).', ImagePath: 'https://upload.wikimedia.org/wikipedia/pt/2/22/Shining.png' },
                { _id: 3, Title: 'We\'re the Millers', Description: 'The plot follows a small-time pot dealer (Sudeikis) who convinces his neighbors to help him by pretending to be his family, in order to smuggle drugs from Mexico into the United States.', ImagePath: 'https://upload.wikimedia.org/wikipedia/pt/thumb/4/4a/We%27re_the_Millers.jpg/300px-We%27re_the_Millers.jpg' },
            ],
            selectedMovie: null
        }
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