import React from "react";
import { usersDemoData } from "@/config/data";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Image from "next/image";
import UserSearchOption from "./UserSearchOption";

const UserDetails = ({ userDetails }: any) => {
  return (
    <div className="flex justify-between items-start space-x-12">
      <div className="w-[25%] bg-white">
        <div className="bg-primary text-white font-medium text-xl py-3 w-full text-center">
          <h2>{"Client Details"}</h2>
        </div>
        <div className="bg-white py-12 w-full flex items-center justify-center">
          <Image
            src="/assets/admin-image/user-image.png"
            alt="User Picture"
            width={200}
            height={200}
          />
        </div>
        <div className="bg-green-600 text-white font-medium text-xl py-3 w-full rounded text-center">
          <h2>{"Subscribed"}</h2>
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
            <li>Sadit Ahsan</li>
            <li>+880175459652</li>
            <li>saditahsan@gmail.com</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Payment Plan:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>Monthly Subscription: $99USD</li>
            <li>Subscription Date: 1-1-2024</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            History:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>Monthly Subscription: $99USD</li>
            <li>Subscription Date: 1-1-2024</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Business Name:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>10x Tax Pro</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Business Address:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>1211 TECH BLVD, SUITE 120, TAMPA, FL 33619</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Next Payment Date:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>Date: 1-1-2026</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-12">
          <div className="mb-10 mt-4 flex items-center justify-between">
            <form className="w-[100%]">
              <input
                autoComplete="off"
                type="text"
                id="email-address-icon"
                className="bg-white border-2 border-gray-500 text-xl  focus:ring-gray-500 focus:border-gray-500 block w-[35%] pl-6 py-2 placeholder-gray-700  active:border-gray-500 outline-none rounded-full placeholder:text-xl"
                placeholder="Search"
              />
            </form>
            <UserSearchOption />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-gray-500 ">
              <thead className="text-[16px] font-medium text-gray-800 bg-gray-100 text-center">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  border-r-1 border-gray-300"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-r-1 border-gray-300"
                  >
                    Subscription Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-r-1 border-gray-300"
                  >
                    Expire Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-r-1 border-gray-300"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center cursor-pointer">
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4 ">1-10-2023</td>
                  <td className="px-6 py-4">1-11-2023</td>
                  <td className="px-6 py-4">Monthly</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center cursor-pointer">
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4 ">1-10-2023</td>
                  <td className="px-6 py-4">1-11-2023</td>
                  <td className="px-6 py-4">Monthly</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center cursor-pointer">
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4 ">1-10-2023</td>
                  <td className="px-6 py-4">1-11-2023</td>
                  <td className="px-6 py-4">Monthly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
