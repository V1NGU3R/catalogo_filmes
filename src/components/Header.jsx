import SearchBar from "./SearchBar";
import "./Header.css";

function Header({ category, onCategoryChange, search, setSearch, onSearch }) {
  function handleCategory(categoryName) {
    onCategoryChange(categoryName);
  }

  return (
    <header className="header">
      <div className="header-top">
        <h1>
          🎬 <span>Filmes Bagaço</span>
        </h1>

        <p>Encontre seus filmes favoritos</p>
      </div>

      <nav className="category-nav">
        <button
          className={category === "popular" ? "active" : ""}
          onClick={() => handleCategory("popular")}
        >
          Populares
        </button>

        <button
          className={category === "top_rated" ? "active" : ""}
          onClick={() => handleCategory("top_rated")}
        >
          Melhores avaliados
        </button>

        <button
          className={category === "now_playing" ? "active" : ""}
          onClick={() => handleCategory("now_playing")}
        >
          Em cartaz
        </button>

        <button
          className={category === "favorites" ? "active" : ""}
          onClick={() => handleCategory("favorites")}
        >
          ❤️ Favoritos
        </button>
      </nav>

      <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
    </header>
  );
}

export default Header;
