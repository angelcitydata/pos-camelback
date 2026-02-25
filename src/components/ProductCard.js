import React from "react";

import Blob from "./Blob";
import ProductTag from "./ProductTag";

const tileButtonClass =
  "group flex flex-col gap-1 justify-start h-full min-h-0 w-full rounded-2xl overflow-hidden bg-slate-50/75 p-4 text-left transition-all duration-300 hover:bg-green-500 active:bg-green-200 hover:cursor-pointer hover:shadow-lg hover:shadow-slate-200/50";

export default function ProductCard({ product, onClick }) {
  const collections = product.collections || [];

  return (
    <button type="button" className={tileButtonClass} onClick={onClick}>
      <div className="relative w-full flex justify-center mb-2">
        <div className="relative w-28 h-28 flex-shrink-0 bg-white rounded-2xl overflow-hidden">
          <Blob className="absolute inset-0 w-full h-full" />
          {product.image && (
            <img
              src={product.image}
              alt=""
              className="absolute inset-0 w-full h-full object-contain p-1.5 pointer-events-none"
            />
          )}
        </div>
      </div>
      <p className="min-h-[2rem] text-[16px] font-medium leading-4 text-slate-900 line-clamp-2 transition group-hover:text-white">
        {product.name}
      </p>
      <p className="text-xs font-medium text-slate-900/30 transition group-hover:text-white/80">
        {product.type}
      </p>
      {collections.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {collections.map((collection) => (
            <ProductTag key={collection} label={collection} />
          ))}
        </div>
      )}
    </button>
  );
}
