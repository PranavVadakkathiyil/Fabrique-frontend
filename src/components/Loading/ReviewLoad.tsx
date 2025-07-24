import React from 'react';

const ReviewCardLoading: React.FC = () => {
  return (
    <div className="col-span-1 max-w-sm max-h-[320px] border border-gray-300 flex-col rounded-xl inline-block sm:inline-flex sm:m-5 m-1 animate-pulse bg-white">
      <div className="p-3 space-y-3">
        {/* Star shimmer */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="w-5 h-5 bg-yellow-100 rounded-full" />
          ))}
        </div>

        {/* Name shimmer */}
        <div className="h-4 w-1/2 bg-gray-200 rounded" />

        {/* Review shimmer */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
          <div className="h-3 w-4/5 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCardLoading;
