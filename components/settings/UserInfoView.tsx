"use client";

import Image from "next/image";
import { TbEditCircle } from "react-icons/tb";

// Define the type for user data
interface UserData {
  logoUrl?: string;
  businessName?: string;
  phone?: string;
  address?: string;
}

// Define the props for the UserInfoView component
interface UserInfoViewProps {
  userData: UserData;
  userInfoUpdateFlag: boolean;
  setUserInfoUpdateFlag: (flag: boolean) => void;
}

const UserInfoView: React.FC<UserInfoViewProps> = ({
  userData,
  userInfoUpdateFlag,
  setUserInfoUpdateFlag,
}) => {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#11142D]">
          Business Information
        </h2>
      </div>
      <div className="flex items-center space-x-8">
        <div className="relative w-[150px] h-[150px] border-2 rounded-full">
          <Image
            src={userData?.logoUrl || "/assets/admin-image/user-image.png"}
            alt="User Picture"
            width={150}
            height={150}
            className="absolute inset-0 rounded-full object-cover w-[150px] h-[150px]"
          />
          <div className="bg-primary hover:bg-hoverColor p-1 flex items-center justify-center w-8 h-8 border border-white rounded-full absolute bottom-5 right-6 translate-x-1/2 translate-y-1/2 cursor-pointer">
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center justify-center w-full h-full"
            >
              <TbEditCircle className="text-white text-xl" />
            </label>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[#11142D]">Taps</h2>
      </div>
      <div className="p-6 border rounded mt-12">
        <table className="max-w-xl text-left rtl:text-right text-xl font-medium">
          <tbody>
            <tr className="bg-white">
              <td className="px-3 py-3 text-[#666666]">
                <h3 className="text-xl font-normal text-[#11142D]">Name:</h3>
              </td>
              <td className="px-3 py-3 text-[#11142D]">
                <h3 className="text-xl font-medium text-[#11142D]">
                  {userData?.businessName || "N/A"}
                </h3>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-3 py-3 text-[#666666]">
                <h3 className="text-xl font-normal text-[#11142D]">Phone:</h3>
              </td>
              <td className="px-3 py-3 text-[#11142D]">
                <h3 className="text-xl font-medium text-[#11142D]">
                  {userData?.phone || "N/A"}
                </h3>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-3 py-3 text-[#666666]">
                <h3 className="text-xl font-normal text-[#11142D]">Address:</h3>
              </td>
              <td className="px-3 py-3 text-[#11142D]">
                <h3 className="text-xl font-medium text-[#11142D]">
                  {userData?.address || "N/A"}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="px-4 py-2 border-2 bg-primary text-white rounded-md font-medium text-base hover:bg-hoverColor hover:text-white w-[140px] mt-10"
        onClick={() => setUserInfoUpdateFlag(true)}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default UserInfoView;
