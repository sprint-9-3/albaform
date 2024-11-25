import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/Header";
import Sidebar from "@/components/header/Sidebar";

export const metadata: Metadata = {
  title: "Albaform",
  description: "아르바이트 공고를 올리고 채용하는 플랫폼 Albaform!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Sidebar />
        <Header />
        {children}
      </body>
    </html>
  );
}
