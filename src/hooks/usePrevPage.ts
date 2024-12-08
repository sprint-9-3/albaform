import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 뒤로가기 시 쿼리 파라미터 삭제 후 이전페이지로 이동
export const usePrevPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
      router.back();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);
};
