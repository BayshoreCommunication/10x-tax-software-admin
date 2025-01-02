"use client";

import { useState } from "react";
import UserInfoView from "./UserInfoView";
import UserUpdateInfo from "./UserUpdateInfo";

// Define the type for user data
interface UserData {
  logoUrl?: string;
  businessName?: string;
  phone?: string;
  email?: string;
}

// Define the props for the UserInformation component
interface UserInformationProps {
  userData: UserData;
}

const UserInformation: React.FC<UserInformationProps> = ({ userData }) => {
  const [userInfoUpdateFlag, setUserInfoUpdateFlag] = useState(false);

  return (
    <div className="bg-white p-12">
      {userInfoUpdateFlag ? (
        <UserUpdateInfo
          userInfoUpdateFlag={userInfoUpdateFlag}
          setUserInfoUpdateFlag={setUserInfoUpdateFlag}
          userData={userData}
        />
      ) : (
        <UserInfoView
          userData={userData}
          userInfoUpdateFlag={userInfoUpdateFlag}
          setUserInfoUpdateFlag={setUserInfoUpdateFlag}
        />
      )}
    </div>
  );
};

export default UserInformation;
