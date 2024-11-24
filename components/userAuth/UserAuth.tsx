"use client";
import React from "react";
import Image from "next/image";
import AdminSignin from "./AdminSignin";
import OTPVerification from "./OTPVerification";

const UserAuth = () => {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[90%] xl:w-[80%] 2xl:w-[70%]">
        <div className="grid grid-cols-3 justify-center items-stretch">
          {/* Left Section */}
          <div className="bg-secondary p-10 rounded-s-xl space-y-12">
            <Image
              src="/assets/site-logo/10x-tax-logo.png"
              alt="10x Tax Software"
              width={500}
              height={500}
              className="w-[100px] h-auto"
            />
            <div className="text-white space-y-4">
              <h2 className="font-bold text-4xl">Welcome Back!</h2>
              <p className="font-normal text-base">
                Welcome Back! Ready to dive into your personalized experience?
                Login to pick up where you left off and explore new
                possibilities.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/admin-image/home-welcome-image.png"
                alt="10x Tax Software"
                width={500}
                height={500}
                className="w-[354px] h-auto"
              />
            </div>
          </div>
          {/* Right Section */}
          <div className="bg-white p-10 col-span-2 rounded-e-xl flex items-center justify-center">
            <div className="w-full max-w-md">
              <AdminSignin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserAuth;
