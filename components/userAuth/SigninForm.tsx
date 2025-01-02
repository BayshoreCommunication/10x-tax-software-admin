"use client";

import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff, LuLock, LuUsers } from "react-icons/lu";

import { credentialLogin } from "@/app/actions";

interface SigninFormProps {
  setUserSignInOtpFlag: (flag: boolean) => void;
  setUserSignInInfo: (info: UserSignInInfo) => void;
}

interface UserSignInInfo {
  email: string | undefined;
  otp: string | undefined;
  [key: string]: any; // Extendable to include other fields
}

const SigninForm: React.FC<SigninFormProps> = ({
  setUserSignInOtpFlag,
  setUserSignInInfo,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error on new attempt

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    // Basic validation
    if (!email || !password) {
      setError("Both email and password are required.");

      return;
    }

    try {
      setLoading(true); // Start loading state

      // Call login API
      const response = await credentialLogin(formData);

      if (response?.error) {
        setError(response.error); // Set error from response
      } else if (response?.ok) {
        // Set OTP flag and user info only if login is successful
        setUserSignInOtpFlag(true);
        setUserSignInInfo({
          email,
          otp: "12585",
        });
      } else {
        setError("Unexpected response from server. Please try again later.");
      }
    } catch (error) {
      // Handle unexpected errors
      setError("An unexpected error occurred. Please try again later.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        Sign in to your account
      </h2>

      <form onSubmit={onSubmit}>
        {/* Email Input */}
        <div className="py-3">
          <label
            className="block mb-2 text-lg font-normal text-gray-900"
            htmlFor="email"
          >
            Email<span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuUsers className="text-primary text-lg" />
            </div>
            <input
              required
              autoComplete="off"
              className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-2 placeholder-gray-400 outline-none"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              type="email"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="py-3">
          <label
            className="block mb-2 text-lg font-normal text-gray-900"
            htmlFor="password"
          >
            Password<span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuLock className="text-primary text-lg" />
            </div>
            <input
              required
              className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-2 placeholder-gray-400 outline-none"
              id="password"
              name="password"
              placeholder="*********"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <LuEye className="text-primary text-lg" />
              ) : (
                <LuEyeOff className="text-primary text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Links */}
        <div className="flex items-center justify-between mt-3 mb-8">
          {/* Remember Me */}
          <div className="">
            <Checkbox size="md">Remember me</Checkbox>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-lg text-red-400 mb-4 mt-0">
            <p>{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="py-3">
          <button
            className={`text-white font-medium rounded-lg text-lg px-5 py-3 w-full bg-primary hover:bg-hoverColor`}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-300 animate-spin fill-white"
                    fill="none"
                    viewBox="0 0 100 101"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
                <p>Loading</p>
              </div>
            ) : (
              <p>Sign in</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
