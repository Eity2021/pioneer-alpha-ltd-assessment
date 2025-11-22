"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "@/hooks/ReactQueryHooks";
import AccountForm from "@/components/ui/accountForm/AccountForm";
import CustomButton from "@/components/customButton/CustomButton";
import ChangePassword from "@/components/auth/change-password/ChangePassword";

export default function page() {
  const [open, setOpen] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: userProfile,
  });

  return (
    <>
      <div className="bg-[#eef7ff]  py-12 lg:px-24 sm:pl-16 sm:pr-12 pl-4 pr-2 w-full">
        <div className=" mx-auto bg-white rounded-2xl shadow-md sm:p-8 p-4">

          <div className="flex justify-between">
            <div>
              <h2 className="text-[24px] font-semibold text-[#0D224A]  font-inter">
                Account Information
              </h2>
              <hr className="w-40 border border-[#5272FF]" />
            </div>

            <div>
              <CustomButton variant="primary" onClick={() => setOpen(true)}> Change Password</CustomButton>
            </div>
          </div>


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
      <ChangePassword open={open}
        onClose={() => setOpen(false)}
        onChange={function (value: any): void {
          throw new Error("Function not implemented.");
        }}></ChangePassword>
    </>

  );
}
