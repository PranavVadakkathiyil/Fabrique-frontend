const ProductCardLoading = () => {
  return (
    <section className="col-span-1 border border-gray-100 animate-pulse">
      <div className="w-full h-[400px] bg-slate-200 rounded-xl p-1" />
      <div className="w-full font-text text-center p-3 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
        <div className="flex justify-center gap-3">
          <div className="h-4 w-10 bg-slate-200 rounded" />
          <div className="h-4 w-10 bg-slate-200 rounded" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </section>
  )
}

export default ProductCardLoading;
