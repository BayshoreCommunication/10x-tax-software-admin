"use client";
import { formatDate } from "../shared/DateFormat";
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

const SubscribersSection = ({ usersDataList, userStats }: any) => {
  const paymentList = usersDataList?.users?.sort(
    (a: any, b: any) =>
      new Date(b?.currentSubscriptionPayDate).getTime() -
      new Date(a?.currentSubscriptionPayDate).getTime()
  );

  const newPaymentList = paymentList.slice(0, 5);

  console.log("cehckd agfeds", userStats);

  return (
    <div className=" my-5 flex items-stretch justify-between gap-x-5 w-full">
      <div className=" bg-white 2xl:p-12 xl:p-8 lg:p-6 w-[75%]">
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
            {newPaymentList?.length === 0 ? (
              <li>
                <p className="text-center text-gray-600 text-lg mt-16">
                  New subscription not available!
                </p>
              </li>
            ) : (
              <>
                {newPaymentList?.map((el: any, index: number) => (
                  <li
                    className={`flex items-center justify-between  py-2 px-4 rounded ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                    key={index}
                  >
                    <div className="w-[40%]">
                      <h2 className="2xl:text-xl xl:text-lg lg:text-base font-semibold">
                        {el?.businessName}
                      </h2>
                      <p className="2xl:text-lg xl:text-base lg:text-sm text-gray-700 font-normal mt-px 2xl:mt-2">
                        {el?.phone}
                      </p>
                    </div>
                    <div className="w-[30%]">
                      <h2
                        className={`2xl:text-lg xl:text-base lg:text-sm font-medium px-2 py-2 w-[150px] rounded-lg flex items-center justify-center 
                  ${el?.subscription ? "bg-green-100" : "bg-gray-300"}`}
                      >
                        {el?.subscription ? "Subscribed" : "Not Subscribed"}
                      </h2>
                    </div>
                    <div className="w-[30%]">
                      <h2 className="2xl:text-lg xl:text-base lg:text-sm font-medium text-center">
                        {el?.currentSubscriptionPayDate
                          ? formatDate(el?.currentSubscriptionPayDate)
                          : "Not Paid"}
                      </h2>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
      <div className=" bg-white 2xl:p-12 xl:p-8 lg:p-6 w-[35%]">
        <h2 className="text-2xl font-bold text-gray-800 -mb-3">
          Subscription Ratio
        </h2>
        <div className="flex items-center justify-center ">
          <SubscriptionsRatioChart userStats={userStats} />
        </div>

        <div className="flex items-center justify-between gap-x-16 -mt-2">
          <div className="my-1">
            <h2 className="2xl:text-xl xl:text-lg font-normal text-gray-700 mb-1">
              Last Month
            </h2>
            <h2 className="2xl:text-4xl xl:text-2xl lg:text-xl font-bold text-gray-700">
              {userStats?.currentMonthVsLastMonthRatio}
            </h2>
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
