"use client";

import dynamic from "next/dynamic";

const KakaoMap = dynamic(() => import("@/components/map/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-lg border border-line-200">
      지도 로딩 중...
    </div>
  ),
});

export default function LazyKakaoMap({ location }: { location: string }) {
  return <KakaoMap location={location} />;
}
