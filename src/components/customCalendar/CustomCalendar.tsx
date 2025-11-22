"use client";
import React, { useState, useRef, useEffect } from "react";
import calender from "@/assets/image/calender.png";
import Image from "next/image";

interface CustomCalendarProps {
  value?: string | null; // YYYY-MM-DD format ideally
  onChange?: (date: string) => void;
  user?: any;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Convert ANY date format → valid Date()
const safeToDate = (value: string | null | undefined) => {
  if (!value) return null;

  // If valid YYYY-MM-DD, return directly
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(value);
  }

  // DD-MM-YYYY → convert
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [d, m, y] = value.split("-");
    return new Date(`${y}-${m}-${d}`);
  }

  // DD/MM/YYYY → convert
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [d, m, y] = value.split("/");
    return new Date(`${y}-${m}-${d}`);
  }

  return null; // fallback
};

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

// Format → YYYY-MM-DD
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
  // Convert values safely
  const selectedValueDate = safeToDate(value);
  const userBirthDate = safeToDate(user?.birthday);

  // Always valid date now
  const initialDate = selectedValueDate || userBirthDate || new Date();

  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const days = getDaysArray(currentYear, currentMonth);

  // Generate years 1900 → 2100
  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

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
        value={value || user?.birthday || ""} // ⭐ Always shows old birthday
        className="w-full h-12 rounded-lg border border-[#D1D5DB] bg-white px-4 pr-10 py-2 text-gray-700 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      />

      <span className="absolute right-3 top-3 pointer-events-none">
        <Image src={calender} alt="calendar" width={20} height={20} />
      </span>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-20"
            onClick={() => setOpen(false)}
          />

          {/* Popup Calendar */}
          <div className="fixed z-30 left-1/2 top-1/2 w-[90%] max-w-md p-6 rounded-xl bg-white border border-gray-100 shadow-lg -translate-x-1/2 -translate-y-1/2">

            {/* Month + Year Dropdowns */}
            <div className="flex items-center justify-between mb-4 gap-3">
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 text-gray-700"
              >
                {monthNames.map((m, idx) => (
                  <option key={idx} value={idx}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 text-gray-700"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 mb-1 text-center text-xs text-gray-400 font-medium">
              {dayLabels.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {days.map((d, idx) =>
                d ? (
                  <button
                    key={d.toISOString()}
                    onClick={() => {
                      if (onChange) onChange(formatDate(d));
                      setOpen(false);
                    }}
                    className={`py-2 rounded-lg transition ${(value || user?.birthday) === formatDate(d)
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
