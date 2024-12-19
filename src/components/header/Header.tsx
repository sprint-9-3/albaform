"use client";

import HeaderNavigation from "./HeaderNavigation";
import AuthPageNavigation from "./AuthPageNavigation";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import LoginButton from "../button/LoginButton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebarState } from "@/hooks/useSidebarState";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { isOpen, setIsOpen } = useSidebarState();
  const currentPath = usePathname();
  const isAuthPage =
    currentPath.includes("/signin") || currentPath.includes("/signup");

  useEffect(() => {
    // 브라우저 환경에서만 실행
    const loginStatus = localStorage.getItem("isLogin");
    setIsLogin(!!loginStatus);
  }, []);

  console.log(isLogin);

  const tabletStyle =
    "tablet:h-[60px] tablet:gap-[24px] tablet:px-[72px] tablet:py-[15px] tablet:text-lg";
  const pcStyle =
    "pc:h-[88px] pc:gap-[24px] pc:px-[240px] pc:py-[24px] pc:text-xl";

  return (
    <>
      <header
        className={`flex h-[54px] w-full items-center justify-between border-b-[1px] border-b-gray-100 px-[24px] py-[12px] text-md ${tabletStyle} ${pcStyle} `}
      >
        <Logo />
        <HeaderNavigation isAuthPage={isAuthPage} />
        {isAuthPage ? (
          <AuthPageNavigation />
        ) : isLogin ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <HeaderMenu />
          </button>
        ) : (
          <LoginButton />
        )}
      </header>
    </>
  );
};

export default Header;
