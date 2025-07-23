import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import moment from "moment"; 

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    let result = prepareExpenseBarChartData(data);
    result = result.sort((a, b) => new Date(a.date) - new Date(b.date));
    setChartData([...result]); 

    if (data && data.length > 0) {
      const sorted = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const start = moment(sorted[0].date).format("MMM D, YYYY");
      const end = moment(sorted[sorted.length - 1].date).format("MMM D, YYYY");
      setDateRange(`${start} - ${end}`);
    } else {
      setDateRange("");
    }

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expense</h5>
      </div>
      {dateRange && (
        <p className="text-xs text-gray-400 mt-1 mb-2">{dateRange}</p>
      )}
      <CustomBarChart data={chartData} showName={true} showDate={false} />
    </div>
  );
};

export default Last30DaysExpenses;
