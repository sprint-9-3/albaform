"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import uploadIcon from "@/../public/icon/upload-md.svg";
import uploadLargeIcon from "@/../public/icon/upload-lg.svg";
import xCircleIcon from "@/../public/icon/Xcircle-md.svg";
import xCircleLargeIcon from "@/../public/icon/Xcircle-lg.svg";
import ErrorText from "../errorText/ErrorText";
import checkImageSize from "@/utils/checkImageSize";
import renameIfKorean from "@/utils/renameIfKorean";

interface ImageInputProps {
  size?: "small" | "medium" | "large";
  limit?: number;
  onImageChange: (files: File[]) => void;
  initialImage?: File[];
  sizeCheck?: boolean;
}

const ImageInput = ({
  size = "small",
  limit = 1,
  sizeCheck = false,
  onImageChange,
  initialImage,
}: ImageInputProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // 미리보기 이미지 URL
  const [newFiles, setNewFiles] = useState<File[]>([]); // 실제 업로드할 파일
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_MB = 5;

  // 크기별 클래스
  const sizeClasses = {
    small: "h-20 w-20",
    medium: "h-[116px] w-[116px]",
    large: "h-[240px] w-[240px]",
  };

  // 임시저장 이미지가 있을 시 이를 감지하여 미리보기 이미지 표출
  useEffect(() => {
    if (initialImage?.length) {
      selectedImages.forEach((url) => URL.revokeObjectURL(url));

      setSelectedImages(
        initialImage.map((image) => URL.createObjectURL(image))
      );
      setNewFiles(initialImage);
    }
  }, [initialImage]);

  useEffect(() => {
    return () => {
      selectedImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages: string[] = [];
      let isError = false;

      // 최대 이미지 개수 체크
      if (selectedImages.length + files.length > limit) {
        setError(`최대 ${limit}개까지만 선택할 수 있습니다.`);
        return;
      }

      const updatedFiles: File[] = [...newFiles];

      for (const file of files) {
        // 파일 크기 제한 확인
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          isError = true;
          continue;
        }

        // 이미지 크기 확인
        if (sizeCheck) {
          const imageCheck = await checkImageSize(file);
          if (!imageCheck) {
            isError = true;
            setError("이미지 크기는 최소 1560 x 560이어야 합니다.");
            continue;
          }
        }

        // 한글 파일 이름을 영어로 변환
        const newFileName = renameIfKorean(file.name);
        const renamedFile = new File([file], newFileName, {
          type: file.type,
        });

        const imageUrl = URL.createObjectURL(renamedFile);
        newImages.push(imageUrl);
        updatedFiles.push(renamedFile);
      }

      if (isError) {
        setError(
          (prevError) =>
            prevError ||
            `파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하로 선택해주세요.`
        );
      } else {
        setError(null);
      }

      setSelectedImages([...selectedImages, ...newImages]);
      setNewFiles(updatedFiles);

      onImageChange(updatedFiles); // 부모 컴포넌트로 파일 배열 전달

      // 파일 input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = selectedImages[index];

    URL.revokeObjectURL(imageToRemove);

    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedFiles = newFiles.filter((_, i) => i !== index);

    setSelectedImages(updatedImages); // 미리보기 URL 업데이트
    setNewFiles(updatedFiles); // 실제 파일 배열 업데이트

    onImageChange(updatedFiles); // 부모 컴포넌트로 업데이트된 파일 배열 전달
  };

  return (
    <div className="relative flex flex-wrap gap-4">
      {/* Input */}
      <label
        className={`flex cursor-pointer items-center justify-center rounded-lg bg-background-200 p-7 ${sizeClasses[size]}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
        <span>
          {size === "small" ? (
            <Image src={uploadIcon} width={24} height={24} alt="image Upload" />
          ) : (
            <Image
              src={uploadLargeIcon}
              width={36}
              height={36}
              alt="image Upload"
            />
          )}
        </span>
      </label>
      {error && (
        <ErrorText className="left-0" error={error}>
          {error}
        </ErrorText>
      )}

      {/* 선택된 이미지 */}
      {selectedImages.map((image, index) => (
        <div key={index} className={`relative ${sizeClasses[size]}`}>
          <Image
            src={image}
            alt={`selected Image ${index + 1}`}
            fill
            className="rounded-lg object-cover"
          />
          {/* 취소 버튼 */}
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer border-0 bg-transparent p-0"
          >
            {size === "small" ? (
              <Image
                src={xCircleIcon}
                alt="cancel Icon"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={xCircleLargeIcon}
                alt="cancel Icon"
                width={32}
                height={32}
              />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageInput;
