import Image from "next/image";
import todoList from "@/assets/image/todos.png";
const TodoList: React.FC = () => {
  return (
    <div className="bg-white h-[469px] flex justify-center items-center border border-[#D1D5DB] rounded-2xl">
      <div>
        <Image src={todoList} alt="todoList" />
        <h3 className="font-inter font-regular text-[#201F1E] text-[24px] text-center">
          No todos yet
        </h3>
      </div>
    </div>
  );
};

export default TodoList;
