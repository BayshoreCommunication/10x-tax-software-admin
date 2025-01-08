"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type ParentState = {
  subscriptions: never[];
  pagination: {
    totalPages: number;
    previousPage: null;
    nextPage: null;
  };
  search: string;
  filterOption: string;
  currentPage: number;
  limit: number;
  isLoading: boolean;
  error: null;
};

type UserSearchOptionProps = {
  state: ParentState;
  setState: React.Dispatch<React.SetStateAction<ParentState>>;
};

const UserSearchOption: React.FC<UserSearchOptionProps> = ({
  state,
  setState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = ["All", "Monthly", "Yearly"];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value: string) => {
    const optionValue = value === "All" ? "" : value;
    setState((prev) => ({
      ...prev,
      filterOption: optionValue, // Only update the filterOption
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
        <span className="font-medium text-lg">
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
                  className={`block w-full px-4 py-2 text-left text-lg ${
                    state.filterOption === option ||
                    (option === "All" && !state.filterOption)
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
