"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import todos from "@/assets/image/todos.png";
import EditTodos from "../editTodos/EditTodos";
import DeleteTodos from "@/app/dashboard/todos/DeleteTodos";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import SortableTodoItem from "./SortableTodoItem";


interface TodoListProps {
  todoLists: any[];
}

const TodoList: React.FC<TodoListProps> = ({ todoLists = [] }) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedTodosId, setSelectedTodosId] = useState(null);
  const [todosState, setTodosState] = useState<any[]>([]);

  useEffect(() => {
    setTodosState(todoLists);
  }, [todoLists]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTodoDelete = (todoList: any) => {
    setSelectedTodosId(todoList);
    setShowModalDelete(true);
  };

  const handleTodoEdit = (todoList: any) => {
    setSelectedTodosId(todoList);
    setShowModalEdit(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTodosState((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        }
        return items;
      });
    }
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todosState.map(todo => todo.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {todosState.map((todoList) => (
              <SortableTodoItem
                key={todoList.id}
                todoList={todoList}
                onEdit={handleTodoEdit}
                onDelete={handleTodoDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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