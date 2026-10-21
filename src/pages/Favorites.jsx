import MovieGrid from "../components/MovieGrid";

function Favorites({ favorites, onSelectMovie, isFavorite, onFavorite }) {
  return (
    <main>
      <h2 className="section-title">❤️ Meus favoritos</h2>

      {favorites.length === 0 ? (
        <p className="message">Você ainda não possui filmes favoritos.</p>
      ) : (
        <MovieGrid
          movies={favorites}
          onSelect={onSelectMovie}
          isFavorite={isFavorite}
          onFavorite={onFavorite}
        />
      )}
    </main>
  );
}

export default Favorites;
