import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";
import moment from "moment";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
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
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            {dateRange
              ? `Date Range: ${dateRange}`
              : "Track your spending trend over time and gain insights into where your money goes."}
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-6">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
