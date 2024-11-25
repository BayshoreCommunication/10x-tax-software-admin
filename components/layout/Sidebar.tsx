"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { LuSettings, LuUsers2 } from "react-icons/lu";
import { HiOutlineReceiptTax } from "react-icons/hi";

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
      id="default-sidebar"
      className="h-screen w-full bg-secondary overflow-y-auto sm:translate-x-0 -translate-x-full transition-transform fixed top-0 left-0 2xl:w-[15%] xl:w-[22%] lg:w-[30%]"
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-center my-8">
          <div className="flex items-center justify-center w-[100px] h-[95px]">
            <Image
              src="/assets/site-logo/10x-tax-logo.png"
              alt="10x Tax Software"
              width={100}
              height={95}
              className="w-[100px] h-[95px]"
            />
          </div>
        </div>

        {/* Navigation */}
        <ul className="font-medium text-lg">
          {navItems.map((item) => (
            <li key={item?.slug}>
              <Link
                href={item?.slug}
                className={`flex items-center px-5 py-3 text-white transition-colors w-full 
                  border-t border-b border-gray-500 ${
                    currentPath === item?.slug
                      ? "bg-primary"
                      : "hover:bg-primary hover:border-primary"
                  }`}
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
