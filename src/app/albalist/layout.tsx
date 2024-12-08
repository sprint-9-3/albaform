import { ReactNode, Suspense } from "react";
import SearchContainer from "./components/SearchContainer";

const AlbaListLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Suspense>
        <SearchContainer />
      </Suspense>
      {children}
    </div>
  );
};

export default AlbaListLayout;
