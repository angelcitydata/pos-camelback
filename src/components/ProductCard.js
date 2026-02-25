import React from "react";

import ProductTag from "./ProductTag";

const tileButtonClass =
  "flex flex-col gap-1 justify-start h-full w-full rounded-xl overflow-hidden bg-slate-50/75 p-4 rounded-xl text-left transition hover:bg-green-100 active:bg-green-200 hover:cursor-pointer hover:shadow-lg hover:shadow-slate-200/50";

export default function ProductCard({ product, onClick }) {
  const collections = product.collections || [];

  return (
    <button type="button" className={tileButtonClass} onClick={onClick}>
      <p className="min-h-[2rem] text-[16px] font-medium leading-4 text-slate-900 line-clamp-2">
        {product.name}
      </p>
      <p className="text-xs font-medium text-slate-900/30">{product.type}</p>
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
