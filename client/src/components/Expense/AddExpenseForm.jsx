import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../inputs/Input";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    date: "",
    icon: "",
    amount: "",
  });

  const handleChange = (key, value) => setExpense( (prev) => {
    return {
        ...prev,
        [key] : value
    }
  })

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        label="expense category"
        placeholder="Rent, food, etc.."
        onChange={(e) => handleChange("category", e.target.value)}
        type="text"
      />
      <Input
        value={expense.amount}
        label="Amount"
        placeholder="Amount"
        onChange={(e) => handleChange("amount", e.target.value)}
        type="number"
      />
      <Input
        value={expense.date}
        label="Date"
        placeholder="Amount"
        onChange={(e) => handleChange("date", e.target.value)}
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={() => onAddExpense(expense)}
        >
          Add expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
