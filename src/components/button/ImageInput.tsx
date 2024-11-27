"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import uploadIcon from "@/../public/icon/upload-md.svg";
import uploadLargeIcon from "@/../public/icon/upload-lg.svg";
import xCircleIcon from "@/../public/icon/Xcircle-md.svg";
import xCircleLargeIcon from "@/../public/icon/Xcircle-lg.svg";

interface ImageInputProps {
  onImageChange: (image: string | null) => void;
}

const ImageInput = ({ onImageChange }: ImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageChange(imageUrl); // 부모 컴포넌트로 이미지 URL 전달

      // 파일 input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null); // 이미지 초기화
    onImageChange(null); // 부모 컴포넌트로 null 전달

    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center">
      {/* Input */}
      <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg bg-background-200 p-7 pc:h-[116px] pc:w-[116px]">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <span>
          <Image
            src={uploadIcon}
            width={24}
            height={24}
            alt="image Upload"
            className="pc:hidden"
          />
          <Image
            src={uploadLargeIcon}
            width={36}
            height={36}
            alt="image Upload"
            className="hidden pc:block"
          />
        </span>
      </label>

      {/* 선택된 이미지 */}
      {selectedImage && (
        <div className="relative ml-5 h-20 w-20 pc:h-[116px] pc:w-[116px]">
          <Image
            src={selectedImage}
            alt="selected Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {/* 취소 버튼 */}
          <button
            onClick={handleRemoveImage}
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer border-0 bg-transparent p-0"
          >
            <Image
              src={xCircleIcon}
              alt="cancel Icon"
              width={24}
              height={24}
              className="pc:hidden"
            />
            <Image
              src={xCircleLargeIcon}
              alt="cancel Icon"
              width={32}
              height={32}
              className="hidden pc:block"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
