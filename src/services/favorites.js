const FAVORITES_KEY = "movieflix-favorites";

export function getFavorites() {
  const savedFavorites = localStorage.getItem(FAVORITES_KEY);

  return savedFavorites ? JSON.parse(savedFavorites) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
