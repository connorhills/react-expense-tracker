import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import CustomLegend from "../Charts/CustomLegend"; // Import CustomLegend component

const COLORS = ["#03a1fc", "#22c55e", "#ef4444"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  console.log("FinanceOverview balanceData:", balanceData);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      {(totalBalance === 0 && totalIncome === 0 && totalExpense === 0) ? (
        <div className="text-center py-10 text-gray-400">
          No financial data to display.
        </div>
      ) : (
        <>
          <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor
          />
          <CustomLegend
            payload={balanceData.map((d, i) => ({
              value: d.name,
              color: COLORS[i % COLORS.length],
            }))}
            mbClass="-mt-8"
          />
        </>
      )}
    </div>
  );
};

export default FinanceOverview;
