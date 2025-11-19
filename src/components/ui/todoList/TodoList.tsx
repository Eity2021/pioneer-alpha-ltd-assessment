import dotted from "@/assets/image/dotted.png";
import todos from "@/assets/image/todos.png";
import Image from "next/image";
import { PencilLine, Trash } from "lucide-react";

interface TodoListProps {
  todoLists: any[]; 
}

const TodoList: React.FC<TodoListProps> = ({ todoLists = [] }) => {

  if (!todoLists || todoLists.length === 0) {
    return (
      <div className="bg-white h-[569px] flex justify-center items-center border border-[#D1D5DB] rounded-2xl">
        <div>
          <Image src={todos} alt="todoList" />
          <h3 className="font-inter font-regular text-[#201F1E] text-[24px] text-center">
            No todos yet
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h5 className="font-inter font-semibold text-[18px] text-[#0C0C0C]">
          Your Tasks
        </h5>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {todoLists.map((todoList) => (
          <div
            className="bg-white border border-[#FEE2E2] p-10 rounded-lg"
            key={todoList?.id}
          >
            <div className="flex justify-between">
              <h4 className="font-inter font-medium text-[16px] text-[#0D224A]">
                {todoList?.title}
              </h4>
              <div className="flex gap-1">
                <div className="bg-[#FEE2E2] px-3 py-1 rounded-sm">
                  <p className="font-inter font-normal text-[14px] text-[#DC2626]">
                    {todoList?.priority}
                  </p>
                </div>
                <div className="flex items-center">
                  <Image src={dotted} alt="dotted" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="font-inter font-normal text-[14px] text-[#4B5563]">
                {todoList?.description}
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="font-inter font-normal text-[14px] text-[#4B5563]">
                Due {todoList?.todo_date}
              </p>
              <div className="flex gap-4">
                <div className="bg-[#EEF7FF] p-3 rounded-lg">
                  <PencilLine color="#4F46E5" size={19} />
                </div>
                <div className="bg-[#EEF7FF] p-3 rounded-lg">
                  <Trash color="#DC2626" size={19} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
