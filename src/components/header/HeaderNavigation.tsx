import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderNavigation = ({ isAuthPage }: { isAuthPage: boolean }) => {
  const currentPathname = usePathname();

  if (isAuthPage) return null;

  return (
    <nav className="m-[16px] flex-grow">
      <ul className="flex gap-[16px] text-gray-300">
        <Link
          href="/albalist"
          className={currentPathname === "/albalist" ? "text-orange-100" : ""}
        >
          알바 목록
        </Link>
        <Link
          href="/albatalk"
          className={currentPathname === "/albatalk" ? "text-orange-100" : ""}
        >
          알바토크
        </Link>
        <Link
          href="/myalbaform"
          className={currentPathname === "/myalbaform" ? "text-orange-100" : ""}
        >
          내 알바폼
        </Link>
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
