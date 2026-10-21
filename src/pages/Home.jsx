import FeaturedMovie from "../components/FeaturedMovie";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

function Home({
  movies,
  loading,
  error,
  submittedSearch,
  page,
  totalPages,
  setPage,
  onSelectMovie,
  isFavorite,
  onFavorite,

  genre,
  setGenre,

  year,
  setYear,

  rating,
  setRating,

  onClearFilters,
}) {
  return (
    <main>
      {/* FILTROS */}
      {!submittedSearch && (
        <section className="filters">
          <div className="filter-group">
            <label htmlFor="genre">Gênero</label>

            <select
              id="genre"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              <option value="">Todos os gêneros</option>

              <option value="28">Ação</option>

              <option value="12">Aventura</option>

              <option value="16">Animação</option>

              <option value="35">Comédia</option>

              <option value="80">Crime</option>

              <option value="99">Documentário</option>

              <option value="18">Drama</option>

              <option value="14">Fantasia</option>

              <option value="27">Terror</option>

              <option value="9648">Mistério</option>

              <option value="10749">Romance</option>

              <option value="878">Ficção científica</option>

              <option value="53">Thriller</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year">Ano</label>

            <input
              id="year"
              type="number"
              placeholder="Ex: 2024"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              min="1900"
              max="2030"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="rating">Nota mínima</label>

            <select
              id="rating"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <option value="">Qualquer nota</option>

              <option value="5">5 ou mais</option>

              <option value="6">6 ou mais</option>

              <option value="7">7 ou mais</option>

              <option value="8">8 ou mais</option>

              <option value="9">9 ou mais</option>
            </select>
          </div>

          <button
            className="clear-filters-button"
            onClick={onClearFilters}
            type="button"
          >
            Limpar filtros
          </button>
        </section>
      )}

      {/* FILME EM DESTAQUE */}
      {!submittedSearch && !loading && !error && movies.length > 0 && (
        <FeaturedMovie movies={movies} onSelect={onSelectMovie} />
      )}

      {/* TÍTULO DA PESQUISA */}
      {submittedSearch && !loading && !error && (
        <h2 className="search-title">Resultados para: "{submittedSearch}"</h2>
      )}

      {/* CARREGANDO */}
      {loading && <Loading />}

      {/* ERRO */}
      {error && <p className="message error">{error}</p>}

      {/* NENHUM FILME */}
      {!loading && !error && movies.length === 0 && (
        <p className="message">Nenhum filme encontrado.</p>
      )}

      {/* FILMES */}
      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid
            movies={movies}
            onSelect={onSelectMovie}
            isFavorite={isFavorite}
            onFavorite={onFavorite}
          />

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </main>
  );
}

export default Home;
