"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LuUsers2 } from "react-icons/lu";
import { LuLock } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { Checkbox } from "@nextui-org/react";
import { IoEyeOff } from "react-icons/io5";

const UserAuth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[70%]">
        <div className="grid grid-cols-3 items-center justify-center ">
          <div className=" bg-secondary p-10  rounded-s-lg space-y-.12">
            <Image
              src="/assets/site-logo/10x-tax-logo.png"
              alt="10x Tax Software"
              width={500}
              height={500}
              className="w-[100px] h-auto"
            />
            <div className="text-white space-y-4">
              <h2 className="font-bold text-5xl">Welcome Back!</h2>
              <p>
                Welcome Back! Ready to dive into your personalized experience?
                Login to pick up where you left off and explore new
                possibilities.
              </p>
            </div>
            <Image
              src="/assets/admin-image/home-welcome-image.png"
              alt="10x Tax Software"
              width={500}
              height={500}
              className="w-[300px] h-auto"
            />
          </div>
          <div className=" bg-white h-full p-10 col-span-2 rounded-e-lg">
            <h2 className="font-bold text-3xl text-primary mt-20 mb-5">
              Sign in to continue.
            </h2>
            <div className="">
              <form className="max-w-sm mx-auto">
                <div className="py-3">
                  <label
                    htmlFor="email-address-icon"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Your Email<span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <LuUsers2 className="text-primary size-5" />
                    </div>
                    <input
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2 placeholder-gray-400"
                      placeholder="Email / Phone"
                    />
                  </div>
                </div>

                <div className="py-3">
                  <label
                    htmlFor="password-input"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Password<span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    {/* Lock Icon */}
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <LuLock className="text-primary size-5" />
                    </div>
                    {/* Password Input */}
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password-input"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2 placeholder-gray-400"
                      placeholder="Password"
                    />
                    {/* Eye Icon */}
                    <div
                      className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <LuEye className="text-primary size-5" />
                      ) : (
                        <LuEyeOff className="text-primary size-5" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-10 pb-3">
                  <Checkbox size="md">Remember me</Checkbox>
                </div>

                <div className="py-3">
                  <button
                    type="button"
                    class="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 w-full"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserAuth;
