"use client";

import { updateUserData } from "@/app/actions/user";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TbEditCircle } from "react-icons/tb";
import { toast } from "react-toastify";

interface UserData {
  logoUrl?: string;
  businessName?: string;
  phone?: string;
  address?: string;
}

interface UserUpdateInfoProps {
  userData: UserData;
  userInfoUpdateFlag: boolean;
  setUserInfoUpdateFlag: Dispatch<SetStateAction<boolean>>;
}

const UserUpdateInfo: React.FC<UserUpdateInfoProps> = ({
  userData,
  userInfoUpdateFlag,
  setUserInfoUpdateFlag,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<string>(
    userData?.logoUrl || ""
  );
  const [businessInfoForm, setBusinessInfoForm] = useState<{
    image: File | string;
    businessName: string;
    phone: string;
    address: string;
  }>({
    image: userData?.logoUrl || "",
    businessName: userData?.businessName || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
  });

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessInfoForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle logo upload
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG and PNG formats are allowed.");
      return;
    }

    if (file.size > maxSizeInBytes) {
      setError("Image size should be less than 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
      if (reader.result) {
        setLogoPreview(reader.result.toString());
      }
    };

    reader.readAsDataURL(file);

    setBusinessInfoForm((prevState: any) => ({
      ...prevState,
      image: file,
    }));

    setError(null);
  };

  // Handle form submission
  const handleSubmitUpdateFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", businessInfoForm.image as File); // Assert File type
    formData.append("businessName", businessInfoForm.businessName);
    formData.append("address", businessInfoForm.address);
    formData.append("phone", businessInfoForm.phone);

    try {
      const result = await updateUserData(formData);
      if (result.ok) {
        setError(null);
        toast.success("Info updated successfully!");
        setUserInfoUpdateFlag(false);
      } else {
        setError(result.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Info update failed");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            src={logoPreview}
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
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                name="image"
              />
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
              <td className="px-3 py-3 text-[#666666]">Name:</td>
              <td className="px-3 py-3 text-[#11142D]">
                <input
                  autoComplete="off"
                  type="text"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400 active:border-primary outline-none"
                  id="businessName"
                  name="businessName"
                  value={businessInfoForm.businessName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-3 py-3 text-[#666666]">Phone:</td>
              <td className="px-3 py-3 text-[#11142D]">
                <input
                  autoComplete="off"
                  type="text"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400 active:border-primary outline-none"
                  id="phone"
                  name="phone"
                  value={businessInfoForm.phone}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-3 py-3 text-[#666666]">Address:</td>
              <td className="px-3 py-3 text-[#11142D]">
                <input
                  autoComplete="off"
                  type="text"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400 active:border-primary outline-none"
                  id="address"
                  name="address"
                  value={businessInfoForm.address}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {error && <p className="text-red-500 text-base pt-3 ml-6">{error}</p>}
      <div className="mt-6 space-x-4 flex items-center">
        <button
          onClick={() => setUserInfoUpdateFlag(false)}
          className="px-4 py-2 border-2 text-white rounded-md font-medium text-base bg-primary hover:bg-hoverColor w-[140px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmitUpdateFormData}
          className="px-4 py-2 border-2 text-white rounded-md font-medium text-base bg-primary hover:bg-hoverColor w-[140px]"
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
              <span>Updating...</span>
            </div>
          ) : (
            "Update Info"
          )}
        </button>
      </div>
    </div>
  );
};

export default UserUpdateInfo;
