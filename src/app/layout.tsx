import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "../components/header/Header";
import Sidebar from "@/components/header/Sidebar";
import ModalManager from "@/components/modal/modalManager/ModalManager";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Albaform",
  },
  description: "아르바이트 공고를 올리고 채용하는 플랫폼 Albaform!",
  icons: { icon: "/logo/main-logo.svg", shortcut: "/logo/main-logo.svg" },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: {
      template: "%s",
      default: "Albaform",
    },
    description: "아르바이트 공고를 올리고 채용하는 플랫폼 Albaform!",
    images: "/logo/main-logo.svg",
    url: "http://localhost:3000",
  },
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
        <ModalManager />
      </body>
    </html>
  );
}
