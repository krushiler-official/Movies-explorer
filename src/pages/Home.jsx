import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../utils/api";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";

export default function Home() {

  const [popular, setPopular] = useState([]);
  const [popularPage, setPopularPage] = useState(1);

  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  // ===========================
  // API FUNCTIONS
  // ===========================

  // Popular (with pagination)
  const fetchPopular = async (p = 1) => {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${p}`
    );
    const data = await res.json();

    setPopular(prev =>
      p === 1 ? data.results : [...prev, ...(data.results || [])]
    );
  };


  const getTopRated = async () => {
    const res = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    setTopRated(data.results || []);
  };

  const getUpcoming = async () => {
    const res = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    setUpcoming(data.results || []);
  };

  const loadMorePopular = () => {
    const nextPage = popularPage + 1;
    setPopularPage(nextPage);
    fetchPopular(nextPage);
  };

  useEffect(() => {
    fetchPopular(1);
    getTopRated();
    getUpcoming();
  }, []);

  return (
    <div className="p-6 space-y-10">

      {/* HERO BANNER */}
      <HeroBanner />

      {/* Popular Section */}
      <div>
        <h1 className="text-red-700 text-3xl font-bold mb-4">🔥 Popular Movies</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popular.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        <div className="text-center mt-6">
          <button
            onClick={loadMorePopular}
            className="bg-yellow-400 px-6 py-2 rounded-lg text-red-700 font-semibold hover:bg-yellow-500"
          >
            Load More
          </button>
        </div>
      </div>

      {/* Top Rated Section */}
      <div>
        <h1 className="text-red-700 text-3xl font-bold mb-4">⭐ Top Rated</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topRated.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Upcoming Section */}
      <div>
        <h1 className="text-red-700 text-3xl font-bold mb-4">🎬 Upcoming</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {upcoming.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

    </div>
  );
}
