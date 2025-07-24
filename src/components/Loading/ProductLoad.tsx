// src/components/Loading/ProductLoader.tsx
import React from "react";

const ProductLoader = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <div className="h-10 w-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default ProductLoader;
