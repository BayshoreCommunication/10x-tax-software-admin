import DashboardMonthlySubscriptionsChart from "@/components/dashboard/DashboardMonthlySubscriptionsChart";
import OverviewSection from "@/components/dashboard/OverviewSection";
import SubscribersSection from "@/components/dashboard/SubscribersSection";

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
    images: "/opengraph-image.jpg",
  },
};

const page = () => {
  return (
    <div className="p-7  bg-[#eeeeee]">
      <DashboardMonthlySubscriptionsChart />
      <SubscribersSection />
      <OverviewSection />
    </div>
  );
};

export default page;
