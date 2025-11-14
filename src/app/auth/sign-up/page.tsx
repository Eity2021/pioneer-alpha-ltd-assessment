import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import signUp from "@/assets/image/register.png";
export default function page() {
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#E2ECF8] h-screen flex items-center">
          <div>
            <Image src={signUp} alt="signUp" />
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-center items-center h-screen ">
            <SignUpForm></SignUpForm>
          </div>
        </div>
      </div>
    </div>
  );
}
