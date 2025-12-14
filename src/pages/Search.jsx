import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { API_KEY, BASE_URL } from "../utils/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    setResults(data.results || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🔍 Search Movies</h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h2 className="text-2xl mb-4">Results:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && query !== "" && (
        <p className="text-gray-400">No movies found.</p>
      )}
    </div>
  );
}
