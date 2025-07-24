import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomBarChart = ({ data, showName = true, showDate = false }) => {
  // Function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#46a9e3" : "#2347fc";
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      const bgColor = getBarColor(payload[0].payload.index ?? 0);

      return (
        <div
          className="shadow-md rounded-lg p-2 border"
          style={{ backgroundColor: "#101010", borderColor: bgColor }}
        >
          {showName && (
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: bgColor }}
            >
              {entry.source
                ? entry.source
                : entry.category
                ? entry.category
                : entry.description
                ? entry.description
                : "Income"}
            </p>
          )}
          <p className="text-sm text-secondary">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-300/80">
              ${entry.amount}
            </span>
          </p>
          {showDate && (
            <p className="text-xs text-gray-400 mt-1">
              Date: {entry.date ? entry.date : entry.month}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-barchart-background mt-3 py-3">
      <ResponsiveContainer width="100%" height={335}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: -5 }}
        >
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey={
              data.length && data[0].source
                ? "source"
                : data.length && data[0].date
                ? "date"
                : "month"
            }
            tick={{ fontSize: 12, fill: "#d9d9d9" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#d9d9d9" }} stroke="none" />
          <Tooltip content={CustomToolTip} cursor={{ fill: "#303030" }} />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
