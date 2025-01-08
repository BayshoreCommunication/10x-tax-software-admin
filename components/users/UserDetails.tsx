import Image from "next/image";
import { formatDate } from "../shared/DateFormat";
import UserSubscriptionDetails from "./UserSubscriptionDetails";

interface UserDetailsProps {
  userDetails: {
    _id: string;
    logoUrl?: string;
    businessName?: string;
    phone?: string;
    email?: string;
    currentSubscriptionType?: string;
    currentSubscriptionPayDate?: string;
    currentSubscriptionExpiredDate?: string;
    address?: string;
  };
}

interface Subscription {
  subscriptionInfo: {
    subscriptionDate: string;
    subscriptionExpiredDate: string;
    type: string;
  };
}

interface Pagination {
  previousPage: number | null;
  nextPage: number | null;
  totalPages: number;
}

const UserDetails = ({ userDetails }: any) => {
  return (
    <div className="flex justify-between items-start space-x-12">
      <div className="w-[25%] bg-white">
        <div className="bg-primary text-white font-medium text-xl py-3 w-full text-center">
          <h2>{"Client Details"}</h2>
        </div>
        <div className="bg-white py-12 w-full flex items-center justify-center">
          <Image
            src={userDetails?.logoUrl || "/assets/admin-image/user-image.png"}
            alt="User Picture"
            width={200}
            height={200}
          />
        </div>
        <div
          className={` text-white font-medium text-xl py-3 w-full rounded text-center ${userDetails?.subscription ? "bg-green-500" : "bg-red-500"}`}
        >
          <h2>{userDetails?.subscription ? "Subscribed" : "Unsubscribed"}</h2>
        </div>
      </div>
      <div className="w-[75%] bg-white">
        <div className="bg-secondary py-4 w-full px-12">
          <h2 className="text-white font-medium text-xl w-full text-left">
            {"Full Client Details"}
          </h2>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-10  mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Contact:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{userDetails?.businessName}</li>
            <li>{userDetails?.phone}</li>
            <li>{userDetails?.email}</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Payment Plan:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>
              Monthly Subscription:{" "}
              {userDetails?.currentSubscriptionType === "monthly"
                ? "$29 USD"
                : "$99 USD"}
            </li>
            <li>
              Subscription Date:{" "}
              {formatDate(userDetails?.currentSubscriptionPayDate)}
            </li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Business Name:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{userDetails?.businessName}</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Business Address:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{userDetails?.address}</li>
          </ul>
        </div>
        <div className="border-2 px-6 py-4 mx-12 mt-3 mb-4">
          <h2 className="text-black font-medium text-xl w-full text-left mb-3">
            Next Payment Date:
          </h2>

          <ul className="max-w-md space-x-8 text-gray-700 list-disc list-inside flex items-center text-lg font-normal">
            <li>{formatDate(userDetails?.currentSubscriptionExpiredDate)}</li>
          </ul>
        </div>
        <UserSubscriptionDetails userId={userDetails?._id} />
      </div>
    </div>
  );
};

export default UserDetails;
