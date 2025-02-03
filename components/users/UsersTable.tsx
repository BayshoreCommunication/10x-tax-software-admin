// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { BiSolidShow } from "react-icons/bi";
// import { RiDeleteBin6Fill } from "react-icons/ri";

// import { getAllUserData } from "@/app/actions/user";
// import { Spinner } from "@nextui-org/react";
// import { formatDate } from "../shared/DateFormat";
// import UserDeletedModal from "../shared/Modal/UserDeletedModal";

// interface Pagination {
//   totalPages: number;
//   currentPage: number;
//   previousPage: number | null;
//   nextPage: number | null;
// }

// interface User {
//   _id: string;
//   businessName: string;
//   phone: string;
//   email: string;
//   subscription: boolean;
//   currentSubscriptionPayDate: string;
// }

// interface UsersDataList {
//   users: User[];
//   pagination: Pagination;
// }

// const UsersTable = () => {
//   const router = useRouter();

//   const [search, setSearch] = useState("");
//   const [limit, setLimit] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [users, setUsers] = useState<User[]>([]);
//   const [pagination, setPagination] = useState<Pagination | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userDeletedModalFlag, setUserDeletedModalFlag] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   const fetchUsers = async () => {
//     setIsLoading(true);
//     try {
//       const result = await getAllUserData(search, currentPage, limit);
//       if (result.ok && result.data) {
//         setUsers(result.data.users);
//         setPagination(result.data.pagination);
//       } else {
//         console.error(result.error);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [search, currentPage]);

//   const handleUserDelete = (id: string) => {
//     setUserId(id);
//     setUserDeletedModalFlag(true);
//   };

//   return (
//     <div className="bg-white 2xl:p-12 xl:p-8 lg:p-6">
//       {/* Search Bar */}
//       <div className="mb-10">
//         <form>
//           <input
//             autoComplete="off"
//             type="text"
//             className="bg-white border-2 border-primary text-xl focus:ring-primary focus:border-primary block w-[35%] pl-6 py-2 placeholder-gray-700 active:border-primary outline-none rounded-full placeholder:text-xl"
//             placeholder="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </form>
//       </div>

//       {/* Loading Indicator */}
//       {isLoading ? (
//         <div className="w-full h-[50vh] flex items-center justify-center">
//           <Spinner
//             className="text-[#1B2639] "
//             color="default"
//             label="Loading..."
//             labelColor="foreground"
//             size="lg"
//           />
//         </div>
//       ) : (
//         <div className="relative overflow-x-auto">
//           {/* Table */}
//           <table className="w-full text-left rtl:text-right text-gray-500">
//             <thead className="2xl:text-base text-sm font-medium text-gray-800 bg-gray-100 text-center">
//               <tr>
//                 <th
//                   scope="col"
//                   className="2xl:px-6 xl:px-4 px-2 py-3 bg-primary text-white"
//                 >
//                   NO
//                 </th>
//                 <th
//                   scope="col"
//                   className="2xl:px-6 xl:px-4 px-2 py-3 border-r-1 border-gray-300"
//                 >
//                   Name
//                 </th>
//                 <th
//                   scope="col"
//                   className="2xl:px-6 xl:px-4 px-2 py-3 border-r-1 border-gray-300"
//                 >
//                   Phone
//                 </th>
//                 <th
//                   scope="col"
//                   className="2xl:px-6 xl:px-4 px-2 py-3 border-r-1 border-gray-300"
//                 >
//                   Email
//                 </th>
//                 <th
//                   scope="col"
//                   className="2xl:px-6 xl:px-4 px-2 py-3 border-r-1 border-gray-300"
//                 >
//                   Subscription
//                 </th>
//                 <th
//                   scope="col"
//                   className="2xl:px-6 xl:px-4 px-2 py-3 border-r-1 border-gray-300"
//                 >
//                   Register Date
//                 </th>
//                 <th scope="col" className="2xl:px-6 xl:px-4 px-2 py-3">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {users?.map((el, index) => (
//                 <tr
//                   key={el._id}
//                   className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b 2xl:text-base text-sm font-medium text-gray-800 text-center cursor-pointer"
//                 >
//                   <td className="2xl:px-6 xl:px-4 px-2 py-4">
//                     {((pagination?.currentPage ?? 1) - 1) *
//                       (pagination?.totalPages ?? 10) +
//                       index +
//                       1}
//                   </td>
//                   <td className="2xl:px-6 xl:px-4 px-2 py-4 text-primary">
//                     {el.businessName}
//                   </td>
//                   <td className="2xl:px-6 xl:px-4 px-2 py-4">{el.phone}</td>
//                   <td className="2xl:px-6 xl:px-4 px-2 py-4">{el.email}</td>
//                   <td
//                     className={`px-6 py-4 capitalize ${
//                       el.subscription ? "text-green-500" : "text-red-500"
//                     }`}
//                   >
//                     {el.subscription ? "Paid" : "Unpaid"}
//                   </td>
//                   <td className="2xl:px-6 xl:px-4 px-2 py-4">
//                     {el.currentSubscriptionPayDate
//                       ? formatDate(el.currentSubscriptionPayDate)
//                       : "Not Paid"}
//                   </td>
//                   <td className="2xl:px-6 xl:px-4 px-2 py-4 flex justify-center items-center 2xl:space-x-6 xl:space-x-4 space-x-2">
//                     <button onClick={() => router.push(`/users/${el._id}`)}>
//                       <BiSolidShow className="text-green-400 hover:text-green-500 size-6" />
//                     </button>
//                     <button onClick={() => handleUserDelete(el._id)}>
//                       <RiDeleteBin6Fill className="text-red-400 size-5 hover:text-red-500" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* No Data Message */}
//           {users.length === 0 && (
//             <p className="text-center text-gray-600 text-lg mt-16">
//               User data not available!
//             </p>
//           )}

