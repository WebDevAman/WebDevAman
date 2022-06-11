import React, { ReactChild } from "react";

function H1({ children, className }: { children: ReactChild; className?: string }) {
  return <h1 className={`font-khand-headers text-3xl ${className}`}>{children}</h1>;
}

export default H1;
