// src/components/MovieCard.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IMG_URL } from "../utils/api";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";

export default function MovieCard({ movie }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(movie.id));
  }, [movie.id]);

  const toggleFav = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (fav) {
      removeFavorite(movie.id);
      setFav(false);
    } else {
      addFavorite(movie);
      setFav(true);
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 duration-200 relative"
    >
      {/* Movie Poster */}
      {movie.poster_path ? (
        <img
          src={IMG_URL + movie.poster_path}
          alt={movie.title}
          className="w-full h-72 object-cover"
        />
      ) : (
        <div className="w-full h-72 bg-gray-700 flex items-center justify-center text-white">
          No Image
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={toggleFav}
        className={`absolute top-3 right-3 p-2 rounded-full ${
          fav ? "bg-red-600" : "bg-black/40"
        } text-white`}
        title={fav ? "Remove from favorites" : "Add to favorites"}
      >
        {fav ? "♥" : "♡"}
      </button>

      {/* Details */}
      <div className="p-3">
        <h3 className="text-white text-lg font-semibold truncate">
          {movie.title}
        </h3>

        <p className="text-gray-400 text-sm">⭐ {movie.vote_average}</p>
        <p className="text-gray-400 text-xs">{movie.release_date}</p>
      </div>
    </Link>
  );
}
