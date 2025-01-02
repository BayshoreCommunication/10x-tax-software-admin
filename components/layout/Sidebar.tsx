"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { LuSettings, LuUsers2 } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

const navItems = [
  { slug: "/", label: "Dashboard", icon: <RxDashboard /> },
  { slug: "/users", label: "Users", icon: <LuUsers2 /> },
  {
    slug: "/tax-settings",
    label: "Tax Settings",
    icon: <HiOutlineReceiptTax />,
  },
  { slug: "/settings", label: "Settings", icon: <LuSettings /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Update the current path on the client side
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <aside
      aria-label="Sidebar"
      className="h-screen w-full bg-secondary overflow-y-auto sm:translate-x-0 -translate-x-full transition-transform fixed top-0 left-0 2xl:w-[15%] xl:w-[22%] lg:w-[30%]"
      id="default-sidebar"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-center my-8">
          <div className="flex items-center justify-center w-[100px] h-[95px]">
            <Link href="/">
              <Image
                alt="10x Tax Software"
                className="w-[100px] h-[95px]"
                height={95}
                src="/assets/site-logo/10x-tax-logo.png"
                width={100}
              />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <ul className="font-medium text-lg">
          {navItems.map((item) => (
            <li key={item?.slug}>
              <Link
                className={`flex items-center px-5 py-3 text-white transition-colors w-full 
                  border-t border-b border-gray-500 ${
                    currentPath === item?.slug
                      ? "bg-primary"
                      : "hover:bg-primary hover:border-primary"
                  }`}
                href={item?.slug}
              >
                <div className="text-2xl">{item?.icon}</div>
                <span className="ms-3">{item?.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
