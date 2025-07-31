import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";
import moment from "moment";
import CustomLineChart from "../Charts/CustomLineChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    if (transactions && transactions.length > 0) {
      const sorted = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const start = moment(sorted[0].date).format("MMM D, YYYY");
      const end = moment(sorted[sorted.length - 1].date).format("MMM D, YYYY");
      setDateRange(`${start} - ${end}`);
    } else {
      setDateRange("");
    }

    return () => { };
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            {dateRange
              ? `Date Range: ${dateRange}`
              : "Track your earnings over time and analyze your income trends."}
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-6">
        <CustomLineChart data={chartData} showName={true} showDate={true} />
      </div>
    </div>
  );
};

export default IncomeOverview;
