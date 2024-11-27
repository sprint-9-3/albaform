"use client";

import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

interface CommentCardProps {
  info: {
    post: {
      content: string;
      title: string;
      id: number;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  };
}

const CommentCard = ({ info }: CommentCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [_, formattedDate] = formatDate("", info.createdAt);

  return (
    <section
      className="flex h-[202px] w-[327px] flex-col justify-between rounded-2xl border border-line-100 bg-white px-4 py-5 hover:bg-oldLace-50 pc:h-[264px] pc:w-[477px]"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="relative size-4 pc:size-6">
          <Image
            src={
              isHover
                ? "/icon/document-hover.svg"
                : "/icon/document-empty-md.svg"
            }
            fill
            alt=""
          />
        </div>
        <h3 className="flex-grow text-xs text-black-100 pc:text-lg">
          {info.post.title}
        </h3>
        <button className="relative size-6">
          <Image src="/icon/kebab-md.svg" fill alt="메뉴 버튼" />
        </button>
      </div>
      <p className="mt-4 line-clamp-2 h-8 w-[90%] text-xs text-gray-500 pc:h-[48px] pc:text-md">
        {info.post.content}
      </p>
      <div className="mt-4 w-full border border-line-100" />
      <h3 className="mt-3 text-md font-semibold text-black-400 pc:text-2lg">
        {info.content}
      </h3>
      <time className="mt-3 text-xs text-gray-500 pc:text-lg">
        {formattedDate}
      </time>
    </section>
  );
};

export default CommentCard;
