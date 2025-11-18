"use client";
import React, { useState, useRef, useEffect } from "react";
import calender from "@/assets/image/calender.png";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";

interface CustomCalendarProps {
  value?: string | null; // now string in YYYY-MM-DD
  onChange?: (date: string) => void;
  user?: any;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDaysArray = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const result: (Date | null)[] = [];
  const firstDay = date.getDay();
  for (let i = 0; i < firstDay; i++) result.push(null);
  while (date.getMonth() === month) {
    result.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return result;
};

// Helper to format Date -> YYYY-MM-DD
const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  user,
  value,
  onChange,
}) => {
  const initialDate = value ? new Date(value) : new Date();
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const days = getDaysArray(currentYear, currentMonth);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative w-full" ref={ref}>
      <input
        readOnly
        value={value || user?.birthday || ""}
        className="w-full h-12 rounded-lg border border-[#D1D5DB] bg-white px-4 pr-10 py-2 text-gray-700 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      />
      <span className="absolute right-3 top-3 pointer-events-none">
        <Image src={calender} alt="calendar" width={20} height={20} />
      </span>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-20"
            onClick={() => setOpen(false)}
          />
          <div className="fixed z-30 left-1/2 top-1/2 w-[40%] max-w-md p-6 rounded-xl bg-white border border-gray-100 shadow-lg -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear((y) => y - 1);
                  } else setCurrentMonth((m) => m - 1);
                }}
                className="p-2 text-gray-500 rounded hover:bg-gray-100"
              >
                <ChevronsLeft />
              </button>
              <div className="font-semibold text-md text-gray-700">
                {monthNames[currentMonth]} {currentYear}
              </div>
              <button
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear((y) => y + 1);
                  } else setCurrentMonth((m) => m + 1);
                }}
                className="p-2 text-gray-500 rounded hover:bg-gray-100"
              >
                <ChevronsRight />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1 text-center text-xs text-gray-400 font-medium">
              {dayLabels.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {days.map((d, idx) =>
                d ? (
                  <button
                    key={d.toISOString()}
                    onClick={() => {
                      if (onChange) onChange(formatDate(d)); // formatted YYYY-MM-DD
                      setOpen(false);
                    }}
                    className={`py-2 rounded-lg transition ${
                      value === formatDate(d)
                        ? "bg-linear-to-r from-[#5272FF] to-[#0D224A] text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {d.getDate()}
                  </button>
                ) : (
                  <div key={idx}></div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCalendar;
