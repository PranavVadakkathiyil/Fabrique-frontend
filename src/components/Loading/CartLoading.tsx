const CartLoading = () => {
  return (
    <div className="w-screen sm:flex mb-66">
      {/* Cart Skeleton */}
      <section className="sm:w-[70%] grid sm:grid-cols-2 grid-cols-1 gap-2 sm:p-6 p-2">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex gap-4 border border-gray-200 rounded-xl p-4"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
      </section>

      {/* Order Summary Skeleton */}
      <section className="sm:w-[30%] bg-white shadow-md rounded-2xl sm:p-6 p-4 sm:my-5 h-fit">
        <div className="animate-pulse space-y-5">
          <div className="h-6 bg-gray-300 w-1/2 rounded" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
            <div className="h-4 bg-gray-300 rounded w-4/6" />
          </div>
          <div className="h-px bg-gray-300 mx-5" />
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-5" />
          <div className="h-10 bg-gray-300 rounded-full w-full mt-5" />
          <div className="h-10 bg-gray-300 rounded-full w-full mt-3" />
        </div>
      </section>
    </div>
  );
};

export default CartLoading;
