import { getUserData } from "@/app/actions/user";
import UserInformation from "@/components/settings/UserInformation";

const page = async () => {
  const { ok, data: userData, error } = await getUserData();

  return (
    <div className="p-7  bg-[#eeeeee]">
      <UserInformation userData={userData} />
    </div>
  );
};

export default page;
