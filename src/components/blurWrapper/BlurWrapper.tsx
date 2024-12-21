import Image from "next/image";
import privateIcon from "@/../public/icon/private-md.svg";
import { ReactNode } from "react";

const BlurWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="pointer-events-none blur-sm">{children}</div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-4 border border-gray-200 bg-tuatara-900 opacity-60 pc:gap-y-6">
        <Image
          src={privateIcon}
          width={80}
          height={80}
          alt="private"
          className="pc:size-[120px]"
        />
        <span className="text-md font-medium text-gray-50 pc:text-2lg pc:font-regular">
          비공개 처리된 알바폼이에요
        </span>
      </div>
    </div>
  );
};

export default BlurWrapper;
