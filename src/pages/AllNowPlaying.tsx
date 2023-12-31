import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import getMovieData from "../api";
import MovieList from "../components/MovieList";

const AllNowPlaying = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieData(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      setVideoData,
      setLoading,
      setError,
      false
    );
  }, []);

  if (loading) {
    return (
      <Skeleton avatar paragraph={{ rows: 4 }} className="p-4 md:p-8" active />
    );
  }

  if (error) {
    return <p>Error: Error Fetching Data</p>;
  }

  return (
    <MovieList
      categories="Now Playing"
      // browse="Browse all now playing"
      products={videoData}
      link=""
    />
  );
};

export default AllNowPlaying;
