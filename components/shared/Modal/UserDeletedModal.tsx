"use client";

import { userDeletedById } from "@/app/actions/user";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface UserDeletedModalProps {
  userDeletedModalFlag: boolean;
  userId: string | null;
  setUserDeletedModalFlag: (value: boolean) => void;
  userDeletedValue: boolean;
  setUserDeletedValue: (value: boolean) => void;
}

const UserDeletedModal: React.FC<UserDeletedModalProps> = ({
  userDeletedModalFlag,
  setUserDeletedModalFlag,
  userDeletedValue,
  setUserDeletedValue,
  userId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const toggleModal = () => setUserDeletedModalFlag(!userDeletedModalFlag);
  const closeModal = () => setUserDeletedModalFlag(false);

  const userDeletedHandler = async () => {
    if (userId === null) {
      toast.error("Invalid user ID");
      return;
    }

    setLoading(true);

    try {
      const response = await userDeletedById(userId);

      if (response.ok) {
        toast.success("Successfully deleted user");
        setUserDeletedModalFlag(false);
        setUserDeletedValue(!userDeletedValue);
      } else {
        toast.error(response.error || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error in userDeletedHandler:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {userDeletedModalFlag && (
        <div
          id="default-modal"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-[700px] max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center p-4 md:p-5 border-b rounded-t bg-secondary text-white">
                <h3 className="text-xl font-semibold text-white text-center flex justify-center">
                  Delete User
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 my-6">
                <p className="text-xl leading-relaxed text-gray-800 text-center">
                  Do you want to delete?
                </p>
              </div>
              {/* Modal footer */}
              <div className="flex items-center justify-center space-x-4 p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  onClick={userDeletedHandler}
                  className={`px-6 py-2 text-primary rounded-md font-medium text-base hover:bg-primary border-2 border-primary hover:text-white w-[100px] h-[50px] ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 text-gray-300 animate-spin fill-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7234 75.2124 7.41289C69.5422 4.1024 63.2754 1.94025 56.7226 1.05122C51.7666 0.367234 46.7493 0.446072 41.7928 1.27884C39.3249 1.69443 37.8168 4.19778 38.4538 6.62326C39.0909 9.04874 41.5644 10.5074 43.9734 10.102C47.9612 9.42941 52.0487 9.43202 56.0416 10.101C61.7583 11.0674 67.2151 13.1177 72.1011 16.1591C76.9872 19.2004 81.2311 23.1969 84.5843 27.9082C86.9179 31.2944 88.7989 35.0323 90.1618 38.955C90.9496 41.2115 93.5422 42.5356 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 text-white rounded-md font-medium text-base bg-primary hover:bg-[#be9837] hover:text-white w-[100px] h-[50px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDeletedModal;
