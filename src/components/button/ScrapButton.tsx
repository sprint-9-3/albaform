"use client";

import Image from "next/image";
import instance from "@/lib/instance";
import { cls } from "@/utils/dynamicTailwinds";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

const ScrapButton = ({
  isScrapped,
  formId,
}: {
  isScrapped: boolean;
  formId: string;
}) => {
  const [isFilled, setIsFilled] = useState(isScrapped); // 단순히 client ui를 바꾸기 위한 용도(오렌지색 -> 회색, 회색 -> 오렌지색)
  const { addToast } = useToast();

  // 스크랩이 안되어 있으면 클릭시 스크롭 등록 요청을 보내고, 되어있으면 취소 요청을 보내는 로직
  const toggleScrap = async () => {
    if (isFilled) {
      setIsFilled(false);
      addToast("스크랩이 해제되었습니다.", "success");
      await instance(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/scrap`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      setIsFilled(true);
      addToast("스크랩이 완료되었습니다.", "success");
      const res = await instance(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/scrap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("스크랩 완료 후 데이터", res.data);
    }
  };

  return (
    <button
      className={cls(
        "flex size-[54px] items-center justify-center rounded-full shadow-md pc:size-[64px]",
        isFilled ? "bg-orange-50" : "border border-line-100 bg-gray-50"
      )}
      disabled={isScrapped}
      onClick={toggleScrap}
    >
      <Image
        src={
          isFilled ? "/icon/bookmark-orange.svg" : "/icon/bookmark-fill-md.svg"
        }
        width={32}
        height={32}
        alt="공유하기 버튼"
      />
    </button>
  );
};

export default ScrapButton;
