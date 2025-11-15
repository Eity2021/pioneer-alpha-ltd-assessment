"use client";
import { useEffect, useRef, useState } from "react";
import filtered from "@/assets/image/filter.png";
import Image from "next/image";

const FilterDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-5 bg-white border border-[#D1D5DB] rounded-lg px-6 py-1.5 text-gray-700  hover:bg-gray-50 transition"
      >
        <span className="text-[16px] font-normal font-inter text-black ">
          Filter By
        </span>
        <Image src={filtered} alt="filtered" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-1 w-60 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
          <h3 className="text-[14px] font-semibold text-gray-700 mb-2">Date</h3>
          <div className="border-t border-gray-200 mb-2"></div>

          <div className="flex flex-col gap-2 text-[14px] text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Deadline Today
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Expires in 5 days
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Expires in 10 days
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Expires in 30 days
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
