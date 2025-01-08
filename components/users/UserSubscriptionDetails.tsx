"use client";

import { userSubscriptionById } from "@/app/actions/user";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { formatDate } from "../shared/DateFormat";
import UserSearchOption from "./UserSearchOption";

const UserSubscriptionDetails = ({ userId }: { userId: string }) => {
  const [state, setState] = useState({
    subscriptions: [],
    pagination: {
      totalPages: 0,
      previousPage: null,
      nextPage: null,
    },
    search: "",
    filterOption: "",
    currentPage: 1,
    limit: 10,
    isLoading: false,
    error: null,
  });

  const {
    subscriptions,
    pagination,
    search,
    filterOption,
    currentPage,
    limit,
    isLoading,
    error,
  } = state;

  const fetchData = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await userSubscriptionById(
        userId,
        search,
        currentPage,
        limit
      );
      if (result.ok) {
        setState((prev: any) => ({
          ...prev,
          subscriptions: result.data.subscriptions || [],
          pagination: result.data.pagination || {
            totalPages: 0,
            previousPage: null,
            nextPage: null,
          },
          isLoading: false,
        }));
      } else {
        setState((prev: any) => ({
          ...prev,
          error: result.error,
          isLoading: false,
        }));
      }
    } catch (err) {
      setState((prev: any) => ({
        ...prev,
        error: "Failed to fetch data. Please try again.",
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, search, currentPage, limit, filterOption]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: any) => ({
      ...prev,
      search: e.target.value,
      currentPage: 1, // Reset to first page
    }));
  };

  const handleFilterChange = (option: string) => {
    setState((prev: any) => ({
      ...prev,
      filterOption: option,
      currentPage: 1, // Reset to first page
    }));
  };

  const handlePageChange = (newPage: number) => {
    setState((prev: any) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div>
      <div className="border-2 px-6 py-4 mx-12 mt-3 mb-12">
        {/* Search and Filter Options */}
        <div className="mb-10 mt-4 flex items-center justify-between">
          <form className="w-full">
            <input
              autoComplete="off"
              type="text"
              className="bg-white border-gray-500 border text-lg w-[40%] pl-6 py-2 placeholder-gray-700 outline-none rounded-full"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
          </form>
          <UserSearchOption state={state} setState={setState} />
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          {isLoading ? (
            <div className="w-full h-[20vh] flex items-center justify-center">
              <Spinner
                className="text-[#1B2639]"
                label="Loading..."
                size="lg"
              />
            </div>
          ) : subscriptions.length > 0 ? (
            <table className="w-full text-left text-black border mb-4">
              <thead className="text-black bg-gray-100 text-center">
                <tr>
                  <th className="px-6 py-3 border-r">No</th>
                  <th className="px-6 py-3 border-r">Subscription Date</th>
                  <th className="px-6 py-3 border-r">Expire Date</th>
                  <th className="px-6 py-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub: any, index: any) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-4">
                      {index + 1 + (currentPage - 1) * limit}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(sub?.subscriptionInfo?.subscriptionDate)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(
                        sub?.subscriptionInfo?.subscriptionExpiredDate
                      )}
                    </td>
                    <td className="px-6 py-4">{sub?.subscriptionInfo?.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : error ? (
            <p className="text-center text-gray-600 text-lg my-10">{error}</p>
          ) : (
            <p className="text-center text-gray-600 text-lg my-10">
              No subscriptions available!
            </p>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav className="flex justify-end mt-8">
              <ul className="inline-flex -space-x-px">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.previousPage}
                    className="px-4 py-2 bg-white border rounded-l"
                  >
                    Previous
                  </button>
                </li>
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <li key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border ${
                        page === currentPage
                          ? "bg-primary text-white"
                          : "bg-white"
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.nextPage}
                    className="px-4 py-2 bg-white border rounded-r"
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
  );
};

export default UserSubscriptionDetails;
