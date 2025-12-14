import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY, BASE_URL, IMG_URL, BIG_IMG_URL } from "../utils/api";
import TrailerModal from "../components/TrailerModal";
import CastCard from "../components/CastCard";
import MovieCard from "../components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    setLoading(true);

    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,recommendations&language=en-US`
    );
    const data = await res.json();

    setMovie(data);
    setCast(data.credits?.cast?.slice(0, 8) || []);
    setRecommendations(data.recommendations?.results || []);

    const youTube = (data.videos?.results || []).find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    setTrailerKey(youTube ? youTube.key : null);
    setLoading(false);
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!movie) return <div className="p-6 text-white">Movie not found</div>;

  return (
    <div className="text-white">

      {/* Back Button */}
      <div className="p-4">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
        >
          ⬅ Back to Home
        </Link>
      </div>

      <div className="relative">
        <div
          className="h-80 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${BIG_IMG_URL + movie.backdrop_path})`,
          }}
        />

        <div className="p-6 -mt-24 flex gap-6">
          <img
            src={IMG_URL + movie.poster_path}
            alt={movie.title}
            className="w-44 rounded-xl shadow-xl"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {movie.title}
              <span className="text-white text-base">
                ({movie.release_date?.slice(0, 4)})
              </span>
            </h1>

            <p className="mt-2 text-yellow-400 font-semibold">
              ⭐ {movie.vote_average} • {movie.runtime}m
            </p>

            <p className="mt-4 text-blue-700 max-w-prose">{movie.overview}</p>

            <div className="mt-6 flex items-center gap-3">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-4 py-2 bg-red-600 rounded"
                >
                  Watch Trailer
                </button>
              )}

              <Link
                to="/favorites"
                className="px-4 py-2 bg-black rounded"
              >
                My Favorites
              </Link>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold">Genres</h3>
              <div className="flex gap-2 mt-2">
                {movie.genres?.map((g) => (
                  <span key={g.id} className="px-3 py-1 bg-black rounded">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="flex gap-4 overflow-x-auto">
          {cast.map((c) => (
            <CastCard key={c.cast_id || c.credit_id} person={c} />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">You might also like</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recommendations.map((r) => (
            <MovieCard key={r.id} movie={r} />
          ))}
        </div>
      </div>

      {showTrailer && trailerKey && (
        <TrailerModal
          onClose={() => setShowTrailer(false)}
          videoKey={trailerKey}
        />
      )}
    </div>
  );
}
