import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = [
  "#03a1fc", // blue
  "#22c55e", // green
  "#ef4444", // red
  "#8422c5", // purple
  "#f59e42", // orange
  "#eab308", // yellow
  "#14b8a6", // teal
  "#64748b", // slate
  "#f472b6", // pink
  "#a3e635", // lime
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = Array.isArray(data)
      ? data.map((item) => ({
          name: item?.source,
          amount: item?.amount,
        }))
      : [];
    setChartData(dataArr);
    console.log("Chart data:", dataArr); // Add this line
  };

  useEffect(() => {
    console.log("Income data:", data); // Check what is logged here
    prepareChartData();
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      {chartData && chartData.length > 0 ? (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`$${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      ) : (
        <div className="text-center py-10 text-gray-400">
          No income data to display.
        </div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
