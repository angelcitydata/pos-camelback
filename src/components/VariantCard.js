import React from "react";

const tileButtonClass =
  "flex flex-col gap-1 justify-center bg-slate-50/75 p-4 rounded-xl text-left transition hover:bg-green-100 active:bg-green-200 hover:cursor-pointer";

export default function VariantCard({ variant, productName, onClick }) {
  const displayName =
    variant.name === "Default Title" ? productName : variant.name;

  return (
    <button className={tileButtonClass} onClick={onClick}>
      <p className="text-[16px] font-medium leading-4 text-slate-700 line-clamp-2">
        {displayName}
      </p>
      <p className="mt-1 text-xs font-semibold text-slate-800">
        ${variant.price}
      </p>
    </button>
  );
}
