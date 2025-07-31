import React from "react";

const CustomLegend = ({ payload, mbClass = "" }) => {
  return (
    <div className={`flex flex-wrap justify-center space-x-6 ${mbClass}`}>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-secondary text-[15px] lg:text-[20px]">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
