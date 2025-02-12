"use client";

import { userSubscriptionById } from "@/app/actions/user";
import { Spinner } from "@nextui-org/react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { formatDate } from "../shared/DateFormat";
import UserSearchOption from "./UserSearchOption";

interface Pagination {
  totalPages: number | null;
  previousPage: number | null;
  currentPage: number | null;
  nextPage: number | null;
}
interface UserSubscription {
  _id: string;
  subscriptionInfo: {
    subscriptionExpiredDate: string;
    subscriptionDate: string;
    type: string;
  };
}

const UserSubscriptionDetails = ({ userId }: any) => {
  const [search, setSearch] = useState("");
  // Parent component where state is initialized
  const [state, setState] = useState<{ filterOption: string }>({
    filterOption: "", // Initialize with a string (empty string or default value)
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [limit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionData, setSubscriptionData] = useState<UserSubscription[]>(
    []
  );
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await userSubscriptionById(
        userId,
        debouncedSearch,
        currentPage,
        limit
      );
      if (result.ok && result.data) {
        setSubscriptionData(result.data.subscription);
        setPagination(result.data.pagination);

        if (result.data.pagination.totalPages < currentPage) {
          setCurrentPage(result.data.pagination.totalPages || 1);
        }
      } else {
        console.error(result.error || "Failed to fetch client data.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, currentPage, limit]);

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  useEffect(() => {
    if (state && typeof state === "object") {
      debounceSearch(state.filterOption ?? "");
    } else {
      debounceSearch("");
    }
  }, [state]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePaginationClick = (page: number) => {
    if (page > 0 && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = useMemo(() => {
    const generatePageNumbers = () => {
      const pageNumbers: number[] = [];

      // Use default values to prevent issues with null or undefined
      const safeCurrentPage = currentPage ?? 1;
      const safeTotalPages = pagination?.totalPages ?? 1;

      const startPage = Math.max(1, safeCurrentPage - 1);
      const endPage = Math.min(safeTotalPages, safeCurrentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
      pageNumbers.length > 0 && (
        <nav aria-label="Page navigation" className="flex justify-end mt-8">
          <ul className="inline-flex -space-x-px text-base items-center">
            {/* Previous button */}
            <li>
              <button
                onClick={() => handlePaginationClick((currentPage ?? 1) - 1)}
                disabled={pagination?.previousPage === null || currentPage <= 1}
                className="bg-white border rounded-l-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center"
              >
                <span>Previous</span>
              </button>
            </li>

            {/* Ellipsis before page numbers */}
            {pagination?.previousPage && pagination.previousPage > 1 && (
              <li className="h-[42px] w-[45px] border text-gray-600 flex items-center justify-center hover:bg-gray-100">
                <BsThreeDots />
              </li>
            )}

            {/* Page number buttons */}
            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePaginationClick(page)}
                  className={`px-4 py-2 border h-[42px] w-[45px] ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            {/* Ellipsis after page numbers */}
            {pagination?.currentPage &&
              pagination.currentPage + 1 < (pagination.totalPages ?? 0) && (
                <li className="h-[42px] w-[45px] border text-gray-600 flex items-center justify-center hover:bg-gray-100">
                  <BsThreeDots />
                </li>
              )}

            {/* Next button */}
            <li>
              <button
                onClick={() => handlePaginationClick((currentPage ?? 1) + 1)}
                disabled={
                  pagination?.nextPage === null ||
                  currentPage >= (pagination?.totalPages ?? 1)
                }
                className="px-4 py-2 bg-white border rounded-r-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center"
              >
                <span>Next</span>
              </button>
            </li>
          </ul>
        </nav>
      )
    );
  }, [pagination, currentPage, handlePaginationClick]);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between px-8 py-6">
        <form className="flex items-center w-[80%]">
          <input
            type="text"
            className="bg-white border-gray-500 border text-lg w-[40%] pl-6 py-2 placeholder-gray-700 outline-none rounded-full"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </form>
        <UserSearchOption state={state} setState={setState} />
      </div>

      <div className="relative overflow-x-auto bg-white pb-10 min-h-[30vh] px-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Spinner size="lg" label="Loading..." />
          </div>
        ) : subscriptionData?.length > 0 ? (
          <div className="">
            <table className="w-full text-left rtl:text-right text-gray-500 ">
              <thead className="text-[16px] font-medium text-gray-700 text-center bg-[#e5e5e5]">
                <tr>
                  {["No", "Subscription Date", "Expire Date", "Type"].map(
                    (header, idx) => (
                      <th key={idx} className="px-6 py-3 text-center">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {subscriptionData?.map((el, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b 2xl:text-base text-sm font-medium text-gray-800 text-center cursor-pointer"
                  >
                    <td className="2xl:px-6 xl:px-4 px-2 py-4">
                      {((pagination?.currentPage || 0) - 1) * 5 + index + 1}
                    </td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4">
                      {el?.subscriptionInfo?.subscriptionDate
                        ? formatDate(el?.subscriptionInfo?.subscriptionDate)
                        : "Not Paid"}
                    </td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4">
                      {el?.subscriptionInfo?.subscriptionExpiredDate
                        ? formatDate(
                            el?.subscriptionInfo?.subscriptionExpiredDate
                          )
                        : "Not Paid"}
                    </td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4 capitalize">
                      {el?.subscriptionInfo?.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mr-5"> {renderPagination}</div>
          </div>
        ) : (
          <p className="text-center  text-gray-600 flex items-center justify-center min-h-[20vh]">
            No user subscription data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserSubscriptionDetails;
