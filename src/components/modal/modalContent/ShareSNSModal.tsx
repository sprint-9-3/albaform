"use client";

import Image from "next/image";
import LinkShowAndCopy from "@/app/alba/[formId]/components/LinkShowAndCopy";
import ModalContainer from "../modalContainer/ModalContainer";
import shareToKakao from "@/utils/shareToKakao";
import shareToFacebook from "@/utils/shareToFacebook";
import shareToTwitter from "@/utils/sharetoTwitter";
import { useEffect } from "react";

const ShareSNSModal = () => {
  const href = window.location.href;

  const SNSList = [
    { name: "카카오톡", image: "/logo/kakao.svg", color: "#fde047" },
    { name: "페이스북", image: "/logo/facebook.svg", color: "#0D61A9" },
    { name: "트위터", image: "/logo/twitter.svg", color: "#ffffff" },
  ];

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY as string);
    }
  }, []);

  const handleClick = (sns: string) => {
    switch (sns) {
      case "카카오톡":
        shareToKakao();
        break;
      case "페이스북":
        shareToFacebook();
        break;
      case "트위터":
        shareToTwitter();
        break;
      default:
        console.error("지원하지 않는 SNS입니다.");
    }
  };

  return (
    <ModalContainer>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-xl">공유</h2>
        <div className="flex justify-around">
          {SNSList.map((sns) => (
            <div key={sns.name} className="flex flex-col items-center gap-2">
              <button
                type="button"
                className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full"
                style={{ backgroundColor: sns.color }}
                onClick={() => handleClick(sns.name)}
              >
                <Image src={sns.image} width={44} height={44} alt={sns.name} />
              </button>
              <span>{sns.name}</span>
            </div>
          ))}
        </div>
        <LinkShowAndCopy url={href} />
      </div>
    </ModalContainer>
  );
};

export default ShareSNSModal;
