import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

interface CommentItemProps {
  info: {
    writer: {
      imageUrl: string;
      nickname: string;
      id: number;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  };
}

const CommentItem = ({ info }: CommentItemProps) => {
  const [_, formattedDate] = formatDate("", info.createdAt);

  return (
    <section className="flex h-[128px] w-[327px] flex-col justify-between border-b border-b-line-100 px-2 py-4 pc:h-[148px] pc:w-[1480px] tablet:h-[122px] tablet:w-[600px] tablet:px-[10px]">
      <div className="flex h-6 w-full items-center justify-between gap-2 text-gray-500 pc:text-2lg">
        <address className="flex items-center gap-2 not-italic">
          <div className="relative size-6 overflow-hidden rounded-full pc:size-8">
            <Image
              src={info.writer.imageUrl || "/icon/profile-circle-md.svg"}
              fill
              alt=""
            />
          </div>
          <span>{info.writer.nickname}</span>
        </address>
        <div className="h-4 border border-line-100" />
        <time className="text flex-grow">{formattedDate}</time>
        <button>
          <Image
            src="/icon/kebab-md.svg"
            width={24}
            height={24}
            alt="메뉴 버튼"
          />
        </button>
      </div>
      <div className="line-clamp-2 h-[48px] w-full text-md pc:text-2lg tablet:h-[26px]">
        {info.content}
      </div>
    </section>
  );
};

export default CommentItem;
