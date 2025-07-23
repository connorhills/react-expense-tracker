import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector, 
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

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
          cy={150}
          outerRadius={140}
          innerRadius={90}
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
        <Legend content={CustomLegend} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y={145}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y={175}
              textAnchor="middle"
              fill="#c9c9c9"
              fontSize="24px"
              fontWeight="semi-bold"
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
