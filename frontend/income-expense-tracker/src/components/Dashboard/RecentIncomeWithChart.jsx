import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import CustomLegend from "../Charts/CustomLegend";

const COLORS = [
  "#03a1fc", "#22c55e", "#ef4444", "#8422c5", "#f59e42",
  "#eab308", "#14b8a6", "#64748b", "#f472b6", "#a3e635"
];

const MAX_LEGEND = 5;

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const prepareChartData = () => {
    const dataArr = Array.isArray(data)
      ? data.map((item) => ({
        name: item?.source,
        amount: item?.amount,
      }))
      : [];
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  const mainLegend = chartData.slice(0, MAX_LEGEND);
  const extraLegend = chartData.slice(MAX_LEGEND);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      {chartData && chartData.length > 0 ? (
        <>
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
          />
          <div className="relative flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center space-x-6 -mt-8">
              {mainLegend.map((d, i) => (
                <div key={`legend-${i}`} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></div>
                  <span className="text-secondary text-[20px]">
                    {d.name}
                  </span>
                </div>
              ))}
              {extraLegend.length > 0 && (
                <button
                  className={`text-xs ml-2 underline underline-offset-2 cursor-pointer ${showPopup ? "text-red-500 hover:text-red-700" : "text-primary hover:text-blue-300"}`}
                  onClick={() => setShowPopup((v) => !v)}
                >
                  {showPopup ? "Close" : `+${extraLegend.length} more`}
                </button>
              )}
            </div>
            {showPopup && extraLegend.length > 0 && (
              <div className="absolute z-10 top-20 lg:top-8 bg-background-color-1 border-2 border-primary rounded shadow-lg p-3 min-w-[150px]">
                <CustomLegend
                  payload={extraLegend.map((d, i) => ({
                    value: d.name,
                    color: COLORS[(i + MAX_LEGEND) % COLORS.length],
                  }))}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-400">
          No income data to display.
        </div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
