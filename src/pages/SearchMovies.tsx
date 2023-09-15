import { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import { useLocation } from "react-router-dom";
import getMovieData from "../api";
import MovieList from "../components/MovieList";

const SearchMovies = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = useLocation().pathname.split("/").reverse()[0];

  useEffect(() => {
    getMovieData(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      setVideoData,
      setLoading,
      setError,
      false
    );
  }, []);

  if (loading) {
    return <Skeleton avatar paragraph={{ rows: 4 }} className="p-4 md:p-8" active />;
  }

  if (error) {
    return <p>Error: Error Fetching Data</p>;
  }

  return (
    <MovieList
      categories={`Search for: ${query.replaceAll("%20", " ")}`}
      // browse="Browse all trending"
      products={videoData}
      link=""
    />
  );
};

export default SearchMovies;
