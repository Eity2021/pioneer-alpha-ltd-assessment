import React from "react";
import logo from "@/assets/svg/logo.svg";
import cal from "@/assets/svg/Cal.svg";
import Notifications from "@/assets/svg/Notifications.svg";
import Image from "next/image";
import { Menu } from "lucide-react";
interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="bg-white">
      <div className="flex justify-between py-8 md:px-14 px-4">
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <div>
          <Image src={logo} alt="logo" />
        </div>
        <div className="flex gap-6">
          <div>
            <Image src={cal} alt="cal" />
          </div>
          <div>
            <Image src={Notifications} alt="Notifications" />
          </div>
          <div className="md:block hidden">
            <p className="font-medium font-inter text-[15px] text-[#0D224A]">
              Friday
            </p>
            <p className="font-medium font-inter text-[15px] text-[#0D224A]  ">
              07/11/225
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
