import React from "react";
import { Button } from "./ui/button";

function Filters({
  allFilters,
  setAllFilters,
  setCurrentFilter,
  currentFilter,
}: any) {
  // Handler function to update the current filter state
  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  // Filters array to map through
  const filters = [
    { name: "Unread", value: "unread" },
    { name: "Read", value: "read" },
    { name: "Favourites", value: "favourites" },
  ];
  return (
    <div className="w-full py-3 border">
      <div className="flex flex-col sm:flex-row gap-y-5 gap-x-8 sm:items-center font-semibold">
        <p className="ml-4 sm:ml-0">Filter By:</p>
        <div className="space-x-4 flex items-center justify-center">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`font-semibold py-[1px] h-8 px-4 text-[#636363] bg-transparent hover:bg-[#e1e4ea] shadow-none rounded-full ${
                currentFilter === filter.value && "bg-[#e1e4ea]"
              }`}
            >
              {filter.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
