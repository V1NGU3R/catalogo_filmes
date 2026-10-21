import "./MovieCard.css";

function MovieCard({ movie, onSelect, isFavorite, onFavorite }) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  function handleFavorite(event) {
    event.stopPropagation();

    onFavorite(movie);
  }

  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="no-poster">
            <span>🎬</span>

            <p>Sem imagem</p>
          </div>
        )}

        {/* NOTA */}

        <div className="movie-rating">⭐ {rating}</div>

        {/* FAVORITO */}

        <button
          className={`favorite-button ${isFavorite ? "favorite-active" : ""}`}
          onClick={handleFavorite}
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      <div className="movie-info">
        <h2 title={movie.title}>{movie.title}</h2>

        <div className="movie-meta">
          <span>📅 {year}</span>

          <span>⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
