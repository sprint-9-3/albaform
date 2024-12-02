import RequirementPicker from "@/components/picker/RequirementPicker";

const testPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <RequirementPicker label="모집인원" />
      <RequirementPicker label="성별" />
      <RequirementPicker label="학력" />
      <RequirementPicker label="연령" />
      <RequirementPicker label="우대사항" />
    </div>
  );
};
export default testPage;
