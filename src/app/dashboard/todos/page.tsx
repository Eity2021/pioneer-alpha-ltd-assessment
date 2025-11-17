"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import TodoList from "../../../components/ui/todoList/TodoList";
import TaskModal from "@/components/ui/modal/TaskModal";
import FilterDropdown from "@/components/ui/filterDropdown/FilterDropdown";
import { todosList } from "@/hooks/ReactQueryHooks";
import { useQuery } from "@tanstack/react-query";

export default function page() {
  const [open, setOpen] = useState(false);

  const { data: todoLists } = useQuery({
    queryKey: ["todoLists"],
    queryFn: todosList,
  });

  return (
    <div className="bg-[#eef7ff]  py-6 px-6 h-[88%]">
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
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-9 relative">
          <input
            className="border border-[#D1D5DB] w-full bg-white rounded-lg py-[9px] px-4 text-[12px] font-semibold font-inter text-[#4B5563]"
            type="text"
            placeholder="Search your task here..."
          ></input>
          <div className="absolute right-0 top-px w-9 h-9 rounded-lg bg-[#5272FF] flex justify-center items-center text-white">
            <Search size={18} />
          </div>
        </div>
        <div className="">
          <FilterDropdown></FilterDropdown>
        </div>
      </div>
      <div className="mt-8">
        <TodoList todoLists={todoLists}></TodoList>
      </div>
      <div>
        <TaskModal open={open} onClose={() => setOpen(false)}></TaskModal>
      </div>
    </div>
  );
}
