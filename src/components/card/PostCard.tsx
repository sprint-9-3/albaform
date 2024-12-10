"use client";

import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import Image from "next/image";
import CommentAndLikeCount from "../CommentAndLikeCount";
import UserInfoInCard from "../UserInfoInCard";
import { PostCardProps } from "@/types/post";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PostCard = ({ info }: { info: PostCardProps }) => {
  const [isHover, setIsHover] = useState(false);
  const [_, formattedCreatedDate] = formatDate("", info.createdAt);
  const pathname = usePathname();

  return (
    <Link href={`albatalks/${info.id}`}>
      <section
        className="relative flex h-[210px] w-[327px] flex-col justify-between rounded-[16px] border border-line-100 bg-gray-50 p-6 shadow-md hover:bg-oldLace-50 pc:h-[280px] pc:w-[477px] tablet:h-[180px] tablet:w-[600px]"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <h3 className="w-[80%] font-semibold text-black-400 pc:text-2lg">
          {info.title}
        </h3>
        <p className="mt-2 line-clamp-2 h-[48px] w-[80%] text-md text-gray-500 pc:-mt-[60px] pc:text-lg">
          {info.content}
        </p>
        <div className="mt-[20px] flex items-center justify-between gap-2 text-xs not-italic text-gray-500 pc:text-lg">
          <UserInfoInCard
            image={info.writer.imageUrl}
            nickname={info.writer.nickname}
            createdDate={formattedCreatedDate}
          />
          <CommentAndLikeCount
            commentCount={info.commentCount}
            likeCount={info.likeCount}
            isHover={isHover}
          />
        </div>
        {pathname !== "/albatalk" && (
          <button className="absolute right-6 top-6">
            <Image src="/icon/kebab-md.svg" width={24} height={24} alt="메뉴" />
          </button>
        )}
      </section>
    </Link>
  );
};

export default PostCard;
