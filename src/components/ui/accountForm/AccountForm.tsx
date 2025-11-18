"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/customInput/CustomInput";
import CustomButton from "@/components/customButton/CustomButton";
import CustomCalendar from "@/components/customCalendar/CustomCalendar";
import CustomImageUpload from "@/components/customImageUpload/CustomImageUpload";
import { formatDate } from "@/utils/formatDate";
import { useMutation } from "@tanstack/react-query";
import { editAccountForm } from "@/hooks/ReactQueryHooks";
import { toast } from "react-toastify";
interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  profilePhoto?: string;
}
interface userProps {
  value: any;
  onChange: (value: any) => void;
  user: User;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  profile_image?: string;
}

type Inputs = {
  first_name: string;
  last_name: string;
  last: string;
  address: string;
  contact_number: string;
  birthday: string;
  profile_image: string;
};

const AccountForm: React.FC<userProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      // email: user?.email,
      address: user?.address,
      contact_number: user?.contact_number,
      birthday: user?.birthday,
    },
  });
  const { mutateAsync } = useMutation({ mutationFn: editAccountForm });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("address", data.address);
    formData.append("contact_number", data.contact_number);
    formData.append("birthday", data.birthday);
    if (data.profile_image && data.profile_image.length > 0) {
      formData.append("profile_image", data.profile_image[0]);
    }

    try {
      await mutateAsync({ editAccountForm: formData });
      toast.success("profile Updated");
      reset();
    } catch (err) {
      toast.error("something error");
      reset();
    }
  };

  return (
    <div className="">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <CustomImageUpload
              name="profile_image"
              register={register}
              error={errors.profile_image?.message as string}
            />

            <div className="border border-[#A1A3AB] rounded-2xl py-6 px-12 bg-white mt-6">
              <div className="grid grid-cols-2 gap-6">
                {user?.first_name && (
                  <CustomInput<Inputs>
                    name="first_name"
                    label="First Name"
                    defaultValue={user?.first_name}
                    register={register}
                    errors={errors}
                    rules={{
                      required: "First Name Is required",
                    }}
                  />
                )}
                {user?.last_name && (
                  <CustomInput<Inputs>
                    name="last_name"
                    label="Last name"
                    defaultValue={user?.last_name}
                    register={register}
                    errors={errors}
                    rules={{
                      required: "Last Name Is required",
                    }}
                  />
                )}
              </div>

              {user?.email && (
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
              )}

              <div className="grid grid-cols-2 gap-6 mt-3">
                {user?.address && (
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
                )}

                {user?.contact_number && (
                  <CustomInput<Inputs>
                    name="contact_number"
                    label="Contact Number"
                    defaultValue={user?.contact_number}
                    register={register}
                    errors={errors}
                    rules={{
                      required: "Contact Number Is required",
                    }}
                  />
                )}
              </div>

              <div className="mt-3">
                <label className="text-[14px] font-medium text-black font-inter">
                  Birthday
                </label>
                {user?.birthday && (
                  <div>
                    <Controller
                      name="birthday"
                      control={control}
                      // rules={{ required: "Birthday is required" }}
                      render={({ field }) => (
                        <CustomCalendar
                          value={field.value}
                          onChange={(date: Date) =>
                            field.onChange(formatDate(date))
                          }
                          user={user}
                        />
                      )}
                    />
                    {errors.birthday && (
                      <p className="text-red-500 text-sm">
                        {errors.birthday.message}
                      </p>
                    )}
                  </div>
                )}
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
                  <CustomButton variant="secondary" className="w-[200px]">
                    Cancel
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
