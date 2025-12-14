// src/pages/Trending.jsx
import { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../utils/api";
import MovieCard from "../components/MovieCard";

export default function Trending(){
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => setMovies(d.results || []));
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-white text-2xl mb-4">Trending This Week</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
