"use client";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { changePassword } from "@/hooks/ReactQueryHooks";
import CustomInput from "@/components/customInput/CustomInput";

interface ChangeModalProps {
    open: boolean;
    onClose: () => void;
    onChange: (value: any) => void;
}
type Inputs = {
    old_password: string;
    new_password: string;

};

export default function ChangePassword({ open, onClose }: ChangeModalProps) {
    if (!open) return null;
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    const { mutateAsync } = useMutation({ mutationFn: changePassword });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await mutateAsync(data);
            toast.success("Update Password");
            reset();
            onClose();
        } catch (err) {
            toast.error("something error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 min-h-screen">
            <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[16px] font-inter font-semibold text-black">
                        Change Password
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[14px] font-inter font-semibold text-black"
                    >
                        Go Back
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <CustomInput<Inputs>
                            name="old_password"
                            label="Old Password"
                            register={register}
                            errors={errors}
                            rules={{
                                required: "Title Is required",
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <CustomInput<Inputs>
                            name="new_password"
                            label="New Password"
                            register={register}
                            errors={errors}
                            rules={{
                                required: "Title Is required",
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button className="bg-[#5272FF] text-white px-6 py-3 rounded-md text-[14px] font-inter font-semibold hover:bg-[#5272FF]">
                            Change Password
                        </button>

                        <button
                            className="bg-[#EE0039] text-white p-2 rounded-lg hover:bg-[#EE0039]"
                            onClick={onClose}
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
