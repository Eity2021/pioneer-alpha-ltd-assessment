import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import signUp from "@/assets/image/register.png";
export default function page() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
        <div className="hidden md:flex items-center md:col-span-2 bg-[#E2ECF8]">
          <div>
            <Image src={signUp} alt="signUp" />
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <div className="flex justify-center items-center min-h-screen py-10">
            <SignUpForm></SignUpForm>
          </div>
        </div>
      </div>
    </div>
  );
}
