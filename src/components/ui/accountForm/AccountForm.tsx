"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/customInput/CustomInput";
import CustomButton from "@/components/customButton/CustomButton";
import CustomCalendar from "@/components/customCalendar/CustomCalendar";

interface userProps {
  user: string;
  value: any;
  onChange: (value: any) => void;
}

type Inputs = {
  email: string;
  first: string;
  last: string;
  address: string;
  contact: string;
  birthday: string;
};

const AccountForm: React.FC<userProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

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
                defaultValue={user?.first_name}
                register={register}
                errors={errors}
                rules={{
                  required: "First Name Is required",
                }}
              />
              <CustomInput<Inputs>
                name="last"
                label="Last name"
                defaultValue={user?.last_name}
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
                defaultValue={user?.email}
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
                defaultValue={user?.address}
                register={register}
                errors={errors}
                rules={{
                  required: "Address Is required",
                }}
              />
              <CustomInput<Inputs>
                name="contact"
                label="Contact Number"
                defaultValue={user?.contact_number}
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
              <Controller
                name="birthday"
                control={control}
                rules={{ required: "Birthday is required" }}
                render={({ field }) => (
                  <CustomCalendar
                    value={field.value}
                    onChange={field.onChange}
                    user={user}
                  />
                )}
              />
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
