import "../css/Upcomingmovies.css";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getUpcomingMovies } from "../services/api";
import "../css/Home.css";

function Upcomingmovies(){

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const loadUpcomingMovies = async () => {
            try {
                const upcomingMovies = await getUpcomingMovies();
                setMovies(upcomingMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        }
        loadUpcomingMovies();
    }, []);

    
    /////////////////////////////////////////////////////////////////////////
    const handleSearch = async (e) => {
        e.preventDefault();
    
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    };

    return <div className="home">

        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="search for movies..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button type="submit" className="search-button">
                Search
            </button>
        </form>


        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading...</div>
        ) : ( 
            <div className="movies-grid">
                {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        )}
        
    </div>
    
}

export default Upcomingmovies;