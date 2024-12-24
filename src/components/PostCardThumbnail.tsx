import Image from "next/image";

const PostCardThumbnail = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative h-[100px] w-[100px] overflow-hidden rounded-md pc:h-[150px] pc:w-[150px]">
      <Image
        src={imageUrl ? imageUrl : "/icon/profile-lg.svg"}
        fill
        className="object-cover"
        alt="썸네일"
      />
    </div>
  );
};

export default PostCardThumbnail;
