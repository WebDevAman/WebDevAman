import React, { ReactChild } from "react";
import Link from "next/link";

function NextLink({
  children,
  href,
  target,
  rel,
}: {
  children: ReactChild;
  href: string;
  target?: string;
  rel?: string;
}) {
  return (
    <Link href={href}>
      <a target={target} rel={rel} className="text-main hover:underline">
        {children}
      </a>
    </Link>
  );
}

export default NextLink;
