import React from "react";

import MonthlySubscriptionsChart from "../shared/rechart/MonthlySubscriptionsChart";

const DashboardMonthlySubscriptionsChart = () => {
  return (
    <div className="bg-white p-12">
      <h2 className="text-2xl font-bold text-[#11142D]">
        Subscriptions this Month
      </h2>
      <div className="w-full my-8 border border-gray-200" />
      <div className="flex items-start justify-between">
        <div className="w-[15%]">
          <div className="my-8">
            <h2 className="text-xl font-medium text-gray-700 mb-1">Trials</h2>
            <div className="flex items-center space-x-2">
              <h2 className="text-4xl font-bold text-gray-700">500</h2>
              <p className="text-lg font-medium">10%</p>
            </div>
          </div>
          <div className="my-8">
            <h2 className="text-xl font-medium text-gray-700 mb-1">Monthly</h2>
            <div className="flex items-center space-x-2">
              <h2 className="text-4xl font-bold text-gray-700">5</h2>
              <p className="text-lg font-medium">10%</p>
            </div>
          </div>
          <div className="my-8">
            <h2 className="text-xl font-medium text-gray-700 mb-1">Yearly</h2>
            <div className="flex items-center space-x-2">
              <h2 className="text-4xl font-bold text-gray-700">25</h2>
              <p className="text-lg font-medium">12%</p>
            </div>
          </div>
        </div>
        <div className="w-[85%]">
          <div className="flex items-center space-x-16 mb-10 ml-5">
            <div className="flex items-center space-x-4">
              <div className="bg-primary border-gray-300 border-2 w-14 h-5" />
              <h2 className="text-lg font-medium text-gray-700 mb-1">Trials</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-secondary border-gray-300 border-2 w-14 h-5" />
              <h2 className="text-lg font-medium text-gray-700 mb-1">
                Subscribed
              </h2>
            </div>
          </div>
          <MonthlySubscriptionsChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardMonthlySubscriptionsChart;
