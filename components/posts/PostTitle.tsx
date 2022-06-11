import React, { ReactNode, useContext } from "react";
import { ThemeContext } from "../context/themeContext";

function PostTitle({ children }: { children: ReactNode }) {
  const { theme } = useContext(ThemeContext)
  return <h1 className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef]'} text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.1] font-bold`}>{children}</h1>;
}

export default PostTitle;
