"use client";

import { useEffect, useState } from "react";
import MonthlySubscriptionsChart from "../shared/rechart/MonthlySubscriptionsChart";
import SubscribersSection from "./SubscribersSection";

const DashboardMonthlySubscriptionsChart = ({ usersDataList }: any) => {
  const calculateUserStats = (users: any) => {
    const currentDate = new Date();
    let weeklyUsers = 0;
    let weeklySubscribedUsers = 0;
    let monthlyUsers = 0;
    let monthlySubscribedUsers = 0;
    let yearlyUsers = 0;
    let yearlySubscribedUsers = 0;

    let currentMonthUsers = 0;
    let lastMonthUsers = 0;

    const monthlySubscriptionData = Array.from({ length: 12 }, () => ({
      subscribed: 0,
      unsubscribed: 0,
    }));

    const currentMonth = currentDate.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    users.forEach((user: any) => {
      const payDate = new Date(user.currentSubscriptionPayDate);
      const diffInTime = currentDate.getTime() - payDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      if (diffInDays <= 7) {
        weeklyUsers++;
        if (user.subscription) weeklySubscribedUsers++;
      }
      if (diffInDays <= 30) {
        monthlyUsers++;
        if (user.subscription) monthlySubscribedUsers++;
      }
      if (diffInDays <= 365) {
        yearlyUsers++;
        if (user.subscription) yearlySubscribedUsers++;
      }

      if (payDate.getMonth() === currentMonth) currentMonthUsers++;
      if (payDate.getMonth() === lastMonth) lastMonthUsers++;

      const monthIndex = payDate?.getMonth();
      if (user?.subscription) {
        monthlySubscriptionData[monthIndex].subscribed++;
      } else {
        monthlySubscriptionData[monthIndex].unsubscribed++;
      }
    });

    const totalUsers = users.length;

    const weeklyRatio = weeklyUsers
      ? ((weeklySubscribedUsers / weeklyUsers) * 100).toFixed(2) + "%"
      : "0%";
    const monthlyRatio = monthlyUsers
      ? ((monthlySubscribedUsers / monthlyUsers) * 100).toFixed(2) + "%"
      : "0%";
    const yearlyRatio = yearlyUsers
      ? ((yearlySubscribedUsers / yearlyUsers) * 100).toFixed(2) + "%"
      : "0%";
    const currentMonthVsLastMonthRatio =
      currentMonthUsers + lastMonthUsers
        ? (
            (currentMonthUsers / (currentMonthUsers + lastMonthUsers)) *
            100
          ).toFixed(2) + "%"
        : "0%";

    const monthlyStats = [
      { name: "January", ...monthlySubscriptionData[0] },
      { name: "February", ...monthlySubscriptionData[1] },
      { name: "March", ...monthlySubscriptionData[2] },
      { name: "April", ...monthlySubscriptionData[3] },
      { name: "May", ...monthlySubscriptionData[4] },
      { name: "June", ...monthlySubscriptionData[5] },
      { name: "July", ...monthlySubscriptionData[6] },
      { name: "August", ...monthlySubscriptionData[7] },
      { name: "September", ...monthlySubscriptionData[8] },
      { name: "October", ...monthlySubscriptionData[9] },
      { name: "November", ...monthlySubscriptionData[10] },
      { name: "December", ...monthlySubscriptionData[11] },
    ];

    return {
      totalUsers,
      weeklyUsers,
      weeklySubscribedUsers,
      monthlyUsers,
      monthlySubscribedUsers,
      yearlyUsers,
      yearlySubscribedUsers,
      weeklyRatio,
      monthlyRatio,
      yearlyRatio,
      currentMonthVsLastMonthRatio,
      monthlyStats,
    };
  };

  const [userStats, setUserStats] = useState<any>({});

  useEffect(() => {
    const stats = calculateUserStats(usersDataList?.users);
    setUserStats(stats);
  }, [usersDataList]);

  return (
    <div className="">
      <div className="bg-white p-12">
        <h2 className="text-2xl font-bold text-[#11142D]">
          Subscriptions this Month
        </h2>
        <div className="w-full my-8 border border-gray-200" />
        <div className="flex items-start justify-between">
          <div className="w-[15%]">
            <div className="my-8">
              <h2 className="text-xl font-medium text-gray-700 mb-1">Weekly</h2>
              <div className="flex items-center space-x-2">
                <h2 className="text-4xl font-bold text-gray-700">
                  {userStats?.weeklyUsers}
                </h2>
                <p className="text-lg font-medium"> {userStats?.weeklyRatio}</p>
              </div>
            </div>
            <div className="my-8">
              <h2 className="text-xl font-medium text-gray-700 mb-1">
                Monthly
              </h2>
              <div className="flex items-center space-x-2">
                <h2 className="text-4xl font-bold text-gray-700">
                  {userStats?.monthlyUsers}
                </h2>
                <p className="text-lg font-medium">{userStats?.monthlyRatio}</p>
              </div>
            </div>

            <div className="my-8">
              <h2 className="text-xl font-medium text-gray-700 mb-1">Yearly</h2>
              <div className="flex items-center space-x-2">
                <h2 className="text-4xl font-bold text-gray-700">
                  {userStats?.yearlyUsers}
                </h2>
                <p className="text-lg font-medium"> {userStats?.yearlyRatio}</p>
              </div>
            </div>
          </div>
          <div className="w-[85%]">
            <div className="flex items-center space-x-16 mb-10 ml-5">
              <div className="flex items-center space-x-4">
                <div className="bg-primary border-gray-300 border-2 w-14 h-5" />
                <h2 className="text-lg font-medium text-gray-700 mb-1">
                  Subscribed
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-secondary border-gray-300 border-2 w-14 h-5" />
                <h2 className="text-lg font-medium text-gray-700 mb-1">
                  Unsubscribed
                </h2>
              </div>
            </div>
            <MonthlySubscriptionsChart userStats={userStats?.monthlyStats} />
          </div>
        </div>
      </div>
      <SubscribersSection usersDataList={usersDataList} userStats={userStats} />
    </div>
  );
};

export default DashboardMonthlySubscriptionsChart;
