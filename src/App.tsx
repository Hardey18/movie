import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import AllNowPlaying from "./pages/AllNowPlaying";
import AllPopular from "./pages/AllPopular";
import AllTopRated from "./pages/AllTopRated";
import AllUpcoming from "./pages/AllUpcoming";
import AllTrending from "./pages/AllTrending";
import Header from "./components/Header";
import SearchMovies from "./pages/SearchMovies";
import AllPopularSeries from "./pages/AllPopularSeries";
import AllTopRatedSeries from "./pages/AllTopRatedSeries";
import AllAiringToday from "./pages/AllAiringToday";
import AllOnTheAir from "./pages/AllOnTheAir";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<MovieDetails />} />
        <Route path="/trending" element={<AllTrending />} />
        <Route path="/now-playing" element={<AllNowPlaying />} />
        <Route path="/on-the-air" element={<AllOnTheAir />} />
        <Route path="/popular" element={<AllPopular />} />
        <Route path="/popular-series" element={<AllPopularSeries />} />
        <Route path="/airing-today" element={<AllAiringToday />} />
        <Route path="/top-rated" element={<AllTopRated />} />
        <Route path="/top-rated-series" element={<AllTopRatedSeries />} />
        <Route path="/upcoming" element={<AllUpcoming />} />
        <Route path="/details/:id" element={<MovieDetails />} />
        <Route path="/details/tv/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchMovies />} />
      </Routes>
    </div>
  );
}

export default App;
