"use client";
import { updateTaxRangeSheetData } from "@/app/actions/taxRangeSheet";
import React, { useState } from "react";
import { MdHorizontalRule } from "react-icons/md";
import { toast } from "react-toastify";

const TaxUpdate = ({ setTaxUpdateFlag, taxRangeSheet }: any) => {
  const [taxData, setTaxData] = useState(taxRangeSheet?.taxRates);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taxRate: string,
    category: string,
    type: string
  ) => {
    const value = e.target.value;

    const parsedValue = value === "" ? "" : Number(value);

    setTaxData((prevState: any) => {
      return prevState.map((row: any) => {
        if (row.TaxRate === taxRate) {
          return {
            ...row,
            [category]: {
              ...row[category],
              [type]: parsedValue,
            },
          };
        }
        return row;
      });
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      if (!taxRangeSheet?._id) {
        setError("Invalid tax range sheet ID.");
        return;
      }

      const response = await updateTaxRangeSheetData(
        taxData,
        taxRangeSheet?._id
      );

      if (!response.ok) {
        setError(response.error || "Invalid tax range update.");
        return;
      }
      console.log("Tax Range Sheet Updated Successfully:", response.data);
      toast.success("Tax Range Sheet Updated!");
      setTaxUpdateFlag(false);
    } catch (error) {
      console.error("Error during update:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-gray-500 border-1 border-gray-300">
          <thead className="text-[16px] font-medium text-gray-800 text-center border-gray-300 border-b-1">
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
            {taxData?.map((el: any, index: any) => (
              <tr
                className="border-b text-[16px] font-medium text-gray-800 text-center cursor-pointer border-gray-300"
                key={index}
              >
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  {el?.TaxRate}
                </td>

                {/* Individual Input Fields */}
                <td className="border-r-1 border-gray-300 p-2">
                  <div className="flex items-center justify-between">
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.Individual.min === "" ? "" : el?.Individual.min
                      }
                      onChange={(e) =>
                        handleInputChange(e, el.TaxRate, "Individual", "min")
                      }
                    />
                    <MdHorizontalRule className="size-5 text-black" />
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.Individual.max === "" ? "" : el?.Individual.max
                      }
                      onChange={(e) =>
                        handleInputChange(e, el.TaxRate, "Individual", "max")
                      }
                    />
                  </div>
                </td>

                {/* Married Filing Jointly Input Fields */}
                <td className="border-r-1 border-gray-300 p-2">
                  <div className="flex items-center justify-between">
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.MarriedFilingJointly.min === ""
                          ? ""
                          : el?.MarriedFilingJointly.min
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          el.TaxRate,
                          "MarriedFilingJointly",
                          "min"
                        )
                      }
                    />
                    <MdHorizontalRule className="size-5 text-black" />
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.MarriedFilingJointly.max === ""
                          ? ""
                          : el?.MarriedFilingJointly.max
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          el.TaxRate,
                          "MarriedFilingJointly",
                          "max"
                        )
                      }
                    />
                  </div>
                </td>

                {/* Married Filing Separately Input Fields */}
                <td className="border-r-1 border-gray-300 p-2">
                  <div className="flex items-center justify-between">
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.MarriedFilingSeparately.min === ""
                          ? ""
                          : el?.MarriedFilingSeparately.min
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          el.TaxRate,
                          "MarriedFilingSeparately",
                          "min"
                        )
                      }
                    />
                    <MdHorizontalRule className="size-5 text-black" />
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.MarriedFilingSeparately.max === ""
                          ? ""
                          : el?.MarriedFilingSeparately.max
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          el.TaxRate,
                          "MarriedFilingSeparately",
                          "max"
                        )
                      }
                    />
                  </div>
                </td>

                {/* Head of Household Input Fields */}
                <td className="border-r-1 border-gray-300 p-2">
                  <div className="flex items-center justify-between">
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.HeadOfHousehold.min === ""
                          ? ""
                          : el?.HeadOfHousehold.min
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          el.TaxRate,
                          "HeadOfHousehold",
                          "min"
                        )
                      }
                    />
                    <MdHorizontalRule className="size-5 text-black" />
                    <span>$</span>
                    <input
                      autoComplete="off"
                      type="number"
                      className="border-primary text-base rounded-lg focus:ring-none pl-1 placeholder-gray-400 active:border-primary outline-none py-2 w-24"
                      value={
                        el?.HeadOfHousehold.max === ""
                          ? ""
                          : el?.HeadOfHousehold.max
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          el.TaxRate,
                          "HeadOfHousehold",
                          "max"
                        )
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Error Display */}
      {error && (
        <div className="text-lg text-red-400 my-4">
          <p>{error}</p>
        </div>
      )}
      <div className="flex space-x-4 mt-8">
        <button
          className="px-4 py-2 border-2 bg-primary text-white rounded-md font-medium text-base hover:bg-hoverColor hover:text-white w-[140px]"
          onClick={() => setTaxUpdateFlag(false)}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="px-4 py-2 border-2 bg-primary text-white rounded-md font-medium text-base hover:bg-hoverColor hover:text-white w-[140px]"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-300 animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <p>Loading</p>
            </div>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaxUpdate;
