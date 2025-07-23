import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full mb-1"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-secondary text-[16px]">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
