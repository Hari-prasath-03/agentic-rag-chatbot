import type { PropsWithChildren } from "react";

const ConverstionAres: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-neutral-950 slim-scrollbar">
      <div className="max-w-3xl mx-auto py-8 space-y-6">{children}</div>
    </div>
  );
};

export default ConverstionAres;
