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
    <div className="w-full py-4">
      <div className="w-max space-x-4">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`py-[1px] h-8 px-4 bg-transparent text-black hover:bg-[#e1e4ea] shadow-none font-medium rounded-full ${
              currentFilter === filter.value && "bg-[#e1e4ea]"
            }`}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
