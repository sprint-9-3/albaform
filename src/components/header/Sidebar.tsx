"use client";

import { useSidebarState } from "@/hooks/useSidebarState";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebarState();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[98] bg-black opacity-50"
        onClick={() => setIsOpen(false)} // Overlay 클릭 시 Sidebar 닫기
      />
      {/* Sidebar */}
      <nav className="fixed right-0 top-0 z-[99] h-[100vh] w-[220px] bg-white shadow-lg pc:w-[560px] tablet:w-[320px]">
        <div className="flex h-[54px] w-full flex-row-reverse items-center border-b border-b-gray-100 px-[15px] pc:h-[88px] pc:px-[56px] tablet:h-[60px]">
          <button
            onClick={() => setIsOpen(false)}
            className="relative h-[24px] w-[24px] pc:h-[32px] pc:w-[32px]"
          >
            <Image src="/icon/close-lg.svg" fill alt="닫기 버튼" />
          </button>
        </div>
        <ul className="flex flex-col">
          <li>
            <Link
              href="/mypage"
              className="flex h-[100px] w-full items-center gap-[16px] px-[16px] py-[24px]"
            >
              <div className="text-orange-100">
                <Image
                  src="/icon/profile-orange.svg"
                  width={36}
                  height={36}
                  alt="마이페이지 이동"
                />
              </div>
              <span className="text-lg text-black-400 pc:text-xl">
                마이페이지
              </span>
            </Link>
          </li>
          <li className="flex h-[100px] w-full items-center gap-[16px] px-[16px] py-[24px]">
            <Image
              src="/icon/logout-orange.svg"
              width={36}
              height={36}
              alt="로그아웃"
              className="text-orange-100"
            />
            <span className="text-lg text-black-400 pc:text-xl">로그아웃</span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
