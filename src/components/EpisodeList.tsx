import { FC } from "react";
import { format } from "date-fns";
import { EpisodeListProps } from "../typings";
import { StarFilled } from "@ant-design/icons";

const EpisodeList: FC<EpisodeListProps> = ({ series }) => {
  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8"
      >
        {series.map((data) => (
          <li
            key={data.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {data.name}
                  </h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <StarFilled className="mr-1" />
                    {data.vote_average}
                  </span>
                </div>
              </div>
              <img
                className="h-1/2 w-2/5 bg-gray-300"
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                    : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
                }
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    {data.air_date &&
                      format(new Date(data.air_date), "d MMMM yyyy")}
                  </div>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    {data.episode_count} Episodes
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
