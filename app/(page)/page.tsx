import DashboardMonthlySubscriptionsChart from "@/components/dashboard/DashboardMonthlySubscriptionsChart";
import OverviewSection from "@/components/dashboard/OverviewSection";
import { getAllUserData } from "../actions/user";

export const metadata = {
  title: "10x Tax Software",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet, mauris vitae molestie gravida, libero lorem fermentum elit, eu placerat nunc elit id massa. Morbi interdum lectus ut mauris vehicula",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-USA",
    },
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
};

const page = async () => {
  const { ok, data: usersDataList, error } = await getAllUserData();

  return (
    <div className="p-7  bg-[#eeeeee]">
      <DashboardMonthlySubscriptionsChart usersDataList={usersDataList} />
      <OverviewSection usersDataList={usersDataList} />
    </div>
  );
};

export default page;