//           {/* Pagination */}
//           <nav aria-label="Page navigation" className="flex justify-end mt-8">
//             <ul className="inline-flex -space-x-px text-base h-10">
//               <li>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={pagination?.previousPage === null}
//                   className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-800`}
//                 >
//                   Previous
//                 </button>
//               </li>

//               {Array.from(
//                 { length: pagination?.totalPages || 0 },
//                 (_, i) => i + 1
//               ).map((page) => (
//                 <li key={page}>
//                   <button
//                     onClick={() => setCurrentPage(page)}
//                     className={`flex items-center justify-center px-4 h-10 leading-tight   border   hover:text-gray-700 text-gray-700 ${
//                       page === currentPage
//                         ? "bg-primary hover:bg-gray-100"
//                         : "bg-white hover:bg-primary"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 </li>
//               ))}

//               <li>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) =>
//                       Math.min(prev + 1, pagination?.totalPages || 1)
//                     )
//                   }
//                   disabled={pagination?.nextPage === null}
//                   className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-80`}
//                 >
//                   Next
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       )}

//       {/* User Delete Modal */}
//       <UserDeletedModal
//         userDeletedModalFlag={userDeletedModalFlag}
//         setUserDeletedModalFlag={setUserDeletedModalFlag}
//         userId={userId}
//       />
//     </div>
//   );
// };

// export default UsersTable;

"use client";

import { getAllUserData } from "@/app/actions/user";
import { Spinner } from "@nextui-org/react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { formatDate } from "../shared/DateFormat";
import UserDeletedModal from "../shared/Modal/UserDeletedModal";

interface Pagination {
  totalPages: number | null;
  previousPage: number | null;
  currentPage: number | null;
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

const UsersTable = () => {
  const router = useRouter();
  const [userDeletedModalFlag, setUserDeletedModalFlag] =
    useState<boolean>(false);
  const [userDeletedValue, setUserDeletedValue] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllUserData(debouncedSearch, currentPage, limit);
      if (result.ok && result.data) {
        setUserData(result?.data?.users);
        setPagination(result?.data?.pagination);

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
  }, [debouncedSearch, currentPage, limit, userDeletedValue]);

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
    fetchUsers();
  }, [fetchUsers]);

  const handleUserDelete = async (id: string) => {
    setUserId(id);
    setUserDeletedModalFlag(true);
  };

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
      <div className="flex items-center justify-between bg-secondary px-12 py-6">
        <h2 className="text-2xl font-bold text-white">Users List</h2>
        <form className="flex items-center w-[35%] relative">
          <input
            type="text"
            className="bg-[#282E44] border-2 border-[#383E54] text-lg focus:ring-[#383E54] focus:border-[#383E54] block pl-12 py-2 placeholder-[#383E54] active:border-[#383E54] outline-none rounded-full placeholder:text-lg text-white w-full placeholder:text-gray-400"
            placeholder="Search for users..."
            value={search}
            onChange={handleSearchChange}
          />
          <GoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </form>
        {/* <Link
          href="/"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-hoverColor"
        >
          Add New User
        </Link> */}
      </div>

      <div className="relative overflow-x-auto bg-white pb-10 min-h-[50vh]">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Spinner size="lg" label="Loading..." />
          </div>
        ) : userData?.length > 0 ? (
          <div className="">
            <table className="w-full text-left rtl:text-right text-gray-500 ">
              <thead className="text-[16px] font-medium text-white text-center bg-[#383E54]">
                <tr>
                  {[
                    "No",
                    "Name",
                    "Phone",
                    "Email",
                    "Subscription",
                    "Reg. Date",
                    "Action",
                  ].map((header, idx) => (
                    <th key={idx} className="px-6 py-3 text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userData?.map((el, index) => (
                  <tr
                    key={el._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b 2xl:text-base text-sm font-medium text-gray-800 text-center cursor-pointer"
                  >
                    <td className="2xl:px-6 xl:px-4 px-2 py-4">
                      {(pagination?.currentPage || 0 - 1) * 10 + index + 1}
                    </td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4 text-primary">
                      {el.businessName}
                    </td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4">{el.phone}</td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4">{el.email}</td>
                    <td
                      className={`px-6 py-4 capitalize ${
                        el.subscription ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {el.subscription ? "Paid" : "Unpaid"}
                    </td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4">
                      {el.currentSubscriptionPayDate
                        ? formatDate(el.currentSubscriptionPayDate)
                        : "Not Paid"}
                    </td>
                    <td className="2xl:px-6 xl:px-4 px-2 py-4 flex justify-center items-center 2xl:space-x-6 xl:space-x-4 space-x-2">
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
            <div className="mr-5"> {renderPagination}</div>
          </div>
        ) : (
          <p className="text-center  text-gray-600 flex items-center justify-center min-h-[50vh]">
            No user data available.
          </p>
        )}
      </div>

      <UserDeletedModal
        userDeletedModalFlag={userDeletedModalFlag}
        setUserDeletedModalFlag={setUserDeletedModalFlag}
        userDeletedValue={userDeletedValue}
        setUserDeletedValue={setUserDeletedValue}
        userId={userId}
      />
    </div>
  );
};

export default UsersTable;
