import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import MovieList from "./MovieList";
import getMovieData from "../api";

const OnTheAir = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieData(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      setVideoData,
      setLoading,
      setError,
      true
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
      categories="On The Air"
      // browse="Browse all on the air"
      products={videoData}
      four
      link="/popular-series"
    />
  );
};

export default OnTheAir;
