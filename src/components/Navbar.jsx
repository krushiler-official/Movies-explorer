import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, toggleTheme } = useTheme(); // <-- FIXED

  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <Link to="/" className="text-xl font-bold">
        🎬 Movie App
      </Link>

      <div className="flex items-center gap-4">

        {/* Nav Links */}
        <Link to="/search">Search</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/trending">Trending</Link>

        {/* Theme Button */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg"
        >
          {dark ? "🌞" : "🌙"}
        </button>

      </div>
    </nav>
  );
}
