"use client";
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/hooks/ReactQueryHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/customInput/CustomInput";
import CustomButton from "@/components/customButton/CustomButton";
type Inputs = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutateAsync } = useMutation({ mutationFn: signUpUser });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { confirmPassword, ...finalData } = data;
    console.log(finalData);
    try {
      await mutateAsync(finalData);
      toast.success("Regiatration Successfully Complete");
      router.push("/auth/sign-in");
      reset();
    } catch (err) {
      toast.error("Something wrong");
    }
  };

  return (
    <div className="xl:w-[40%8] lg:w-[60%] md:w-[70%] w-[80%]">
      <div>
        <div className="text-center mb-10">
          <h1 className="font-inter font-bold text-[#0D224A] text-[30px]">
            Create your account
          </h1>
          <p className="font-inter font-regular text-[#4B5563] text-[16px]">
            Start managing your tasks efficiently
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="grid grid-cols-2 gap-3">
              <CustomInput<Inputs>
                name="first_name"
                label="First Name"
                register={register}
                errors={errors}
                rules={{
                  required: "Name Is required",
                  pattern: {
                    value: /^[^\.\d!@#$%^&*()_+=\-{}[\]|\\:;"'<>,.?/`~]*$/,
                    message: "Please enter a valid name format",
                  },
                }}
              />
              <CustomInput<Inputs>
                name="last_name"
                label="Last name"
                register={register}
                errors={errors}
                rules={{
                  required: "Name Is required",
                  pattern: {
                    value: /^[^\.\d!@#$%^&*()_+=\-{}[\]|\\:;"'<>,.?/`~]*$/,
                    message: "Please enter a valid name format",
                  },
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
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid Email format",
                  },
                }}
              />
            </div>
            <div className="mt-3">
              <CustomInput<Inputs>
                name="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password cannot exceed 10 characters",
                  },
                }}
              />
            </div>
            <div>
              <div className="mt-3">
                <CustomInput<Inputs>
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  errors={errors}
                  rules={{
                    required: "Confirm Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Password cannot exceed 10 characters",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <CustomButton variant="primary" type="submit" className="w-full">
                Sign Up
              </CustomButton>
            </div>
            <div>
              <p className="text-center mt-3 font-inter font-regular text-[16px] ">
                <span className="text-[#4B5563]">
                  Already have an account ?{" "}
                </span>
                <Link href="/auth/sign-in" className="text-[#5272FF]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
