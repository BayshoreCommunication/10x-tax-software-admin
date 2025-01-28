"use client";

import { MdHorizontalRule } from "react-icons/md";

const TaxView = ({ setTaxUpdateFlag, taxRangeSheet }: any) => {
  console.log("check value item 8", taxRangeSheet);

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
              <th scope="col" className="px-6 py-3">
                Head of Household
              </th>
            </tr>
          </thead>
          <tbody>
            {taxRangeSheet?.single?.map((el: any, index: number) => (
              <tr
                key={index}
                className="border-b text-[16px] font-medium text-gray-800 text-center cursor-pointer border-gray-300"
              >
                {/* Tax Rate Column */}
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  {el?.rate}%
                </td>

                {/* Individual Column */}
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span>$</span>
                      <p>{el?.min}</p>
                    </div>
                    <MdHorizontalRule className="size-5 text-black" />
                    <div className="flex items-center space-x-1">
                      <p>{el?.max === null ? "More" : "$" + el?.max}</p>
                    </div>
                  </div>
                </td>

                {/* Married Filing Jointly Column */}
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span>$</span>
                      <p>{taxRangeSheet?.marriedFilingJointly[index]?.min}</p>
                    </div>
                    <MdHorizontalRule className="size-5 text-black" />
                    <div className="flex items-center space-x-1">
                      <p>
                        {taxRangeSheet.marriedFilingJointly[index].max === null
                          ? "More"
                          : "$" + taxRangeSheet.marriedFilingJointly[index].max}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Married Filing Separately Column */}
                <td className="px-6 py-4 border-r-1 border-gray-300 hover:bg-gray-100">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span>$</span>
                      <p>{taxRangeSheet.marriedFilingSeparately[index].min}</p>
                    </div>
                    <MdHorizontalRule className="size-5 text-black" />
                    <div className="flex items-center space-x-1">
                      <p>
                        {taxRangeSheet.marriedFilingSeparately[index].max ===
                        null
                          ? "More"
                          : "$" +
                            taxRangeSheet.marriedFilingSeparately[index].max}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Head of Household Column */}
                <td className="px-6 py-4 hover:bg-gray-100">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span>$</span>
                      <p>{taxRangeSheet.headOfHousehold[index].min}</p>
                    </div>
                    <MdHorizontalRule className="size-5 text-black" />
                    <div className="flex items-center space-x-1">
                      <p>
                        {taxRangeSheet.headOfHousehold[index].max === null
                          ? "More"
                          : "$" + taxRangeSheet.headOfHousehold[index].max}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-4 mt-8">
        <button
          className="px-4 py-2 border-2 bg-primary text-white rounded-md font-medium text-base hover:bg-hoverColor hover:text-white w-[140px]"
          onClick={() => setTaxUpdateFlag(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaxView;
