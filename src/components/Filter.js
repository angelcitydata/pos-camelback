import React from "react";

const Filter = ({ setFilter, selectedFilter, filters }) => {
  // const filters = ["all", "coffee", "tea", "dessert"];
  const updatedFilters = ["All", ...filters];
  return (
    <div className="space-y-5">
      {updatedFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={` pl-6 text-left uppercase h-12 space-y-10  w-full ${
            selectedFilter === filter
              ? "bg-gray-100 text-blue-800 pr-2 rounded-r-3xl "
              : "text-white"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filter;
