import React, { ReactChild } from "react";

interface GridSectionWrapperProps {
  children: ReactChild;
  className?: string;
}

function GridSectionWrapper({ children, className }: GridSectionWrapperProps) {
  return (
    <div className={className}>
      <div className="max-w-[1440px] mx-auto h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-main lg:px-4 h-full">{children}</div>
      </div>
    </div>
  );
}

export default GridSectionWrapper;
