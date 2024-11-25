"use client";
import Image from "next/image";
import React from "react";
import { TbEditCircle } from "react-icons/tb";

const UserInformation = () => {
  return (
    <div className=" bg-white p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#11142D]">
          Business Information
        </h2>
      </div>
      <div className="flex items-center space-x-8">
        <div className="relative w-[150px] h-[150px]">
          <Image
            src="/assets/admin-image/user-image.png"
            alt="User Picture"
            width={150}
            height={150}
            className="absolute inset-0 rounded-full"
          />
          <div className="bg-primary hover:bg-yellow-500 p-1 flex items-center justify-center w-8 h-8 border border-white rounded-full absolute bottom-6 right-6 translate-x-1/2 translate-y-1/2 cursor-pointer">
            <TbEditCircle className="text-white text-xl" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[#11142D]">Taps</h2>
      </div>
      <div className="p-6 border rounded mt-12">
        <div className="flex items-center space-x-8 my-3">
          <h3 className="text-xl font-normal text-[#11142D]">Name:</h3>
          <h3 className="text-xl font-medium text-[#11142D]">Jeremy Rose</h3>
        </div>
        <div className="flex items-center space-x-6 my-3">
          <h3 className="text-xl font-normal text-[#11142D]">Phone:</h3>
          <h3 className="text-xl font-medium text-[#11142D]">+880 123456789</h3>
        </div>
        <div className="flex items-center space-x-9 my-3">
          <h3 className="text-xl font-normal text-[#11142D]">Email:</h3>
          <h3 className="text-xl font-medium text-[#11142D]">
            example@gmail.com
          </h3>
        </div>
      </div>
      <button className="px-4 py-2 border-2 bg-primary text-white rounded-md font-medium text-base hover:bg-yellow-600 hover:text-white w-[140px] mt-10">
        Edit Profile
      </button>
    </div>
  );
};

export default UserInformation;
