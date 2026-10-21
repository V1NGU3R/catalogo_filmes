const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

// Buscar filmes
export async function getMovies(category, page, search, filters = {}) {
  let url;

  /*
    Se estiver pesquisando pelo nome,
    usamos a API de pesquisa.
  */
  if (search.trim() !== "") {
    url = `${BASE_URL}/search/movie?query=${encodeURIComponent(
      search,
    )}&language=pt-BR&page=${page}`;
  } else if (filters.genre || filters.year || filters.rating) {

  /*
    Se não estiver pesquisando e tiver algum filtro,
    usamos /discover/movie.
  */
    const params = new URLSearchParams();

    params.append("language", "pt-BR");

    params.append("page", page);

    params.append("sort_by", "popularity.desc");

    if (filters.genre) {
      params.append("with_genres", filters.genre);
    }

    if (filters.year) {
      params.append("primary_release_year", filters.year);
    }

    if (filters.rating) {
      params.append("vote_average.gte", filters.rating);

      params.append("vote_count.gte", "50");
    }

    url = `${BASE_URL}/discover/movie?${params.toString()}`;
  } else {

  /*
    Se não tiver pesquisa nem filtro,
    usamos a categoria normal.
  */
    url = `${BASE_URL}/movie/${category}?language=pt-BR&page=${page}`;
  }

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar filmes");
  }

  return await response.json();
}

// Buscar detalhes do filme
export async function getMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?language=pt-BR`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do filme");
  }

  return await response.json();
}

// Buscar trailer
export async function getMovieTrailer(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?language=pt-BR`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar trailer");
  }

  const data = await response.json();

  const trailer =
    data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true,
    ) ||
    data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ||
    data.results.find((video) => video.site === "YouTube");

  return trailer || null;
}
