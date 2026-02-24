import React from "react";

const Filter = ({
  setFilter,
  selectedFilter,
  filters,
  filterMode,
  setFilterMode,
}) => {
  return (
    <div className="flex flex-col h-full min-h-0">
      <h2 className="px-1.5 pb-1.5 text-[11px] font-semibold tracking-wide text-gray-600 uppercase border-b border-gray-300">
        Filters
      </h2>
      <div className="grid grid-cols-2 gap-1 pt-1.5">
        <button
          onClick={() => setFilterMode("Collections")}
          className={`h-10 px-2 text-[11px] font-semibold uppercase border transition ${
            filterMode === "Collections"
              ? "bg-gray-300 border-gray-400 text-gray-800"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Collections
        </button>
        <button
          onClick={() => setFilterMode("Product Type")}
          className={`h-10 px-2 text-[11px] font-semibold uppercase border transition ${
            filterMode === "Product Type"
              ? "bg-gray-300 border-gray-400 text-gray-800"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Product Type
        </button>
      </div>
      <div className="filter-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto pt-1.5">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={`w-full h-12.5 px-1.5 text-left text-[16px] uppercase border transition ${
              selectedFilter === filter
                ? "bg-gray-300 border-gray-400 text-gray-800"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
