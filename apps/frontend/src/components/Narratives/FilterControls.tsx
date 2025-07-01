import React from "react";

interface FilterControlsProps {
  selectedPeriod: "7D" | "30D" | "90D";
  onSelect: (period: "7D" | "30D" | "90D") => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedPeriod,
  onSelect,
}) => {
  const options: Array<"7D" | "30D" | "90D"> = ["7D", "30D", "90D"];

  return (
    <div className="flex space-x-2">
      {options.map((period) => (
        <button
          key={period}
          onClick={() => onSelect(period)}
          className={`px-3 py-1 rounded text-sm font-medium ${
            selectedPeriod === period
              ? "bg-accent-500 text-primary-900"
              : "bg-primary-600 text-gray-300 hover:bg-primary-500"
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
