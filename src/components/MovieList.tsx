import { FC, useEffect, useState } from "react";
import { RollbackOutlined } from "@ant-design/icons";
import { MovieCategoryProps, MovieListProps, ProductProps, TvCategoryProps } from "../typings";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import CircularProgressBar from "./CircularProgressBar";
import { percent } from "../utils";
import getMovieData from "../api";
import { Skeleton } from "antd";

const MovieList: FC<MovieListProps> = ({
  categories,
  // browse,
  products,
  four,
  // link,
  // type
  // onTypeChange,
}) => {
  const query = useLocation().pathname;
  const searchQuery = useLocation().pathname.split("/").reverse()[0];
  const navigate = useNavigate();
  const ifSearchPage = window.location.href.includes("search");
  const ifMovie: boolean = window.location.href.includes("movie");
  const ifTV: boolean = window.location.href.includes("tv");
  const [loading, setLoading] = useState(true);
  const [creditLoading, setCreditLoading] = useState(true);

  const movieData: ProductProps = ifSearchPage ? products?.results : products;

  const refreshPage = (type: string) => {
    navigate(`/search/${type}/${searchQuery}`);
    window.location.reload();
  };
  
  const [movieCategory, setMovieCategoryData] = useState<MovieCategoryProps>(null!);
  const [tvCategory, setTvCategoryData] = useState<TvCategoryProps>(null!);

  useEffect(() => {
    getMovieData(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      setMovieCategoryData,
      setLoading,
      "",
      false,
      false,
      true
    );
  }, []);

  useEffect(() => {
    getMovieData(
      `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      setTvCategoryData,
      setCreditLoading,
      "",
      false,
      false,
      true
    );
  }, []);
  if (loading) {
    return <Skeleton className="p-4 md:p-8" active />;
  }
  if (creditLoading) {
    return <Skeleton className="p-4 md:p-8" active />;
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div
          className={`flex justify-between items-center ${
            query !== "/" ? "mt-8 md:mt-24" : ""
          }`}
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center">
            {!four && (
              <Link to={"/"}>
                <RollbackOutlined style={{ color: "indigo" }} />
              </Link>
            )}
            <div className="mt-2 ml-2 uppercase">{categories}</div>
          </h2>
        </div>

        {ifSearchPage && (
          <div className="mt-8">
            <button
              className={`mr-4 ${ifMovie ? "text-indigo-500 border-solid border-b-2 border-indigo-500" : ""}`}
              onClick={() => refreshPage("movie")}
              type="button"
            >
              Movie ({movieCategory?.total_results})
            </button>
            <button onClick={() => refreshPage("tv")} type="button" className={`${ifTV ? "text-indigo-500 border-solid border-b-2 border-indigo-500" : ""}`}>
              Series ({tvCategory?.total_results})
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {movieData?.length === 0 ? (
            <div>There are no movies that matches your query</div>
          ) : (
            movieData?.map((product) => (
              <Link
                to={`/details/${
                  product.first_air_date ? "tv/" : ""
                }${product.id.toString()}`}
                key={product.id}
              >
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={
                        product.backdrop_path
                          ? `https://image.tmdb.org/t/p/original${product.backdrop_path}`
                          : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
                      }
                      alt={product.title || product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-lg font-semibold text-left text-black">
                      {product.title || product.name}
                    </h3>
                    <h3 className="text-sm text-left font-medium text-gray-600">
                      {(product.release_date &&
                        format(
                          new Date(product.release_date),
                          "d MMMM yyyy"
                        )) ||
                        (product.first_air_date &&
                          format(
                            new Date(product.first_air_date),
                            "d MMMM yyyy"
                          ))}
                    </h3>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <CircularProgressBar
                      percent={percent(product.vote_average)}
                    />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
