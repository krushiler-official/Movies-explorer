import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { API_KEY, BASE_URL } from "../utils/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults(){
  const q = useQuery().get("q") || "";
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setMovies([]);
    setPage(1);
    fetchResults(q, 1, true);
  }, [q]);

  const fetchResults = async (query, p = 1, replace = false) => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${p}&language=en-US`);
    const data = await res.json();
    setMovies(prev => replace ? (data.results||[]) : [...prev, ...(data.results||[])]);
    setTotalPages(data.total_pages || 1);
    setLoading(false);
  };

  const loadMore = () => {
    if (page >= totalPages) return;
    const next = page + 1;
    setPage(next);
    fetchResults(q, next, false);
  };

  if (!q) return <div className="p-6 text-white">Type a search in the search bar.</div>;

  return (
    <div className="p-6">
      <h2 className="text-white text-2xl mb-4">Search results for "{q}"</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>

      {loading && <p className="text-white mt-4">Loading...</p>}

      {page < totalPages && !loading && (
        <div className="mt-6 text-center">
          <button onClick={loadMore} className="px-4 py-2 bg-yellow-500 rounded">Load more</button>
        </div>
      )}
    </div>
  );
}
