"use client";
import { Trash2 } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/customInput/CustomInput";
import CustomCalendar from "@/components/customCalendar/CustomCalendar";
import { useMutation } from "@tanstack/react-query";
import { postTodosForm } from "@/hooks/ReactQueryHooks";
import { toast } from "react-toastify";
import { queryClient } from "@/lib/queryClient";
interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onChange: (value: any) => void;
}
type Inputs = {
  title: string;
  todo_date: string;
  priority: "";
};

export default function TaskModal({ open, onClose }: TaskModalProps) {
  if (!open) return null;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutateAsync } = useMutation({ mutationFn: postTodosForm });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await mutateAsync(data);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "todoLists",
      });

      toast.success("Added Todos");
      reset();
      onClose();
    } catch (err) {
      toast.error("something error");
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-4">
            <CustomInput<Inputs>
              name="title"
              label="Title"
              register={register}
              errors={errors}
              rules={{
                required: "Title Is required",
              }}
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-[14px] font-inter font-medium text-[#0C0C0C] mb-1">
              Date
            </label>
            <div>
              <Controller
                name="todo_date"
                control={control}
                render={({ field }) => (
                  <CustomCalendar
                    value={field.value || ""}
                    onChange={(dateString) => field.onChange(dateString)}
                  />
                )}
              />

              {errors.todo_date && (
                <p className="text-red-500 text-sm">
                  {errors.todo_date.message}
                </p>
              )}
            </div>
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
                <input
                  type="radio"
                  className="ml-1"
                  value="extreme"
                  {...register("priority")}
                />
              </label>

              <label className="flex items-center gap-1 cursor-pointer">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span className="text-[13px] font-inter font-normal text-[#4B5563] ">
                  Moderate
                </span>
                <input
                  type="radio"
                  className="ml-1"
                  value="moderate"
                  {...register("priority")}
                />
              </label>

              <label className="flex items-center gap-1 cursor-pointer">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-[13px] font-inter font-normal text-[#4B5563] ">
                  Low
                </span>
                <input
                  type="radio"
                  className="ml-1"
                  value="low"
                  {...register("priority")}
                />
              </label>
            </div>
          </div>

          {/* Task Description */}
          <div className="mb-6">
            <CustomInput<Inputs>
              name="description"
              label="Task Description"
              placeholder="Start writing here"
              type="textarea"
              rows={6}
              register={register}
              errors={errors}
              rules={{
                required: "Description Is required",
              }}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between mt-4">
            <button className="bg-[#5272FF] text-white px-6 py-1.5 rounded-md text-[14px] font-inter font-semibold hover:bg-[#5272FF]">
              Done
            </button>

            <button
              className="bg-[#EE0039] text-white p-2 rounded-lg hover:bg-[#EE0039]"
              onClick={onClose}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
