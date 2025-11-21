"use client";
import AccountForm from "@/components/ui/accountForm/AccountForm";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "@/hooks/ReactQueryHooks";

export default function page() {
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: userProfile,
  });

  return (
    <div className="bg-[#eef7ff]  py-12 lg:px-24 sm:pl-16 sm:pr-12 pl-4 pr-2 w-full">
      <div className=" mx-auto bg-white rounded-2xl shadow-md sm:p-8 p-4">
        <h2 className="text-[24px] font-semibold text-[#0D224A]  font-inter">
          Account Information
        </h2>
        <hr className="w-40 border border-[#5272FF]" />
        <div className="mt-6 w-full flex flex-col gap-6">
          <div>
            <AccountForm
              user={user}
              value={undefined}
              onChange={function (value: any): void {
                throw new Error("Function not implemented.");
              }}
            ></AccountForm>
          </div>
        </div>
      </div>
    </div>
  );
}
