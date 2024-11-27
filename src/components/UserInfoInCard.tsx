import Image from "next/image";

interface UserInfoInCardProps {
  image: string;
  nickname: string;
  createdDate: string;
}

const UserInfoInCard = ({
  image,
  nickname,
  createdDate,
}: UserInfoInCardProps) => {
  return (
    <>
      <div className="relative size-6 overflow-hidden rounded-full">
        <Image
          src={image || "/icon/profile-circle-md.svg"}
          fill
          objectFit="cover"
          alt="사용자 이미지"
        />
      </div>
      <span>{nickname}</span>
      <div className="h-3 w-[1px] border border-line-100 pc:h-5" />
      <time className="flex-grow">{createdDate}</time>
    </>
  );
};

export default UserInfoInCard;
