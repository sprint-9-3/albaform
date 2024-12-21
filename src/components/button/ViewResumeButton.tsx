"use client";

import { useRouter } from "next/navigation";

const ViewResumeButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const goToMyApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/myapply/${id}`);
  };

  return (
    <button
      type="button"
      onClick={goToMyApply}
      className="text-black-400 underline"
    >
      이력서 보기
    </button>
  );
};

export default ViewResumeButton;
