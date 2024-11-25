import { useState, useEffect } from "react";

type ViewPortType = "mobile" | "tablet" | "pc" | undefined;

// 현재 viewport의 반응형 타입을 알려주는 hook
const useViewPort = (): ViewPortType => {
  const [viewPort, setViewPort] = useState<ViewPortType>();

  const updateViewPort = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setViewPort("mobile");
    } else if (width >= 768 && width < 1200) {
      setViewPort("tablet");
    } else {
      setViewPort("pc");
    }
  };

  useEffect(() => {
    updateViewPort(); // 초기 실행
    window.addEventListener("resize", updateViewPort); // 화면 크기 변경 감지

    return () => {
      window.removeEventListener("resize", updateViewPort); // 이벤트 제거
    };
  }, []);

  return viewPort;
};

export default useViewPort;
