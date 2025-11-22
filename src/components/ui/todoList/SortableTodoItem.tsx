"use client";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { PencilLine, Trash } from "lucide-react";
import dotted from "@/assets/image/dotted.png";
import { useSortable } from "@dnd-kit/sortable";

interface SortableTodoItemProps {
    todoList: any;
    onEdit: (todo: any) => void;
    onDelete: (todo: any) => void;
}

const SortableTodoItem: React.FC<SortableTodoItemProps> = ({
    todoList,
    onEdit,
    onDelete,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todoList.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 200ms ease",
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white border border-[#FEE2E2] p-10 rounded-lg cursor-grab active:cursor-grabbing ${isDragging
                ? "shadow-lg bg-gray-50 rotate-2"
                : "hover:shadow-md transition-shadow"
                }`}
        >
            <div className="flex justify-between">
                <h4 className="font-inter font-medium text-[16px] text-[#0D224A]">
                    {todoList.title}
                </h4>
                {todoList.priority == "extreme" ? (
                    <div className="flex gap-1">
                        <div className="bg-[#FEE2E2] px-3 py-1 rounded-sm">
                            <p className="font-inter font-normal text-[14px] text-[#DC2626]">
                                {todoList.priority}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Image src={dotted} alt="dotted" width={20} height={20} />
                        </div>
                    </div>
                ) : todoList.priority == "moderate" ? (
                    <div className="flex gap-1">
                        <div className="bg-[#DCFCE7] px-3 py-1 rounded-sm">
                            <p className="font-inter font-normal text-[14px] text-[#16A34A]">
                                {todoList.priority}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Image src={dotted} alt="dotted" width={20} height={20} />
                        </div>
                    </div>
                ) : todoList.priority == "low" ? (
                    <div className="flex gap-1">
                        <div className="bg-[#FEF9C3] px-3 py-1 rounded-sm">
                            <p className="font-inter font-normal text-[14px] text-[#CA8A04]">
                                {todoList.priority}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Image src={dotted} alt="dotted" width={20} height={20} />
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="mt-6">
                <p className="font-inter font-normal text-[14px] text-[#4B5563]">
                    {todoList.description}
                </p>
            </div>

            <div className="flex justify-between mt-5">
                <p className="font-inter font-normal text-[14px] text-[#4B5563]">
                    Due {todoList.todo_date}
                </p>
                <div className="flex gap-4">
                    <div
                        className="bg-[#EEF7FF] p-3 rounded-lg cursor-pointer hover:bg-[#E0F2FE] transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(todoList);
                        }}
                    >
                        <PencilLine color="#4F46E5" size={19} />
                    </div>
                    <div
                        className="bg-[#EEF7FF] p-3 rounded-lg cursor-pointer hover:bg-[#FEE2E2] transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(todoList);
                        }}
                    >
                        <Trash color="#DC2626" size={19} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortableTodoItem;
