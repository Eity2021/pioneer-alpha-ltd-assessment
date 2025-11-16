"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/customInput/CustomInput";
import CustomButton from "@/components/customButton/CustomButton";
import Link from "next/link";
import CustomCalendar from "@/components/customCalendar/CustomCalendar";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "@/hooks/ReactQueryHooks";

type Inputs = {
  email: string;
  first: string;
  last: string;
  address: string;
  contact: string;
};

const AccountForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: userProfile,
  });

  console.log("user", user);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="grid grid-cols-2 gap-6">
              <CustomInput<Inputs>
                name="first"
                label="First Name"
                register={register}
                errors={errors}
                rules={{
                  required: "First Name Is required",
                }}
              />
              <CustomInput<Inputs>
                name="last"
                label="Last name"
                register={register}
                errors={errors}
                rules={{
                  required: "Last Name Is required",
                }}
              />
            </div>
            <div className="mt-3">
              <CustomInput<Inputs>
                name="email"
                label="Email"
                register={register}
                errors={errors}
                rules={{
                  required: "Email Is required",
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-3">
              <CustomInput<Inputs>
                name="address"
                label="Address"
                register={register}
                errors={errors}
                rules={{
                  required: "Address Is required",
                }}
              />
              <CustomInput<Inputs>
                name="contact"
                label="Contact Number"
                register={register}
                errors={errors}
                rules={{
                  required: "Contact Number Is required",
                }}
              />
            </div>

            <div className="mt-3">
              <label className="text-[14px] font-medium text-black font-inter">
                Birthday
              </label>
              <CustomCalendar />
            </div>
            <div className="flex gap-4 justify-center mt-12">
              <div className="mt-3">
                <CustomButton
                  variant="primary"
                  type="submit"
                  className="w-[200px]"
                >
                  Save Changes
                </CustomButton>
              </div>
              <div className="mt-3">
                <CustomButton
                  variant="secondary"
                  type="submit"
                  className="w-[200px]"
                >
                  Cancel
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
