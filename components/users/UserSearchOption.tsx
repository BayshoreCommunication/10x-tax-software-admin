"use client";
import React, { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type UserSearchOptionProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const UserSearchOption: React.FC<UserSearchOptionProps> = ({
  search,
  setSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All"); // State for selected item
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (value?: string) => {
    if (value !== undefined) {
      setSelectedOption(value); // Update selected option
      setSearch(value); // Notify parent
    }
    setIsOpen(!isOpen); // Toggle dropdown
  };

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
    <div className="">
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className={`inline-flex  w-[150px] items-center justify-between gap-x-1.5 rounded mx-4 px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 border shadow ${
            isOpen ? "bg-gray-100" : "bg-white"
          }`}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="font-medium text-lg">{selectedOption}</h3>{" "}
          {/* Display selected option */}
          <div className="w-6 h-6 flex items-center justify-center">
            <IoIosArrowDown className="text-gray-600 size-5" />
          </div>
        </button>

        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <button
                onClick={() => toggleDropdown("All")}
                className={`block w-full px-4 py-2 text-left text-lg ${
                  selectedOption === "All"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary hover:text-white"
                }`}
                role="menuitem"
                id="menu-item-0"
              >
                All
              </button>
              <button
                onClick={() => toggleDropdown("Monthly")}
                type="button"
                className={`block w-full px-4 py-2 text-left text-lg ${
                  selectedOption === "Monthly"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary hover:text-white"
                }`}
                role="menuitem"
                id="menu-item-1"
              >
                Monthly
              </button>
              <button
                onClick={() => toggleDropdown("Yearly")}
                type="button"
                className={`block w-full px-4 py-2 text-left text-lg ${
                  selectedOption === "Yearly"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary hover:text-white"
                }`}
                role="menuitem"
                id="menu-item-2"
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
