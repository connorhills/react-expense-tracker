import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  console.log("RecentTransactions received:", transactions);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">Recent Transactions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions && transactions.length > 0 ? (
          transactions
            .slice(0, 4)
            .map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.type === "expense" ? item.description : item.source}
                icon={item.icon}
                date={moment(item.date).format("MMMM D, YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
              />
            ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No transactions to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
