import { FC } from "react";
import { RollbackOutlined } from "@ant-design/icons";
import { MovieListProps } from "../typings";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import CircularProgressBar from "./CircularProgressBar";
import { percent } from "../utils";

const MovieList: FC<MovieListProps> = ({
  categories,
  browse,
  products,
  four,
  link,
}) => {
  const query = useLocation().pathname;
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
            <div className="mt-2 ml-2">{categories}</div>
          </h2>
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {four && (
              <div>
                <Link to={link}>{browse}</Link>
                <span aria-hidden="true"> &rarr;</span>
              </div>
            )}
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products?.length === 0 ? (
            <div>There are no movies that matches your query</div>
          ) : (
            products?.map((product) => (
              <Link to={`/details/${product.id.toString()}`} key={product.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={product.backdrop_path ? `https://image.tmdb.org/t/p/original${product.backdrop_path}` : "https://www.snapon.co.za/images/thumbs/default-image_550.png"}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-lg font-semibold text-left text-black">
                      {product.title}
                    </h3>
                    <h3 className="text-sm text-left font-medium text-gray-600">
                      {product.release_date && format(
                        new Date(product.release_date),
                        "d MMMM yyyy"
                      )}
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
