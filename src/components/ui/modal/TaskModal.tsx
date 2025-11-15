"use client";
import React from "react";
import { Calendar, Trash2 } from "lucide-react";
import CustomCalendar from "@/components/customCalendar/CustomCalendar";
import CustomButton from "@/components/customButton/CustomButton";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TaskModal({ open, onClose }: TaskModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 min-h-screen">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[16px] font-inter font-semibold text-black">
            Add New Task
          </h2>
          <button
            onClick={onClose}
            className="text-[14px] font-inter font-semibold text-black"
          >
            Go Back
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-[14px] font-inter font-medium text-[#0C0C0C] mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-[14px] font-inter font-medium text-[#0C0C0C] mb-1">
            Date
          </label>
          <CustomCalendar></CustomCalendar>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-[14px] font-inter font-medium text-[#0C0C0C]  mb-2">
            Priority
          </label>
          <div className="flex items-center gap-12 text-[14px]">
            <label className="flex items-center gap-1 cursor-pointer">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span className="text-[13px] font-inter font-normal text-[#4B5563] ">
                Extreme
              </span>
              <input type="checkbox" className="ml-1" />
            </label>

            <label className="flex items-center gap-1 cursor-pointer">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="text-[13px] font-inter font-normal text-[#4B5563] ">
                Moderate
              </span>
              <input type="checkbox" className="ml-1" />
            </label>

            <label className="flex items-center gap-1 cursor-pointer">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="text-[13px] font-inter font-normal text-[#4B5563] ">
                Low
              </span>
              <input type="checkbox" className="ml-1" />
            </label>
          </div>
        </div>

        {/* Task Description */}
        <div className="mb-6">
          <label className="block text-[14px] font-inter font-medium text-[#0C0C0C]  mb-1">
            Task Description
          </label>
          <textarea
            rows={6}
            className="w-full border border-[#A1A3AB] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-0 focus:ring-[#A1A3AB] resize-none"
            placeholder="Start writing here...."
          ></textarea>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button className="bg-[#5272FF] text-white px-6 py-[6px] rounded-[6px] text-[14px] font-inter font-semibold hover:bg-[#5272FF]">
            Done
          </button>

          <button
            className="bg-[#EE0039] text-white p-2 rounded-lg hover:bg-[#EE0039]"
            onClick={onClose}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
