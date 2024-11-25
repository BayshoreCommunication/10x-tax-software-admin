"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const TopNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const dashboardTitle = siteConfig?.sideBarItems?.find(
    (el: any, index: number) => el?.slug === pathname
  )?.label;

  return (
    <div className="bg-white py-6 px-10 flex justify-between items-center">
      <h2 className="font-bold text-4xl text-secondary">
        {dashboardTitle || "User"}
      </h2>
      <div>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div>
            <button
              type="button"
              className={`inline-flex w-full items-center justify-center gap-x-1.5 rounded-full px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 border shadow ${
                isOpen ? "bg-gray-100" : "bg-white"
              }`}
              id="menu-button"
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-600 size-5" />
              </div>
              <h3 className="font-medium text-lg">Admin</h3>
              <div className="w-6 h-6 flex items-center justify-center">
                <IoIosArrowDown className="text-gray-600 size-5" />
              </div>
            </button>
          </div>

          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <Link
                  href={"/settings"}
                  className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white"
                  role="menuitem"
                  id="menu-item-0"
                >
                  Account settings
                </Link>

                <button
                  onClick={toggleDropdown}
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
