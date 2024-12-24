const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto flex max-w-[1560px] flex-col items-center">
      {children}
    </main>
  );
};

export default layout;
