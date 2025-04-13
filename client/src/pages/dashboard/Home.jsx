import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/cards/InfoCard";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinancialOverview from "../../components/Dashboard/FinancialOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "./../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import IncomeTransactions from "../../components/Dashboard/IncomeTransactions";

const Home = () => {
  const { checkAuth, user } = useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.log("Error in fetching dashboard data", error);
      // todo: handle errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
        />

        <FinancialOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />

        <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")}
        />

        <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
        />

        <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transactions.slice(0, 4) || []}
          totalIncome={dashboardData?.last60DaysIncome?.total || 0}
        />

        <IncomeTransactions
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
        />
      </div> */}
    </DashboardLayout>
  );
};

export default Home;
