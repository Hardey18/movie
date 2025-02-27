import { FC } from "react";
import { ICreditDataProps } from "../typings";
import { getYear } from "../utils";
import { useNavigate } from "react-router-dom";

const RecomendationCarousel: FC<ICreditDataProps> = ({ cast }) => {
  const navigate = useNavigate();
  const ifTV = window.location.href.includes("tv");
  const handleClick = (id: number) => {
    navigate(`${ifTV ? '/details/tv/' : '/details/'}${id}`, { replace: true });
    window.location.reload();
    window.scrollTo({ top: 0, left: 0})
  };
  return (
    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar mt-4">
      <div className="flex flex-nowrap">
        {cast?.map((actor) => (
          <button onClick={() => handleClick(actor?.id)} key={actor?.id}>
            <div className="rounded shadow-lg px-3 w-[148px]">
              <img
                className="w-full h-[140px]"
                src={
                  actor.poster_path
                    ? `https://image.tmdb.org/t/p/original${actor?.poster_path}`
                    : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
                }
                alt={actor.title}
              />
              <div className="py-2">
                <div className="font-medium text-gray-400 text-sm mb-1">
                  {ifTV ? actor?.name : actor?.title}
                </div>
                <p className="text-white text-base">
                  {getYear(ifTV ? actor?.first_air_date : actor?.release_date)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecomendationCarousel;
