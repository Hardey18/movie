/* eslint-disable @typescript-eslint/no-explicit-any */
// import fetch from "node-fetch";

const getMovieData = (
  url: string,
  setVideoData: any,
  setLoading: any,
  setError: any,
  four: boolean,
  single: boolean = false
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_BEARER_TOKEN,
    },
  };

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {
      setVideoData(four ? json?.results?.slice(0, 4) : single ? json : json?.results);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
};

export default getMovieData;
