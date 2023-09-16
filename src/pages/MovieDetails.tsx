import { useEffect, useState } from "react";
import getMovieData from "../api";
import { Skeleton } from "antd";
import { StarIcon } from "@heroicons/react/20/solid";
import YouTube, { YouTubeProps } from "react-youtube";
import { getYear, numberWithCommas, toHoursAndMinutes } from "../utils";
import { Button, Dialog } from "@material-tailwind/react";
import Cards from "../reusables/Cards";
import {
  ICreditDataProps,
  IExternalIdDataProps,
  IMovieDataProps,
  IVideoDataProps,
} from "../typings";
import {
  RollbackOutlined,
  LinkOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import CardCarousel from "../components/CardCarousel";
import EpisodeList from "../components/EpisodeList";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import DropDownIcon from "../components/DropDownIcon";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MovieDetails = () => {
  const [movieData, setMovieData] = useState<IMovieDataProps>(null!);
  const [videoData, setVideoData] = useState<IVideoDataProps>(null!);
  const [creditData, setCreditData] = useState<ICreditDataProps>(null!);
  const [externalIdsData, setExternalIdsData] = useState<IExternalIdDataProps>(
    null!
  );
  const [loading, setLoading] = useState(true);
  const [creditLoading, setCreditLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [externalIdsLoading, setExternalIdsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creditError, setCreditError] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [externalIdsError, setExternalIdsError] = useState(null);
  const [open, setOpen] = useState(false);
  const [carouselOpen, setCarouselOpen] = useState(0);

  const handleCarouselOpen = (value: number) =>
    setCarouselOpen(carouselOpen === value ? 0 : value);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    // height: "390",
    // width: "640",
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleOpen = () => setOpen(!open);

  const navigate = useNavigate();

  const movieId = window.location.href.split("/").reverse()[0];

  const ifTV = window.location.href.includes("tv");

  useEffect(() => {
    getMovieData(
      ifTV
        ? `https://api.themoviedb.org/3/tv/${movieId}?language=en-US`
        : `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      setMovieData,
      setLoading,
      setError,
      false,
      true
    );
  }, []);

  useEffect(() => {
    getMovieData(
      ifTV
        ? `https://api.themoviedb.org/3/tv/${movieId}/credits?language=en-US`
        : `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      setCreditData,
      setCreditLoading,
      setCreditError,
      false,
      true
    );
  }, []);

  useEffect(() => {
    getMovieData(
      ifTV
        ? `https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`
        : `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      setVideoData,
      setVideoLoading,
      setVideoError,
      false,
      true
    );
  }, []);

  useEffect(() => {
    getMovieData(
      ifTV
        ? `https://api.themoviedb.org/3/tv/${movieId}/season/1/external_ids`
        : `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
      setExternalIdsData,
      setExternalIdsLoading,
      setExternalIdsError,
      false,
      true
    );
  }, []);

  const trailer = videoData?.results.filter(
    (movie) => movie.type === "Trailer"
  );

  const actors = creditData?.cast
    .filter((actors) => actors.known_for_department === "Acting")
    .slice(0, 15);

  if (loading) {
    return <Skeleton className="p-4 md:p-8" active />;
  }

  if (creditLoading) {
    return <Skeleton className="p-4 md:p-8" active />;
  }

  if (videoLoading) {
    return <Skeleton className="p-4 md:p-8" active />;
  }

  if (externalIdsLoading) {
    return <Skeleton className="p-4 md:p-8" active />;
  }

  if (error) {
    return <p>Error: Error Fetching Data</p>;
  }

  if (creditError) {
    return <p>Error: Error Fetching Data</p>;
  }

  if (videoError) {
    return <p>Error: Error Fetching Data</p>;
  }

  if (externalIdsError) {
    return <p>Error: Error Fetching Data</p>;
  }

  console.log("MOVIE DATA", movieData);
  console.log("EXTERNAL IDs", externalIdsData);

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
                      {ifTV ? movieData.original_name : movieData.title} (
                      {getYear(
                        ifTV ? movieData.first_air_date : movieData.release_date
                      )}
                      )
                    </h1>
                  </div>
                  <div
                    className="prose prose-sm mt-4 text-white italic"
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
                          {ifTV ? "" : toHoursAndMinutes(movieData.runtime)}
                        </div>
                      </div>

                      <Button onClick={handleOpen} variant="gradient">
                        Play Trailer
                      </Button>
                      <Dialog open={open} handler={handleOpen}>
                        <YouTube
                          videoId={trailer[0]?.key}
                          opts={opts}
                          onReady={onPlayerReady}
                        />
                      </Dialog>
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
                  <div
                  // className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8"
                  >
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

                  {ifTV ? (
                    <Accordion
                      open={carouselOpen === 1}
                      animate={CUSTOM_ANIMATION}
                      icon={<DropDownIcon id={1} open={carouselOpen} />}
                    >
                      <AccordionHeader className="text-white hover:text-white mt-4" onClick={() => handleCarouselOpen(1)}>
                        View All Episodes
                      </AccordionHeader>
                      <AccordionBody>
                        <EpisodeList series={movieData.seasons} />
                      </AccordionBody>
                    </Accordion>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-8 lg:col-span-5">
                  <div className="border-t border-gray-200">
                    <h2 className="text-sm font-medium text-gray-400 uppercase mt-8">
                      Overview
                    </h2>

                    <div
                      className="prose prose-sm mt-4 text-white"
                      dangerouslySetInnerHTML={{ __html: movieData.overview }}
                    />
                  </div>

                  {movieData.created_by[0]?.name ? (
                    <div className="border-t mt-8 border-gray-200">
                      <h2 className="text-sm font-medium text-gray-400 uppercase mt-8">
                        Creator
                      </h2>

                      <img
                        className="w-[128px] h-[140px] mt-2"
                        src={
                          movieData.created_by[0]?.profile_path
                            ? `https://image.tmdb.org/t/p/original${movieData.created_by[0]?.profile_path}`
                            : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
                        }
                        alt={movieData.created_by[0]?.name}
                      />
                      <div
                        className="prose prose-sm mt-4 text-white"
                        dangerouslySetInnerHTML={{
                          __html: movieData.created_by[0]?.name,
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-400 uppercase">
                      Top Billed Cast
                    </h2>

                    <CardCarousel cast={actors} />
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-400 uppercase">
                      Movie Links
                    </h2>

                    <div className="flex flex-1 items-center">
                      {/* Movie Website */}
                      {movieData.homepage ? (
                        <Link
                          to={movieData.homepage}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-500 lg:block"
                        >
                          <span className="sr-only">Search</span>
                          <LinkOutlined
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : null}

                      {/* Facebook Account */}
                      {externalIdsData.facebook_id ? (
                        <Link
                          to={`https://www.facebook.com/${externalIdsData.facebook_id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4"
                        >
                          <span className="sr-only">Account</span>
                          <FacebookFilled
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : null}

                      {/* Twitter Account */}
                      {externalIdsData.twitter_id ? (
                        <Link
                          to={`https://www.twitter.com/${externalIdsData.twitter_id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4"
                        >
                          <span className="sr-only">Account</span>
                          <TwitterCircleFilled
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : null}

                      {/* Instagram Account */}
                      {externalIdsData.instagram_id ? (
                        <Link
                          to={`https://www.instagram.com/${externalIdsData.instagram_id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4"
                        >
                          <span className="sr-only">Account</span>
                          <InstagramFilled
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  {movieData.number_of_seasons ? (
                    <div className="mt-8 border-t border-gray-200 pt-8">
                      <h2 className="text-sm font-medium text-gray-400 uppercase">
                        Number of Seasons
                      </h2>

                      <div className="prose prose-sm mt-4 text-white">
                        <ul role="list">{movieData.number_of_seasons}</ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {movieData.number_of_episodes ? (
                    <div className="mt-8 border-t border-gray-200 pt-8">
                      <h2 className="text-sm font-medium text-gray-400 uppercase">
                        Number of Episodes
                      </h2>

                      <div className="prose prose-sm mt-4 text-white">
                        <ul role="list">{movieData.number_of_episodes}</ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-400 uppercase">
                      Status
                    </h2>

                    <div className="prose prose-sm mt-4 text-white">
                      <ul role="list">{movieData.status}</ul>
                    </div>
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
                  {!ifTV ? (
                    <section className="mt-10">
                      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <Cards title="Budget" budget={movieData.budget} />
                        <Cards title="Revenue" budget={movieData.revenue} />
                      </dl>
                    </section>
                  ) : (
                    ""
                  )}

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
                            src={
                              company.logo_path
                                ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                                : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
                            }
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
