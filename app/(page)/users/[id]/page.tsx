import { getAllUserData } from "@/app/actions/user";
import UserDetails from "@/components/users/UserDetails";

const page = async ({ params }: any) => {
  const { ok, data: usersDataList, error } = await getAllUserData();

  const userDetails = await usersDataList?.users?.find(
    (user: any) => user._id === params?.id
  );

  return (
    <div className="p-7  bg-[#eeeeee]">
      <UserDetails userDetails={userDetails} />
    </div>
  );
};

export default page;
