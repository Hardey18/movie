import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import AllNowPlaying from "./pages/AllNowPlaying";
import AllPopular from "./pages/AllPopular";
import AllTopRated from "./pages/AllTopRated";
import AllUpcoming from "./pages/AllUpcoming";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details" element={<MovieDetails />} />
      <Route path="/now-playing" element={<AllNowPlaying />} />
      <Route path="/popular" element={<AllPopular />} />
      <Route path="/top-rated" element={<AllTopRated />} />
      <Route path="/upcoming" element={<AllUpcoming />} />
      <Route path="/details/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
