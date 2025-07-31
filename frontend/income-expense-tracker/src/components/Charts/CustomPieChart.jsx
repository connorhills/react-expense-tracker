import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const renderActiveShape = (props) => {
    return (
      <Sector
        cx={props.cx}
        cy={props.cy}
        innerRadius={props.innerRadius}
        outerRadius={props.outerRadius + 10}
        startAngle={props.startAngle}
        endAngle={props.endAngle}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy={165}
          outerRadius={160}
          innerRadius={100}
          labelLine={false}
          stroke="#000"
          strokeWidth={6}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y={160}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="20px"
            >
              {label}
            </text>
            <text
              x="50%"
              y={200}
              textAnchor="middle"
              fill={
                parseFloat(totalAmount.toString().replace(/[^0-9.-]+/g, "")) < 0
                  ? "#FF4C4C"
                  : "#77DD77"
              }
              fontSize="40px"
              fontWeight="bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
