import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { Emoji } from "emoji-picker-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    description: "",
    amount: "",
    date: null, 
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.description}
        onChange={({ target }) => handleChange("description", target.value)}
        label="Description"
        placeholder="Rent, Groceries, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <div className="mb-4 mt-3 w-full">
        <label className="block text-sm font-medium text-secondary mb-1">
          Date
        </label>
        <DatePicker
          selected={income.date}
          onChange={(date) => handleChange("date", date)}
          placeholderText="Select date"
          className="input-box w-full"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(income)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
