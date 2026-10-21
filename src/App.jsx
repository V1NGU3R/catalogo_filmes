import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import {
  getMovies,
  getMovieDetails,
  getMovieTrailer,
} from "./services/tmdbApi";

import { getFavorites, saveFavorites } from "./services/favorites";

function App() {
  // =================================================
  // ESTADOS
  // =================================================

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [trailer, setTrailer] = useState(null);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [category, setCategory] = useState("popular");

  const [favorites, setFavorites] = useState(() => getFavorites());

  // =================================================
  // FILTROS
  // =================================================

  const [genre, setGenre] = useState("");

  const [year, setYear] = useState("");

  const [rating, setRating] = useState("");

  // =================================================
  // SALVAR FAVORITOS
  // =================================================

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // =================================================
  // BUSCAR FILMES
  // =================================================

  useEffect(() => {
    if (category === "favorites") {
      return;
    }

    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getMovies(category, page, submittedSearch, {
          genre,
          year,
          rating,
        });

        setMovies(data.results);

        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Erro:", error);

        setError("Não foi possível carregar os filmes.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [page, category, submittedSearch, genre, year, rating]);

  // =================================================
  // PESQUISAR FILME
  // =================================================

  function handleSearch(event) {
    event.preventDefault();

    setPage(1);

    setSubmittedSearch(search.trim());
  }

  // =================================================
  // SELECIONAR FILME
  // =================================================

  async function handleSelectMovie(movie) {
    try {
      setLoading(true);
      setError("");

      const movieData = await getMovieDetails(movie.id);

      setSelectedMovie(movieData);

      const trailer = await getMovieTrailer(movie.id);

      setTrailer(trailer);
    } catch (error) {
      console.error("Erro:", error);

      setError("Não foi possível carregar os detalhes do filme.");

      setTrailer(null);
    } finally {
      setLoading(false);
    }
  }

  // =================================================
  // VOLTAR
  // =================================================

  function handleBack() {
    setSelectedMovie(null);

    setTrailer(null);

    setError("");
  }

  // =================================================
  // TROCAR CATEGORIA
  // =================================================

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);

    setSearch("");

    setSubmittedSearch("");

    setGenre("");

    setYear("");

    setRating("");

    setPage(1);

    setError("");
  }

  // =================================================
  // LIMPAR FILTROS
  // =================================================

  function handleClearFilters() {
    setGenre("");

    setYear("");

    setRating("");

    setPage(1);
  }

  // =================================================
  // ADICIONAR / REMOVER FAVORITO
  // =================================================

  function toggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === movie.id,
      );

      if (alreadyFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== movie.id);
      }

      return [...currentFavorites, movie];
    });
  }

  // =================================================
  // VERIFICAR FAVORITO
  // =================================================

  function isFavorite(movieId) {
    return favorites.some((favorite) => favorite.id === movieId);
  }

  // =================================================
  // TELA DE DETALHES
  // =================================================

  if (selectedMovie) {
    return (
      <MovieDetails
        movie={selectedMovie}
        trailer={trailer}
        onBack={handleBack}
        isFavorite={isFavorite(selectedMovie.id)}
        onFavorite={() => toggleFavorite(selectedMovie)}
      />
    );
  }

  // =================================================
  // TELA PRINCIPAL
  // =================================================

  return (
    <div className="app">
      <Header
        category={category}
        onCategoryChange={handleCategoryChange}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      {category === "favorites" ? (
        <Favorites
          favorites={favorites}
          onSelectMovie={handleSelectMovie}
          isFavorite={isFavorite}
          onFavorite={toggleFavorite}
        />
      ) : (
        <Home
          movies={movies}
          loading={loading}
          error={error}
          submittedSearch={submittedSearch}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onSelectMovie={handleSelectMovie}
          isFavorite={isFavorite}
          onFavorite={toggleFavorite}
          genre={genre}
          setGenre={setGenre}
          year={year}
          setYear={setYear}
          rating={rating}
          setRating={setRating}
          onClearFilters={handleClearFilters}
        />
      )}
    </div>
  );
}

export default App;
