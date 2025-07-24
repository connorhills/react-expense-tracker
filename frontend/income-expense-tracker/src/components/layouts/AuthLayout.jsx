import React from "react";
import CARD_1 from "../../assets/images/card1.png"
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-white">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-blue-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-blue-400 absolute -top-7 -left-5" />
        <div className="w-64 h-64 rounded-[40px] border-[20px] border-cyan-400 absolute top-[47%] -right-20" />
        <div className="w-48 h-48 rounded-[40px] bg-blue-300 absolute -bottom-7
         -left-5" />

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="123,456"
            color="bg-primary"
          />
        </div>

        <img
          src={CARD_1}
          className="w-[85%] lg:w-[92%] absolute mt-5 shadow-lg shadow-blue-300/20"
        />

        <img
          src={CARD_2}
          className="w-[85%] lg:w-[92%] absolute bottom-7 shadow-lg shadow-blue-300/20"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-background-color-1 p-4 rounded-xl shadow-md shadow-blue-400/20 border-1 border-primary z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-secondary mb-1">{label}</h6>
        <span className="text-[20px] text-gray-300/70">${value}</span>
      </div>
    </div>
  );
};
