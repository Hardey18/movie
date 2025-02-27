import { StarIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { ReviewProps } from "../typings";

const ReviewCard: FC<ReviewProps> = ({ review }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full">
      <div className="flex items-center space-x-4">
        <img
          src={
            review?.author_details?.avatar_path
              ? `https://image.tmdb.org/t/p/original${review?.author_details?.avatar_path}`
              : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
          }
          alt={review?.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{review?.author}</h3>
          <p className="text-gray-500 text-sm">
            {new Date(review?.created_at).toDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center mt-2">
        {[...Array(10)].map((_, index) => (
          <StarIcon
            key={index}
            className={`w-5 h-5 ${
              index < review?.author_details?.rating
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
            fill={index < review?.author_details?.rating ? "#facc15" : "none"}
          />
        ))}
      </div>
      <p className="text-gray-700 mt-3 text-sm text-justify">{review?.content}</p>
    </div>
  );
};

const ReviewList: any = ({ reviews }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 mx-auto w-full">
      {reviews.map((review) => (
        <ReviewCard key={review.author} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
