"use client";
import React, { useState } from "react";
import { LuUsers, LuLock, LuEyeOff, LuEye } from "react-icons/lu";
import { Checkbox } from "@nextui-org/react";

const OTPVerification = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        OTP Verification
      </h2>

      <p className="font-light text-lg text-gray-600">
        We have send an OTP on this email
      </p>
      <p className="font-normal text-lg text-black">s***78@gmail.com</p>

      <form className="max-w-2xl mx-auto">
        <div className="flex space-x-6 my-5 text-black">
          <input
            type="text"
            className="w-12 h-12 text-center border-b-2 border-gray-400 focus:outline-none focus:border-primary text-xl"
            placeholder="8"
            value={2}
          />
          <input
            type="text"
            className="w-12 h-12 text-center border-b-2 border-gray-400 focus:outline-none focus:border-primary text-xl"
            placeholder="4"
            value={0}
          />
          <input
            type="text"
            className="w-12 h-12 text-center border-b-2 border-gray-400 focus:outline-none focus:border-primary text-xl"
            placeholder="7"
            value={2}
          />
          <input
            type="text"
            className="w-12 h-12 text-center border-b-2 border-gray-400 focus:outline-none focus:border-primary text-xl"
            placeholder="3"
            value={7}
          />
          <input
            type="text"
            className="w-12 h-12 text-center border-b-2 border-gray-400 focus:outline-none focus:border-primary text-lg"
            placeholder="9"
            value={0}
          />
          <input
            type="text"
            className="w-12 h-12 text-center border-b-2 border-gray-400 focus:outline-none focus:border-primary text-lg "
            placeholder="2"
            value={2}
          />
        </div>

        {/* Submit Button */}
        <div className="py-3">
          <button
            type="submit"
            className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-[70%]"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
