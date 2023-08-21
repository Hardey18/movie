import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { TargetProps } from "../typings";

const HomeHeader = () => {
  const [search, setSearch] = useState("");
  const onChange = ({ target }: TargetProps) => setSearch(target.value);

  return (
    <div className="bg-indigo-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
      </div>
    </div>
  );
};

export default HomeHeader;
