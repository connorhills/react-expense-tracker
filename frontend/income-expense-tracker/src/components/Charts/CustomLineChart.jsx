import React, { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  // Add unique id and index to each entry
  const [tickFontSize, setTickFontSize] = useState(window.innerWidth < 640 ? 9 : 12);

  useEffect(() => {
    const handleResize = () => {
      setTickFontSize(window.innerWidth < 640 ? 10 : 12);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dataWithIndex = data.map((entry, idx) => ({
    ...entry,
    id: entry.id ?? idx,
    index: idx,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      const bgColor = "#03a1fc";

      return (
        <div
          className="shadow-md rounded-lg p-1 border"
          style={{ backgroundColor: "#101010", borderColor: bgColor }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: bgColor }}>
            {entry.source
              ? entry.source
              : entry.description
                ? entry.description
                : "Income"}
          </p>
          <p className="text-sm text-secondary">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-300/80">
              ${entry.amount}
            </span>
          </p>
          {entry.date && (
            <p className="text-xs text-gray-400 mt-1">Date: {entry.date}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background-color-1 p-4 border border-blue-500/40 shadow-md/30 shadow-primary rounded-2xl">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={dataWithIndex}
          margin={{ left: -15, right: 0, top: 5, bottom: 0 }} // <-- Add this line
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#03a1fc" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#03a1fc" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="id"
            tickFormatter={(id) => {
              const entry = dataWithIndex.find((e) => e.id === id);
              return entry?.month || entry?.date || "";
            }}
            tick={{ fontSize: tickFontSize, fill: "#d9d9d9" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#d9d9d9", dx: -15 }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#03a1fc"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#03a1fc", strokeWidth: 2, fill: "#101010" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
