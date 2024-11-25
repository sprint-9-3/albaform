"use client";

import { usePathname } from "next/navigation";
import { useSidebarState } from "@/hooks/useSidebarState";
import Image from "next/image";
import HeaderNavigation from "./HeaderNavigation";
import AuthPageNavigation from "./AuthPageNavigation";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const currentPath = usePathname();
  const { isOpen, setIsOpen } = useSidebarState();

  const isAuthPage = currentPath === "/signin" || currentPath === "/signup";

  return (
    <>
      <header className="tablet:header-tablet pc:header-pc flex h-[54px] w-full items-center justify-between border-b-[1px] border-b-gray-100 px-[24px] py-[12px] text-md">
        <Logo />
        <HeaderNavigation isAuthPage={isAuthPage} />
        {isAuthPage ? (
          <AuthPageNavigation />
        ) : (
          <button onClick={() => setIsOpen(!isOpen)}>
            <HeaderMenu />
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
