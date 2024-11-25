"use client";

import useViewPort from "@/hooks/useViewport";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const viewPort = useViewPort();

  return (
    <div className="relative h-[30px] w-[45px] pc:h-[40px] pc:w-[284px] tablet:h-[30px] tablet:w-[177px]">
      <Link href="/">
        <Image
          src={
            viewPort === "mobile"
              ? "/logo/main-logo.svg"
              : "/logo/albaform-with-logo.svg"
          }
          fill
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
