"use client";

import { useAtom } from "jotai";
import { sideBarAtom } from "@/atoms/sidebarAtom";

export const useSidebarState = () => {
  const [isOpen, setIsOpen] = useAtom(sideBarAtom);

  return { isOpen, setIsOpen };
};
