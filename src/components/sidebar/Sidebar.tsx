"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@/assets/svg/DashboardIcon.tsx";
import TodoListIcon from "@/assets/svg/TodoListIcon.tsx";
import AccountIcon from "@/assets/svg/AccountIcon.tsx";
import userImage from "@/assets/svg/userImage.svg";

import Image from "next/image";
const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: (color: string) => <DashboardIcon color={color} size={24} />,
    },
    {
      href: "/dashboard/todos",
      label: "Todos",
      icon: (color: string) => <TodoListIcon color={color} size={24} />,
    },
    {
      href: "/dashboard/account-info",
      label: "Account Information",
      icon: (color: string) => <AccountIcon color={color} size={24} />,
    },
  ];

  return (
    <aside className="text-white flex flex-col items-center py-8 ">
      <div className="mb-2 mt-8">
        <Image src={userImage} alt="userImage" />
      </div>

      <div className="text-center mb-12">
        <h4 className="font-semibold text-[16px] font-inter">amanuel</h4>
        <p className="text-[16px] font-inter font-normal">amanuel@gmail.com</p>
      </div>

      <nav className="w-full">
        <ul className="space-y-2">
          {navItems.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            const iconColor = isActive ? "#fff" : "#8CA3CD";
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center pr-4 pl-8 py-3  font-medium text-[#8CA3CD] hover:bg-linear-to-r from-[#1d3576] from-30% to-[#0D224A] to-70%  text-[16px] font-inter  ${
                    isActive
                      ? "bg-linear-to-r from-[#1d3576] from-30% to-[#0D224A] to-70% font-bold text-white text-[16px] font-inter "
                      : ""
                  }`}
                >
                  {icon && <span className="mr-2">{icon(iconColor)}</span>}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
