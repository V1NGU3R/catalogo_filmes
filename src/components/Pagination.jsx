import "./Pagination.css";
function Pagination({ page, totalPages, setPage }) {
  function previousPage() {
    setPage(page - 1);
  }

  function nextPage() {
    setPage(page + 1);
  }

  return (
    <div className="pagination">
      <button onClic k={previousPage} disabled={page === 1}>
        ← Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button onClick={nextPage} disabled={page >= totalPages}>
        Próxima →
      </button>
    </div>
  );
}

export default Pagination;
