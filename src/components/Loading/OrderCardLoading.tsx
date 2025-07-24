const OrderCardLoading = () => {
  return (
    <div className="col-span-1 flex flex-col sm:flex-row bg-white border border-gray-100 shadow-md rounded-2xl p-4 w-full max-w-[420px] animate-pulse">
      {/* Image Skeleton */}
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-5 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
          <div className="h-3 w-2/5 bg-gray-200 rounded" />
          <div className="h-2 w-1/3 bg-gray-200 rounded" />
          <div className="h-2 w-1/2 bg-gray-200 rounded" />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-20 bg-gray-300 rounded-full" />
        </div>

        <div className="mt-4 border-t pt-3 space-y-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default OrderCardLoading;
