import ApplyForm from "./components/ApplyForm";
import ApplyFormContainer from "./components/ApplyFormContainer";

const ApplyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <ApplyFormContainer>
      <ApplyForm id={id} />
    </ApplyFormContainer>
  );
};

export default ApplyPage;
