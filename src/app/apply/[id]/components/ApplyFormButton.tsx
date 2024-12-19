import SolidButton from "@/components/button/SolidButton";

interface ApplyButtonProps {
  onSave: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  loading: boolean;
}

const ApplyFormButton = ({
  onSave,
  isSubmitting,
  isValid,
  loading,
}: ApplyButtonProps) => {
  return (
    <div className="mt-[62px] flex flex-col gap-[10px] pc:mt-[88px] pc:flex-row pc:gap-[8px]">
      <SolidButton
        style="outOrange300"
        type="button"
        disabled={isSubmitting}
        onClick={onSave}
      >
        임시 저장
      </SolidButton>

      <SolidButton
        style="orange300"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {loading ? "로딩 중..." : "작성 완료"}
      </SolidButton>
    </div>
  );
};

export default ApplyFormButton;
