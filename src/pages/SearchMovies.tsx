import { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import { useLocation } from "react-router-dom";
import getMovieData from "../api";
import MovieList from "../components/MovieList";

const SearchMovies = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [type, setType] = useState("movie")

  const query = useLocation().pathname.split("/").reverse()[0];
  const movieType = window.location.href.split("/").reverse()[1];

  useEffect(() => {
    getMovieData(
      movieType === "movie" ? `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1` : `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
      setVideoData,
      setLoading,
      setError,
      false,
      false,
      true
    );
  }, []);

  if (loading) {
    return <Skeleton avatar paragraph={{ rows: 4 }} className="p-4 md:p-8" active />;
  }

  if (error) {
    return <p>Error: Error Fetching Data</p>;
  }

  // const onTypeChange = (e: any) => {
  //   setType(e)
  // }

  return (
    <MovieList
      categories={`Search for: ${query.replaceAll("%20", " ")}`}
      // browse="Browse all trending"
      products={videoData}
      link=""
      // onTypeChange={onTypeChange}
    />
  );
};

export default SearchMovies;
