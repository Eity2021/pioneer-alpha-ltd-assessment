import Image from "next/image";
import signUp from "@/assets/image/register.png";
import SignInForm from "@/components/auth/SignInForm";
export default function page() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
        <div className="hidden md:flex items-center md:col-span-2 bg-[#E2ECF8]">
          <div className="p-8">
            <Image src={signUp} alt="Sign up illustration" />
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <div className="flex justify-center items-center min-h-screen py-10">
            <SignInForm></SignInForm>
          </div>
        </div>
      </div>
    </div>
  );
}
