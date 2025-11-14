import React, { ButtonHTMLAttributes, ReactNode, useState } from "react";
type ButtonVariant = "primary" | "secondary" | "outline";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const getVariantClasses = (
  variant: ButtonVariant,
  disabled: boolean
): string => {
  const baseClasses =
    "font-medium py-3 px-4 rounded-[8px] transition ease-in-out duration-200 focus:outline-none focus:ring-4 text-[16px]  font-inter active:scale-95";

  if (disabled) {
    return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed `;
  }

  switch (variant) {
    case "primary":
      return `${baseClasses} bg-[#5272FF] text-white hover:bg-[#5272FF] focus:ring-[#5272FF] rounded-[8px] `;
    case "secondary":
      return `${baseClasses} bg-[#8CA3CD] text-white hover:bg-slate-800 focus:ring-[#8CA3CD]  rounded-[8px]`;
    case "outline":
      return `${baseClasses} bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 `;
    default:
      return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 `;
  }
};

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary", // Default variant
  children,
  className = "",
  disabled = false,
  ...rest
}) => {
  const variantClasses = getVariantClasses(variant, disabled);
  const combinedClasses = `${variantClasses} ${className}`;
  return (
    <button className={combinedClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
