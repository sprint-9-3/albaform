"use client";

import Link from "next/link";
import Image from "next/image";
import useViewPort from "@/hooks/useViewport";
import { usePathname } from "next/navigation";
import { cls } from "@/utils/dynamicTailwinds";

const Logo = () => {
  const viewport = useViewPort();
  const pathname = usePathname();
  const isAuthPage =
    pathname.includes("/signin") || pathname.includes("/signup");

  return (
    <h1
      className={cls(
        "relative h-[30px] w-[45px] pc:h-[40px] pc:w-[284px] tablet:h-[30px] tablet:w-[177px]",
        isAuthPage ? "w-[130px]" : ""
      )}
    >
      <Link href="/">
        <Image
          src={
            !isAuthPage
              ? viewport === "mobile"
                ? "/logo/main-logo.svg"
                : "/logo/albaform-with-logo.svg"
              : "/logo/albaform-with-logo.svg"
          }
          fill
          alt="logo"
          loading="eager"
        />
      </Link>
    </h1>
  );
};

export default Logo;
