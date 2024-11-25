import React from "react";
import { IoShapes } from "react-icons/io5";
import SubscriptionsRatioChart from "../shared/rechart/SubscriptionsRatioChart";
import SubscriptionsWaveRatioChart from "../shared/rechart/SubscriptionsWaveRatioChart";

const lestSubscribers = [
  {
    name: "Daniel James",
    phone: "+12 999 111 002",
    status: "Cancel",
    statusColor: "red",
    date: "25 March 2020",
  },
  {
    name: "Jane Mcalister",
    phone: "+88 000 111 222",
    status: "Pending",
    statusColor: "blue",
    date: "25 March 2020",
  },
  {
    name: "Mandy Johnson",
    phone: "+12 888 9999 11",
    status: "Subscribed",
    statusColor: "green",
    date: "25 March 2020",
  },
  {
    name: "Elly Spitch",
    phone: "+1000 999 888 11",
    status: "Subscribed",
    statusColor: "green",
    date: "25 March 2020",
  },
  {
    name: "Hanna Zafron",
    phone: "+71 9900 11 22",
    status: "Subscribed",
    statusColor: "green",
    date: "25 March 2020",
  },
];

const SubscribersSection = () => {
  return (
    <div className=" my-7 flex items-stretch justify-between gap-x-7 w-full">
      <div className=" bg-white p-12 w-[75%]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Latest Subscribers
          </h2>
          {/* <div className="bg-red-50 py-1.5 px-4 rounded-md">
            <IoShapes className="text-red-400 size-7" />
          </div> */}
        </div>
        <div className="mt-6">
          <ul className="max-w-md space-y-1 text-gray-700 list-none list-inside">
            {lestSubscribers?.map((el: any, index: number) => (
              <li
                className={`flex items-center justify-between  py-2 px-4 rounded ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                key = {index}
              >
                <div className="w-[40%]">
                  <h2 className="text-xl font-semibold">{el?.name}</h2>
                  <p className="text-lg text-gray-700 font-normal mt-1">
                    {el?.phone}
                  </p>
                </div>
                <div className="w-[30%]">
                  <h2
                    className={`text-lg font-medium px-2 py-2 w-[150px] rounded-lg flex items-center justify-center 
                  ${
                    el?.status === "Cancel"
                      ? "bg-red-100"
                      : el?.status === "Subscribed"
                        ? "bg-green-100"
                        : "bg-gray-300"
                  }`}
                  >
                    {el?.status}
                  </h2>
                </div>
                <div className="w-[30%]">
                  <h2 className="text-lg font-medium text-center">
                    {el?.date}
                  </h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" bg-white p-12 w-[35%]">
        <h2 className="text-2xl font-bold text-gray-800 -mb-3">
          Subscription Ratio
        </h2>
        <div className="flex items-center justify-center ">
          <SubscriptionsRatioChart />
        </div>

        <div className="flex items-center justify-between gap-x-16 -mt-2">
          <div className="my-1">
            <h2 className="text-xl font-normal text-gray-700 mb-1">
              Last Month
            </h2>
            <h2 className="text-4xl font-bold text-gray-700">72.1%</h2>
          </div>
          <div className="w-full flex justify-end">
            <SubscriptionsWaveRatioChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribersSection;
