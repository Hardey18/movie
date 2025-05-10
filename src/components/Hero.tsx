import { useState } from "react";
import { Link } from "react-router-dom";
import { TargetProps } from "../typings";

const Hero = () => {
  const [search, setSearch] = useState("");
  const onChange = ({ target }: TargetProps) => setSearch(target.value);
  return (
    <div>
      <section className="h-full">
        <div className="rounded-2xl bg-indigo-50 py-10 overflow-hidden m-5 lg:m-0 2xl:py-16 xl:py-8  lg:rounded-tl-2xl lg:rounded-bl-2xl" style={{ backgroundImage: "url(https://image.tmdb.org/t/p/original/lIKlhnKiQ2qSwv0gAzQuyi2inIB.jpg)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap32">
              <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0">
                <div className="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                  <span className="bg-indigo-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3">
                    #
                  </span>
                  movie app
                </div>
                <h1 className="py-8 text-center text-white font-bold font-manrope text-5xl lg:text-left leading-[70px]">
                  Hardey <span className="text-indigo-600">Movies App</span>
                </h1>
                <p className="text-white text-lg text-center lg:text-left">
                  Millions of Movies/TV Shows to discover. Explore now.
                </p>
                <div className="relative p-1.5 my-10  flex  items-center gap-y-4 h-auto md:h-16 flex-col md:flex-row justify-between rounded-full md:shadow-[0px 15px 30px -4px rgba(16, 24, 40, 0.03)] border border-transparent md:bg-white transition-all duration-500">
                  <input
                    type="text"
                    name="email"
                    value={search}
                    onChange={onChange}
                    placeholder="Search for a movie or tv series"
                    className="text-base rounded-full text-gray-900 flex-1 py-4 px-6 shadow-[0px 15px 30px -4px rgba(16, 24, 40, 0.03)] md:shadow-none bg-white md:bg-transparent shadow-none placeholder:text-gray-400 focus:outline-none md:w-fit w-full"
                  />
                  <Link className="" to={`/search/movie/${search}`}>
                    <button className="bg-indigo-600 rounded-full py-3 px-7 text-base font-semibold text-white hover:bg-indigo-700 cursor-pointer transition-all duration-500 md:w-fit w-full">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-full xl:col-span-7  lg:col-span-6 block z-50">
                <div className="w-full sm:w-auto lg:w-[60.8125rem] xl:ml-16">
                  <img
                    src="https://image.tmdb.org/t/p/original/uMSxXLfH7v30gRNBqsQaSP3yqX5.jpg"
                    alt="Dashboard"
                    className="rounded-l-3xl object-cover w-full  lg:h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
