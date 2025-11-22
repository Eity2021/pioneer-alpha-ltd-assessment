"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { todosList } from "@/hooks/ReactQueryHooks";
import TodoList from "../../../components/ui/todoList/TodoList";
import TaskModal from "@/components/ui/modal/TaskModal";
import FilterDropdown from "@/components/ui/filterDropdown/FilterDropdown";

export default function page() {
  const [open, setOpen] = useState(false);

  const { data: todoLists } = useQuery({
    queryKey: ["todoLists"],
    queryFn: todosList,
  });

  return (
    <div className="bg-[#eef7ff]  py-6 pr-6 xl:pl-10  md:pl-10 pl-6">
      <div className="flex justify-between mb-10">
        <div>
          <h2 className="text-[36px] font-semibold text-[#0D224A]  font-inter">
            Todos
          </h2>
          <hr className="w-16 border border-[#5272FF]" />
        </div>
        <div className="flex items-center">
          <button
            className="bg-[#5272FF] text-white rounded-lg px-4 py-2 text-[16px] font-inter font-normal"
            onClick={() => setOpen(true)}
          >
            + New Task
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full">
        {/* Search Box */}
        <div className="relative flex-1 w-full mb-2 md:mb-0">
          <input
            className="border border-[#D1D5DB] w-full bg-white rounded-lg py-2.5 px-4 text-[12px] font-semibold font-inter text-[#4B5563] pr-10 focus:ring- focus:outline-none"
            type="text"
            placeholder="Search your task here..."
          />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[38px] h-[38px] rounded-lg bg-[#5272FF] flex justify-center items-center text-white cursor-pointer">
            <Search size={18} />
          </div>
        </div>

        <div className="w-full md:w-auto">
          <FilterDropdown />
        </div>
      </div>

      <div className="mt-8">
        <TodoList todoLists={todoLists}></TodoList>
      </div>
      <div>
        <TaskModal
          open={open}
          onClose={() => setOpen(false)}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        ></TaskModal>
      </div>
    </div>
  );
}
