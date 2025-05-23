import React, { useState } from "react";
import Input from "./../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
const IncomeAddForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.source}
        label="Income Source"
        placeholder="Freelance, salary, etc.."
        onChange={(e) => handleChange("source", e.target.value)}
        type="text"
      />
      <Input
        value={income.amount}
        label="Amount"
        placeholder="Amount"
        onChange={(e) => handleChange("amount", e.target.value)}
        type="number"
      />
      <Input
        value={income.date}
        label="Date"
        placeholder="Amount"
        onChange={(e) => handleChange("date", e.target.value)}
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default IncomeAddForm;
