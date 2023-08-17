import { FC } from "react";
import { RollbackOutlined } from "@ant-design/icons";
import { MovieListProps } from "../typings";
import { Link } from "react-router-dom";

const MovieList: FC<MovieListProps> = ({
  categories,
  browse,
  products,
  four,
  link,
}) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center justify-center">
            {!four && (
              <Link to={"/"}>
                <RollbackOutlined style={{ color: "indigo" }} />
              </Link>
            )}
            <div className="mt-2 ml-2">{categories}</div>
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
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
            {products?.map((product) => (
              <Link to={`/details/${product.id.toString()}`} key={product.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/original${product.backdrop_path}`}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm text-left font-medium text-gray-900">
                      Release Date: {product.release_date}
                    </h3>
                    <p className="mt-1 text-sm text-left text-gray-500">
                      Rating {product.vote_average}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      {product.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
};

export default MovieList;
