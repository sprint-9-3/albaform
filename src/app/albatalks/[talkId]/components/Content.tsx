"use server";

const Content = ({ content }: { content: string }) => {
  return (
    <div>
      <p className="mt-16 text-md text-gray-500 pc:mt-[88px] pc:text-xl tablet:text-lg">
        {content}
      </p>
    </div>
  );
};

export default Content;
