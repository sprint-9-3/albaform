import Image from "next/image";

const CommentAndLikeCount = ({
  commentCount,
  likeCount,
  isHover,
}: {
  commentCount: number;
  likeCount: number;
  isHover: boolean;
}) => {
  return (
    <ul className="flex items-center gap-4">
      <li className="flex items-center gap-[2px]">
        <Image
          src={isHover ? "/icon/comment-hover.svg" : "/icon/comment-lg.svg"}
          width={28}
          height={28}
          alt="댓글"
        />
        <span>{commentCount}</span>
      </li>
      <li className="flex items-center gap-[2px]">
        <Image
          src={isHover ? "/icon/heart-hover.svg" : "/icon/heart-lg.svg"}
          width={28}
          height={28}
          alt="좋아요"
        />
        <span>{likeCount}</span>
      </li>
    </ul>
  );
};

export default CommentAndLikeCount;
