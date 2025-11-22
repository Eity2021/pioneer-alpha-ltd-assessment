"use client";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/hooks/ReactQueryHooks";
import CustomInput from "../customInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomButton from "../customButton/CustomButton";

type Inputs = {
  example: string;
  exampleRequired: string;
  email: string;
  first: string;
  last: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutateAsync } = useMutation({ mutationFn: loginUser });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await mutateAsync(data);
      Cookies.set("access", res.data.access);
      Cookies.set("refresh", res.data.refresh);
      toast.success("login Successfully");
      router.push("/");
      reset();
    } catch (err) {
      toast.error("Something wrong");
    }
  };

  return (
    <div className="lg:w-[40%] md:w-[60%] w-[70%]">
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
            <div className="mt-3">
              <CustomInput<Inputs>
                name="email"
                label="Email"
                placeholder="Enter your email"
                register={register}
                errors={errors}
                rules={{
                  required: "Email Is required",
                }}
              />
            </div>
            <div className="mt-3">
              <CustomInput<Inputs>
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
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
            <div className="flex justify-between mt-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox text-[#5272FF] border-gray-300 rounded-none focus:ring-[#5272FF] focus:outline-none w-4 h-4 bg-transparent"
                />
                <span className="select-none font-inter font-regular text-[14px] text-[#374151]">
                  Remember me
                </span>
              </label>

              <div>
                <p className="font-inter font-regular text-[14px] text-[#5272FF]">
                  Forget your password?
                </p>
              </div>
            </div>
            <div className="mt-3">
              <CustomButton variant="primary" type="submit" className="w-full">
                LogIn
              </CustomButton>
            </div>
            <div>
              <p className="text-center mt-3 font-inter font-regular text-[16px] ">
                <span className="text-[#4B5563]">don;t have an account ?</span>
                <Link href="/auth/sign-up" className="text-[#5272FF]">
                  {" "}
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
