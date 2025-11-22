"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import camera from "@/assets/image/camera.png";
import download from "@/assets/image/download.png";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface CustomImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  user: any;
}

export default function CustomImageUpload<T extends FieldValues>({
  name,
  register,
  error,
  user,
}: CustomImageUploadProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="border border-[#A1A3AB] rounded-2xl p-5 2xl:w-[38%] xl:w-[40%] lg:w-[70%] w-full">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Image Box */}
        <div
          className="relative w-28 h-28 rounded-full bg-[#9F9F9F] flex items-center justify-center  cursor-pointer"
          onClick={handleClick}
        >
          {preview ? (
            <Image src={preview} alt="profile" fill className="rounded-full" />
          ) : (
            <span className="text-white text-sm">No Image</span>
          )}

          <div className="bg-[#5272FF] w-8 h-8 flex justify-center items-center rounded-full absolute bottom-1 right-2.5">
            <Image src={camera} alt="camera" />
          </div>
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5272FF] text-white md:text-[16px] sm:text-[13px] text-[10px] hover:bg-[#3756e0] font-inter font-normal"
        >
          <Image src={download} alt="download" /> Upload New Photo
        </button>

        {/* Hidden Input (Hook Form Controlled) */}
        <input
          type="file"
          accept="image/*"
          {...register(name)}
          ref={(e) => {
            register(name).ref(e);
            fileInputRef.current = e;
          }}
          onChange={(e) => {
            register(name).onChange(e);
            handlePreview(e);
          }}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
