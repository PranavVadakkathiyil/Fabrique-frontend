import React from 'react';

const SellerOrderSkeleton = () => {
  return (
    <div className="w-full px-4 py-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center tracking-tight animate-pulse">
        🧾 Loading Seller Orders...
      </h2>

      <div className="space-y-8 max-w-7xl mx-auto">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-12 gap-6 animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="md:col-span-2 h-36 md:h-full overflow-hidden rounded-xl bg-gray-200"></div>

            {/* Product Details */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="h-6 w-2/3 bg-gray-200 rounded mb-2"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 mt-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <div className="h-4 bg-gray-200 rounded w-40"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>

            {/* Shipping & Status */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div className="space-y-1 text-sm text-gray-800 mb-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-36"></div>
              </div>

              <div className="space-y-3">
                <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrderSkeleton;
