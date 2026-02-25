import React from "react";

import Blob from "./Blob";
import ProductTag from "./ProductTag";

const tileButtonClass =
  "group relative flex flex-col gap-1 justify-start h-full min-h-0 w-full rounded-2xl overflow-hidden bg-slate-50/75 p-4 text-left transition-all duration-300 hover:bg-green-500/90 active:bg-green-200 hover:cursor-pointer hover:shadow-lg hover:shadow-slate-200/50";

export default function ProductCard({ product, onClick }) {
  const collections = product.collections || [];

  return (
    <button type="button" className={tileButtonClass} onClick={onClick}>
      {/* Blob as card background: large, centered, clipped by card */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[200%] w-[250%] -translate-x-1/2 -translate-y-1/2">
          <Blob className="h-full w-full" color="rgba(226, 232, 240, 0.25)" />
        </div>
      </div>

      {/* Content on top of blob */}
      <div className="relative z-10 flex w-full min-w-0 flex-col gap-1">
        <div className="flex w-full justify-center mb-2">
          <div className="relative w-28 h-28 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50">
            {product.image && (
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-contain object-center p-1.5 pointer-events-none"
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
      </div>
    </button>
  );
}
