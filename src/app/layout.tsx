import type { Metadata } from "next";
import "./globals.css";
import ModalManager from "@/components/modal/modalManager/ModalManager";

export const metadata: Metadata = {
  title: "Albaform",
  description: "블라블라블라",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ModalManager />
      </body>
    </html>
  );
}
