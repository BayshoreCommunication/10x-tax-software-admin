"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

// Define the expected state structure
interface UserSearchOptionProps {
  state: { filterOption: string }; // Make filterOption a non-optional string
  setState: React.Dispatch<React.SetStateAction<{ filterOption: string }>>;
}

const UserSearchOption: React.FC<UserSearchOptionProps> = ({
  state,
  setState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = ["all", "month", "year"];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value: string) => {
    const optionValue = value === "all" ? "" : value;

    setState((prev) => ({
      ...prev,
      filterOption: optionValue,
    }));

    setIsOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        type="button"
        className={`inline-flex w-[150px] items-center justify-between px-4 py-2 text-sm font-semibold text-gray-900 border rounded shadow ring-1 ring-gray-300 hover:bg-gray-100 ${
          isOpen ? "bg-gray-100" : "bg-white"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <span className="font-medium text-lg capitalize">
          {state.filterOption || "All"}
        </span>
        <IoIosArrowDown className="text-gray-600 w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
        >
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={`block w-full px-4 py-2 text-left text-lg capitalize ${
                    (state.filterOption === "" && option === "all") ||
                    state.filterOption === option
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSearchOption;
