import React from 'react';
import { FaStar } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

type ReviewCardProps = {
  name: string;
  review: string;
  verified?: boolean;
  stars?: number; // optional: how many stars (default 1)
};

const ReviewCard: React.FC<ReviewCardProps> = ({ name, review, verified = false, stars = 1 }) => {
  return (
    <div className="col-span-1 max-w-sm max-h-[320px] border border-gray-300 flex-col rounded-xl inline-block sm:inline-flex sm:m-5 m-1">
      <div className="p-3">
        {/* Show stars */}
        <div className="flex mb-2">
          {Array.from({ length: stars }).map((_, index) => (
            <FaStar key={index} className="text-yellow-300 text-xl" />
          ))}
        </div>

        {/* Name + verified */}
        <p className="flex items-center gap-3 font-semibold">
          {name}{' '}
          {verified && (
            <span>
              <MdVerified className="text-blue-500" />
            </span>
          )}
        </p>

        {/* Review */}
        <p className="line-clamp-3">{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
