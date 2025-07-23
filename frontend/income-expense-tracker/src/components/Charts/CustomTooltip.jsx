import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`bg-black shadow-md rounded-lg p-2 border`}
        style={{
          borderColor: payload[0].payload.fill || "#03a1fc",
          borderWidth: "2px",
        }}
      >
        <p className="text-xs font-semibold text-secondary mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-300">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-300/50">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }
};

export default CustomTooltip;
