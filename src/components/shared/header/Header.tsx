import React from "react";
import logo from "@/assets/svg/logo.svg";
import cal from "@/assets/svg/Cal.svg";
import Notifications from "@/assets/svg/Notifications.svg";
import Image from "next/image";
const Header: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="flex justify-between py-8 px-14">
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
                    <div>
                        <p className="font-medium font-inter text-[15px] text-[#0D224A]">
                            Friday
                        </p>
                        <p className="font-medium font-inter text-[15px] text-[#0D224A]">
                            07/11/225
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
