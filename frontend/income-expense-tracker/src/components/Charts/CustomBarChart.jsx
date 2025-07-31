import React, { useState, useEffect } from "react";
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
  const [visibleData, setVisibleData] = useState(data);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleData(data.slice(-5));
      } else {
        setVisibleData(data);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  const dataWithIndex = visibleData.map((entry, idx) => ({
    ...entry,
    id: entry.id ?? idx, // Use existing id or fallback to index
    index: idx,
  }));

  // Function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#46a9e3" : "#2347fc";
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      const bgColor = getBarColor(entry.index ?? 0);

      return (
        <div
          className="shadow-md rounded-lg p-2 border"
          style={{ backgroundColor: "#101010", borderColor: bgColor }}
        >
          {showDate && entry.source && (
            <p className="text-xs font-semibold mb-1" style={{ color: bgColor }}>
              {entry.source}
            </p>
          )}
          {showName && !showDate && (
            <p className="text-xs font-semibold mb-1" style={{ color: bgColor }}>
              {entry.description || entry.category || entry.source || ""}
            </p>
          )}
          <p className="text-sm text-secondary">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-300/80">
              ${entry.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-barchart-background mt-3 py-3">
      <ResponsiveContainer width="100%" height={335}>
        <BarChart
          data={dataWithIndex}
          margin={{ top: 10, right: 20, left: -10, bottom: -5 }}
        >
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="id"
            tickFormatter={(id) => {
              const entry = dataWithIndex.find((e) => e.id === id);
              return entry?.date || entry?.month || "";
            }}
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
            {dataWithIndex.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
