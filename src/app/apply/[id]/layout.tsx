const ApplyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[375px] px-6 pb-[80px] pc:max-w-[640px]">
      {children}
    </div>
  );
};

export default ApplyLayout;
