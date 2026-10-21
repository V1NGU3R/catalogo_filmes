import { useEffect, useState } from "react";
import "./FeaturedMovie.css";

function FeaturedMovie({ movies, onSelect }) {
  // Limita o carrossel aos 5 primeiros filmes
  const featuredMovies = movies.slice(0, 5);

  // Filme atualmente selecionado
  const [currentIndex, setCurrentIndex] = useState(0);

  // Volta para o primeiro filme quando a lista mudar
  useEffect(() => {
    setCurrentIndex(0);
  }, [movies]);

  // Troca automática a cada 6 segundos
  useEffect(() => {
    if (featuredMovies.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((current) => {
        if (current >= featuredMovies.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [featuredMovies.length]);

  // Não exibe o carrossel se não houver filmes
  if (featuredMovies.length === 0) {
    return null;
  }

  const movie = featuredMovies[currentIndex];

  // Ano
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  // Nota
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  // =========================================
  // FILME ANTERIOR
  // =========================================

  function previousMovie() {
    setCurrentIndex((current) => {
      if (current === 0) {
        return featuredMovies.length - 1;
      }

      return current - 1;
    });
  }

  // =========================================
  // PRÓXIMO FILME
  // =========================================

  function nextMovie() {
    setCurrentIndex((current) => {
      if (current === featuredMovies.length - 1) {
        return 0;
      }

      return current + 1;
    });
  }

  return (
    <section className="featured-movie">
      {/* ========================================= */}
      {/* IMAGEM DE FUNDO */}
      {/* ========================================= */}

      {movie.backdrop_path ? (
        <img
          className="featured-background"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
        />
      ) : (
        <div className="featured-no-background"></div>
      )}

      {/* ========================================= */}
      {/* DEGRADÊ */}
      {/* ========================================= */}

      <div className="featured-overlay"></div>

      {/* ========================================= */}
      {/* SETA ESQUERDA */}
      {/* ========================================= */}

      {featuredMovies.length > 1 && (
        <button
          className="featured-arrow featured-arrow-left"
          onClick={previousMovie}
          type="button"
          aria-label="Filme anterior"
        >
          <span></span>
        </button>
      )}

      {/* ========================================= */}
      {/* CONTEÚDO */}
      {/* ========================================= */}

      <div className="featured-content">
        <span className="featured-label">⭐ FILME EM DESTAQUE</span>

        <h2>{movie.title}</h2>

        {/* INFORMAÇÕES */}

        <div className="featured-meta">
          <span>⭐ {rating}</span>

          <span>📅 {year}</span>
        </div>

        {/* SINOPSE */}

        <p>{movie.overview || "Sinopse não disponível."}</p>

        {/* BOTÃO */}

        <button
          className="featured-button"
          onClick={() => onSelect(movie)}
          type="button"
        >
          Ver detalhes →
        </button>
      </div>

      {/* ========================================= */}
      {/* SETA DIREITA */}
      {/* ========================================= */}

      {featuredMovies.length > 1 && (
        <button
          className="featured-arrow featured-arrow-right"
          onClick={nextMovie}
          type="button"
          aria-label="Próximo filme"
        >
          <span></span>
        </button>
      )}

      {/* ========================================= */}
      {/* INDICADORES */}
      {/* ========================================= */}

      {featuredMovies.length > 1 && (
        <div className="featured-indicators">
          {featuredMovies.map((featuredMovie, index) => (
            <button
              key={featuredMovie.id}
              type="button"
              className={
                index === currentIndex
                  ? "featured-indicator active"
                  : "featured-indicator"
              }
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para o destaque ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedMovie;
