import React from "react";

import FilterCard from "./FilterCard";
import { getFilterIcon } from "../filterIcons";

const Filter = ({
  setFilter,
  selectedFilter,
  filters,
  filterCounts,
  filterMode,
  setFilterMode,
  collections,
}) => {
  return (
    <div className="flex flex-col h-full min-h-0">
      <h2 className="px-1 pb-4 text-base font-semibold tracking-wide text-slate-900 uppercase">
        Filters
      </h2>
      <div className="grid grid-cols-2 my-1.5 rounded-full overflow-hidden bg-slate-200">
        <button
          onClick={() => setFilterMode("Collections")}
          className={`h-10 px-2 text-[11px] font-semibold rounded-full uppercase transition ${
            filterMode === "Collections"
              ? "bg-green-500 text-white"
              : "text-slate-600 hover:cursor-pointer"
          }`}
        >
          Collections
        </button>
        <button
          onClick={() => setFilterMode("Product Type")}
          className={`h-10 px-2 text-[11px] font-semibold rounded-full uppercase transition ${
            filterMode === "Product Type"
              ? "bg-green-500 text-white"
              : "text-slate-600 hover:cursor-pointer"
          }`}
        >
          Product Type
        </button>
      </div>
      <div className="flex flex-col flex-1 min-h-0 gap-2 mt-2 space-y-1 overflow-y-auto scrollbar-hide">
        {filters.map((filter) => (
          <FilterCard
            key={filter}
            filter={filter}
            count={filterCounts[filter] ?? 0}
            icon={getFilterIcon(filter, filterMode, collections)}
            selected={selectedFilter === filter}
            onClick={() => setFilter(filter)}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
