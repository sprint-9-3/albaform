"use client";

import EditDeleteDropdown from "@/components/dropdown/EditDeleteDropdown";
import Image from "next/image";
import kebabIcon from "@/../public/icon/kebab-md.svg";
import commentIcon from "@/../public/icon/comment-md.svg";
import heartIcon from "@/../public/icon/heart-md.svg";
import hrartFillIcon from "@/../public/icon/heart-fill-md.svg";
import ProfileImage from "./ProfileImage";
import formatYearMonthDay from "@/utils/formatYearMonthDay";
import { useEffect, useState } from "react";
import deletePosts from "../actions/deletePosts";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import postDeleteLike from "../actions/postDeleteLike";

interface props {
  info: {
    writer: {
      imageUrl: string;
      nickname: string;
      id: number;
    };
    updatedAt: string;
    createdAt: string;
    commentCount: number;
    likeCount: number;
    imageUrl: string;
    content: string;
    title: string;
    id: number;
    isLiked: boolean;
  };
  userId: number;
}

const Header = ({ info, userId }: props) => {
  const [isLiked, setIsLiked] = useState(info.isLiked);
  const [likeCount, setLikeCount] = useState(info.likeCount);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin") === "true");
  }, []);

  const handleEdit = async () => {
    router.push(`/addtalk?talkId=${info.id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await deletePosts(info.id);

      if (response.status === 204) {
        addToast("게시글을 삭제했습니다.", "success");
        router.push("/albatalk");
      }
    } catch (error) {
      console.error("게시글 삭제에 실패했습니다.", error);
    }
  };

  const handleLikeToggle = async () => {
    if (!isLogin) {
      addToast("로그인이 필요한 서비스입니다.", "info");
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const response = await postDeleteLike(
        info.id,
        isLiked ? "DELETE" : "POST"
      );

      if (response.status !== 200) {
        console.error("좋아요 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("좋아요 요청 에러:", error);

      setIsLiked((prev) => !prev);
      setLikeCount((prev) => prev + (isLiked ? -1 : 1));
    }
  };

  return (
    <div>
      <div className="border-bg-line-200 flex items-center justify-between border-b pb-6 pc:pb-5">
        <h2 className="text-lg font-semibold text-black-400 pc:text-2xl tablet:text-xl">
          {info.title}
        </h2>
        {info.writer.id === userId && (
          <EditDeleteDropdown
            id={String(info.id)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          >
            <Image
              src={kebabIcon}
              width={24}
              height={24}
              className="pc:size-9"
              alt="수정 및 삭제 메뉴"
            />
          </EditDeleteDropdown>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between pc:mt-10">
        <div className="flex items-center gap-x-4 pc:gap-x-8">
          <div className="flex items-center gap-x-1">
            <ProfileImage imageUrl={info.writer.imageUrl} />
            <span className="text-xs text-gray-500 pc:text-lg">
              {info.writer.nickname}
            </span>
          </div>
          <div className="text-xs text-gray-500 pc:text-lg">
            {formatYearMonthDay(info.createdAt)}
          </div>
        </div>
        <div className="flex gap-x-3">
          <div className="flex items-center gap-x-[2px]">
            <Image
              src={commentIcon}
              width={24}
              height={24}
              className="pc:size-9"
              alt="댓글 개수"
            />
            <small className="text-xs text-gray-500 pc:text-lg">
              {info.commentCount}
            </small>
          </div>
          <div className="flex items-center gap-x-[2px]">
            <button type="button" onClick={handleLikeToggle}>
              <Image
                src={isLiked ? hrartFillIcon : heartIcon}
                width={24}
                height={24}
                className="pc:size-9"
                alt="좋아요 버튼"
              />
            </button>
            <small className="text-xs text-gray-500 pc:text-lg">
              {likeCount}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
