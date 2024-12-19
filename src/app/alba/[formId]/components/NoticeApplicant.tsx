"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";

const NoticeApplicant = ({ count }: { count: number }) => {
  const { addToast } = useToast();

  useEffect(() => {
    if (count > 0) addToast(<span> 현재 {count}명이 지원했어요!</span>, "info");
  }, [addToast, count]);

  return null;
};

export default NoticeApplicant;
