import React from "react";

// Define props for the SVG component to allow size and color customization
interface TodoListIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Allows setting width and height
}

/**
 * A reusable SVG icon representing a successful checkmark on a clipboard (ClipboardCheck).
 * The icon uses currentColor, making its stroke color dependent on the CSS text color.
 */
const TodoListIcon: React.FC<TodoListIconProps> = ({ size = 24, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {/* Clipboard handle/clip */}
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    {/* Clipboard body */}
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    {/* Checkmark */}
    <path d="m9 14 2 2 4-4" />
  </svg>
);

export default TodoListIcon;
