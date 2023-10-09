import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { TargetProps } from "../typings";

const HomeHeader = () => {
  const [search, setSearch] = useState("");
  const onChange = ({ target }: TargetProps) => setSearch(target.value);

  return (
    <div className="bg-white">
      {/* <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Hardey Movies App
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Millions of movies to discover. Explore now.
          </p>
          <div className="relative flex w-full max-w-[24rem] mt-8">
            <Input
              type="search"
              label="Search for a movie"
              value={search}
              onChange={onChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
              crossOrigin={undefined}
            />
            <Link to={`/search/${search}`}>
              <Button
                size="sm"
                color={search ? "indigo" : "blue-gray"}
                disabled={!search}
                className="!absolute right-1 top-1 rounded"
              >
                Search
              </Button>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-purple-100/80">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto mt-0 md:mt-24">
              Hardey Movies App
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                Millions of movies to discover. Explore now.
              </p>
              <div className="relative flex w-full max-w-[24rem] mt-8">
                <Input
                  type="search"
                  label="Search for a movie or tv series"
                  value={search}
                  onChange={onChange}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  crossOrigin={undefined}
                />
                <Link to={`/search/movie/${search}`}>
                  <Button
                    size="sm"
                    color={search ? "indigo" : "blue-gray"}
                    disabled={!search}
                    className="!absolute right-1 top-1 rounded"
                  >
                    Search
                  </Button>
                </Link>
              </div>
            </div>
            <img
              src="https://image.tmdb.org/t/p/original/uMSxXLfH7v30gRNBqsQaSP3yqX5.jpg"
              alt=""
              className="mt-4 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover lg:max-w-none xl:row-span-2 xl:row-end-2"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
};

export default HomeHeader;
