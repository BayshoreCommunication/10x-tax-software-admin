"use client";
import React, { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { FaUser } from "react-icons/fa";

const UserSearchOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="mr-4">
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button
            type="button"
            className={`inline-flex w-full items-center justify-between gap-x-1.5 rounded mx-4 px-2 py-1 text-sm font-semibold text-gray-900  ring-1 ring-inset ring-gray-300 hover:bg-gray-100 border shadow ${isOpen ? "bg-gray-100" : "bg-white"}`}
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            <h3 className="font-medium text-lg">All</h3>
            <div className="w-6 h-6 flex items-center justify-center ">
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
              <button
                onClick={toggleDropdown}
                className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white"
                role="menuitem"
                id="menu-item-0"
              >
                All
              </button>
              <button
                onClick={toggleDropdown}
                type="submit"
                className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white"
                role="menuitem"
                id="menu-item-3"
              >
                Weekly
              </button>
              <button
                onClick={toggleDropdown}
                type="submit"
                className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white"
                role="menuitem"
                id="menu-item-3"
              >
                Monthly
              </button>
              <button
                onClick={toggleDropdown}
                type="submit"
                className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white"
                role="menuitem"
                id="menu-item-3"
              >
                Yearly
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearchOption;
