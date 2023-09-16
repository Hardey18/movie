import { FC } from "react";
import { ICreditDataProps } from "../typings";

const CardCarousel:FC<ICreditDataProps> = ({ cast }) => {
  console.log("CAST", cast);
  return (
    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar mt-4">
      <div className="flex flex-nowrap">
        {cast?.map(actor => (
        <div key={actor.id} className="rounded shadow-lg px-3 w-[148px]">
          <img
            className="w-full h-[140px]"
            src={actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : "https://www.snapon.co.za/images/thumbs/default-image_550.png"}
            alt={actor.name}
          />
          <div className="py-2">
            <div className="font-medium text-gray-400 text-xl mb-1">{actor.name}</div>
            <p className="text-white text-base">
              {actor.character}
            </p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
