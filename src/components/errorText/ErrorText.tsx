import { cls } from "@/utils/DynamicTailwind";
import { FieldError } from "react-hook-form";

// form에서 에러 메시지를 출력할 때 사용하는 컴포넌트입니다.
// 에러가 나타났을 때 다음 요소와 간격이 벌어져서 사용자경험 떨어뜨리는 것을 막기 위해 absolute를 적용해놨습니다.
// 부모 요소에 relative를 적용해주세요.
const ErrorText = ({
  error,
  children,
  className,
}: {
  error: FieldError | string | undefined;
  children: React.ReactNode;
  className?: string;
}) => {
  return error ? (
    <p
      className={cls(
        "absolute bottom-0 right-0 translate-y-full text-sm font-medium text-red pc:text-lg",
        className ? className : ""
      )}
    >
      {children}
    </p>
  ) : null;
};

export default ErrorText;
