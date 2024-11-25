import SigninTitle from "../components/SigninTitle";
import SigninContents from "../components/SigninContents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

const SigninPage = ({ params }: { params: { userType: string } }) => {
  const { userType } = params;

  return (
    <>
      <SigninTitle userType={userType} />
      <SigninContents />
    </>
  );
};

export default SigninPage;
