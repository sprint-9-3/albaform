import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.pixabay.com"], // 외부 이미지 도메인 추가
  },
};

export default nextConfig;
