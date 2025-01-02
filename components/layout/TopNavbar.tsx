import { getUserData } from "@/app/actions/user";
import TopMenuItem from "./TopMenuItem";

const TopNavbar = async () => {
  const { ok, data: userData, error } = await getUserData();

  return (
    <div>
      <TopMenuItem userData={userData} />
    </div>
  );
};

export default TopNavbar;
