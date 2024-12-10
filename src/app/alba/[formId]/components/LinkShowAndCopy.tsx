"use client";

import CopyButton from "../../../../components/button/CopyButton";

const LinkShowAndCopy = ({ url }: { url: string }) => {
  return (
    <div className="flex h-[50px] w-[470px] items-center justify-between rounded-lg border border-line-200 p-4">
      <span className="">{url}</span>
      <CopyButton text={url} />
    </div>
  );
};

export default LinkShowAndCopy;
