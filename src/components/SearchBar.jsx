import "./SearchBar.css";

function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Digite o nome de um filme..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button type="submit">🔍 Buscar</button>
    </form>
  );
}

export default SearchBar;
