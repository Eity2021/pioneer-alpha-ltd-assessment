"use client";
import React from "react";
import { Calendar, Trash2 } from "lucide-react";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TaskModal({ open, onClose }: TaskModalProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-gray-800">
            Add New Task
          </h2>
          <button
            onClick={onClose}
            className="text-blue-600 text-[14px] font-medium hover:underline"
          >
            Go Back
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-[14px] font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-[14px] font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-[14px] font-medium text-gray-700 mb-2">
            Priority
          </label>

          <div className="flex items-center gap-6 text-[14px]">
            <label className="flex items-center gap-1 cursor-pointer">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span>Extreme</span>
              <input type="checkbox" className="ml-1" />
            </label>

            <label className="flex items-center gap-1 cursor-pointer">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span>Moderate</span>
              <input type="checkbox" className="ml-1" />
            </label>

            <label className="flex items-center gap-1 cursor-pointer">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Low</span>
              <input type="checkbox" className="ml-1" />
            </label>
          </div>
        </div>

        {/* Task Description */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-gray-700 mb-1">
            Task Description
          </label>
          <textarea
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Start writing here...."
          ></textarea>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-[14px] font-medium hover:bg-blue-700">
            Done
          </button>

          <button
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
            onClick={onClose}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
