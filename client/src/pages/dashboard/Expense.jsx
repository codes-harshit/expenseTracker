import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (res.data) {
        setExpenseData(res.data);
      }
    } catch (error) {
      console.error("Error in fetching expense data", error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      alert("Please enter expense category");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter valid amount");
      return;
    }
    if (!date) {
      alert("Please enter date");
      return;
    }
    try {
      const res = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      fetchExpenseData();
    } catch (error) {
      console.log("Error in adding expense", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const res = await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseData();
    } catch (error) {}
  };

  const handleDownloadExpenseDetails = async () => {};

  useEffect(() => {
    fetchExpenseData();
  }, []);

  useEffect(() => {
    console.log(expenseData);
  }, [expenseData]);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) =>
              setOpenDeleteAlert({
                show: true,
                data: id,
              })
            }
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title={"Add Expense"}
        >
          <AddExpenseForm onAddExpense={addExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={"Delete Expense"}
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
