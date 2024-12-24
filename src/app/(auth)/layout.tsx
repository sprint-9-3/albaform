const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mb-12 mt-[94px] flex max-w-[327px] flex-col space-y-8 px-6 pc:max-w-[640px] tablet:max-w-[640px]">
      {children}
    </div>
  );
};

export default AuthLayout;
