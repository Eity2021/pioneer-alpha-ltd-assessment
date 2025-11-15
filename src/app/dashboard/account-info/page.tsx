import camera from "@/assets/image/camera.png";
import download from "@/assets/image/download.png";
import Image from "next/image";
import AccountForm from "@/components/ui/accountForm/AccountForm";
export default function page() {
  return (
    <div className="bg-[#eef7ff]   py-12 px-24">
      <div className=" mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-[24px] font-semibold text-[#0D224A]  font-inter">
          Account Information
        </h2>
        <hr className="w-40 border border-[#5272FF]" />
        <div className="mt-6 w-full flex flex-col gap-6">
          <div className="border border-[#A1A3AB] rounded-2xl p-5 w-[29%]">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-28 h-28 rounded-full bg-[#9F9F9F] flex items-center justify-center ">
                <div className="bg-[#5272FF] w-8 h-8 flex justify-center items-center rounded-full absolute bottom-1 right-2.5">
                  <Image src={camera} alt="camera" />
                </div>
              </div>
              <button
                className="
              flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-[#5272FF] text-white text-[16px]  hover:bg-[#5272FF] font-inter font-normal 
            "
              >
                <Image src={download} alt="download" /> Upload New Photo
              </button>
            </div>
          </div>
          <div className="border border-[#A1A3AB] rounded-2xl py-6 px-12 bg-white">
            <AccountForm></AccountForm>
          </div>
        </div>
      </div>
    </div>
  );
}
