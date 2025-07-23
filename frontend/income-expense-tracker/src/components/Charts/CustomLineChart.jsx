import React from "react";
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
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      const bgColor = "#03a1fc";

      return (
        <div
          className="shadow-md rounded-lg p-2 border"
          style={{ backgroundColor: "#101010", borderColor: bgColor }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: bgColor }}>
            {entry.category ? entry.category : "Expense"}
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
    <div className="bg-background-color-1 py-2">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#03a1fc" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#03a1fc" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#d9d9d9" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#d9d9d9" }} stroke="none" />
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
