"use client";

import { useCallback, useEffect, useState } from "react";
import getComments from "../getComments";
import { Comment } from "@/types/comment";
import SolidButton from "@/components/button/SolidButton";
import CommentItem from "./CommentItem";
import EmptyComment from "./EmptyComments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { albaTalkCommentSchema } from "@/schema/albaTalkComment/albaTalkCommentSchema";
import ErrorText from "@/components/errorText/ErrorText";
import { cls } from "@/utils/dynamicTailwinds";
import postComment from "../actions/postComment";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import SkeletonCommentList from "./SkeletonCommentList";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { useToast } from "@/hooks/useToast";
import useViewPort from "@/hooks/useViewport";

const CommentSection = ({ id, userId }: { id: number; userId: number }) => {
  const [list, setList] = useState<Comment[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const viewPort = useViewPort();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<z.infer<typeof albaTalkCommentSchema>>({
    resolver: zodResolver(albaTalkCommentSchema),
    mode: "onSubmit",
    defaultValues: { content: "" },
  });

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin") === "true");
  }, []);

  const fetchComments = useCallback(async () => {
    if (!isLogin || isLoading || currentPage > totalPages) return;
    setIsLoading(true);

    try {
      const response = await getComments(id, currentPage, 6);

      if (response?.data) {
        setList((prev) => [...prev, ...response.data]);
        setTotalItemCount(response.totalItemCount);
        setTotalPages(response.totalPages);
        setCurrentPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("댓글 목록을 가져오는데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, currentPage, totalPages, isLoading, isLogin]);

  const onSubmit = async (formData: z.infer<typeof albaTalkCommentSchema>) => {
    if (!isLogin) {
      addToast("로그인이 필요한 서비스입니다.", "info");
      return;
    }

    try {
      const response = await postComment({ id, formData });

      if (response.status === 201) {
        setList((prev) => [response.data, ...prev]);
        setTotalItemCount((prev) => prev + 1);
        reset();
      }
    } catch (error) {
      console.error("댓글 등록에 실패했습니다.", error);
    }
  };

  const handleUpdatedComment = (updatedComment: Comment) => {
    setList((prevList) =>
      prevList.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleDeleteComment = (commentId: number) => {
    setList((prevList) =>
      prevList.filter((comment) => comment.id !== commentId)
    );
    setTotalItemCount((prev) => prev - 1);
  };

  const observerRef = useInfinityScroll({ fetchMoreData: fetchComments });

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [id, fetchComments]);

  return (
    <section>
      <h3 className="mt-[104px] border-b border-line-200 pb-4 text-lg font-semibold text-black-400 pc:mt-[100px] pc:text-2xl tablet:text-xl">
        댓글({totalItemCount})
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 pc:mt-10 tablet:mt-10"
      >
        <div className="relative">
          <textarea
            id="content"
            {...register("content")}
            className={cls(
              "h-[132px] w-full resize-none appearance-none rounded-lg bg-background-200 p-[14px] placeholder:text-md placeholder:text-gray-400 pc:h-40 pc:placeholder:text-xl tablet:placeholder:text-lg",
              errors.content ? "border border-red" : ""
            )}
            placeholder="댓글을 입력해주세요."
          />
          <ErrorText error={errors.content}>
            {errors.content?.message}
          </ErrorText>
        </div>
        <div
          className={cls(
            errors.content ? "mt-[26px] pc:mt-8 tablet:mt-[26px]" : ""
          )}
        >
          <SolidButton
            disabled={!isValid || isSubmitting}
            size={viewPort === "pc" ? "lg" : "sm"}
            className="ml-auto pc:mt-2 tablet:mt-2 tablet:h-[50px] mobile:h-[50px]"
          >
            등록하기
          </SolidButton>
        </div>
      </form>

      {isLoading && currentPage === 1 ? (
        <SkeletonCommentList count={6} />
      ) : (
        <ul className="mt-6 flex flex-col gap-y-4 pc:mt-14 pc:gap-y-6 tablet:mt-10">
          {list?.length > 0
            ? list?.map((item) => (
                <CommentItem
                  key={item.id}
                  userId={userId}
                  item={item}
                  onUpdatedComment={handleUpdatedComment}
                  onDeleteComment={handleDeleteComment}
                />
              ))
            : !isLoading && <EmptyComment />}
          <div ref={observerRef} className="h-[10px] w-full" />
        </ul>
      )}
      {isLoading && currentPage > 1 && (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default CommentSection;
