import { getTaxRangeSheetData } from "@/app/actions/taxRangeSheet";
import TaxSettings from "@/components/tax-settings/TaxSettings";

const page = async () => {
  const { ok, data: taxRangeSheet, error } = await getTaxRangeSheetData();

  return (
    <div className="p-7  bg-[#eeeeee]">
      <TaxSettings taxRangeSheet={taxRangeSheet} />
    </div>
  );
};

export default page;
