const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-[94px] flex max-w-[640px] flex-col space-y-8 px-6">
      {children}
    </div>
  );
};

export default AuthLayout;
