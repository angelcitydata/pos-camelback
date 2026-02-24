import React from "react";

export default function ProductTag({ label }) {
  return (
    <span
      className="inline-flex items-center rounded-md bg-slate-200/90 px-2 py-0.5 text-[10px] font-medium text-slate-600"
      title={label}
    >
      {label}
    </span>
  );
}
