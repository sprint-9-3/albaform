import Image from "next/image";
import Link from "next/link";

const AddtalkButton = () => {
  return (
    <Link href="/addtalk">
      <Image
        src="/icon/writing-fill.svg"
        width={64}
        height={64}
        alt="글쓰기"
        className="h-[70px] w-[70px] hover:scale-110 pc:h-[88px] pc:w-[88px]"
      />
    </Link>
  );
};

export default AddtalkButton;
