import { FC } from "react";
import { ICreditDataProps } from "../typings";

const CardCarousel: FC<ICreditDataProps> = ({ cast }) => {
  return (
    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar mt-4">
      <div className="flex flex-nowrap">
        {cast?.map((actor) => (
          <div key={actor.id} className="rounded shadow-lg px-3 w-[148px]">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                  : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
              }
              className="mx-auto mb-4 w-32 rounded-lg"
              alt="Avatar"
            />
            <h5 className="mb-2 text-xl font-medium leading-tight">
              {actor.name}
            </h5>
            <p className="text-white">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
