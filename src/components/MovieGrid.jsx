import MovieCard from "./MovieCard";
import "./MovieGrid.css";

function MovieGrid({ movies, onSelect, isFavorite, onFavorite }) {
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
          isFavorite={isFavorite(movie.id)}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
