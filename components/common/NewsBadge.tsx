import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

interface NewsBadgeProps {
  text: string;
  colorText?: "red" | "white";
  small?: Boolean
}

function NewsBadge({ small, text, colorText = "red" }: NewsBadgeProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      {small ?
        <div className={`${theme === 'light' ? 'text-[#00000099]' : 'text-[#c6c6c6]'} font-Quattrocento text-[10px] font-semibold]  uppercase`}>
          {text}
        </div> :
        <div className={`${theme === 'light' ? 'text-[#00000099]' : 'text-[#c6c6c6]'} font-Quattrocento text-[10px] font-semibold  uppercase `}>
          {text}
        </div>}
    </>

  );
}

export default NewsBadge;
