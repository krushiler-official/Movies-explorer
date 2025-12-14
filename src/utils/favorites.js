// src/utils/favorites.js
const KEY = "movie_explorer_favs";

export function getFavorites() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function isFavorite(id) {
  return getFavorites().some(m => m.id === id);
}

export function addFavorite(movie) {
  const list = getFavorites();
  if (!list.some(m => m.id === movie.id)) {
    list.unshift(movie);
    localStorage.setItem(KEY, JSON.stringify(list));
  }
}

export function removeFavorite(id) {
  const list = getFavorites().filter(m => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}
