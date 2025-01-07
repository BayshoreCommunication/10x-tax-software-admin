"use client";
import { useState } from "react";
import TaxUpdate from "./TaxUpdate";
import TaxView from "./TaxView";

const TaxSettings = ({ taxRangeSheet }: any) => {
  const [textUpdateFlag, setTaxUpdateFlag] = useState(false);

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
          Tax Brackets 2025
        </h2>
      </div>
      {textUpdateFlag ? (
        <TaxUpdate
          setTaxUpdateFlag={setTaxUpdateFlag}
          taxRangeSheet={taxRangeSheet}
        />
      ) : (
        <TaxView
          setTaxUpdateFlag={setTaxUpdateFlag}
          taxRangeSheet={taxRangeSheet}
        />
      )}
    </div>
  );
};

export default TaxSettings;
