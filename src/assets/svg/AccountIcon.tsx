import React from "react";

// Define props for the SVG component to allow size and color customization
interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Allows setting width and height
}

/**
 * A reusable SVG icon representing a User/Person silhouette.
 * The icon uses currentColor, making its fill color dependent on the CSS text color, making it solid.
 */
const AccountIcon: React.FC<DashboardIconProps> = ({ size = 24, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor" // Changed to currentColor for a solid, filled icon
    stroke="none" // Removed stroke
    {...rest}
  >
    {/* Head/Circle */}
    <circle cx="12" cy="7" r="4" />
    {/* Body/Torso */}
    <path d="M19.5 20.5a7 7 0 0 0-15 0" />
  </svg>
);

export default AccountIcon;
