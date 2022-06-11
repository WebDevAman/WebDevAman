import React, { useContext } from "react";
import { RiStarFill } from "react-icons/ri";
import { ThemeContext } from "../context/themeContext";

function SpecialEvents({ specialEvents }: { specialEvents: Array<string> }) {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme === 'light' ? 'shadow-postLight border-gray-200 text-[#222] bg-[#fff]' : 'shadow-postDark border-main-black bg-light-black text-[#efefef]'} max-h-[460px]  overflow-y-scroll w-full`}>
      {specialEvents.map(specialEvent => (
        <>
          <div className={`${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#555]'} border-b border-transparent p-2 flex items-center px-2`}>
            <div className="bg-[#ce061e]  mr-2 w-[40px] h-[40px] flex flex-col items-center justify-center text-center text-[#fff] rounded-md">
              <p className="text-xs font-exo-nav mt-1">{specialEvent.split('-')[1].trim().split(' ')[0]}</p>
              <p className="text-lg font-bold mt-[-4px] font-exo-nav">{specialEvent.split('-')[1].trim().split(' ')[1]}</p>
            </div>
            <p className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef] '} text-[13px] font-exo-nav font-semibold`}>{specialEvent.split('-')[0]}</p>
          </div>

        </>
      ))}


    </div>
  );
}

export default SpecialEvents;
