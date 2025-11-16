"use client";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  type?: string;
  rules?: RegisterOptions<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  className?: string;
  defaultValue?: string | number;
  rows?: number;
}

export default function CustomInput<T extends FieldValues>({
  name,
  register,
  label,
  type = "text",
  rules = {},
  errors,
  placeholder = "",
  className = "",
  defaultValue = "",
  rows = 4,
}: CustomInputProps<T>) {
  const isError = errors?.[name];

  const commonProps = {
    ...register(name, rules),
    placeholder,
    defaultValue,
    className: `
      w-full px-4 py-3 rounded-[8px] border text-sm transition-all
      border-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#D1D5DB] placeholder:text-[#8CA3CD]
      ${isError ? "border-red-500" : ""}
      ${className}
    `,
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[14px] font-medium text-black font-inter">
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {isError && (
        <p className="text-sm text-red-500">
          {String(errors?.[name]?.message)}
        </p>
      )}
    </div>
  );
}
