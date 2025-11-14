"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../customInput/CustomInput";
import CustomButton from "../customButton/CustomButton";
import Link from "next/link";

type Inputs = {
  example: string;
  exampleRequired: string;
  email: string;
  first: string;
  last: string;
  password: string;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-[40%]">
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
                name="first"
                label="First Name"
                register={register}
                errors={errors}
                rules={{
                  required: "Name Is required",
                  pattern: {
                    value: /^[^.\s]*$/,
                    message: "Please enter a valid name format",
                  },
                }}
              />
              <CustomInput<Inputs>
                name="last"
                label="Last name"
                register={register}
                errors={errors}
                rules={{
                  required: "Name Is required",
                  pattern: {
                    value: /^[^.\s]*$/,
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
                    value: /^[^.\s]*$/,
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
                  name="password"
                  label="Confirm Password"
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
