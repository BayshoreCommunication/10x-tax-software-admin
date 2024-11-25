"use client";
import React from "react";
import { usersDemoData } from "@/config/data";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const taxInfoData = [
  {
    TaxRate: "10%",
    Individual: "$0–$11,600",
    MarriedFilingJointly: "$0–$23,200",
    MarriedFilingSeparately: "$0–$11,600",
    HeadOfHousehold: "$0–$16,550",
  },
  {
    TaxRate: "12%",
    Individual: "$11,601–$47,150",
    MarriedFilingJointly: "$23,201–$94,300",
    MarriedFilingSeparately: "$11,601–$47,150",
    HeadOfHousehold: "$16,551–$63,100",
  },
  {
    TaxRate: "22%",
    Individual: "$47,151–$100,525",
    MarriedFilingJointly: "$94,301–$201,050",
    MarriedFilingSeparately: "$47,151–$100,525",
    HeadOfHousehold: "$63,101–$100,500",
  },
  {
    TaxRate: "24%",
    Individual: "$100,526–$191,950",
    MarriedFilingJointly: "$201,051–$383,900",
    MarriedFilingSeparately: "$100,526–$191,950",
    HeadOfHousehold: "$100,501–$191,950",
  },
  {
    TaxRate: "32%",
    Individual: "$191,951–$243,725",
    MarriedFilingJointly: "$383,901–$487,450",
    MarriedFilingSeparately: "$191,951–$243,725",
    HeadOfHousehold: "$191,951–$243,700",
  },
  {
    TaxRate: "35%",
    Individual: "$243,726–$609,350",
    MarriedFilingJointly: "$487,451–$731,200",
    MarriedFilingSeparately: "$243,726–$365,600",
    HeadOfHousehold: "$243,701–$609,350",
  },
  {
    TaxRate: "37%",
    Individual: "$609,351 or more",
    MarriedFilingJointly: "$731,201 or more",
    MarriedFilingSeparately: "$365,601 or more",
    HeadOfHousehold: "$609,350 or more",
  },
];

const TaxSettings = () => {
  return (
    <div className=" bg-white p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#11142D]">Tax Type</h2>
        <div className="flex items-center space-x-2 mt-3">
          <div className="bg-primary w-4 h-4" />
          <h2 className="text-lg font-normal text-gray-700 mb-1">
            Individual Income Tax
          </h2>
        </div>
        <h2 className="text-3xl font-bold text-[#11142D] mt-8">
          Tax Brackets 2024
        </h2>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-gray-500 border-1 border-gray-300">
          <thead className="text-[16px] font-medium text-gray-800  text-center border-gray-300 border-b-1">
            <tr>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Tax Rate
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Individual
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Married Filing Jointly
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-300">
                Married Filing Separately
              </th>
              <th scope="col" className="px-6 py-3 ">
                Head of Household
              </th>
            </tr>
          </thead>
          <tbody>
            {taxInfoData?.map((el: any, index: number) => (
              <tr className="border-b text-[16px] font-medium text-gray-800 text-center  cursor-pointer border-gray-300">
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  {el?.TaxRate}
                </td>
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  {el?.Individual}
                </td>
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  {el?.MarriedFilingJointly}
                </td>
                <td
                  className={`px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100`}
                >
                  {el?.MarriedFilingSeparately}
                </td>

                <td className={`px-6 py-4 hover:bg-gray-100`}>
                  {el?.HeadOfHousehold}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="px-4 py-2 border-2 bg-primary text-white rounded-md font-medium text-base hover:bg-yellow-600 hover:text-white w-[140px] mt-10">
        Update
      </button>
    </div>
  );
};

export default TaxSettings;
