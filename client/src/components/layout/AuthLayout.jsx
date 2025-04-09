import React from "react";
import doodle from "./../../assets/images/doodle.jpg";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 z-0" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-700  absolute top-[30%] -right-10 z-0" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 z-0" />

        <div className="grid grid-cols-1 z-10 relative gap-2 h-screen justify-around my-12">
          <StatusInfoCard 
          icon={<LuTrendingUpDown />} 
          label= "Track your Income & Expenses" 
          value="430,000" 
          color="bg-primary"/>
          <StatusInfoCard 
          icon={<LuTrendingUpDown />} 
          label= "Track your Income & Expenses" 
          value="130,000" 
          color="bg-primary"/>
          <StatusInfoCard 
          icon={<LuTrendingUpDown />} 
          label= "Track your Income & Expenses" 
          value="580,000" 
          color="bg-primary"/>

        </div>
        {/* <img src={doodle} alt="Doodle" className="w-64 lg:w-[90p%] absolute bottom-10 shadow-lg shadow-blue-400/15" /> */}
      </div>
    </div>
  );
};

export default AuthLayout;

const StatusInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="h-25 relative z-20 flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  );
};

