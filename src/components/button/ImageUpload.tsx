"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import uploadLargeIcon from "@/../public/icon/upload-lg.svg";
import xCircleLargeIcon from "@/../public/icon/Xcircle-lg.svg";

interface ImageInputProps {
  onImageChange: (image: string | null) => void;
}

const ImageUpload = ({ onImageChange }: ImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageChange(imageUrl); // 부모 컴포넌트로 이미지 URL 전달

      // 파일 input을 초기화
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
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 이미지 선택 버튼 */}
      <div className="relative">
        <label
          className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-lg bg-background-200 pc:h-60 pc:w-60"
          htmlFor="imageUpload"
        >
          <input
            ref={fileInputRef}
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {/* 선택된 이미지 없음 */}
          {!selectedImage && (
            <div className="flex flex-col items-center">
              <Image
                src={uploadLargeIcon}
                width={36}
                height={36}
                alt="image Upload"
              />
              <span className="text-center text-base font-medium text-gray-400 pc:text-lg pc:font-normal">
                이미지 넣기
              </span>
            </div>
          )}
          {/* 선택된 이미지 있음 */}
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="selected Image"
              layout="fill"
              objectFit="cover"
              className="rounded-[8px]"
            />
          )}
        </label>

        {/* 취소 버튼 */}
        {selectedImage && (
          <button
            onClick={handleRemoveImage}
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer border-0 bg-transparent p-0"
          >
            <Image
              src={xCircleLargeIcon}
              alt="cancel Icon"
              width={32}
              height={32}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
