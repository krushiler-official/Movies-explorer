import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../utils/favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    const data = getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">❤️ Your Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet. Add some movies! 🍿</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
