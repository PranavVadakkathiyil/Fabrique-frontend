const ProductViewLoading = () => {
  return (
    <section className="w-full sm:p-12 p-2 sm:flex gap-4 animate-pulse">
      {/* Left image skeleton */}
      <aside className="sm:w-2/6 w-full space-y-4">
        <div className="w-full h-[400px] bg-slate-200 rounded-xl" />
        <div className="grid grid-cols-4 gap-2">
          <div className="h-20 bg-slate-200 rounded-md"></div>
          <div className="h-20 bg-slate-200 rounded-md"></div>
          <div className="h-20 bg-slate-200 rounded-md"></div>
          <div className="h-20 bg-slate-200 rounded-md"></div>
        </div>
      </aside>

      {/* Right text section skeleton */}
      <aside className="sm:w-4/6 w-full space-y-4 p-4">
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>

        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
          <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
          <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
          <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
          <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
          <div className="h-5 bg-slate-200 w-10 rounded"></div>
        </div>

        <div className="h-7 w-1/3 bg-slate-200 rounded"></div>
        <div className="h-5 w-1/4 bg-slate-200 rounded"></div>

        <div className="space-y-2">
          <div className="h-4 bg-slate-200 w-full rounded"></div>
          <div className="h-4 bg-slate-200 w-5/6 rounded"></div>
          <div className="h-4 bg-slate-200 w-2/3 rounded"></div>
        </div>

        <hr className="my-4" />

        {/* Color options */}
        <div>
          <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
          </div>
        </div>

        <hr className="my-4" />

        {/* Size options */}
        <div>
          <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
          <div className="flex gap-3">
            <div className="h-10 w-12 bg-slate-200 rounded-md" />
            <div className="h-10 w-12 bg-slate-200 rounded-md" />
            <div className="h-10 w-12 bg-slate-200 rounded-md" />
            <div className="h-10 w-12 bg-slate-200 rounded-md" />
          </div>
        </div>

        <hr className="my-4" />

        {/* Quantity and Cart */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          <div className="flex w-full sm:w-1/3 gap-1">
            <div className="h-10 bg-slate-200 w-1/3 rounded-xl"></div>
            <div className="h-10 bg-slate-200 w-1/3 rounded-xl"></div>
            <div className="h-10 bg-slate-200 w-1/3 rounded-xl"></div>
          </div>
          <div className="h-10 bg-slate-200 w-full sm:w-2/3 rounded-xl"></div>
        </div>
      </aside>
    </section>
  );
};

export default ProductViewLoading;
