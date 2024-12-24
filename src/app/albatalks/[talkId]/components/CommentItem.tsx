"use client";

import { Comment } from "@/types/comment";
import ProfileImage from "./ProfileImage";
import formatYearMonthDay from "@/utils/formatYearMonthDay";
import EditDeleteDropdown from "@/components/dropdown/EditDeleteDropdown";
import kebabIcon from "@/../public/icon/kebab-md.svg";
import Image from "next/image";
import { useState } from "react";
import patchComment from "../actions/patchComment";
import deleteComment from "../actions/deleteComment";
import { useToast } from "@/hooks/useToast";

const CommentItem = ({
  item,
  userId,
  onUpdatedComment,
  onDeleteComment,
}: {
  item: Comment;
  userId: number;
  onUpdatedComment: (updatedComment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  const { addToast } = useToast();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteComment(item.id);

      if (response.status === 204) {
        onDeleteComment(item.id);
        setIsEditing(false);
        addToast("댓글을 삭제하였습니다.", "success");
      }
    } catch (error) {
      addToast("댓글 삭제에 실패했습니다.", "warning");
      console.error("댓글 삭제에 실패했습니다:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await patchComment(item.id, editedContent);

      if (response.status === 200) {
        onUpdatedComment({ ...item, content: editedContent });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("댓글 수정에 실패했습니다.", error);
    }
  };

  return (
    <div className="border-b border-line-200 bg-gray-50 py-4 pc:px-[10px] pc:py-6 tablet:px-[10px] tablet:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 flex items-center gap-x-1 border-r border-line-200 pr-2 pc:mr-4 pc:pr-4">
            <ProfileImage imageUrl={item.writer.imageUrl} />
            <span className="text-xs text-gray-500 pc:text-lg">
              {item.writer.nickname}
            </span>
          </div>
          <span className="text-xs text-gray-500 pc:text-lg">
            {formatYearMonthDay(item.createdAt)}
          </span>
        </div>
        {item.writer.id === userId && (
          <EditDeleteDropdown
            id={String(item.id)}
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
      {isEditing ? (
        <div className="mt-6 pc:mt-8">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="h-20 w-full resize-none appearance-none rounded-lg border p-2"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm pc:text-lg tablet:text-md"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className="rounded-lg bg-orange-200 px-4 py-2 text-sm text-white pc:text-lg tablet:text-md"
              onClick={handleSave}
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-md text-black-400 pc:mt-8 pc:text-xl tablet:text-lg">
          {item.content}
        </p>
      )}
    </div>
  );
};

export default CommentItem;
