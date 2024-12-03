"use client";

import PublicDropdown from "@/components/dropdown/PublicDropdown";
import ApplicationDropdown from "@/components/dropdown/ApplicationDropdown";
import OrderByDropdown from "@/components/dropdown/OrderByDropdown";
import { useAtomValue } from "jotai";
import { publicStatusAtom } from "@/atoms/dropdownAtomStore";
import { applicationStatusAtom } from "@/atoms/dropdownAtomStore";
import { orderByAtom } from "@/atoms/dropdownAtomStore";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DropdownContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const publicStatus = useAtomValue(publicStatusAtom);
  const applicationStatus = useAtomValue(applicationStatusAtom);
  const orderby = useAtomValue(orderByAtom);

  useEffect(() => {
    const params = new URLSearchParams();

    if (keyword) params.set("keyword", keyword);
    params.set("isPublic", String(publicStatus));
    params.set("isRecruiting", String(applicationStatus));
    params.set("orderBy", orderby.value);

    router.push(`/albalist?${params.toString()}`);
  }, [router, publicStatus, applicationStatus, orderby]);

  return (
    <div className="border-b border-line-100 bg-background-100 px-6 pb-[10px] pt-[14px] pc:px-0 pc:pb-[20px] pc:pt-6 tablet:px-[72px]">
      <div className="mx-auto flex items-center justify-between pc:max-w-[1480px]">
        <div className="flex gap-x-[10px] pc:gap-x-4">
          <PublicDropdown />
          <ApplicationDropdown />
        </div>
        <OrderByDropdown />
      </div>
    </div>
  );
};

export default DropdownContainer;
