import "./MovieDetails.css";
function MovieDetails({ movie, trailer, onBack, isFavorite, onFavorite }) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const originalLanguage = movie.original_language
    ? movie.original_language.toUpperCase()
    : "N/A";

  return (
    <div className="movie-details">
      {/* BOTÃO VOLTAR */}
      <button className="back-button" onClick={onBack} type="button">
        ← Voltar
      </button>

      {/* INFORMAÇÕES DO FILME */}
      <div className="details-content">
        {/* POSTER */}
        <div className="details-poster-container">
          {movie.poster_path ? (
            <img
              className="details-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="details-no-poster">
              <span>🎬</span>
              <span>Sem imagem</span>
            </div>
          )}
        </div>

        {/* INFORMAÇÕES */}
        <div className="details-info">
          <h1>{movie.title}</h1>

          {/* TÍTULO ORIGINAL */}
          {movie.original_title && movie.original_title !== movie.title && (
            <p className="original-title">
              Título original: {movie.original_title}
            </p>
          )}

          {/* INFORMAÇÕES BÁSICAS */}
          <div className="details-meta">
            <span>⭐ {rating}</span>

            <span>📅 {year}</span>

            <span>⏱️ {movie.runtime ? `${movie.runtime} min` : "N/A"}</span>

            <span>🗣️ {originalLanguage}</span>
          </div>

          {/* FAVORITO */}
          <button
            className={`details-favorite-button ${
              isFavorite ? "favorite-active" : ""
            }`}
            onClick={() => onFavorite(movie)}
            type="button"
          >
            {isFavorite
              ? "❤️ Remover dos favoritos"
              : "♡ Adicionar aos favoritos"}
          </button>

          {/* GÊNEROS */}
          {movie.genres?.length > 0 && (
            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
          )}

          {/* SINOPSE */}
          <div className="overview-section">
            <h2>Sinopse</h2>

            <p className="overview">
              {movie.overview || "Sinopse não disponível."}
            </p>
          </div>
        </div>
      </div>

      {/* TRAILER */}
      <section className="trailer-section">
        <h2>🎬 Trailer</h2>

        {trailer ? (
          <div className="trailer-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`Trailer de ${movie.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="no-trailer">
            <span>🎞️</span>

            <p>Trailer não disponível.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default MovieDetails;
