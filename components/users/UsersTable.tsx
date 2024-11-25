"use client";
import React from "react";
import { usersDemoData } from "@/config/data";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const UsersTable = () => {
  const router = useRouter();

  return (
    <div className=" bg-white p-12">
      <div className="mb-10">
        <form className="">
          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-white border-2 border-primary  text-xl  focus:ring-primary focus:border-primary block w-[35%] pl-6 py-2 placeholder-gray-700  active:border-primary outline-none rounded-full placeholder:text-xl"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-gray-500 ">
          <thead className="text-[16px] font-medium text-gray-800 bg-gray-100 text-center">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                NO
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Email
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Subscription
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Register Date
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {usersDemoData?.map((el: any, index: number) => (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/users/${index}`)}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 text-primary">{el?.name}</td>
                <td className="px-6 py-4">{el?.email}</td>
                <td className="px-6 py-4">{el?.phone}</td>
                <td
                  className={`px-6 py-4 capitalize ${el?.subscription === "paid" ? "text-green-500" : "text-red-500"}`}
                >
                  {el?.subscription}
                </td>
                <td className="px-6 py-4">{el?.subscriptionsDate}</td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <RiDeleteBin6Fill className="text-red-500 size-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav
          aria-label="Page navigation example "
          className="flex justify-end mt-8"
        >
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-800 "
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                2
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                ...
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UsersTable;
