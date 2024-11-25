import UserDetails from "@/components/users/UserDetails";
import { usersDemoData } from "@/config/data";
import React from "react";

const page = async ({ params }: any) => {
  const userDetails = usersDemoData?.find(
    (user: any, index: number) => index === parseInt(params.id)
  );

  return (
    <div className="p-7  bg-[#eeeeee]">
      <UserDetails userDetails={userDetails} />
    </div>
  );
};

export default page;
