import React, { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const getVariantClasses = (
  variant: ButtonVariant,
  disabled: boolean
): string => {
  const baseClasses =
    "font-medium py-3 px-4 rounded-[8px] transition ease-in-out duration-200 focus:outline-none focus:ring-0 text-[16px] font-inter active:scale-95";

  if (disabled) {
    return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
  }

  switch (variant) {
    case "primary":
      return `${baseClasses} bg-[#5272FF] text-white hover:bg-[#5272FF]`;
    case "secondary":
      return `${baseClasses} bg-[#8CA3CD] text-white hover:bg-slate-800`;
    case "outline":
      return `${baseClasses} bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50`;
    default:
      return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700`;
  }
};

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
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
