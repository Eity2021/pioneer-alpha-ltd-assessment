import React from "react";

interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({
  size = 24,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    stroke="none"
    {...rest}
  >
    {/* Simple, modern house shape: starts with the roof, includes the body. */}
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export default DashboardIcon;
