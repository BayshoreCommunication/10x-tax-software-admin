"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { LuSettings, LuUsers2 } from "react-icons/lu";
import { HiOutlineReceiptTax } from "react-icons/hi";

const navItems = [
  { slug: "dashboard", label: "Dashboard", icon: <RxDashboard /> },
  { slug: "users", label: "Users", icon: <LuUsers2 /> },
  {
    slug: "tax-settings",
    label: "Tax Settings",
    icon: <HiOutlineReceiptTax />,
  },
  { slug: "settings", label: "Settings", icon: <LuSettings /> },
];

const Sidebar = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("dashboard");

  return (
    <aside
      id="default-sidebar"
      className="h-screen w-full bg-secondary overflow-y-auto sm:translate-x-0 -translate-x-full transition-transform  fixed top-0 left-0 2xl:w-[15%] xl:w-[22%] lg:w-[30%]"
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex justify-center my-8">
          <Image
            src="/assets/site-logo/10x-tax-logo.png"
            alt="10x Tax Software"
            width={100}
            height={100}
            className="h-auto"
          />
        </div>

        {/* Navigation */}
        <ul className="font-medium text-lg">
          {navItems.map((item, index) => (
            <li key={item?.slug}>
              <Link
                href={"/"}
                onClick={() => setSelectedNavItem(item?.slug)}
                className={`flex items-center px-5 py-3 text-white transition-colors w-full 
                  border-t border-b border-gray-500   ${
                    selectedNavItem === item?.slug
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

// {/* <button
//       data-drawer-target="default-sidebar"
//       data-drawer-toggle="default-sidebar"
//       aria-controls="default-sidebar"
//       type="button"
//       class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//     >
//       <span class="sr-only">Open sidebar</span>
//       <svg
//         class="w-6 h-6"
//         aria-hidden="true"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           clip-rule="evenodd"
//           fill-rule="evenodd"
//           d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//         ></path>
//       </svg>
//     </button> */}
