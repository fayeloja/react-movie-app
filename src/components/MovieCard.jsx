import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";


import PropTypes from 'prop-types';

function MovieCard({ movie }) {

    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

    const favorite = isFavorite(movie.id);

    // Toggle the movie as favorite or remove from favorites
    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>❤</button>
            </div>
        </div>
        
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date ? movie.release_date.split("-")[0] : "Unknown"}</p>
        </div>
    </div>

}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string,
    }).isRequired,
};

export default MovieCard;