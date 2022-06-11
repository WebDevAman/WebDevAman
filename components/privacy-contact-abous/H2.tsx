import React, { ReactChild } from "react";

function H2({ children, className }: { children: ReactChild; className?: string }) {
  return <h2 className={`font-khand-headers text-2xl ${className}`}>{children}</h2>;
}

export default H2;
