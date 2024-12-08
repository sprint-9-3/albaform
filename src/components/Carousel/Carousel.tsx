"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cls } from "@/utils/dynamicTailwinds";

const Carousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const [isRenderingIndex, setIsRenderingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRenderingIndex((prevIndex) => (prevIndex + 1) % imageUrls.length); // 다음 div로 이동, 3번째 이후는 첫번째로
    }, 3000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [imageUrls.length]);

  return (
    <article className="relative h-[260px] w-screen pc:h-[562px]">
      {/* 캐러셀 이미지 */}
      {imageUrls.map((imageUrl, index) => (
        <figure
          key={index}
          className={cls(
            "absolute left-0 top-0 h-full w-full transition-opacity duration-1000",
            isRenderingIndex === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image src={imageUrl} fill alt="캐러샐 이미지" />
        </figure>
      ))}
      {/* 인디케이터 */}
      <div className="absolute bottom-[15px] left-0 right-0 flex justify-center">
        <div className="flex space-x-2">
          {imageUrls.map((_, index) => (
            <div
              key={index}
              className={cls(
                "size-2 rounded-full pc:size-3",
                index === isRenderingIndex ? "bg-white" : "bg-gray-100"
              )}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default Carousel;
