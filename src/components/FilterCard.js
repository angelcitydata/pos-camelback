import React from "react";

const tileButtonClass =
  "flex flex-col w-full gap-1 justify-center items-center bg-white p-8 rounded-xl text-left transition hover:bg-green-100 active:bg-green-200 hover:cursor-pointer";

export default function FilterCard({ filter, count, icon, selected, onClick }) {
  return (
    <button
      className={`${tileButtonClass} ${
        selected
          ? "border-l-4 border-green-500 bg-green-100 pl-7 text-slate-900"
          : ""
      }`}
      onClick={onClick}
    >
      {icon && (
        <i
          className={`fa-regular fa-${icon} text-lg mb-0.5 ${
            selected ? "text-green-500" : "text-slate-500"
          }`}
          aria-hidden
        />
      )}
      <p
        className={`text-xs text-center font-medium leading-4 ${
          selected ? "text-green-900" : "text-slate-900"
        }`}
      >
        {filter}
      </p>
      <p
        className={`text-[11px] font-medium ${
          selected ? "text-green-700" : "text-slate-500"
        }`}
      >
        ({count})
      </p>
    </button>
  );
}
