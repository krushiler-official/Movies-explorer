// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Components / Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Trending from "./pages/Trending";
import NotFound from "./pages/NotFound";

// Theme
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { dark } = useTheme();

  return (
    <div className={dark ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />
        <Route path="/search-results" element={<SearchResults />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/trending" element={<Trending />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}
