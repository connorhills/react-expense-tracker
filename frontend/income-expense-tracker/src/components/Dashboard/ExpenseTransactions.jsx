import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 4).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.description}
              icon={expense.icon}
              date={moment(expense.date).format("MMMM D, YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No expenses to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
