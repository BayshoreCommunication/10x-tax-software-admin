"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { getAllUserData } from "@/app/actions/user";
import { Spinner } from "@nextui-org/react";
import { formatDate } from "../shared/DateFormat";
import UserDeletedModal from "../shared/Modal/UserDeletedModal";

interface Pagination {
  totalPages: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
}

interface User {
  _id: string;
  businessName: string;
  phone: string;
  email: string;
  subscription: boolean;
  currentSubscriptionPayDate: string;
}

interface UsersDataList {
  users: User[];
  pagination: Pagination;
}

const UsersTable = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDeletedModalFlag, setUserDeletedModalFlag] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getAllUserData(search, currentPage, limit);
      if (result.ok && result.data) {
        setUsers(result.data.users);
        setPagination(result.data.pagination);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, currentPage]);

  const handleUserDelete = (id: string) => {
    setUserId(id);
    setUserDeletedModalFlag(true);
  };

  return (
    <div className="bg-white p-12">
      {/* Search Bar */}
      <div className="mb-10">
        <form>
          <input
            autoComplete="off"
            type="text"
            className="bg-white border-2 border-primary text-xl focus:ring-primary focus:border-primary block w-[35%] pl-6 py-2 placeholder-gray-700 active:border-primary outline-none rounded-full placeholder:text-xl"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Spinner
            className="text-[#1B2639] "
            color="default"
            label="Loading..."
            labelColor="foreground"
            size="lg"
          />
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          {/* Table */}
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-[16px] font-medium text-gray-800 bg-gray-100 text-center">
              <tr>
                <th scope="col" className="px-6 py-3 bg-primary text-white">
                  NO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-300"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-300"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-300"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-300"
                >
                  Subscription
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-300"
                >
                  Register Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users?.map((el, index) => (
                <tr
                  key={el._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center cursor-pointer"
                >
                  <td className="px-6 py-4">
                    {((pagination?.currentPage ?? 1) - 1) *
                      (pagination?.totalPages ?? 10) +
                      index +
                      1}
                  </td>
                  <td className="px-6 py-4 text-primary">{el.businessName}</td>
                  <td className="px-6 py-4">{el.phone}</td>
                  <td className="px-6 py-4">{el.email}</td>
                  <td
                    className={`px-6 py-4 capitalize ${
                      el.subscription ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {el.subscription ? "Paid" : "Unpaid"}
                  </td>
                  <td className="px-6 py-4">
                    {el.currentSubscriptionPayDate
                      ? formatDate(el.currentSubscriptionPayDate)
                      : "Not Paid"}
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center space-x-6">
                    <button onClick={() => router.push(`/users/${el._id}`)}>
                      <BiSolidShow className="text-green-400 hover:text-green-500 size-6" />
                    </button>
                    <button onClick={() => handleUserDelete(el._id)}>
                      <RiDeleteBin6Fill className="text-red-400 size-5 hover:text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* No Data Message */}
          {users.length === 0 && (
            <p className="text-center text-gray-600 text-lg mt-16">
              User data not available!
            </p>
          )}

          {/* Pagination */}
          <nav aria-label="Page navigation" className="flex justify-end mt-8">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={pagination?.previousPage === null}
                  className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-800`}
                >
                  Previous
                </button>
              </li>

              {Array.from(
                { length: pagination?.totalPages || 0 },
                (_, i) => i + 1
              ).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight   border   hover:text-gray-700 text-gray-700 ${
                      page === currentPage
                        ? "bg-primary hover:bg-gray-100"
                        : "bg-white hover:bg-primary"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, pagination?.totalPages || 1)
                    )
                  }
                  disabled={pagination?.nextPage === null}
                  className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-80`}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* User Delete Modal */}
      <UserDeletedModal
        userDeletedModalFlag={userDeletedModalFlag}
        setUserDeletedModalFlag={setUserDeletedModalFlag}
        userId={userId}
      />
    </div>
  );
};

export default UsersTable;
