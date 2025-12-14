import { useEffect, useState } from "react";
import { API_KEY, BASE_URL, IMG_URL } from "../utils/api";

export default function HeroBanner() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchTrending = async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    setMovies(data.results || []);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return null;

  const movie = movies[index];

  return (
    <div
      className="h-[400px] w-full rounded-xl mb-6 bg-cover bg-center relative shadow-lg"
      style={{
        backgroundImage: `url(${IMG_URL + movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 rounded-xl p-10 flex flex-col justify-end">
        <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
        <p className="text-gray-300 mt-2 line-clamp-2">{movie.overview}</p>
      </div>
    </div>
  );
}
