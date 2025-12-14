import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ initial = "" }) {
  const [query, setQuery] = useState(initial);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, e.g., Inception"
        className="px-3 py-2 rounded-l-md bg-gray-800 text-white outline-none w-60"
      />
      <button className="px-3 py-2 bg-yellow-500 rounded-r-md font-semibold">
        Search
      </button>
    </form>
  );
}
