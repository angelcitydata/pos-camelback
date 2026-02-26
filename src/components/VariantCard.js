import React from "react";

import Blob from "./Blob";

const tileButtonClass =
  "group relative flex flex-col gap-1 justify-center h-full min-h-0 w-full rounded-2xl overflow-hidden bg-slate-50/75 p-4 text-left transition-all duration-300 hover:bg-green-500/90 active:bg-green-200 hover:cursor-pointer hover:shadow-lg hover:shadow-slate-200/50";

export default function VariantCard({
  variant,
  productName,
  quantityInCart = 0,
  onClick,
}) {
  const displayName =
    variant.name === "Default Title" ? productName : variant.name;

  return (
    <button type="button" className={tileButtonClass} onClick={onClick}>
      {quantityInCart > 0 && (
        <span
          className="absolute top-3 right-3 z-20 flex min-w-[1.5rem] items-center justify-center rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold tabular-nums text-white shadow-sm transition group-hover:bg-white group-hover:text-green-600"
          aria-label={`${quantityInCart} in cart`}
        >
          {quantityInCart}
        </span>
      )}
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
        <p className="text-[16px] font-medium leading-4 text-slate-900 line-clamp-2 transition group-hover:text-white pr-8">
          {displayName}
        </p>
        <p className="mt-1 text-xs font-semibold text-slate-900/80 transition group-hover:text-white/80">
          ${variant.price}
        </p>
      </div>
    </button>
  );
}
