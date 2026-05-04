import React from "react";

import Blob from "./Blob";

const tileButtonClass =
  "group relative flex flex-col gap-1 justify-center h-full min-h-0 w-full rounded-2xl overflow-hidden bg-slate-50/75 p-4 text-left transition-all duration-300 hover:bg-green-500/90 active:bg-green-200 hover:cursor-pointer hover:shadow-lg hover:shadow-slate-200/50";

const disabledTileButtonClass =
  "relative flex flex-col gap-1 justify-center h-full min-h-0 w-full rounded-2xl overflow-hidden bg-slate-100 p-4 text-left opacity-60 cursor-not-allowed";

export default function VariantCard({
  variant,
  productName,
  quantityInCart = 0,
  onClick,
  disabled = false,
}) {
  console.log(variant);
  const displayName =
    variant.name === "Default Title" ? productName : variant.name;

  return (
    <button
      type="button"
      className={disabled ? disabledTileButtonClass : tileButtonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {quantityInCart > 0 && (
        <span
          className="absolute top-3 right-3 z-20 flex min-w-6 items-center justify-center rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold tabular-nums text-white shadow-sm transition group-hover:bg-white group-hover:text-green-600"
          aria-label={`${quantityInCart} in cart`}
        >
          {quantityInCart}
        </span>
      )}
      {/* Blob as card background: large, centered, clipped by card */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[200%] w-[250%] -translate-x-1/2 -translate-y-1/2">
          <Blob className="w-full h-full" color="rgba(226, 232, 240, 0.25)" />
        </div>
      </div>

      {/* Content on top of blob */}
      <div className="relative z-10 flex flex-col w-full min-w-0 gap-1">
        <div className="flex justify-center w-full mb-2">
          <div className="relative overflow-hidden bg-white shadow-lg w-28 h-28 shrink-0 rounded-2xl shadow-slate-200/50">
            {variant.image && (
              <img
                src={variant.image}
                alt=""
                className="h-full w-full object-contain object-center p-1.5 pointer-events-none"
              />
            )}
          </div>
        </div>
        <p className="text-[16px] font-medium leading-4 text-slate-900 line-clamp-2 transition group-hover:text-white pr-8">
          {displayName}
        </p>
        <p className="mt-1 text-xs font-semibold transition text-slate-900/80 group-hover:text-white/80">
          ${variant.price}
        </p>
      </div>
    </button>
  );
}
