import React from "react";

const tileButtonClass =
  "group relative flex flex-col gap-1 justify-center bg-slate-50/75 p-4 rounded-2xl text-left transition-all duration-300 hover:bg-green-500 active:bg-green-200 hover:cursor-pointer hover:shadow-lg hover:shadow-slate-200/50";

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
          className="absolute top-3 right-3 flex min-w-[1.5rem] items-center justify-center rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold tabular-nums text-white shadow-sm transition group-hover:bg-white group-hover:text-green-600"
          aria-label={`${quantityInCart} in cart`}
        >
          {quantityInCart}
        </span>
      )}
      <p className="text-[16px] font-medium leading-4 text-slate-900 line-clamp-2 transition group-hover:text-white pr-8">
        {displayName}
      </p>
      <p className="mt-1 text-xs font-semibold text-slate-900/80 transition group-hover:text-white/80">
        ${variant.price}
      </p>
    </button>
  );
}
