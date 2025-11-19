"use client";
import dotted from "@/assets/image/dotted.png";
import todos from "@/assets/image/todos.png";
import Image from "next/image";
import { PencilLine, Trash } from "lucide-react";
import { useState } from "react";
import DeleteTodos from "@/app/dashboard/todos/DeleteTodos";
import EditTodos from "../editTodos/EditTodos";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface TodoListProps {
  todoLists: any[];
}

const TodoList: React.FC<TodoListProps> = ({ todoLists = [] }) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedTodosId, setSelectedTodosId] = useState(null);
  const [todosState, setTodosState] = useState(todoLists);

  const handleTodoDelete = (todoList: any) => {
    setSelectedTodosId(todoList);
    setShowModalDelete(true);
  };

  const handleTodoEdit = (todoList: any) => {
    setSelectedTodosId(todoList);
    setShowModalEdit(true);
  };

  // Drag and Drop Handler
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(todosState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodosState(items);
  };

  if (!todosState || todosState.length === 0) {
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos" direction="vertical">
          {(provided) => (
            <div
              className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todosState.map((todoList, index) => (
                <Draggable
                  key={todoList.id}
                  draggableId={todoList.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`bg-white border border-[#FEE2E2] p-10 rounded-lg ${
                        snapshot.isDragging ? "shadow-lg bg-gray-50" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-inter font-medium text-[16px] text-[#0D224A]">
                          {todoList.title}
                        </h4>
                        {todoList.priority == "extreme" ? (
                          <>
                            <div className="flex gap-1">
                              <div className="bg-[#FEE2E2] px-3 py-1 rounded-sm">
                                <p className="font-inter font-normal text-[14px] text-[#DC2626]">
                                  {todoList.priority}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <Image src={dotted} alt="dotted" />
                              </div>
                            </div>
                          </>
                        ) : todoList.priority == "moderate" ? (
                          <>
                            <div className="flex gap-1">
                              <div className="bg-[#DCFCE7] px-3 py-1 rounded-sm">
                                <p className="font-inter font-normal text-[14px] text-[#16A34A]">
                                  {todoList.priority}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <Image src={dotted} alt="dotted" />
                              </div>
                            </div>
                          </>
                        ) : todoList.priority == "low" ? (
                          <div className="flex gap-1">
                            <div className="bg-[#FEF9C3] px-3 py-1 rounded-sm">
                              <p className="font-inter font-normal text-[14px] text-[#CA8A04]">
                                {todoList.priority}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Image src={dotted} alt="dotted" />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
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
                            className="bg-[#EEF7FF] p-3 rounded-lg cursor-pointer"
                            onClick={() => handleTodoEdit(todoList)}
                          >
                            <PencilLine color="#4F46E5" size={19} />
                          </div>
                          <div
                            className="bg-[#EEF7FF] p-3 rounded-lg cursor-pointer"
                            onClick={() => handleTodoDelete(todoList)}
                          >
                            <Trash color="#DC2626" size={19} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <DeleteTodos
        showModalDelete={showModalDelete}
        selectedTodosId={selectedTodosId}
        setShowModalDelete={setShowModalDelete}
      />

      <EditTodos
        showModalEdit={showModalEdit}
        selectedTodosId={selectedTodosId}
        onClose={() => setShowModalEdit(false)}
        open={false}
        onChange={function (value: any): void {
          throw new Error("Function not implemented.");
        }}
        description={undefined}
        position={undefined}
        is_completed={undefined}
      />
    </div>
  );
};

export default TodoList;
