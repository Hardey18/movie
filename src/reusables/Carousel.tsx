import { Carousel } from "@material-tailwind/react";
import { IImageObjectProps } from "../typings";

const CarouselCustomNavigation = ({ imageObject }: IImageObjectProps) => {
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      autoplay
      autoplayDelay={5000}
    >
        {imageObject.backdrops?.map(data => (
            <img
            src={`https://image.tmdb.org/t/p/original${data?.file_path}`}
            key={data?.file_path}
            title="Image"
            alt=""
            className="h-full w-full object-cover"
        />
        ))}
    </Carousel>
  );
};

export default CarouselCustomNavigation;
