/* eslint-disable @typescript-eslint/no-explicit-any */

const getMovieData = (
  url: string,
  setVideoData: any,
  setLoading: any,
  setError: any,
  four: boolean,
  single: boolean = false,
  isSearch: boolean = false,
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
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
      setVideoData(four ? json?.results?.slice(0, 5) : single ? json : isSearch ? json : json?.results);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
};

export default getMovieData;
