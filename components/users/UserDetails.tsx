"use client";
import { userSubscriptionById } from "@/app/actions/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "../shared/DateFormat";
import UserSearchOption from "./UserSearchOption";

interface UserDetailsProps {
  userDetails: {
    _id: string;
    logoUrl?: string;
    businessName?: string;
    phone?: string;
    email?: string;
    currentSubscriptionType?: string;
    currentSubscriptionPayDate?: string;
    currentSubscriptionExpiredDate?: string;
    address?: string;
  };
}

interface Subscription {
  subscriptionInfo: {
    subscriptionDate: string;
    subscriptionExpiredDate: string;
    type: string;
  };
}

interface Pagination {
  previousPage: number | null;
  nextPage: number | null;
  totalPages: number;
}

const UserDetails = ({ userDetails }: any) => {
  const [userSubscriptionData, setUserSubscriptionData] = useState<
    Subscription[] | null
  >(null);
  const [userSubscriptionPagination, setUserSubscriptionPagination] =
    useState<Pagination | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userSubscriptionById(
          userDetails?._id,
          search,
          page
        );
        if (result.ok) {
          setUserSubscriptionData(result.data.subscriptions);
          setUserSubscriptionPagination(result.data.pagination);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchData();
  }, [userDetails, search, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex justify-between items-start space-x-12">
      <div className="w-[25%] bg-white">
        <div className="bg-primary text-white font-medium text-xl py-3 w-full text-center">
          <h2>{"Client Details"}</h2>
        </div>
        <div className="bg-white py-12 w-full flex items-center justify-center">
          <Image
            src={userDetails?.logoUrl || "/assets/admin-image/user-image.png"}
            alt="User Picture"
            width={200}
            height={200}
          />
        </div>
        <div
          className={` text-white font-medium text-xl py-3 w-full rounded text-center ${userDetails?.subscription ? "bg-green-500" : "bg-red-500"}`}
        >
          <h2>{userDetails?.subscription ? "Subscribed" : "Unsubscribed"}</h2>
        </div>
      </div>
      <div className="w-[75%] bg-white">
        <div className="bg-secondary py-4 w-full px-12">
          <h2 className="text-white font-medium text-xl w-full text-left">
            {"Full Client Details"}
          </h2>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-10  mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Contact:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{userDetails?.businessName}</li>
            <li>{userDetails?.phone}</li>
            <li>{userDetails?.email}</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Payment Plan:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>
              Monthly Subscription:{" "}
              {userDetails?.currentSubscriptionType === "monthly"
                ? "$29 USD"
                : "$99 USD"}
            </li>
            <li>
              Subscription Date:{" "}
              {formatDate(userDetails?.currentSubscriptionPayDate)}
            </li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Business Name:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{userDetails?.businessName}</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Business Address:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{userDetails?.address}</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Next Payment Date:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{formatDate(userDetails?.currentSubscriptionExpiredDate)}</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-12">
          <div className="mb-10 mt-4 flex items-center justify-between">
            <form className="w-[100%]">
              <input
                autoComplete="off"
                type="text"
                className="bg-white border-2 border-gray-500 text-xl focus:ring-gray-500 focus:border-gray-500 block w-[35%] pl-6 py-2 placeholder-gray-700 outline-none rounded-full placeholder:text-xl"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
            </form>
            <UserSearchOption search={search} setSearch={setSearch} />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-gray-500">
              <thead className="text-[16px] font-medium text-gray-800 bg-gray-100 text-center">
                <tr>
                  <th className="px-6 py-3 border-r-1 border-gray-300">No</th>
                  <th className="px-6 py-3 border-r-1 border-gray-300">
                    Subscription Date
                  </th>
                  <th className="px-6 py-3 border-r-1 border-gray-300">
                    Expire Date
                  </th>
                  <th className="px-6 py-3 border-r-1 border-gray-300">Type</th>
                </tr>
              </thead>
              <tbody>
                {userSubscriptionData?.map((subscription, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center cursor-pointer"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {formatDate(
                        subscription.subscriptionInfo.subscriptionDate
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(
                        subscription.subscriptionInfo.subscriptionExpiredDate
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {subscription.subscriptionInfo.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {userSubscriptionPagination && (
              <nav
                aria-label="Page navigation"
                className="flex justify-end mt-8"
              >
                <ul className="inline-flex -space-x-px text-base h-10">
                  <li>
                    <button
                      onClick={() =>
                        handlePageChange(
                          userSubscriptionPagination.previousPage!
                        )
                      }
                      disabled={!userSubscriptionPagination.previousPage}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from(
                    { length: userSubscriptionPagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <li key={page}>
                      <button onClick={() => handlePageChange(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        handlePageChange(userSubscriptionPagination.nextPage!)
                      }
                      disabled={!userSubscriptionPagination.nextPage}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
