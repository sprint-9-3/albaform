import { ReactNode, Suspense } from "react";
import SearchContainer from "./components/SearchContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 알바폼",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Suspense>
        <SearchContainer />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
