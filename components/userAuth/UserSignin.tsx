"use client";

import { useState } from "react";
import OTPVerificationForm from "./OTPVerificationForm";
import SigninForm from "./SigninForm";
import UserSideBar from "./UserSideBar";

interface UserSignInInfo {
  email: string | undefined;
  otp: string | undefined;
}

const UserSignin = () => {
  const [userSignInOtpFlag, setUserSignInOtpFlag] = useState<boolean>(false);
  const [userSignInInfo, setUserSignInInfo] = useState<UserSignInInfo | null>(
    null
  );

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[90%] xl:w-[80%] 2xl:w-[70%]">
        <div className="grid grid-cols-3 justify-center items-stretch">
          {/* Left Section */}
          <UserSideBar
            title={userSignInOtpFlag ? "OTP Verification" : "Welcome Back!"}
          />

          {/* Right Section */}
          <div className="bg-white p-10 col-span-2 rounded-e-xl flex items-center justify-center">
            <div className="w-full">
              {userSignInOtpFlag ? (
                <OTPVerificationForm
                  userSignInInfo={userSignInInfo}
                  userSignInOtpFlag={userSignInOtpFlag}
                />
              ) : (
                <SigninForm
                  setUserSignInOtpFlag={setUserSignInOtpFlag}
                  setUserSignInInfo={setUserSignInInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSignin;
