import { getCachedUserData } from "@/app/actions/user";
import { auth } from "@/auth";
import UserInformation from "@/components/settings/UserInformation";

const page = async () => {
  // const { ok, data: userData, error } = await getUserData();
  const session = await auth();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${session?.user?.accessToken || ""}`,
  };

  const userData = await getCachedUserData(headers);

  return (
    <div className="p-7  bg-[#eeeeee]">
      <UserInformation userData={userData?.data} />
    </div>
  );
};

export default page;
