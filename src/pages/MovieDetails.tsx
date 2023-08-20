import { useEffect, useState } from "react";
import getMovieData from "../api";
import { Skeleton } from "antd";
import { StarIcon } from "@heroicons/react/20/solid";
import { getYear, numberWithCommas, toHoursAndMinutes } from "../utils";
import Cards from "../reusables/Cards";
import { IMovieDataProps } from "../typings";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MovieDetails = () => {
  const [movieData, setMovieData] = useState<IMovieDataProps>(null!);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const movieId = window.location.href.split("/").reverse()[0];

  useEffect(() => {
    getMovieData(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      setMovieData,
      setLoading,
      setError,
      false,
      true
    );
  }, []);

  if (loading) {
    return <Skeleton className="p-4 md:p-8" active />;
  }

  if (error) {
    return <p>Error: Error Fetching Data</p>;
  }

  console.log("DETAILS", movieData);

  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14">
        <img
          src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover brightness-50 blur-sm"
        />

        <div className="bg-transparent">
          <div className="pb-16 pt-6 sm:pb-24">
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="flex justify-between">
                    <h1 className="text-3xl font-medium text-gray-400">
                      {movieData.original_title} ({getYear(movieData.release_date)})
                    </h1>
                  </div>
                  <div
                    className="prose prose-sm mt-4 text-white"
                    dangerouslySetInnerHTML={{ __html: movieData.tagline }}
                  />
                  {/* Reviews */}
                  <div className="mt-4">
                    <h2 className="sr-only">Reviews</h2>
                    <div className="flex flex-col">
                      <div className="flex mb-2">
                        <p className="text-sm text-gray-300">
                          {movieData.vote_average}
                          <span className="sr-only"> out of 5 stars</span>
                        </p>
                        <div className="ml-1 flex items-center">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                Math.floor(movieData.vote_average) > rating
                                  ? "text-yellow-400"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="text-sm font-medium text-gray-400">
                          {numberWithCommas(movieData.vote_count)} vote counts
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="text-sm font-medium text-gray-400">
                          {toHoursAndMinutes(movieData.runtime)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image gallery */}
                <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-300 mb-4">
                    <div
                      onClick={() => navigate(-1)}
                      className="cursor-pointer flex items-center"
                    >
                      <RollbackOutlined className="mt-2" />
                      <div className="mt-2 ml-2">Back</div>
                    </div>
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    <img
                      src={
                        !movieData.belongs_to_collection
                          ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
                          : `https://image.tmdb.org/t/p/original${movieData.belongs_to_collection.poster_path}`
                      }
                      alt={movieData.title}
                      className="lg:col-span-2 lg:row-span-2 rounded-lg"
                    />
                  </div>
                </div>

                <div className="mt-8 lg:col-span-5">
                  {/* Product details */}
                  <div className="border-t border-gray-200">
                    <h2 className="text-sm font-medium text-gray-400 uppercase mt-8">
                      Description
                    </h2>

                    <div
                      className="prose prose-sm mt-4 text-white"
                      dangerouslySetInnerHTML={{ __html: movieData.overview }}
                    />
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-400 uppercase">
                      Genres
                    </h2>

                    <div className="prose prose-sm mt-4 text-white">
                      <ul role="list">
                        {movieData.genres.map((item) => (
                          <li key={item.id}>{item.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-400 uppercase">
                      Spoken Languages
                    </h2>

                    <div className="prose prose-sm mt-4 text-white">
                      <ul role="list">
                        {movieData.spoken_languages.map((item) => (
                          <li key={item.iso_639_1}>{item.english_name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-400 uppercase">
                      Production Countries
                    </h2>

                    <div className="prose prose-sm mt-4 text-white">
                      <ul role="list">
                        {movieData.production_countries.map((item) => (
                          <li key={item.iso_3166_1}>{item.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Policies */}
                  <section aria-labelledby="policies-heading" className="mt-10">
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <Cards title="Budget" budget={movieData.budget} />
                      <Cards title="Revenue" budget={movieData.revenue} />
                    </dl>
                  </section>

                  <div>
                    <div className="mx-auto max-w-2xl lg:mx-0">
                      <h2 className="text-sm font-medium text-gray-400 uppercase mt-12">
                        Production Companies
                      </h2>
                    </div>
                    <ul
                      role="list"
                      className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
                    >
                      {movieData.production_companies.map((company) => (
                        <li key={company.name}>
                          <img
                            className="w-full"
                            src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                            alt={company.origin_country}
                          />
                          <h3 className="mt-6 text-lg md:text-sm font-semibold leading-8 tracking-tight text-white">
                            {company.name}
                          </h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
